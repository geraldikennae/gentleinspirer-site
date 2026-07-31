import { getPayloadClient } from "@/lib/payload";
import { LettersPageBody, type LetterSummary } from "@/components/site/LettersList";

export const dynamic = "force-dynamic";

function monthLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
}

export default async function Letters() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "letters",
    sort: "-publishedAt",
    limit: 100,
    depth: 0,
  });

  const posts: LetterSummary[] = docs.map((d) => ({
    slug: d.slug,
    kind: d.kind,
    title: d.title,
    dek: d.dek,
    month: monthLabel(d.publishedAt),
  }));

  return <LettersPageBody posts={posts} />;
}
