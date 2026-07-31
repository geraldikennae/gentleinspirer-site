import { getSiteSettings } from "@/lib/settings";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";

export const dynamic = "force-dynamic";

export default async function Unsubscribed({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const [{ ok }, settings] = await Promise.all([searchParams, getSiteSettings()]);
  const succeeded = ok === "1";

  return (
    <Section tone="page" py="var(--space-9)">
      <Eyebrow>Letters</Eyebrow>
      <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>{succeeded ? "Unsubscribed" : "That link didn't work"}</h1>
      <Rule length={64} />
      <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>
        {succeeded ? "You won't get any more letters or notifications from gentleinspirer." : `That unsubscribe link looks expired or invalid. Email ${settings.contactEmail} and we'll take care of it.`}
      </p>
      <div style={{ marginTop: "var(--space-6)" }}>
        <Button variant="secondary" href="/">
          Back home
        </Button>
      </div>
    </Section>
  );
}
