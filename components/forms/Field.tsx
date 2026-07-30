import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Field({ label, hint, error, required = false, htmlFor, children, style, ...rest }: FieldProps) {
  return (
    <div style={{ display: "grid", gap: "8px", ...style }} {...rest}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--size-eyebrow)",
            fontWeight: "var(--weight-body-medium)",
            letterSpacing: "var(--tracking-eyebrow)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
          {required && <span style={{ color: "var(--gi-gold-deep)" }}> ·</span>}
        </label>
      )}
      {children}
      {(error || hint) && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-caption)", color: error ? "var(--status-danger)" : "var(--text-muted)" }}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
