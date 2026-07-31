import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.suggestion !== "string" || !body.suggestion.trim()) {
    return NextResponse.json({ error: "Tell us what you'd like clarity on first." }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "topic-suggestions",
      data: {
        suggestion: body.suggestion.trim(),
        name: typeof body.name === "string" && body.name.trim() ? body.name.trim() : undefined,
        email: typeof body.email === "string" && body.email.includes("@") ? body.email.trim().toLowerCase() : undefined,
        status: "New",
      },
    });
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Topic suggestion submit failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
}
