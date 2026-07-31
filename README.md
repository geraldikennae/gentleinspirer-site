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
| `/book/confirmed` | Post-payment landing page for the paid booking flow |
| `/admin` | Payload admin — manage letters, products, pricing and page copy |

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
- **Home Page** (`globals/HomeContent.ts`) — hero quote slider text, hero
  subhead, the Growth System Model (heading/intro/five stages), the five
  pillars, the testimonial quote, the About bio (two paragraphs), and the
  community/letter-signup section copy.
- **Sessions Page** (`globals/SessionsContent.ts`) — the hero intro
  paragraph, all three tabs' content ("The session" / "How it runs" /
  "Afterwards"), and the testimonial quote.
- **Users** / **Media** — auth and file uploads. Uploads go to Vercel Blob
  in production (see "Media uploads" below) and local disk in dev.

Nav labels, footer copy and social links aren't in the CMS — they change
rarely enough that hardcoding them (in `components/site/links.ts` and
`components/social/socials.ts`) seemed like the right tradeoff over adding
more admin surface area. Say the word if you'd rather those were editable
too.

Frontend pages that read from the CMS are dynamic (`export const dynamic =
"force-dynamic"`) so content changes show up without a redeploy.

### Local development database

Payload needs Postgres to run at all, even the admin panel. Point
`DATABASE_URL` in `.env.local` at any Postgres instance (local, Docker, or a
free-tier hosted one like Neon/Supabase). Schema is pushed automatically in
dev (`next dev`); run `npx payload generate:types` after changing a
collection/global to refresh `payload-types.ts`.

### Schema migrations (required for every deploy)

Payload only auto-syncs the schema when `NODE_ENV !== 'production'`. On
Vercel that's never true, so **without a migration, the tables never get
created and every page 500s** — this bit us on the first deploy. The fix:
`payload.config.ts` passes `prodMigrations` (from `migrations/index.ts`) to
the Postgres adapter, which runs any pending migration automatically the
first time the app connects in production. No separate deploy step needed.

**Whenever you add or change a collection/global field**, generate a new
migration and commit it:

```bash
npx payload migrate:create <short-description>
```

This writes a new file under `migrations/` and updates `migrations/index.ts`.
Commit both — the next deploy applies it automatically on first request.

### Media uploads

Vercel's filesystem is read-only/ephemeral, so Payload's default local-disk
upload storage doesn't work in production — files would appear to upload
successfully and then vanish. `payload.config.ts` routes uploads to
**Vercel Blob** instead whenever `BLOB_READ_WRITE_TOKEN` is set. To enable
it: Vercel dashboard → Storage tab → Create Database → Blob → connect it to
this project. That sets the token automatically; nothing to paste into env
vars by hand. Local dev doesn't need this — it just writes to `./media`.

## What's real vs. stubbed

Everything **visual and interactive** is real. Blog posts, products,
pricing, and now the homepage/sessions page copy are all genuinely
CMS-driven (not hardcoded) — see the admin backend section above. Fonts are
self-hosted via `next/font`, icons are bundled npm packages (`lucide-react`,
`react-icons/fa`) instead of runtime CDN fetches.

**Booking is fully wired to live services**, degrading gracefully when a
given integration isn't configured (see `.env.example` for the keys):

- **Cal.com** (`lib/cal.ts`) — `/book` fetches real availability and
  creates a real booking. Falls back to a "not connected yet" message with
  the Continue button disabled if `CAL_API_KEY` isn't set, or on API error.
- **Stripe** (`lib/stripe.ts`) — the paid Clarity Session flow creates a
  real Checkout Session and redirects there; the Cal.com booking + email
  only happen after payment succeeds, on `/book/confirmed`. Falls back to
  a stub response if `STRIPE_SECRET_KEY` isn't set. Paystack (NGN) isn't
  wired up — Stripe-only, per a deliberate choice.
- **Resend** (`lib/email.ts`) — sends the booking confirmation email on
  both the free and paid flows. No-ops if `RESEND_API_KEY` isn't set.
- The sessions page's "Next opening" card shows the real next available
  Cal.com slot, or a generic fallback if Cal.com isn't configured.

**Still stubbed:**

- **Letter sign-up** (`app/api/letters/subscribe/route.ts`) — validates the
  email and reports success without storing it or sending anything. Wiring
  this up needs a decision on where addresses live (a Resend Audience, a
  new Payload collection, or a third-party newsletter tool) — ask if you
  want this built out.

## Development

```bash
npm run dev     # http://localhost:3000 — also serves /admin
npm run build
npm run start
npm run lint
npx payload generate:types    # after changing a collection/global
```
