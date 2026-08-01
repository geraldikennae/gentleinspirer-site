import { completeBooking } from "@/lib/booking";
import { getSiteSettings } from "@/lib/settings";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";

export const dynamic = "force-dynamic";

interface SearchParams {
  start?: string;
  name?: string;
  email?: string;
  minutes?: string;
}

export default async function BookingConfirmed({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, settings] = await Promise.all([searchParams, getSiteSettings()]);
  const { start, name, email, minutes } = params;

  if (!start || !name || !email || !minutes) {
    return (
      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Booking</Eyebrow>
        <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>Something&rsquo;s missing</h1>
        <Rule />
        <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>We couldn&rsquo;t find your booking details. If you were just charged, contact {settings.contactEmail} and we&rsquo;ll sort it out.</p>
        <div style={{ marginTop: "var(--space-6)" }}>
          <Button variant="secondary" href="/book">
            Back to booking
          </Button>
        </div>
      </Section>
    );
  }

  // Payment already succeeded (Stripe only redirects here on success) — now
  // actually create the Cal.com booking and send the confirmation email.
  const result = await completeBooking({
    type: "paid",
    start,
    name,
    email,
    minutes: Number(minutes),
    sessionLabel: "Clarity Session",
  });

  return (
    <Section tone="page" py="var(--space-9)">
      <Eyebrow>Booking</Eyebrow>
      <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>Held for you</h1>
      <Rule />
      <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>
        Clarity Session: {result.whenLabel} · {minutes} minutes. Payment received.{" "}
        {result.emailSent ? "A confirmation is in your inbox, with the pre-session brief." : "A confirmation will follow shortly."}
      </p>
      {!result.calBooked && <p style={{ marginTop: "var(--space-3)", fontSize: "var(--size-caption)", color: "var(--text-muted)" }}>Calendar hold pending. If you don&rsquo;t hear from us within a day, email {settings.contactEmail}.</p>}
      <div style={{ marginTop: "var(--space-6)" }}>
        <Button variant="secondary" href="/book">
          Book another
        </Button>
      </div>
    </Section>
  );
}
