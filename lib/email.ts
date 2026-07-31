import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "info@gentleinspirer.com";

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendBookingConfirmation(args: { to: string; name: string; sessionLabel: string; whenLabel: string; minutes: number }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: `Held: ${args.sessionLabel}`,
    text: `Hi ${args.name},\n\nYour session is held.\n\n${args.sessionLabel} — ${args.whenLabel} · ${args.minutes} minutes\n\nA video link follows separately.\n\n— Gerald`,
  });
}

export async function sendProductDelivery(args: { to: string; title: string; downloadUrl: string }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: `Your copy: ${args.title}`,
    text: `Thanks for your purchase.\n\n${args.title}\n\nDownload: ${args.downloadUrl}\n\nIf the link expires, reply to this email and we'll re-send it.\n\n— Gerald`,
  });
}

export async function sendWelcomeEmail(args: { to: string; unsubscribeUrl: string }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: "Confirmed — the letters",
    text: `Confirmed.\n\nStructured breakdowns on growth, leadership and execution. No offers — just a note when a new letter or product goes up.\n\nUnsubscribe any time: ${args.unsubscribeUrl}`,
  });
}

export async function sendNewLetterEmail(args: { to: string; title: string; dek: string; url: string; unsubscribeUrl: string }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: `New letter: ${args.title}`,
    text: `${args.title}\n\n${args.dek}\n\nRead it: ${args.url}\n\n— Gerald\n\nUnsubscribe any time: ${args.unsubscribeUrl}`,
  });
}

export async function sendNewProductEmail(args: { to: string; title: string; blurb: string; url: string; unsubscribeUrl: string }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: `New: ${args.title}`,
    text: `${args.title}\n\n${args.blurb}\n\nTake a look: ${args.url}\n\n— Gerald\n\nUnsubscribe any time: ${args.unsubscribeUrl}`,
  });
}
