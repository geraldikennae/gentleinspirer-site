import { getPayloadClient } from "@/lib/payload";

export interface TitleDescription {
  title: string;
  description: string;
}

export interface HomeContentData {
  heroQuotes: { line1: string; line2: string }[];
  heroSubhead: string;
  model: { heading: string; intro: string; stages: TitleDescription[] };
  pillars: { heading: string; items: TitleDescription[] };
  testimonial: { quote: string; attribution: string };
  about: { paragraph1: string; paragraph2: string };
  community: { heading: string; text: string };
  letter: { heading: string; text: string };
}

export async function getHomeContent(): Promise<HomeContentData> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "home-content" });
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
    about: { paragraph1: c.about?.paragraph1 ?? "", paragraph2: c.about?.paragraph2 ?? "" },
    community: { heading: c.community?.heading ?? "", text: c.community?.text ?? "" },
    letter: { heading: c.letter?.heading ?? "", text: c.letter?.text ?? "" },
  };
}

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
