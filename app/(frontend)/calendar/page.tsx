import { getPayloadClient } from "@/lib/payload";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { SuggestionForm } from "@/components/site/SuggestionForm";

export const dynamic = "force-dynamic";

function monthHeading(dateStr: string): string {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function dayLabel(dateStr: string): { weekday: string; day: string } {
  const d = new Date(dateStr + "T12:00:00Z");
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
    day: d.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" }),
  };
}

export default async function CalendarPage() {
  const payload = await getPayloadClient();
  const today = new Date().toISOString().slice(0, 10);
  const { docs } = await payload.find({
    collection: "upcoming-sessions",
    where: { date: { greater_than_equal: today } },
    sort: "date",
    limit: 200,
  });

  const byMonth = new Map<string, { date: string; label?: string | null }[]>();
  for (const doc of docs) {
    const dateStr = String(doc.date).slice(0, 10);
    const key = monthHeading(dateStr);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push({ date: dateStr, label: doc.label });
  }

  return (
    <>
      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Clarity Sessions</Eyebrow>
        <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>What&rsquo;s coming</h1>
        <Rule length={64} />
        <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)" }}>Upcoming Clarity Sessions, out as far as they&rsquo;re planned. Book any of them from the sessions page.</p>
        <div style={{ marginTop: "var(--space-6)" }}>
          <Button variant="secondary" href="/book">
            Book a session
          </Button>
        </div>
      </Section>

      <Section tone="card" py="var(--space-8)">
        {byMonth.size === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No dates published yet — check back soon, or book a time directly.</p>
        ) : (
          <div style={{ display: "grid", gap: "var(--space-7)" }}>
            {Array.from(byMonth.entries()).map(([month, dates]) => (
              <div key={month}>
                <Eyebrow>{month}</Eyebrow>
                <div style={{ marginTop: "var(--space-4)", display: "grid", gap: "1px", background: "var(--border-hairline)" }}>
                  {dates.map((d) => {
                    const { weekday, day } = dayLabel(d.date);
                    return (
                      <Card key={d.date} variant="flat" padding="var(--space-4) var(--space-5)" style={{ background: "var(--surface-card)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "var(--space-5)", alignItems: "center" }}>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-1)", color: "var(--gi-gold-deep)" }}>{day}</div>
                          <div>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".03em" }}>{weekday}</div>
                            {d.label && <p style={{ margin: "4px 0 0", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>{d.label}</p>}
                          </div>
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
