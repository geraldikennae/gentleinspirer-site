import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { createCheckoutSession, stripeConfigured } from "@/lib/stripe";

interface CheckoutBody {
  productId: string;
  currency: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CheckoutBody | null;
  if (!body?.productId) {
    return NextResponse.json({ error: "Missing product." }, { status: 400 });
  }
  if (body.currency !== "USD" && body.currency !== "GBP") {
    return NextResponse.json({ error: "Checkout only supports USD or GBP." }, { status: 400 });
  }

  if (!stripeConfigured()) {
    return NextResponse.json({
      status: "stub",
      checkoutUrl: null,
      message: "Stripe isn't configured yet. Set STRIPE_SECRET_KEY to enable real checkout.",
    });
  }

  const payload = await getPayloadClient();
  const product = await payload.findByID({ collection: "products", id: body.productId }).catch(() => null);
  if (!product) {
    return NextResponse.json({ error: "That product couldn't be found." }, { status: 404 });
  }

  const amount = body.currency === "GBP" ? product.priceGBP : product.priceUSD;
  if (amount == null) {
    return NextResponse.json({ error: "This product's price hasn't been set yet. Add it in /admin." }, { status: 400 });
  }

  const origin = new URL(request.url).origin;

  try {
    const session = await createCheckoutSession({
      amount,
      currency: body.currency.toLowerCase() as "usd" | "gbp",
      productName: product.title,
      successUrl: `${origin}/products/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/products?cancelled=1`,
      metadata: { productId: String(product.id) },
    });
    return NextResponse.json({ status: "ok", checkoutUrl: session.url });
  } catch (err) {
    console.error("Stripe product checkout session creation failed:", err);
    return NextResponse.json({ error: "We couldn't start checkout just now. Please try again." }, { status: 502 });
  }
}
