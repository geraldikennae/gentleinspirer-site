import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "gold" | "blue" | "outline" | "onBrand";

const TONES: Record<Tone, CSSProperties> = {
  neutral: { background: "var(--gi-neutral-100)", color: "var(--text-body)" },
  gold: { background: "var(--gi-gold)", color: "var(--text-on-gold)" },
  blue: { background: "var(--gi-blue)", color: "var(--gi-cream)" },
  outline: { background: "transparent", color: "var(--text-heading)", boxShadow: "inset 0 0 0 1px var(--border-strong)" },
  onBrand: { background: "rgba(255,248,240,.14)", color: "var(--gi-cream)" },
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: Tone;
  style?: CSSProperties;
}

export function Badge({ children, tone = "neutral", style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--size-eyebrow)",
        fontWeight: "var(--weight-body-medium)",
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        lineHeight: 1,
        padding: "6px 10px",
        borderRadius: "var(--radius-sm)",
        ...TONES[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
