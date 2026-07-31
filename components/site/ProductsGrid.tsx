"use client";

import { useState } from "react";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CurrencySwitch, type Amounts, type Currency } from "@/components/commerce/Price";
import { SOCIALS } from "@/components/social/socials";

export interface ProductSummary {
  id: string;
  format: string;
  title: string;
  blurb?: string;
  cover?: string;
  amounts: Amounts;
}

export function ProductsGrid({ products }: { products: ProductSummary[] }) {
  const [cur, setCur] = useState<Currency>("USD");
  return (
    <>
      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Digital products</Eyebrow>
        <div className="rg-page-head" style={{ marginTop: "var(--space-4)" }}>
          <div>
            <h1 style={{ fontSize: "var(--size-display-3)" }}>
              Tools that hold structure
              <br />
              when I&rsquo;m not in the room
            </h1>
            <Rule length={64} />
            <p style={{ marginTop: "var(--space-5)", maxWidth: "48ch" }}>Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds — checkout runs on Stripe.</p>
          </div>
          <CurrencySwitch currency={cur} onChange={setCur} />
        </div>
      </Section>
      <Section tone="card" py="var(--space-8)">
        {products.length === 0 ? (
          <>
            <Badge tone="gold">Catalogue in progress</Badge>
            <p style={{ marginTop: "var(--space-4)", color: "var(--text-muted)" }}>No products published yet.</p>
          </>
        ) : (
          <div className="rg-catalogue">
            {products.map((p) => (
              <ProductCard key={p.id} format={p.format} title={p.title} blurb={p.blurb} cover={p.cover} amounts={p.amounts} currency={cur} action="Notify me" />
            ))}
          </div>
        )}
        <div style={{ marginTop: "var(--space-7)", display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
          <Button variant="secondary" externalHref={SOCIALS.youtube.url}>
            Free teachings first
          </Button>
          <span style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)" }}>Everything paid has a free counterpart on YouTube.</span>
        </div>
      </Section>
    </>
  );
}
