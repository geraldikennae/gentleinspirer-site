import type { CSSProperties } from "react";

export interface RuleProps {
  length?: number | "full";
  tone?: "gold" | "cream" | "hairline";
  align?: "left" | "center" | "right";
  thickness?: number;
  style?: CSSProperties;
}

export function Rule({ length = 40, tone = "gold", align = "left", thickness = 1, style }: RuleProps) {
  const color = tone === "gold" ? "var(--gi-gold)" : tone === "cream" ? "var(--border-on-brand)" : "var(--border-hairline)";
  const margin = align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0";
  return (
    <div
      aria-hidden="true"
      style={{ width: length === "full" ? "100%" : length + "px", height: thickness + "px", background: color, margin, ...style }}
    />
  );
}
