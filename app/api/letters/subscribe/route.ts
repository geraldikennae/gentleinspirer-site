import { NextResponse } from "next/server";

/**
 * Stub letter-signup endpoint. Real deployment needs an email/newsletter
 * provider (e.g. Resend, Buttondown, Mailchimp, ConvertKit) wired up here —
 * this just validates and reports success without storing the address.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ error: "That address doesn't look complete." }, { status: 400 });
  }
  return NextResponse.json({ status: "ok", message: "Accepted by a stub endpoint — no email provider is connected yet, so the address was not actually stored." });
}
