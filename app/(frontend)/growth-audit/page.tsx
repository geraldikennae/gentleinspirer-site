import { getPayloadClient } from "@/lib/payload";
import { GrowthAuditPageBody } from "@/components/site/GrowthAuditPageBody";

export const dynamic = "force-dynamic";

export default async function GrowthAuditPage() {
  const payload = await getPayloadClient();
  const content = await payload.findGlobal({ slug: "growth-audit-content" });
  return <GrowthAuditPageBody advice={content.advice} />;
}
