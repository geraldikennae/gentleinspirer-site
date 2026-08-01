import { Resend } from "resend";
import { renderBrandedEmailHtml, renderBrandedEmailText } from "@/lib/emailBrand";

const FROM = process.env.EMAIL_FROM || "info@gentleinspirer.com";

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendEmail(args: { to: string; subject: string; text: string; html?: string }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({ from: FROM, to: args.to, subject: args.subject, text: args.text, ...(args.html ? { html: args.html } : {}) });
}

export async function sendBookingConfirmation(args: { to: string; name: string; sessionLabel: string; whenLabel: string; minutes: number }) {
  const content = {
    preheader: `${args.sessionLabel} is held for ${args.whenLabel}.`,
    eyebrow: "Booking Confirmed",
    headline: `Hi ${args.name}, you're held.`,
    paragraphs: [`${args.sessionLabel} · ${args.whenLabel} · ${args.minutes} minutes`, "A video link follows separately."],
  };
  await sendEmail({
    to: args.to,
    subject: `Held: ${args.sessionLabel}`,
    text: renderBrandedEmailText(content),
    html: renderBrandedEmailHtml(content),
  });
}

export async function sendProductDelivery(args: { to: string; title: string; downloadUrl: string }) {
  const content = {
    preheader: `Your copy of ${args.title} is ready.`,
    eyebrow: "Order Confirmed",
    headline: args.title,
    paragraphs: ["Thanks for your purchase.", "If the link expires, reply to this email and we'll re-send it."],
    ctaLabel: "Download your copy",
    ctaUrl: args.downloadUrl,
  };
  await sendEmail({
    to: args.to,
    subject: `Your copy: ${args.title}`,
    text: renderBrandedEmailText(content),
    html: renderBrandedEmailHtml(content),
  });
}

// -- Resend Audience/Contacts sync, so subscribers also show up in Resend
// itself and can be targeted by a Broadcast sent from Resend's own
// dashboard, not just the automated emails this site sends.

export function resendAudienceConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID);
}

export async function addResendContact(email: string): Promise<void> {
  if (!resendAudienceConfigured()) return;
  const resend = getResend();
  await resend.contacts.create({ audienceId: process.env.RESEND_AUDIENCE_ID as string, email, unsubscribed: false });
}

export async function setResendContactUnsubscribed(email: string, unsubscribed: boolean): Promise<void> {
  if (!resendAudienceConfigured()) return;
  const resend = getResend();
  await resend.contacts.update({ audienceId: process.env.RESEND_AUDIENCE_ID as string, email, unsubscribed });
}
