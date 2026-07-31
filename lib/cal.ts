/**
 * Cal.com v2 API client. Endpoint shapes verified against cal.com/docs (Nov 2026):
 *   - GET  /v2/event-types?username=...        cal-api-version: 2024-06-14
 *   - GET  /v2/slots?eventTypeSlug=...&username=...&start=...&end=...   cal-api-version: 2024-09-04
 *   - POST /v2/bookings  { eventTypeId, start, attendee: {name,email,timeZone} }   cal-api-version: 2024-08-13
 * Auth: `Authorization: Bearer <CAL_API_KEY>` on every call.
 */

const CAL_API_BASE = "https://api.cal.com/v2";
const CAL_USERNAME = process.env.CAL_USERNAME || "ikenna-egeonu-wd0rdx";

export const CAL_SLUGS = {
  intro: "first-conversation",
  paid: "clarity-session",
} as const;

export type CalSessionType = keyof typeof CAL_SLUGS;

export function calConfigured(): boolean {
  return Boolean(process.env.CAL_API_KEY);
}

async function calFetch(path: string, version: string, init?: RequestInit) {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) throw new Error("CAL_API_KEY is not set");

  const res = await fetch(`${CAL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": version,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Cal.com ${path} failed: ${res.status} ${body}`);
  }
  return res.json();
}

interface CalEventType {
  id: number;
  slug: string;
}

export async function getEventTypeId(slug: string): Promise<number | null> {
  const json = await calFetch(`/event-types?username=${encodeURIComponent(CAL_USERNAME)}`, "2024-06-14");
  const list: CalEventType[] = json?.data ?? [];
  return list.find((et) => et.slug === slug)?.id ?? null;
}

/** ISO date (YYYY-MM-DD) -> array of ISO start-time strings, for the next `days` days. */
export async function getAvailableSlots(slug: string, days = 14): Promise<Record<string, string[]>> {
  const start = new Date();
  const end = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    eventTypeSlug: slug,
    username: CAL_USERNAME,
    start: start.toISOString(),
    end: end.toISOString(),
    // The site's copy says "Times · WAT" — group/return slots in that zone
    // rather than UTC, so date buckets line up with what's displayed.
    timeZone: "Africa/Lagos",
  });
  const json = await calFetch(`/slots?${params.toString()}`, "2024-09-04");
  const raw: Record<string, { start: string }[]> = json?.data ?? {};
  const result: Record<string, string[]> = {};
  for (const [date, slots] of Object.entries(raw)) {
    result[date] = slots.map((s) => s.start);
  }
  return result;
}

export async function createCalBooking(args: { eventTypeId: number; start: string; name: string; email: string; timeZone?: string }) {
  return calFetch("/bookings", "2024-08-13", {
    method: "POST",
    body: JSON.stringify({
      eventTypeId: args.eventTypeId,
      start: args.start,
      attendee: {
        name: args.name,
        email: args.email,
        timeZone: args.timeZone || "Africa/Lagos",
      },
    }),
  });
}
