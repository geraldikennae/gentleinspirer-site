import Stripe from "stripe";

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY as string);
}

export interface CreateCheckoutArgs {
  amount: number; // major currency unit, e.g. 150.00
  currency: "usd" | "gbp";
  productName: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail: string;
  metadata: Record<string, string>;
}

export async function createCheckoutSession(args: CreateCheckoutArgs) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: args.currency,
          product_data: { name: args.productName },
          unit_amount: Math.round(args.amount * 100),
        },
        quantity: 1,
      },
    ],
    customer_email: args.customerEmail,
    success_url: args.successUrl,
    cancel_url: args.cancelUrl,
    metadata: args.metadata,
  });
}
