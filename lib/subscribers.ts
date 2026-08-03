import crypto from "crypto";
import { getPayloadClient } from "@/lib/payload";
import { addResendContact, sendEmail, setResendContactUnsubscribed } from "@/lib/email";
import { renderTemplate, splitParagraphs } from "@/lib/templates";
import { emailDesignFrom, renderBrandedEmailHtml, renderBrandedEmailText } from "@/lib/emailBrand";
import { siteUrl, unsubscribeUrl } from "@/lib/urls";

/** Adds a new active subscriber (or re-activates one who'd unsubscribed), sends the welcome email, and syncs the contact to Resend's Audience (if configured) so it can be targeted by a Broadcast sent from Resend's own dashboard. Idempotent -- safe to call for an email that's already subscribed. */
export async function subscribe(email: string): Promise<void> {
  const payload = await getPayloadClient();
  const existing = await payload.find({ collection: "subscribers", where: { email: { equals: email } }, limit: 1 });

  let token: string;
  if (existing.docs[0]) {
    token = existing.docs[0].unsubscribeToken;
    if (existing.docs[0].status !== "active") {
      await payload.update({ collection: "subscribers", id: existing.docs[0].id, data: { status: "active" } });
    }
  } else {
    token = crypto.randomBytes(16).toString("hex");
    await payload.create({ collection: "subscribers", data: { email, status: "active", unsubscribeToken: token, source: "letters" } });
  }

  const templates = await payload.findGlobal({ slug: "email-templates" });
  const w = templates.welcome;
  const vars = { unsubscribeUrl: unsubscribeUrl(token) };
  const content = {
    preheader: renderTemplate(w.headline, vars),
    eyebrow: renderTemplate(w.eyebrow, vars),
    headline: renderTemplate(w.headline, vars),
    paragraphs: splitParagraphs(renderTemplate(w.body, vars)),
    ctaLabel: w.ctaLabel,
    ctaUrl: `${siteUrl()}/letters`,
    unsubscribeUrl: vars.unsubscribeUrl,
  };
  await sendEmail({
    to: email,
    subject: renderTemplate(w.subject, vars),
    text: renderBrandedEmailText(content),
    html: renderBrandedEmailHtml(content, emailDesignFrom(templates)),
  }).catch((err) => console.error("Welcome email failed:", err));

  await addResendContact(email).catch((err) => console.error("Resend contact sync failed:", err));
}

export interface GrowthAuditSubscribeArgs {
  email: string;
  overall: number;
  band: string;
  weakest: string;
}

/** Upserts a subscriber from the growth-audit flow: sets source=growth-audit (new signups only) plus the score fields, and syncs to Resend -- but does NOT send the generic welcome email, since the growth-audit result email (sent separately by the caller) already serves that role. Returns the subscriber's unsubscribe token. */
export async function subscribeFromGrowthAudit(args: GrowthAuditSubscribeArgs): Promise<string> {
  const payload = await getPayloadClient();
  const existing = await payload.find({ collection: "subscribers", where: { email: { equals: args.email } }, limit: 1 });
  const scoreFields = { growthAuditOverall: args.overall, growthAuditBand: args.band, growthAuditWeakest: args.weakest };

  let token: string;
  if (existing.docs[0]) {
    token = existing.docs[0].unsubscribeToken;
    await payload.update({
      collection: "subscribers",
      id: existing.docs[0].id,
      data: { ...scoreFields, ...(existing.docs[0].status !== "active" ? { status: "active" as const } : {}) },
    });
  } else {
    token = crypto.randomBytes(16).toString("hex");
    await payload.create({ collection: "subscribers", data: { email: args.email, status: "active", unsubscribeToken: token, source: "growth-audit", ...scoreFields } });
  }

  await addResendContact(args.email).catch((err) => console.error("Resend contact sync failed:", err));
  return token;
}

export async function unsubscribeByToken(token: string): Promise<boolean> {
  const payload = await getPayloadClient();
  const found = await payload.find({ collection: "subscribers", where: { unsubscribeToken: { equals: token } }, limit: 1 });
  const doc = found.docs[0];
  if (!doc) return false;
  await payload.update({ collection: "subscribers", id: doc.id, data: { status: "unsubscribed" } });
  await setResendContactUnsubscribed(doc.email, true).catch((err) => console.error("Resend contact sync failed:", err));
  return true;
}
