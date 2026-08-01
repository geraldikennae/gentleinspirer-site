import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";

export interface TitleDescription {
  title: string;
  description: string;
}

// Payload only applies a field's `defaultValue` when a document is first
// created -- home-content already existed before this field was added, so
// existing (and already-deployed) rows come back with an empty array here
// until someone fills it in via /admin. Falls back to this instead of a
// blank section in the meantime.
const FALLBACK_TEACHINGS = [
  { title: "Growth is designed, not desired", videoId: "" },
  { title: "Clarity precedes movement", videoId: "" },
  { title: "Consistency over intensity", videoId: "" },
];

// Admin can paste a bare video ID or any common YouTube URL shape
// (youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID, /shorts/ID) --
// this pulls out just the 11-character ID either way.
function extractYoutubeId(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    const vParam = url.searchParams.get("v");
    if (vParam) return vParam;
    const match = url.pathname.match(/\/(?:embed|shorts)\/([\w-]{11})/);
    if (match) return match[1];
  } catch {
    // not a URL -- fall through and return the raw input below
  }
  return trimmed;
}

export interface HomeContentData {
  heroQuotes: { line1: string; line2: string }[];
  heroSubhead: string;
  model: { heading: string; intro: string; stages: TitleDescription[] };
  pillars: { heading: string; items: TitleDescription[] };
  testimonial: { quote: string; attribution: string };
  about: { paragraph1: string; paragraph2: string; photos: string[] };
  teachings: { title: string; videoId: string }[];
  community: { heading: string; text: string };
  letter: { heading: string; text: string };
}

// The root layout fetches this for the footer's rotating quote on every
// page, and the homepage fetches it again for the hero -- cache() dedupes
// the two calls to a single DB round trip per request.
export const getHomeContent = cache(async function getHomeContent(): Promise<HomeContentData> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "home-content", depth: 1 });
  return {
    heroQuotes: (c.heroQuotes ?? []).map((q) => ({ line1: q.line1, line2: q.line2 })),
    heroSubhead: c.heroSubhead ?? "",
    model: {
      heading: c.model?.heading ?? "Five stages, in order",
      intro: c.model?.intro ?? "",
      stages: (c.model?.stages ?? []).map((s) => ({ title: s.title, description: s.description })),
    },
    pillars: {
      heading: c.pillars?.heading ?? "Five pillars",
      items: (c.pillars?.items ?? []).map((p) => ({ title: p.title, description: p.description })),
    },
    testimonial: { quote: c.testimonial?.quote ?? "", attribution: c.testimonial?.attribution ?? "" },
    about: {
      paragraph1: c.about?.paragraph1 ?? "",
      paragraph2: c.about?.paragraph2 ?? "",
      photos: (c.about?.photos ?? []).map((p) => (typeof p.photo === "object" ? p.photo?.url : null)).filter((url): url is string => Boolean(url)),
    },
    teachings: c.teachings?.videos?.length ? c.teachings.videos.map((v) => ({ title: v.title, videoId: extractYoutubeId(v.videoId ?? "") })) : FALLBACK_TEACHINGS,
    community: { heading: c.community?.heading ?? "", text: c.community?.text ?? "" },
    letter: { heading: c.letter?.heading ?? "", text: c.letter?.text ?? "" },
  };
});

// Same backfill gap as FALLBACK_TEACHINGS above -- these three tier cards'
// bullet arrays were added to the already-existing sessions-content global.
const FALLBACK_COMMUNITY_BULLETS = ["Live on YouTube or Instagram", "Group clarity work, open Q&A", "No booking, just show up"];
const FALLBACK_INTRO_BULLETS = ["Define whether stage one fits", "No preparation needed"];
const FALLBACK_PAID_BULLETS = ["Written Clarity brief the same day", "Two-week review question"];

const FALLBACK_HOW_IT_WORKS_STEPS = [
  "Book your session using the calendar below.",
  "Arrive with the situation, not the solution. You don't need to have it figured out.",
  "Leave with a framework, a way of seeing your own situation that you carry forward, long after the session ends.",
];

export interface SessionsTierCard {
  eyebrow: string;
  title?: string;
  bullets: string[];
  ctaLabel: string;
  footnote?: string;
}

export interface WhySectionData {
  leadIn: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  whoItsForHeading: string;
  whoItsForText: string;
  howItWorksHeading: string;
  howItWorksSteps: string[];
  bookCtaLabel: string;
  bookCtaButtonLabel: string;
  communityCtaLabel: string;
  communityCtaButtonLabel: string;
}

export interface SessionsContentData {
  heroIntro: string;
  whySection: WhySectionData;
  extraSessionPoints: TitleDescription[];
  howItRuns: TitleDescription[];
  afterwards: TitleDescription[];
  testimonial: { quote: string; attribution: string };
  nextOpeningCtaLabel: string;
  tiers: { heading: string; community: SessionsTierCard; intro: SessionsTierCard; paid: SessionsTierCard };
  bottomCta: { heading: string; text: string; ctaLabel: string };
}

export async function getSessionsContent(): Promise<SessionsContentData> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "sessions-content" });
  return {
    heroIntro: c.heroIntro ?? "",
    whySection: {
      leadIn: c.whySection?.leadIn ?? "Clarity Sessions don't hand you the way out. They hand you the framework to find it yourself.",
      paragraph1: c.whySection?.paragraph1 ?? "",
      paragraph2: c.whySection?.paragraph2 ?? "",
      paragraph3: c.whySection?.paragraph3 ?? "",
      whoItsForHeading: c.whySection?.whoItsForHeading ?? "Who It's For",
      whoItsForText: c.whySection?.whoItsForText ?? "",
      howItWorksHeading: c.whySection?.howItWorksHeading ?? "How It Works",
      howItWorksSteps: c.whySection?.howItWorksSteps?.length ? c.whySection.howItWorksSteps.map((s) => s.text) : FALLBACK_HOW_IT_WORKS_STEPS,
      bookCtaLabel: c.whySection?.bookCtaLabel ?? "Ready to go deeper?",
      bookCtaButtonLabel: c.whySection?.bookCtaButtonLabel ?? "Book a Clarity Session",
      communityCtaLabel: c.whySection?.communityCtaLabel ?? "Want to experience it first?",
      communityCtaButtonLabel: c.whySection?.communityCtaButtonLabel ?? "Join the Community for Free Sessions",
    },
    extraSessionPoints: (c.extraSessionPoints ?? []).map((p) => ({ title: p.title, description: p.description })),
    howItRuns: (c.howItRuns ?? []).map((p) => ({ title: p.title, description: p.description })),
    afterwards: (c.afterwards ?? []).map((p) => ({ title: p.title, description: p.description })),
    testimonial: { quote: c.testimonial?.quote ?? "", attribution: c.testimonial?.attribution ?? "" },
    nextOpeningCtaLabel: c.nextOpeningCtaLabel ?? "Take this time",
    tiers: {
      heading: c.tiers?.heading ?? "Start free, go deeper when it's useful",
      community: {
        eyebrow: c.tiers?.community?.eyebrow ?? "Community · Bi-weekly · Free",
        title: c.tiers?.community?.title ?? "Community session",
        bullets: c.tiers?.community?.bullets?.length ? c.tiers.community.bullets.map((b) => b.text) : FALLBACK_COMMUNITY_BULLETS,
        ctaLabel: c.tiers?.community?.ctaLabel ?? "Get the reminder",
      },
      intro: {
        eyebrow: c.tiers?.intro?.eyebrow ?? "1:1 · Introductory · Free",
        title: c.tiers?.intro?.title ?? "First conversation",
        bullets: c.tiers?.intro?.bullets?.length ? c.tiers.intro.bullets.map((b) => b.text) : FALLBACK_INTRO_BULLETS,
        ctaLabel: c.tiers?.intro?.ctaLabel ?? "Request a slot",
      },
      paid: {
        eyebrow: c.tiers?.paid?.eyebrow ?? "1:1 · Paid",
        bullets: c.tiers?.paid?.bullets?.length ? c.tiers.paid.bullets.map((b) => b.text) : FALLBACK_PAID_BULLETS,
        ctaLabel: c.tiers?.paid?.ctaLabel ?? "Book a session",
        footnote: c.tiers?.paid?.footnote ?? "Checkout runs on Stripe.",
      },
    },
    bottomCta: {
      heading: c.bottomCta?.heading ?? "Not ready to book?",
      text: c.bottomCta?.text ?? "Read a framework breakdown first. Same structure, same voice as the session.",
      ctaLabel: c.bottomCta?.ctaLabel ?? "Read the letters",
    },
  };
}

export interface LettersContentData {
  heading: string;
  subhead: string;
  loadMoreLabel: string;
  emptyStateText: string;
}

export async function getLettersContent(): Promise<LettersContentData> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "letters-content" });
  return {
    heading: c.heading ?? "Structured breakdowns, three times a week",
    subhead: c.subhead ?? "Insights, frameworks, stories and the occasional contrarian read. Newest first.",
    loadMoreLabel: c.loadMoreLabel ?? "Earlier letters",
    emptyStateText: c.emptyStateText ?? "No letters in this category yet.",
  };
}

export interface ProductsContentData {
  heading: string;
  subhead: string;
  ctaLabel: string;
  ctaCaption: string;
}

export async function getProductsContent(): Promise<ProductsContentData> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "products-content" });
  return {
    heading: c.heading ?? "Tools that hold structure when I'm not in the room",
    subhead: c.subhead ?? "Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds; checkout runs on Stripe.",
    ctaLabel: c.ctaLabel ?? "Free teachings first",
    ctaCaption: c.ctaCaption ?? "Everything paid has a free counterpart on YouTube.",
  };
}

export interface BookingContentData {
  heading: string;
  communityTeaser: { text: string; ctaLabel: string };
  held: { heading: string; againLabel: string };
}

export async function getBookingContent(): Promise<BookingContentData> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "booking-content" });
  return {
    heading: c.heading ?? "Book stage one",
    communityTeaser: {
      text: c.communityTeaser?.text ?? "Or join the free bi-weekly community session, no booking at all.",
      ctaLabel: c.communityTeaser?.ctaLabel ?? "Get the schedule",
    },
    held: {
      heading: c.held?.heading ?? "Held for you",
      againLabel: c.held?.againLabel ?? "Book another",
    },
  };
}
