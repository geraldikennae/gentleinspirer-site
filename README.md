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
| `/letters/unsubscribed` | Confirmation page after clicking an unsubscribe link |
| `/calendar` | Upcoming Clarity Session dates (admin-curated) + a "suggest a topic" form |
| `/book/confirmed` | Post-payment landing page for the paid booking flow |
| `/products/confirmed` | Post-payment landing page for a product purchase |
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
- **Site Settings** (`globals/SiteSettings.ts`) — session pricing (free
  intro length/description, an array of paid Clarity Session
  duration/price tiers), the site's contact email (single source of truth —
  used in the footer and every booking/order confirmation page), and the
  browser tab title / search-preview description.
- **Home Page** (`globals/HomeContent.ts`) — hero quote slider text, hero
  subhead, the Growth System Model (heading/intro/five stages), the five
  pillars, the testimonial quote, the About bio + photo slideshow (upload
  as many photos as you want, they cross-fade automatically), the free
  teachings video cards (title + YouTube link/ID each), and the
  community/letter-signup section copy.
- **Sessions Page** (`globals/SessionsContent.ts`) — the hero intro
  paragraph, the "Three ways in" pricing section (heading + all three tier
  cards' eyebrow/title/bullets/button text), the "Next opening" button
  label, all three tabs' content, the testimonial quote, and the bottom CTA.
- **Products Page** (`globals/ProductsContent.ts`) and **Letters Page**
  (`globals/LettersContent.ts`) — each page's heading, subhead, and CTA/
  empty-state copy.
- **Booking Page** (`globals/BookingContent.ts`) — the heading, the
  community-session teaser, and the "held" confirmation copy.
- **Email Templates** (`globals/EmailTemplates.ts`) — the welcome email
  (on sign-up) and the new-letter/new-product notification emails, with
  `{{placeholders}}` for the dynamic bits (title, url, unsubscribe link,
  etc — each field lists which ones it supports).
- **Subscribers** (`collections/Subscribers.ts`) — everyone who signed up
  for the letters. Not meant to be added to by hand; managed entirely by the
  subscribe/unsubscribe flow. Read access is admin-only (holds emails).
- **Upcoming Session Dates** (`collections/UpcomingSessions.ts`) — dates
  you publish on `/calendar`, independent of live Cal.com availability.
  Add as many as you want, for the quarter or the whole year; past dates
  stop showing automatically.
- **Topic Suggestions** (`collections/TopicSuggestions.ts`) — read-only
  inbox of what people submit via the "suggest a topic" form on `/calendar`.
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

**Letter sign-up and subscriber notifications** are also fully wired:

- Subscribing (`app/api/letters/subscribe/route.ts`) stores the address in
  the **Subscribers** collection and sends a welcome email via Resend.
  Re-subscribing an already-subscribed (or previously unsubscribed) address
  is safe — no duplicates, just reactivates it.
- Every subscriber email includes an unsubscribe link
  (`/api/letters/unsubscribe?token=...`) that flips their status without
  deleting the record, landing on `/letters/unsubscribed`.
- Publishing a **Letter** (draft → published, not on later edits) or
  creating a new **Product** automatically emails every active subscriber —
  see the `hooks.afterChange` in `collections/Letters.ts` and
  `collections/Products.ts`, and `lib/subscriberNotifications.ts`. Sends run
  in a loop from within the save request, which is fine at the scale of a
  personal newsletter but would need a queue for a large list.
- All three of these emails' subject/body come from the **Email Templates**
  global (`lib/templates.ts` does the `{{placeholder}}` substitution) —
  editable from `/admin` without a code change.
- If `RESEND_AUDIENCE_ID` is set, every subscribe/unsubscribe also syncs
  the contact to that Resend Audience (`lib/email.ts`:
  `addResendContact`/`setResendContactUnsubscribed`), so subscribers show
  up in Resend itself and can be targeted by a Broadcast sent from Resend's
  own dashboard, not just the automated emails this site sends. Create the
  Audience in Resend (Audiences → Create Audience) and paste its ID in;
  leave blank to skip this (subscribers still work either way, they just
  won't appear in Resend).
- `SITE_URL` (`.env.example`) controls the links built into these emails —
  defaults to the production domain already.

**`/calendar`** publishes a schedule of upcoming Clarity Sessions (from the
**Upcoming Session Dates** collection — independent of live Cal.com
availability, so it works even for dates further out than Cal.com exposes)
and a "suggest a topic" form that writes to **Topic Suggestions**, visible
in `/admin`. Neither of these sends notifications automatically; they're
there for you to check and act on.

## Development

```bash
npm run dev     # http://localhost:3000 — also serves /admin
npm run build
npm run start
npm run lint
npx payload generate:types    # after changing a collection/global
```
