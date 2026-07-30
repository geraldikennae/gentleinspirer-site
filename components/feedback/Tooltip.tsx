"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

export interface TooltipProps {
  label: string;
  placement?: "top" | "bottom";
  children: ReactNode;
  style?: CSSProperties;
}

export function Tooltip({ label, placement = "top", children, style }: TooltipProps) {
  const [on, setOn] = useState(false);
  const pos: CSSProperties =
    placement === "bottom" ? { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" } : { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };
  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      {children}
      <span
        role="tooltip"
        style={{
          position: "absolute",
          ...pos,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          background: "var(--surface-ink)",
          color: "var(--gi-cream)",
          padding: "7px 10px",
          fontFamily: "var(--font-body)",
          fontSize: "var(--size-caption)",
          fontWeight: "var(--weight-body-light)",
          letterSpacing: ".02em",
          opacity: on ? 1 : 0,
          transition: "opacity var(--duration-fast) var(--ease-gentle)",
          zIndex: 40,
        }}
      >
        {label}
      </span>
    </span>
  );
}
