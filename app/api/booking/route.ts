import { NextResponse } from "next/server";
import { completeBooking } from "@/lib/booking";

interface BookingBody {
  type: "intro" | "paid";
  start: string; // ISO datetime of the selected slot
  name: string;
  email: string;
  minutes: number;
}

/**
 * Real booking creation for the free intro flow — paid bookings go through
 * /api/checkout (Stripe) first and only get created at /book/confirmed,
 * after payment succeeds, so this route only ever handles `type: "intro"`.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as BookingBody | null;
  if (!body || typeof body.email !== "string" || !body.email.includes("@") || !body.name?.trim() || !body.start) {
    return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
  }

  const result = await completeBooking({
    type: body.type === "paid" ? "paid" : "intro",
    start: body.start,
    name: body.name,
    email: body.email,
    minutes: body.minutes,
    sessionLabel: body.type === "paid" ? "Clarity Session" : "First conversation",
  });

  return NextResponse.json({ status: "held", ...result });
}
