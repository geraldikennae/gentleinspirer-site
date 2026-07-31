import { getPayloadClient } from "@/lib/payload";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { SuggestionForm } from "@/components/site/SuggestionForm";
import { SOCIALS } from "@/components/social/socials";

export const dynamic = "force-dynamic";

interface CalendarEntry {
  iso: string;
  venue: string;
  venueLink?: string | null;
  label?: string | null;
}

function monthHeading(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "Africa/Lagos" });
}

function dayLabel(iso: string): { weekday: string; day: string; time: string } {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long", timeZone: "Africa/Lagos" }),
    day: d.toLocaleDateString("en-US", { day: "numeric", timeZone: "Africa/Lagos" }),
    time: new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos", timeZoneName: "short" }).format(d),
  };
}

export default async function CalendarPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "upcoming-sessions",
    where: { date: { greater_than_equal: new Date().toISOString() } },
    sort: "date",
    limit: 200,
  });

  const byMonth = new Map<string, CalendarEntry[]>();
  for (const doc of docs) {
    const iso = new Date(doc.date).toISOString();
    const key = monthHeading(iso);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push({ iso, venue: doc.venue, venueLink: doc.venueLink, label: doc.label });
  }

  return (
    <>
      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Free · Community</Eyebrow>
        <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>What&rsquo;s coming</h1>
        <Rule length={64} />
        <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)" }}>
          Free community Clarity Sessions — live, open Q&amp;A. No booking, no fee: just join at the time via the link for that date.{" "}
          <strong>Looking for a private 1:1 session instead?</strong> That&rsquo;s the paid Clarity Session, booked separately from the sessions page.
        </p>
        <div style={{ marginTop: "var(--space-6)" }}>
          <Button variant="secondary" href="/sessions">
            See the paid 1:1 option
          </Button>
        </div>
      </Section>

      <Section tone="card" py="var(--space-8)">
        {byMonth.size === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No dates published yet — join the WhatsApp community for the next one.</p>
        ) : (
          <div style={{ display: "grid", gap: "var(--space-7)" }}>
            {Array.from(byMonth.entries()).map(([month, dates]) => (
              <div key={month}>
                <Eyebrow>{month}</Eyebrow>
                <div style={{ marginTop: "var(--space-4)", display: "grid", gap: "1px", background: "var(--border-hairline)" }}>
                  {dates.map((d) => {
                    const { weekday, day, time } = dayLabel(d.iso);
                    return (
                      <Card key={d.iso} variant="flat" padding="var(--space-5)" style={{ background: "var(--surface-card)" }}>
                        <div className="rg-calendar-row">
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-1)", color: "var(--gi-gold-deep)" }}>{day}</div>
                          <div>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".03em" }}>{weekday}</div>
                            {d.label && <p style={{ margin: "4px 0 0", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>{d.label}</p>}
                            <div style={{ marginTop: "6px", display: "flex", flexWrap: "wrap", gap: "var(--space-3)", fontSize: "var(--size-caption)", color: "var(--text-muted)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase" }}>
                              <span>{time}</span>
                              <span>·</span>
                              <span>{d.venue}</span>
                            </div>
                          </div>
                          <Button variant="secondary" size="sm" externalHref={d.venueLink || SOCIALS.whatsapp.url}>
                            Join
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Not on the calendar yet?</Eyebrow>
        <h2 style={{ margin: "var(--space-3) 0 var(--space-4)", maxWidth: "24ch" }}>Suggest what you want clarity on</h2>
        <Rule length={64} />
        <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)" }}>Tell us what you&rsquo;re stuck on — it shapes what gets covered in upcoming sessions and letters.</p>
        <div style={{ marginTop: "var(--space-6)", maxWidth: "560px" }}>
          <SuggestionForm />
        </div>
      </Section>
    </>
  );
}
