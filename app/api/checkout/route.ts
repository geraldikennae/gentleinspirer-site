import { NextResponse } from "next/server";
import { createCheckoutSession, stripeConfigured } from "@/lib/stripe";

interface CheckoutBody {
  name: string;
  email: string;
  start: string; // ISO datetime of the booked slot
  minutes: number;
  currency: "USD" | "GBP";
  amount: number | null;
}

/**
 * Creates a real Stripe Checkout Session for the paid Clarity Session and
 * returns its redirect URL. Paystack (NGN) isn't wired up — Stripe-only.
 * On success, Stripe redirects to /book/confirmed, which creates the actual
 * Cal.com booking + sends the confirmation email (see lib/booking.ts) —
 * nothing is booked until payment succeeds.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CheckoutBody | null;
  if (!body || !body.email?.includes("@") || !body.name?.trim() || !body.start) {
    return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
  }

  if (!stripeConfigured()) {
    return NextResponse.json({
      status: "stub",
      checkoutUrl: null,
      message: "Stripe isn't configured yet — set STRIPE_SECRET_KEY to enable real checkout.",
    });
  }

  if (body.amount == null) {
    return NextResponse.json({ error: "This session's price hasn't been set yet — add it in /admin under Site Settings." }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const params = new URLSearchParams({
    type: "paid",
    start: body.start,
    name: body.name,
    email: body.email,
    minutes: String(body.minutes),
  });

  try {
    const session = await createCheckoutSession({
      amount: body.amount,
      currency: body.currency.toLowerCase() as "usd" | "gbp",
      productName: `Clarity Session (${body.minutes} minutes)`,
      customerEmail: body.email,
      successUrl: `${origin}/book/confirmed?${params.toString()}`,
      cancelUrl: `${origin}/book?cancelled=1`,
      metadata: { type: "paid", start: body.start, name: body.name, email: body.email, minutes: String(body.minutes) },
    });
    return NextResponse.json({ status: "ok", checkoutUrl: session.url });
  } catch (err) {
    console.error("Stripe checkout session creation failed:", err);
    return NextResponse.json({ error: "We couldn't start checkout just now. Please try again." }, { status: 502 });
  }
}
