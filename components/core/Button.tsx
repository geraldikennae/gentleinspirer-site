"use client";

import Link from "next/link";
import { useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";

type Variant = "primary" | "gold" | "secondary" | "onBrand" | "ghost";
type Size = "sm" | "md" | "lg";

const PAD: Record<Size, string> = { sm: "10px 20px", md: "14px 28px", lg: "18px 40px" };
const FS: Record<Size, string> = { sm: "var(--size-eyebrow)", md: "var(--size-caption)", lg: "var(--size-body-sm)" };

const TONES: Record<Variant, CSSProperties> = {
  primary: { background: "var(--gi-blue)", color: "var(--gi-cream)", border: "1px solid var(--gi-blue)" },
  gold: { background: "var(--gi-gold)", color: "var(--text-on-gold)", border: "1px solid var(--gi-gold)" },
  secondary: { background: "transparent", color: "var(--text-heading)", border: "1px solid var(--border-strong)" },
  onBrand: { background: "transparent", color: "var(--gi-cream)", border: "1px solid var(--border-on-brand)" },
  ghost: { background: "transparent", color: "var(--text-heading)", border: "1px solid transparent" },
};
const HOVER: Record<Variant, CSSProperties> = {
  primary: { background: "var(--gi-blue-deep)", borderColor: "var(--gi-blue-deep)" },
  gold: { background: "var(--gi-gold-deep)", borderColor: "var(--gi-gold-deep)" },
  secondary: { background: "var(--gi-ink)", color: "var(--gi-cream)", borderColor: "var(--gi-ink)" },
  onBrand: { borderColor: "var(--gi-gold)", color: "var(--gi-gold)" },
  ghost: { color: "var(--text-link-hover)" },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  disabled?: boolean;
  /** Internal route — renders a Next Link instead of a <button>. */
  href?: string;
  /** External URL — renders a plain <a target="_blank">. */
  externalHref?: string;
  style?: CSSProperties;
}

export function Button({ children, variant = "primary", size = "md", block = false, disabled = false, href, externalHref, style, ...rest }: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const base = TONES[variant] ?? TONES.primary;

  const computedStyle: CSSProperties = {
    display: block ? "block" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-body-medium)",
    fontSize: FS[size],
    letterSpacing: "var(--tracking-caps)",
    textTransform: "uppercase",
    padding: PAD[size],
    borderRadius: "var(--radius-control)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    lineHeight: 1,
    transition: "var(--transition-control)",
    whiteSpace: block ? "normal" : "nowrap",
    flexShrink: 0,
    opacity: disabled ? 0.42 : 1,
    ...base,
    ...(hover && !disabled ? HOVER[variant] : null),
    ...(down && !disabled ? { opacity: 0.86 } : null),
    ...(variant === "ghost"
      ? { padding: size === "sm" ? "6px 0" : "8px 0", borderBottom: "1px solid " + (hover ? "var(--gi-gold-deep)" : "var(--gi-gold)") }
      : null),
    ...style,
  };

  const interactionProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
  };

  if (externalHref) {
    return (
      <a href={externalHref} target="_blank" rel="noopener" style={computedStyle} {...interactionProps}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} style={computedStyle} {...interactionProps}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} style={computedStyle} {...interactionProps} {...rest}>
      {children}
    </button>
  );
}
