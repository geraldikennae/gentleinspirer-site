import { NextResponse } from "next/server";
import { CAL_SLUGS, calConfigured, getAvailableSlots, type CalSessionType } from "@/lib/cal";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type: CalSessionType = searchParams.get("type") === "paid" ? "paid" : "intro";

  if (!calConfigured()) {
    return NextResponse.json({ configured: false, slots: {} });
  }

  try {
    const slots = await getAvailableSlots(CAL_SLUGS[type]);
    return NextResponse.json({ configured: true, slots });
  } catch (err) {
    console.error("Cal.com slots fetch failed:", err);
    return NextResponse.json({ configured: true, slots: {}, error: "We couldn't load live times just now." }, { status: 502 });
  }
}
