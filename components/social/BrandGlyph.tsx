import type { CSSProperties } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import type { PlatformKey } from "./socials";

/* Brand glyphs, bundled at build time (no runtime CDN request). Icons render
   in currentColor so they follow the brand palette, never platform colours. */
const ICONS: Record<PlatformKey, typeof FaYoutube> = {
  youtube: FaYoutube,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
};

export interface BrandGlyphProps {
  slug: PlatformKey;
  size?: number;
  style?: CSSProperties;
}

export function BrandGlyph({ slug, size = 16, style }: BrandGlyphProps) {
  const Cmp = ICONS[slug];
  return <Cmp size={size} style={{ display: "inline-block", flex: "0 0 auto", ...style }} />;
}
