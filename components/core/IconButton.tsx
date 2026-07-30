"use client";

import { useState, type ButtonHTMLAttributes, type CSSProperties } from "react";
import { Icon } from "./Icon";

type Variant = "ghost" | "outline" | "onBrand";
type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, number> = { sm: 32, md: 40, lg: 48 };

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  label: string;
  variant?: Variant;
  size?: Size;
  style?: CSSProperties;
}

export function IconButton({ name, label, variant = "ghost", size = "md", style, ...rest }: IconButtonProps) {
  const [hover, setHover] = useState(false);
  const d = SIZE[size];
  const tones: Record<Variant, CSSProperties> = {
    ghost: { background: "transparent", color: hover ? "var(--text-link-hover)" : "var(--text-heading)", border: "1px solid transparent" },
    outline: {
      background: "transparent",
      color: hover ? "var(--gi-cream)" : "var(--text-heading)",
      border: "1px solid " + (hover ? "var(--gi-ink)" : "var(--border-hairline)"),
      backgroundColor: hover ? "var(--gi-ink)" : "transparent",
    },
    onBrand: { background: "transparent", color: hover ? "var(--gi-gold)" : "var(--gi-cream)", border: "1px solid var(--border-on-brand)" },
  };
  return (
    <button
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: d,
        height: d,
        display: "inline-grid",
        placeItems: "center",
        borderRadius: "var(--radius-control)",
        cursor: "pointer",
        transition: "var(--transition-control)",
        ...tones[variant],
        ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={size === "sm" ? 16 : 18} />
    </button>
  );
}
