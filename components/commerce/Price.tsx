"use client";

import type { CSSProperties } from "react";

export const CURRENCIES = ["USD", "GBP", "NGN"] as const;
export type Currency = (typeof CURRENCIES)[number];
export type Amounts = Partial<Record<Currency, number | null>> | null;

const SYMBOL: Record<Currency, string> = { USD: "$", GBP: "£", NGN: "₦" };

export function formatPrice(amounts: Amounts, currency: Currency): string {
  if (!amounts) return "Free";
  const v = amounts[currency];
  if (v == null) return "TBC";
  return SYMBOL[currency] + Number(v).toLocaleString();
}

export interface PriceProps {
  amounts: Amounts;
  currency?: Currency;
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "cream";
  style?: CSSProperties;
}

export function Price({ amounts, currency = "USD", size = "md", tone = "ink", style }: PriceProps) {
  const free = !amounts;
  const fs = size === "lg" ? "var(--size-heading-1)" : size === "md" ? "var(--size-heading-2)" : "var(--size-heading-3)";
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-display-regular)",
        fontSize: fs,
        lineHeight: 1,
        color: tone === "cream" ? "var(--gi-cream)" : free ? "var(--gi-gold-deep)" : "var(--text-heading)",
        letterSpacing: ".02em",
        ...style,
      }}
    >
      {formatPrice(amounts, currency)}
    </span>
  );
}

export interface CurrencySwitchProps {
  currency: Currency;
  onChange?: (c: Currency) => void;
  tone?: "ink" | "cream";
  style?: CSSProperties;
}

export function CurrencySwitch({ currency, onChange, tone = "ink", style }: CurrencySwitchProps) {
  return (
    <div
      role="group"
      aria-label="Currency"
      style={{ display: "inline-flex", gap: "2px", border: "1px solid " + (tone === "cream" ? "var(--border-on-brand)" : "var(--border-hairline)"), borderRadius: "var(--radius-sm)", padding: "2px", ...style }}
    >
      {CURRENCIES.map((c) => (
        <button
          key={c}
          onClick={() => onChange?.(c)}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: "var(--weight-body-medium)",
            letterSpacing: "var(--tracking-caps)",
            padding: "6px 10px",
            lineHeight: 1,
            cursor: "pointer",
            border: "none",
            borderRadius: "1px",
            transition: "var(--transition-control)",
            background: c === currency ? "var(--gi-ink)" : "transparent",
            color: c === currency ? "var(--gi-cream)" : tone === "cream" ? "var(--text-on-brand-muted)" : "var(--text-muted)",
          }}
        >
          {SYMBOL[c]} {c}
        </button>
      ))}
    </div>
  );
}
