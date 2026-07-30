import type { CSSProperties } from "react";
import { Card } from "../core/Card";
import { Badge } from "../core/Badge";
import { Button } from "../core/Button";
import { Price, type Amounts, type Currency } from "./Price";

export interface ProductCardProps {
  format?: string;
  title: string;
  blurb?: string;
  amounts: Amounts;
  currency?: Currency;
  action?: string;
  onAction?: () => void;
  cover?: string;
  style?: CSSProperties;
}

export function ProductCard({ format = "Ebook", title, blurb, amounts, currency = "USD", action = "Get it", onAction, cover, style }: ProductCardProps) {
  return (
    <Card variant="hairline" interactive padding="0" style={{ display: "grid", ...style }}>
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" style={{ width: "100%", aspectRatio: "5 / 3", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ aspectRatio: "5 / 3", background: "var(--gi-neutral-50)", borderBottom: "1px solid var(--border-hairline)", display: "grid", placeItems: "center" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--gi-neutral-300)", letterSpacing: "var(--tracking-caps)" }}>{format.toUpperCase()}</span>
        </div>
      )}
      <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
        <Badge tone="outline">{format}</Badge>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".03em" }}>{title}</div>
        {blurb && <p style={{ margin: 0, fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>{blurb}</p>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "var(--space-2)" }}>
          <Price amounts={amounts} currency={currency} size="sm" />
          <Button size="sm" variant="primary" onClick={onAction}>
            {action}
          </Button>
        </div>
      </div>
    </Card>
  );
}
