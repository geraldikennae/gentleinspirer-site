import type { CSSProperties, ReactNode } from "react";
import { IconButton } from "../core/IconButton";
import { Rule } from "../brand/Rule";

export interface DialogProps {
  open?: boolean;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  width?: number;
  style?: CSSProperties;
}

export function Dialog({ open = false, title, eyebrow, children, footer, onClose, width = 520, style }: DialogProps) {
  if (!open) return null;
  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--surface-overlay)",
        backdropFilter: "blur(3px)",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-5)",
        zIndex: 60,
        animation: "giFade var(--duration-base) var(--ease-gentle)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: width + "px", background: "var(--surface-card)", boxShadow: "var(--shadow-3)", padding: "var(--space-7)", position: "relative", ...style }}
      >
        {onClose && (
          <div style={{ position: "absolute", top: "14px", right: "14px" }}>
            <IconButton name="x" label="Close" onClick={onClose} size="sm" />
          </div>
        )}
        {eyebrow && (
          <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-accent)" }}>
            {eyebrow}
          </div>
        )}
        {title && (
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-display-light)", fontSize: "var(--size-heading-1)", color: "var(--text-heading)", margin: "10px 0 14px" }}>
            {title}
          </h3>
        )}
        <Rule />
        <div style={{ marginTop: "var(--space-5)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>{children}</div>
        {footer && <div style={{ marginTop: "var(--space-6)", display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "flex-end" }}>{footer}</div>}
      </div>
    </div>
  );
}
