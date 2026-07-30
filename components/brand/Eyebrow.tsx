import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: "accent" | "muted" | "cream" | "ink";
  as?: ElementType;
  style?: CSSProperties;
}

export function Eyebrow({ children, tone = "accent", as: Tag = "div", style, ...rest }: EyebrowProps) {
  const color =
    tone === "accent" ? "var(--text-accent)" : tone === "muted" ? "var(--text-muted)" : tone === "cream" ? "var(--gi-gold)" : "var(--text-heading)";
  return (
    <Tag
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--size-eyebrow)",
        fontWeight: "var(--weight-body-regular)",
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        color,
        lineHeight: 1.4,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
