import type { Payload } from "payload";
import { sendEmail } from "@/lib/email";
import { renderTemplate, splitParagraphs } from "@/lib/templates";
import { renderBrandedEmailHtml, renderBrandedEmailText } from "@/lib/emailBrand";
import { siteUrl, unsubscribeUrl } from "@/lib/urls";

// Called from Letters/Products collection hooks, which already have an
// initialized Payload instance on req.payload -- takes it as a parameter
// instead of importing @payload-config, since these collection files are
// themselves part of payload.config.ts's import graph and re-importing the
// config from inside them would be circular.

async function activeSubscribers(payload: Payload) {
  const { docs } = await payload.find({ collection: "subscribers", where: { status: { equals: "active" } }, limit: 5000 });
  return docs;
}

/** Best-effort -- logs and continues past individual send failures rather than throwing, since this runs inside a Payload afterChange hook. */
export async function notifyNewLetter(payload: Payload, args: { title: string; dek: string; slug: string }): Promise<void> {
  const [subscribers, templates] = await Promise.all([activeSubscribers(payload), payload.findGlobal({ slug: "email-templates" })]);
  const t = templates.newLetter;
  const url = `${siteUrl()}/letters/${args.slug}`;
  await Promise.allSettled(
    subscribers.map((s) => {
      const vars = { title: args.title, dek: args.dek, url, unsubscribeUrl: unsubscribeUrl(s.unsubscribeToken) };
      const content = {
        preheader: renderTemplate(t.headline, vars),
        eyebrow: renderTemplate(t.eyebrow, vars),
        headline: renderTemplate(t.headline, vars),
        paragraphs: splitParagraphs(renderTemplate(t.body, vars)),
        ctaLabel: t.ctaLabel,
        ctaUrl: url,
        unsubscribeUrl: vars.unsubscribeUrl,
      };
      return sendEmail({
        to: s.email,
        subject: renderTemplate(t.subject, vars),
        text: renderBrandedEmailText(content),
        html: renderBrandedEmailHtml(content, templates.htmlTemplate),
      }).catch((err: unknown) => console.error(`New-letter email to ${s.email} failed:`, err));
    }),
  );
}

export async function notifyNewProduct(payload: Payload, args: { title: string; blurb: string }): Promise<void> {
  const [subscribers, templates] = await Promise.all([activeSubscribers(payload), payload.findGlobal({ slug: "email-templates" })]);
  const t = templates.newProduct;
  const url = `${siteUrl()}/products`;
  await Promise.allSettled(
    subscribers.map((s) => {
      const vars = { title: args.title, blurb: args.blurb || "", url, unsubscribeUrl: unsubscribeUrl(s.unsubscribeToken) };
      const content = {
        preheader: renderTemplate(t.headline, vars),
        eyebrow: renderTemplate(t.eyebrow, vars),
        headline: renderTemplate(t.headline, vars),
        paragraphs: splitParagraphs(renderTemplate(t.body, vars)),
        ctaLabel: t.ctaLabel,
        ctaUrl: url,
        unsubscribeUrl: vars.unsubscribeUrl,
      };
      return sendEmail({
        to: s.email,
        subject: renderTemplate(t.subject, vars),
        text: renderBrandedEmailText(content),
        html: renderBrandedEmailHtml(content, templates.htmlTemplate),
      }).catch((err: unknown) => console.error(`New-product email to ${s.email} failed:`, err));
    }),
  );
}
