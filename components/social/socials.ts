/* Canonical outbound links — the single source of truth for Gerald's platforms. */
export type PlatformKey = "youtube" | "instagram" | "linkedin" | "facebook" | "tiktok" | "whatsapp";

export interface Platform {
  label: string;
  url: string;
  icon: PlatformKey;
}

export const SOCIALS: Record<PlatformKey, Platform> = {
  youtube: { label: "YouTube", url: "https://www.youtube.com/@gentleinspirer", icon: "youtube" },
  instagram: { label: "Instagram", url: "https://www.instagram.com/gentleinspirer", icon: "instagram" },
  linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/ikenna-g-egeonu/", icon: "linkedin" },
  facebook: { label: "Facebook", url: "https://www.facebook.com/thegentleinspirer", icon: "facebook" },
  tiktok: { label: "TikTok", url: "https://www.tiktok.com/@thegentleinspirer", icon: "tiktok" },
  whatsapp: { label: "WhatsApp community", url: "https://chat.whatsapp.com/I5F1ST2XtJe8DON7wlrcJd", icon: "whatsapp" },
};
