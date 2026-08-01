import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";

export interface PaidTier {
  minutes: number;
  priceUSD: number | null;
  priceGBP: number | null;
}

export interface SiteSettingsData {
  introMinutes: number;
  introDescription: string;
  paidTiers: PaidTier[];
  contactEmail: string;
  seo: { title: string; description: string };
}

// Fetched by the root layout (contact email + SEO metadata, on every page)
// and by individual pages (pricing) -- cache() dedupes to one DB round trip
// per request when both happen on the same page.
export const getSiteSettings = cache(async function getSiteSettings(): Promise<SiteSettingsData> {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: "site-settings" });
  return {
    introMinutes: settings.introSession?.minutes ?? 30,
    introDescription: settings.introSession?.description ?? "minutes to define whether stage one fits.",
    paidTiers: (settings.paidTiers ?? []).map((t) => ({
      minutes: t.minutes,
      priceUSD: t.priceUSD ?? null,
      priceGBP: t.priceGBP ?? null,
    })),
    contactEmail: settings.contactEmail ?? "info@gentleinspirer.com",
    seo: {
      title: settings.seo?.title ?? "gentleinspirer.com · Clarity precedes movement",
      description: settings.seo?.description ?? "Growth is designed, not desired. Structured growth systems, leadership development and disciplined execution with Gerald I. Egeonu, founder of The Growth Circle.",
    },
  };
});
