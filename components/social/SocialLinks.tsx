"use client";

import type { CSSProperties } from "react";
import { BrandGlyph } from "./BrandGlyph";
import { SOCIALS, type PlatformKey } from "./socials";

type Tone = "ink" | "muted" | "cream" | "gold";

export interface SocialLinksProps {
  platforms?: PlatformKey[];
  tone?: Tone;
  size?: number;
  gap?: string;
  style?: CSSProperties;
}

export function SocialLinks({ platforms = ["youtube", "instagram", "linkedin", "facebook", "tiktok", "whatsapp"], tone = "ink", size = 18, gap = "var(--space-4)", style }: SocialLinksProps) {
  const colors: Record<Tone, string> = { ink: "var(--text-heading)", muted: "var(--text-muted)", cream: "var(--text-on-brand-muted)", gold: "var(--gi-gold)" };
  const hovers: Record<Tone, string> = { ink: "var(--gi-gold-deep)", muted: "var(--text-heading)", cream: "var(--gi-gold)", gold: "var(--gi-gold-pale)" };
  return (
    <nav aria-label="Social platforms" style={{ display: "flex", alignItems: "center", gap, ...style }}>
      {platforms.map((p) => {
        const s = SOCIALS[p];
        return (
          <a
            key={p}
            href={s.url}
            target="_blank"
            rel="noopener"
            aria-label={s.label}
            title={s.label}
            style={{ color: colors[tone], border: "none", padding: "4px", display: "inline-flex", transition: "var(--transition-control)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = hovers[tone])}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            <BrandGlyph slug={s.icon} size={size} />
          </a>
        );
      })}
    </nav>
  );
}
