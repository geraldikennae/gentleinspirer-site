import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "info@gentleinspirer.com";

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendEmail(args: { to: string; subject: string; text: string }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({ from: FROM, to: args.to, subject: args.subject, text: args.text });
}

export async function sendBookingConfirmation(args: { to: string; name: string; sessionLabel: string; whenLabel: string; minutes: number }) {
  await sendEmail({
    to: args.to,
    subject: `Held: ${args.sessionLabel}`,
    text: `Hi ${args.name},\n\nYour session is held.\n\n${args.sessionLabel} — ${args.whenLabel} · ${args.minutes} minutes\n\nA video link follows separately.\n\n— Gerald`,
  });
}

export async function sendProductDelivery(args: { to: string; title: string; downloadUrl: string }) {
  await sendEmail({
    to: args.to,
    subject: `Your copy: ${args.title}`,
    text: `Thanks for your purchase.\n\n${args.title}\n\nDownload: ${args.downloadUrl}\n\nIf the link expires, reply to this email and we'll re-send it.\n\n— Gerald`,
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
