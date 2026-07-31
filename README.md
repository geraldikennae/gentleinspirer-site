# gentleinspirer.com

Next.js (App Router, TypeScript) implementation of the gentleinspirer design
system's website UI kit (`../project/ui_kits/website/`), with an embedded
Payload CMS admin backend for managing content and pricing.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, community strip, Growth System Model, five pillars, teachings, quote, about, letter sign-up |
| `/sessions` | Clarity Session detail, three-tier pricing (from CMS), tabs |
| `/products` | Digital products catalogue (from CMS), currency switcher |
| `/book` | Four-step booking flow (session type → time → details → held) |
| `/letters` | Letters archive, filterable by type (from CMS) |
| `/letters/[slug]` | A single letter/blog post |
| `/admin` | Payload admin — manage letters, products and pricing |

## Admin backend (Payload CMS)

Runs embedded in this same app at `/admin`, backed by Postgres. First visit
to `/admin` prompts you to create the first admin user (email + password).

**Collections & globals**, defined in `collections/` and `globals/`:

- **Letters** (`collections/Letters.ts`) — blog posts. Title, slug, kind
  (Insight/Framework/Story + lesson/Contrarian), deck, rich-text body,
  publish date. Draft/publish workflow built in (Save Draft vs. Publish
  changes).
- **Products** (`collections/Products.ts`) — the digital products catalogue.
  Title, format, blurb, cover image, USD/GBP price.
- **Site Settings** (`globals/SiteSettings.ts`) — a single global for
  session pricing: the free intro session's length/description, and an
  array of paid Clarity Session duration/price tiers (add a row per
  bookable length). This is what drives the "fix prices" ask — change it
  here and `/sessions` and `/book` update immediately, no code changes.
- **Users** / **Media** — auth and file uploads (from the Payload default
  template).

Frontend pages that read from the CMS are dynamic (`export const dynamic =
"force-dynamic"`) so content changes show up without a redeploy.

### Local development database

Payload needs Postgres to run at all, even the admin panel. Point
`DATABASE_URL` in `.env.local` at any Postgres instance (local, Docker, or a
free-tier hosted one like Neon/Supabase). Schema is pushed automatically in
dev (`next dev`); run `npx payload generate:types` after changing a
collection/global to refresh `payload-types.ts`.

## What's real vs. stubbed

Everything **visual and interactive** is real, and blog posts / products /
pricing are now genuinely CMS-driven (not hardcoded). Fonts are self-hosted
via `next/font`, icons are bundled npm packages (`lucide-react`,
`react-icons/fa`) instead of runtime CDN fetches.

Three integration points are still **stubbed** pending real credentials —
see `.env.example`:

1. **Booking** (`app/api/booking/route.ts`) — validates and returns a fake
   confirmation. No email is actually sent. The day/time picker on `/book`
   is still hardcoded sample data — wiring this to Cal.com (`CAL_API_KEY`,
   `CAL_EVENT_TYPE_INTRO`, `CAL_EVENT_TYPE_PAID`) is the next step for real
   availability.
2. **Checkout** (`app/api/checkout/route.ts`) — reports that Stripe isn't
   configured. Needs `STRIPE_SECRET_KEY` and the actual Checkout Session
   creation implemented. Paystack (NGN) isn't wired up at all — Stripe-only
   for now, per a deliberate choice.
3. **Letter sign-up** (`app/api/letters/subscribe/route.ts`) — validates the
   email and reports success without storing it or sending anything. Needs
   `RESEND_API_KEY` and the actual `emails.send` call.

## Development

```bash
npm run dev     # http://localhost:3000 — also serves /admin
npm run build
npm run start
npm run lint
npx payload generate:types    # after changing a collection/global
```
