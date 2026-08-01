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
import type { ProductsContentData } from "@/lib/content";

export interface ProductSummary {
  id: string;
  format: string;
  title: string;
  blurb?: string;
  cover?: string;
  amounts: Amounts;
}

export function ProductsGrid({ products, content }: { products: ProductSummary[]; content: ProductsContentData }) {
  const [cur, setCur] = useState<Currency>("USD");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buy = async (product: ProductSummary) => {
    // Checkout runs on Stripe, USD/GBP only (see .env.example) — NGN has no
    // price on any product and no payment method wired up for it.
    if (cur === "NGN") {
      setError("NGN checkout isn't available yet. Switch to USD or GBP to buy.");
      return;
    }
    setError(null);
    setPendingId(product.id);
    try {
      const res = await fetch("/api/products/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, currency: cur }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        // eslint-disable-next-line react-hooks/immutability -- navigating away to Stripe Checkout, same pattern as BookingPageBody
        window.location.href = data.checkoutUrl;
        return;
      }
      setError(data.message || data.error || "Checkout isn't available right now.");
    } catch {
      setError("Checkout isn't available right now. Please try again.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <>
      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Digital products</Eyebrow>
        <div className="rg-page-head" style={{ marginTop: "var(--space-4)" }}>
          <div>
            <h1 style={{ fontSize: "var(--size-display-3)" }}>{content.heading}</h1>
            <Rule length={64} />
            <p style={{ marginTop: "var(--space-5)", maxWidth: "48ch" }}>{content.subhead}</p>
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
            {products.map((p) => {
              const priceSet = p.amounts?.[cur] != null;
              return (
                <ProductCard
                  key={p.id}
                  format={p.format}
                  title={p.title}
                  blurb={p.blurb}
                  cover={p.cover}
                  amounts={p.amounts}
                  currency={cur}
                  action={pendingId === p.id ? "Redirecting…" : priceSet ? "Buy" : "Coming soon"}
                  actionDisabled={!priceSet || pendingId !== null}
                  onAction={() => buy(p)}
                />
              );
            })}
          </div>
        )}
        {error && (
          <p style={{ marginTop: "var(--space-5)", fontSize: "var(--size-body-sm)", color: "var(--status-danger)" }} role="alert">
            {error}
          </p>
        )}
        <div style={{ marginTop: "var(--space-7)", display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
          <Button variant="secondary" externalHref={SOCIALS.youtube.url}>
            {content.ctaLabel}
          </Button>
          <span style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)" }}>{content.ctaCaption}</span>
        </div>
      </Section>
    </>
  );
}
