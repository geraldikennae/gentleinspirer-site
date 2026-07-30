import type { CSSProperties, ReactNode } from "react";
import { Card } from "../core/Card";
import { Eyebrow } from "../brand/Eyebrow";
import { Rule } from "../brand/Rule";
import { Button } from "../core/Button";
import { Price, type Amounts, type Currency } from "./Price";

export interface TierCardProps {
  eyebrow: string;
  title: string;
  amounts: Amounts;
  currency?: Currency;
  unit?: string;
  bullets?: string[];
  action?: string;
  onAction?: () => void;
  href?: string;
  externalHref?: string;
  featured?: boolean;
  footnote?: ReactNode;
  style?: CSSProperties;
}

export function TierCard({ eyebrow, title, amounts, currency = "USD", unit, bullets = [], action = "Book", onAction, href, externalHref, featured = false, footnote, style }: TierCardProps) {
  return (
    <Card tone={featured ? "brand" : "paper"} variant={featured ? "flat" : "hairline"} padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-4)", alignContent: "start", ...style }}>
      <Eyebrow tone={featured ? "cream" : "accent"}>{eyebrow}</Eyebrow>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-1)", fontWeight: "var(--weight-display-light)", letterSpacing: ".03em", color: featured ? "var(--gi-cream)" : "var(--text-heading)" }}>
        {title}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <Price amounts={amounts} currency={currency} tone={featured ? "cream" : "ink"} />
        {unit && <span style={{ fontSize: "var(--size-caption)", color: featured ? "var(--text-on-brand-muted)" : "var(--text-muted)" }}>{unit}</span>}
      </div>
      <Rule tone={featured ? "gold" : "hairline"} length={featured ? 40 : "full"} />
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "var(--space-2)" }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ fontSize: "var(--size-body-sm)", color: featured ? "var(--text-on-brand-muted)" : "var(--text-body)", paddingLeft: "16px", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, top: ".62em", width: "6px", height: "1px", background: "var(--gi-gold)" }} />
            {b}
          </li>
        ))}
      </ul>
      <Button variant={featured ? "gold" : "secondary"} onClick={onAction} href={href} externalHref={externalHref} style={{ justifySelf: "start", marginTop: "var(--space-2)" }}>
        {action}
      </Button>
      {footnote && <div style={{ fontSize: "var(--size-caption)", color: featured ? "rgba(255,248,240,.55)" : "var(--text-muted)" }}>{footnote}</div>}
    </Card>
  );
}
