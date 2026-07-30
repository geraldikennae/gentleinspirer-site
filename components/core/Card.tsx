"use client";

import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type Variant = "hairline" | "raised" | "flat";
type Tone = "paper" | "cream" | "brand" | "ink" | "gold";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  padding?: string;
  interactive?: boolean;
  style?: CSSProperties;
}

export function Card({ children, variant = "hairline", tone = "paper", padding = "var(--space-6)", interactive = false, style, ...rest }: CardProps) {
  const [hover, setHover] = useState(false);
  const grounds: Record<Tone, CSSProperties> = {
    paper: { background: "var(--surface-card)", color: "var(--text-body)" },
    cream: { background: "var(--surface-page)", color: "var(--text-body)" },
    brand: { background: "var(--surface-brand)", color: "var(--text-on-brand)" },
    ink: { background: "var(--surface-ink)", color: "var(--text-on-brand)" },
    gold: { background: "var(--surface-accent)", color: "var(--text-on-gold)" },
  };
  const dark = tone === "brand" || tone === "ink" || tone === "gold";
  const skins: Record<Variant, CSSProperties> = {
    hairline: { border: "1px solid " + (dark ? "var(--border-on-brand)" : "var(--border-hairline)") },
    raised: { border: "1px solid transparent", boxShadow: hover && interactive ? "var(--shadow-2)" : "var(--shadow-1)" },
    flat: { border: "1px solid transparent" },
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: "var(--radius-card)",
        padding,
        transition: "box-shadow var(--duration-base) var(--ease-gentle),border-color var(--duration-fast) var(--ease-gentle)",
        cursor: interactive ? "pointer" : undefined,
        ...grounds[tone],
        ...skins[variant],
        ...(interactive && hover && variant === "hairline" ? { borderColor: "var(--gi-gold)" } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
