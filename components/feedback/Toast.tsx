import type { CSSProperties, ReactNode } from "react";
import { Icon } from "../core/Icon";
import { IconButton } from "../core/IconButton";

type Status = "info" | "success" | "warning" | "danger";

const ICONS: Record<Status, string> = { info: "info", success: "check", warning: "triangle-alert", danger: "circle-alert" };
const ACCENT: Record<Status, string> = { info: "var(--gi-blue)", success: "var(--status-success)", warning: "var(--status-warning)", danger: "var(--status-danger)" };

export interface ToastProps {
  children: ReactNode;
  status?: Status;
  onDismiss?: () => void;
  style?: CSSProperties;
}

export function Toast({ children, status = "info", onDismiss, style }: ToastProps) {
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: "var(--surface-ink)",
        color: "var(--gi-cream)",
        padding: "16px 18px",
        boxShadow: "var(--shadow-3)",
        maxWidth: "min(420px, calc(100vw - 40px))",
        borderLeft: "2px solid " + ACCENT[status],
        animation: "giRise var(--duration-base) var(--ease-gentle)",
        ...style,
      }}
    >
      <span style={{ color: status === "info" ? "var(--gi-gold)" : ACCENT[status], display: "inline-flex", marginTop: "2px" }}>
        <Icon name={ICONS[status]} size={16} />
      </span>
      <div style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "var(--size-body-sm)", fontWeight: "var(--weight-body-light)", lineHeight: 1.5 }}>{children}</div>
      {onDismiss && <IconButton name="x" label="Dismiss" size="sm" variant="onBrand" onClick={onDismiss} />}
    </div>
  );
}
