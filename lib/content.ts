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
    teachings: c.teachings?.videos?.length ? c.teachings.videos.map((v) => ({ title: v.title, videoId: v.videoId ?? "" })) : FALLBACK_TEACHINGS,
    community: { heading: c.community?.heading ?? "", text: c.community?.text ?? "" },
    letter: { heading: c.letter?.heading ?? "", text: c.letter?.text ?? "" },
  };
});

export interface SessionsContentData {
  heroIntro: string;
  extraSessionPoints: TitleDescription[];
  howItRuns: TitleDescription[];
  afterwards: TitleDescription[];
  testimonial: { quote: string; attribution: string };
}

export async function getSessionsContent(): Promise<SessionsContentData> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "sessions-content" });
  return {
    heroIntro: c.heroIntro ?? "",
    extraSessionPoints: (c.extraSessionPoints ?? []).map((p) => ({ title: p.title, description: p.description })),
    howItRuns: (c.howItRuns ?? []).map((p) => ({ title: p.title, description: p.description })),
    afterwards: (c.afterwards ?? []).map((p) => ({ title: p.title, description: p.description })),
    testimonial: { quote: c.testimonial?.quote ?? "", attribution: c.testimonial?.attribution ?? "" },
  };
}
