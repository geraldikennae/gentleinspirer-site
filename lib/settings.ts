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
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
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
  };
}
