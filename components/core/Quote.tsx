import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface QuoteProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  attribution?: string;
  tone?: "ink" | "cream";
  style?: CSSProperties;
}

export function Quote({ children, attribution, tone = "ink", style, ...rest }: QuoteProps) {
  const dark = tone === "cream";
  return (
    <figure style={{ margin: 0, display: "grid", gap: "var(--space-4)", ...style }} {...rest}>
      <blockquote
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-display-light)",
          fontSize: "var(--size-display-3)",
          lineHeight: 1.3,
          letterSpacing: ".02em",
          color: dark ? "var(--gi-cream)" : "var(--text-heading)",
          maxWidth: "var(--measure-narrow)",
        }}
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--size-eyebrow)",
            letterSpacing: "var(--tracking-eyebrow)",
            textTransform: "uppercase",
            color: dark ? "var(--gi-gold)" : "var(--text-accent)",
          }}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
