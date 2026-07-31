import { NextResponse } from "next/server";
import { subscribe } from "@/lib/subscribers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ error: "That address doesn't look complete." }, { status: 400 });
  }

  try {
    await subscribe(body.email.trim().toLowerCase());
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Letter subscribe failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
}
