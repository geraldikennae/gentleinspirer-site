"use client";

import { useState, type SelectHTMLAttributes } from "react";
import { Icon } from "../core/Icon";

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  invalid?: boolean;
}

export function Select({ options = [], invalid = false, disabled = false, style, ...rest }: SelectProps) {
  const [focus, setFocus] = useState(false);
  const border = invalid ? "var(--status-danger)" : focus ? "var(--gi-gold)" : "var(--border-hairline)";
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--size-body)",
          fontWeight: "var(--weight-body-light)",
          color: "var(--text-body)",
          background: "var(--gi-white)",
          width: "100%",
          padding: "14px 16px",
          borderRadius: "var(--radius-control)",
          lineHeight: 1.4,
          transition: "var(--transition-control)",
          outline: "none",
          border: "1px solid " + border,
          appearance: "none",
          paddingRight: "44px",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          ...style,
        }}
        {...rest}
      >
        {options.map((o) => (typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
      <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none", display: "inline-flex" }}>
        <Icon name="chevron-down" size={16} />
      </span>
    </div>
  );
}
