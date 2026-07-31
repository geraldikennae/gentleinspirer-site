import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayloadClient } from "@/lib/payload";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";

export const dynamic = "force-dynamic";

function dateLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default async function LetterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "letters",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const letter = docs[0];
  if (!letter) notFound();

  return (
    <Section tone="page" py="var(--space-9)">
      <div style={{ maxWidth: "var(--measure-prose)", margin: "0 auto" }}>
        <Button variant="ghost" href="/letters" style={{ marginBottom: "var(--space-6)" }}>
          ← All letters
        </Button>
        <Eyebrow>{letter.kind}</Eyebrow>
        <h1 style={{ fontSize: "var(--size-display-3)", margin: "var(--space-3) 0 var(--space-4)" }}>{letter.title}</h1>
        <Rule length={64} />
        <div style={{ marginTop: "var(--space-4)", fontSize: "var(--size-caption)", color: "var(--text-muted)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase" }}>{dateLabel(letter.publishedAt)}</div>
        <div className="rg-letter-detail" style={{ marginTop: "var(--space-7)", fontSize: "var(--size-body)", color: "var(--text-body)", lineHeight: "var(--leading-body)" }}>
          <RichText data={letter.body} />
        </div>
      </div>
    </Section>
  );
}
