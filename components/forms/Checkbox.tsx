"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Icon } from "../core/Icon";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "label"> {
  label?: ReactNode;
  onChange?: (e: { target: { checked: boolean } }) => void;
}

export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, style }: CheckboxProps) {
  const controlled = checked !== undefined;
  const [inner, setInner] = useState(!!defaultChecked);
  const on = controlled ? !!checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setInner(!on);
    onChange?.({ target: { checked: !on } });
  };
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: "12px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "var(--size-body-sm)",
        fontWeight: "var(--weight-body-light)",
        color: "var(--text-body)",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span
        onClick={toggle}
        style={{
          width: "18px",
          height: "18px",
          flex: "0 0 auto",
          marginTop: "2px",
          display: "grid",
          placeItems: "center",
          borderRadius: "var(--radius-sm)",
          background: on ? "var(--gi-ink)" : "transparent",
          border: "1px solid " + (on ? "var(--gi-ink)" : "var(--border-hairline)"),
          color: "var(--gi-cream)",
          transition: "var(--transition-control)",
        }}
      >
        {on && <Icon name="check" size={12} />}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
