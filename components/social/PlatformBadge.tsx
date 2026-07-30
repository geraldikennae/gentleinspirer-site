import type { CSSProperties, ReactNode } from "react";
import { BrandGlyph } from "./BrandGlyph";
import { SOCIALS, type PlatformKey } from "./socials";

export interface PlatformBadgeProps {
  platform?: PlatformKey;
  live?: boolean;
  children?: ReactNode;
  href?: string;
  style?: CSSProperties;
}

export function PlatformBadge({ platform = "youtube", live = false, children, href, style }: PlatformBadgeProps) {
  const s = SOCIALS[platform];
  const inner = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--size-eyebrow)",
        fontWeight: "var(--weight-body-medium)",
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        lineHeight: 1,
        padding: "7px 12px",
        borderRadius: "var(--radius-sm)",
        background: live ? "var(--gi-gold)" : "var(--gi-neutral-100)",
        color: live ? "var(--text-on-gold)" : "var(--text-body)",
        ...style,
      }}
    >
      <BrandGlyph slug={s.icon} size={12} />
      {children || (live ? "Live on " + s.label : s.label)}
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener" style={{ border: "none" }}>
      {inner}
    </a>
  ) : (
    inner
  );
}
