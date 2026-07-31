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

export async function sendLetterConfirmation(args: { to: string }) {
  if (!emailConfigured()) return;
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: "Confirmed — the letters",
    text: `Confirmed. The next one goes out Monday.\n\nThree times a week: one insight, one framework. No offers.`,
  });
}
