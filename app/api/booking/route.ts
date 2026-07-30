import { NextResponse } from "next/server";

/**
 * Stub booking endpoint. Real deployment needs:
 *   - persistence (a `bookings` table — Postgres/Supabase/etc.)
 *   - a calendar/availability source of truth (so DAYS/TIMES in the UI aren't hardcoded)
 *   - an email confirmation (the UI already promises one from info@gentleinspire.com)
 * For now this validates the shape and echoes back a fake confirmation id.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  return NextResponse.json({
    status: "held",
    id: `stub_${Date.now()}`,
    message: "Booking accepted by a stub endpoint — no calendar hold or email was actually sent. Wire up real persistence + email before going live.",
  });
}
