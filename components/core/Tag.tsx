"use client";

import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "./Icon";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  selected?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
}

export function Tag({ children, selected = false, onRemove, style, ...rest }: TagProps) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--size-body-sm)",
        fontWeight: "var(--weight-body-light)",
        letterSpacing: ".02em",
        lineHeight: 1,
        padding: "8px 14px",
        borderRadius: "var(--radius-pill)",
        background: selected ? "var(--gi-ink)" : "transparent",
        color: selected ? "var(--gi-cream)" : "var(--text-body)",
        border: "1px solid " + (selected ? "var(--gi-ink)" : hover ? "var(--gi-gold)" : "var(--border-hairline)"),
        cursor: onRemove || rest.onClick ? "pointer" : "default",
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove(e);
          }}
          style={{ display: "inline-flex", opacity: 0.6 }}
        >
          <Icon name="x" size={12} />
        </span>
      )}
    </span>
  );
}
