"use client";

import { useState } from "react";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CurrencySwitch, type Currency } from "@/components/commerce/Price";
import { SOCIALS } from "@/components/social/socials";

/* Placeholder catalogue — real product names, covers and prices TBC. */
const CATALOGUE: [string, string, string][] = [
  ["Ebook", "Clarity ebook — title TBC", "A short, structured read on stage one of the Growth System Model."],
  ["Workbook", "Clarity workbook — title TBC", "The session questions, on paper, for working alone."],
  ["Course", "Growth systems course — title TBC", "The full five-stage model, taught in order."],
  ["Workbook", "Execution workbook — title TBC", "Increments, reviews and the discipline loop."],
];

export default function Products() {
  const [cur, setCur] = useState<Currency>("USD");
  return (
    <div>
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
            <p style={{ marginTop: "var(--space-5)", maxWidth: "48ch" }}>Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars, pounds or naira — checkout runs on Paystack and Stripe.</p>
          </div>
          <CurrencySwitch currency={cur} onChange={setCur} />
        </div>
      </Section>
      <Section tone="card" py="var(--space-8)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "var(--space-6)" }}>
          <Badge tone="gold">Catalogue in progress</Badge>
          <span style={{ fontSize: "var(--size-caption)", color: "var(--text-muted)", alignSelf: "center" }}>Names, covers and prices below are placeholders awaiting the real products.</span>
        </div>
        <div className="rg-catalogue">
          {CATALOGUE.map(([format, title, blurb]) => (
            <ProductCard key={title} format={format} title={title} blurb={blurb} amounts={{}} currency={cur} action="Notify me" />
          ))}
        </div>
        <div style={{ marginTop: "var(--space-7)", display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
          <Button variant="secondary" externalHref={SOCIALS.youtube.url}>
            Free teachings first
          </Button>
          <span style={{ fontSize: "var(--size-body-sm)", color: "var(--text-muted)" }}>Everything paid has a free counterpart on YouTube.</span>
        </div>
      </Section>
    </div>
  );
}
