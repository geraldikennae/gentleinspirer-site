# gentleinspirer.com

Next.js (App Router, TypeScript) implementation of the gentleinspirer design
system's website UI kit (`../project/ui_kits/website/`). Real routes, real
component code (no CDN/Babel-in-browser prototyping), self-hosted fonts,
bundled icons.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, community strip, Growth System Model, five pillars, teachings, quote, about, letter sign-up |
| `/sessions` | Clarity Session detail, three-tier pricing, tabs |
| `/products` | Digital products catalogue (placeholder), currency switcher |
| `/book` | Four-step booking flow (session type → time → details → held) |
| `/letters` | Letters archive, filterable by type |

## What's real vs. stubbed

Everything **visual and interactive** is real: every page is a real URL,
every component is real React/TypeScript (ported from `../project/components/`),
fonts are self-hosted via `next/font`, icons are bundled npm packages
(`lucide-react`, `react-icons/fa`) instead of runtime CDN fetches.

Three integration points are **stubbed** pending real accounts/credentials —
see `.env.example`:

1. **Booking** (`app/api/booking/route.ts`) — validates and returns a fake
   confirmation. No calendar hold, no email is actually sent. Needs a
   database and a real availability source (the UI's day/time picker is
   still hardcoded, same as the original design).
2. **Checkout** (`app/api/checkout/route.ts`) — reports which provider
   (Stripe for USD/GBP, Paystack for NGN) isn't configured. Needs
   `STRIPE_SECRET_KEY` / `PAYSTACK_SECRET_KEY` and the actual
   checkout-session/transaction-init calls implemented.
3. **Letter sign-up** (`app/api/letters/subscribe/route.ts`) — validates the
   email and reports success without storing it. Needs an email provider
   (Resend, Buttondown, etc.).

Also still placeholder, inherited from the source design (see
`../project/readme.md` "Caveats"): session/product pricing, product
names/covers, and the Letters archive content.

## Development

```bash
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```
