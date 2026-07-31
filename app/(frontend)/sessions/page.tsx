import { getSiteSettings } from "@/lib/settings";
import { SessionsPageBody } from "@/components/site/SessionsPageBody";

export const dynamic = "force-dynamic";

export default async function SessionPage() {
  const settings = await getSiteSettings();
  return <SessionsPageBody settings={settings} />;
}
