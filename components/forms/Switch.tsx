"use client";

import { useState, type ReactNode } from "react";

export interface SwitchProps {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ label, checked, defaultChecked, onChange, disabled = false }: SwitchProps) {
  const controlled = checked !== undefined;
  const [inner, setInner] = useState(!!defaultChecked);
  const on = controlled ? !!checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setInner(!on);
    onChange?.(!on);
  };
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "var(--size-body-sm)",
        fontWeight: "var(--weight-body-light)",
        color: "var(--text-body)",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        onClick={toggle}
        style={{
          width: "40px",
          height: "22px",
          flex: "0 0 auto",
          borderRadius: "999px",
          background: on ? "var(--gi-ink)" : "var(--gi-neutral-200)",
          position: "relative",
          transition: "background-color var(--duration-fast) var(--ease-gentle)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: on ? "21px" : "3px",
            width: "16px",
            height: "16px",
            borderRadius: "999px",
            background: on ? "var(--gi-gold)" : "var(--gi-white)",
            boxShadow: "var(--shadow-1)",
            transition: "left var(--duration-fast) var(--ease-gentle)",
          }}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
