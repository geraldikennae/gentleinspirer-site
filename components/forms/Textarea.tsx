"use client";

import { useState, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ invalid = false, rows = 4, disabled = false, style, ...rest }: TextareaProps) {
  const [focus, setFocus] = useState(false);
  const border = invalid ? "var(--status-danger)" : focus ? "var(--gi-gold)" : "var(--border-hairline)";
  return (
    <textarea
      rows={rows}
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
        transition: "var(--transition-control)",
        outline: "none",
        border: "1px solid " + border,
        resize: "vertical",
        lineHeight: "var(--leading-body)",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...rest}
    />
  );
}
