import { getSiteSettings } from "@/lib/settings";
import { getSessionsContent } from "@/lib/content";
import { CAL_SLUGS, calConfigured, getAvailableSlots } from "@/lib/cal";
import { SessionsPageBody } from "@/components/site/SessionsPageBody";

export const dynamic = "force-dynamic";

async function getNextOpening(): Promise<string | null> {
  if (!calConfigured()) return null;
  try {
    const slotsByDate = await getAvailableSlots(CAL_SLUGS.paid);
    const firstDate = Object.keys(slotsByDate).sort()[0];
    const firstSlot = firstDate ? slotsByDate[firstDate][0] : undefined;
    if (!firstSlot) return null;
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
      timeZoneName: "short",
    }).format(new Date(firstSlot));
  } catch {
    return null;
  }
}

export default async function SessionPage() {
  const [settings, content, nextOpening] = await Promise.all([getSiteSettings(), getSessionsContent(), getNextOpening()]);
  return <SessionsPageBody settings={settings} content={content} nextOpening={nextOpening} />;
}
