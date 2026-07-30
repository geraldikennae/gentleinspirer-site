"use client";

import { useState, type CSSProperties } from "react";

export type TabItem = string | { value: string; label: string };

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  tone?: "ink" | "cream";
  style?: CSSProperties;
}

export function Tabs({ items = [], value, defaultValue, onChange, tone = "ink", style }: TabsProps) {
  const controlled = value !== undefined;
  const first = items[0];
  const firstValue = typeof first === "string" ? first : first?.value;
  const [inner, setInner] = useState(defaultValue ?? firstValue);
  const active = controlled ? value : inner;
  const dark = tone === "cream";
  const pick = (v: string) => {
    if (!controlled) setInner(v);
    onChange?.(v);
  };
  return (
    <div role="tablist" style={{ display: "flex", flexWrap: "wrap", rowGap: "var(--space-2)", gap: "var(--space-6)", borderBottom: "1px solid " + (dark ? "var(--border-on-brand)" : "var(--border-hairline)"), ...style }}>
      {items.map((it) => {
        const v = typeof it === "string" ? it : it.value;
        const label = typeof it === "string" ? it : it.label;
        const on = v === active;
        return (
          <button
            key={v}
            role="tab"
            aria-selected={on}
            onClick={() => pick(v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 0 14px",
              fontFamily: "var(--font-body)",
              fontSize: "var(--size-caption)",
              fontWeight: "var(--weight-body-medium)",
              letterSpacing: "var(--tracking-caps)",
              textTransform: "uppercase",
              color: on ? (dark ? "var(--gi-cream)" : "var(--text-heading)") : dark ? "var(--text-on-brand-muted)" : "var(--text-muted)",
              borderBottom: "1px solid " + (on ? "var(--gi-gold)" : "transparent"),
              marginBottom: "-1px",
              transition: "var(--transition-control)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
