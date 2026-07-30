import type { ChangeEventHandler, ReactNode } from "react";

export interface RadioProps {
  label: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  value?: string;
  disabled?: boolean;
}

export function Radio({ label, description, checked = false, onChange, name, value, disabled = false }: RadioProps) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "var(--size-body-sm)",
        fontWeight: "var(--weight-body-light)",
        color: "var(--text-body)",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <span
        style={{
          width: "18px",
          height: "18px",
          flex: "0 0 auto",
          marginTop: "2px",
          borderRadius: "999px",
          display: "grid",
          placeItems: "center",
          border: "1px solid " + (checked ? "var(--gi-ink)" : "var(--border-hairline)"),
          transition: "var(--transition-control)",
        }}
      >
        {checked && <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "var(--gi-ink)" }} />}
      </span>
      <span style={{ display: "grid", gap: "2px" }}>
        <span>{label}</span>
        {description && <span style={{ fontSize: "var(--size-caption)", color: "var(--text-muted)" }}>{description}</span>}
      </span>
    </label>
  );
}
