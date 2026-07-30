"use client";

import { useState, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ invalid = false, disabled = false, style, ...rest }: InputProps) {
  const [focus, setFocus] = useState(false);
  const border = invalid ? "var(--status-danger)" : focus ? "var(--gi-gold)" : "var(--border-hairline)";
  return (
    <input
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
        opacity: disabled ? 0.5 : 1,
        boxShadow: focus ? "inset 0 -1px 0 0 var(--gi-gold)" : "none",
        ...style,
      }}
      {...rest}
    />
  );
}
