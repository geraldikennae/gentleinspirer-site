import { NextResponse } from "next/server";

/**
 * Stub checkout endpoint. Real deployment needs:
 *   - PAYSTACK_SECRET_KEY (for NGN) and STRIPE_SECRET_KEY (for USD/GBP) in the environment
 *   - a call to the relevant provider's session/transaction-init API here, returning a redirect URL
 *   - a webhook route to confirm payment and mark the booking/order paid
 * For now this just reports that no provider is configured.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const provider = body?.provider === "paystack" ? "paystack" : "stripe";

  const configured = provider === "paystack" ? Boolean(process.env.PAYSTACK_SECRET_KEY) : Boolean(process.env.STRIPE_SECRET_KEY);

  if (!configured) {
    return NextResponse.json({
      status: "stub",
      provider,
      checkoutUrl: null,
      message: `${provider === "paystack" ? "Paystack" : "Stripe"} isn't configured yet — set ${provider === "paystack" ? "PAYSTACK_SECRET_KEY" : "STRIPE_SECRET_KEY"} to enable real checkout.`,
    });
  }

  // Real integration point: create a Checkout Session (Stripe) or initialize a
  // transaction (Paystack) here and return its redirect URL.
  return NextResponse.json({ status: "stub", provider, checkoutUrl: null, message: "Provider key found, but checkout creation is not implemented yet." });
}
