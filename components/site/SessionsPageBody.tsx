"use client";

import { useState } from "react";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Badge } from "@/components/core/Badge";
import { Quote } from "@/components/core/Quote";
import { Tabs } from "@/components/navigation/Tabs";
import { Tooltip } from "@/components/feedback/Tooltip";
import { TierCard } from "@/components/commerce/TierCard";
import { CurrencySwitch, type Amounts, type Currency } from "@/components/commerce/Price";
import { PlatformBadge } from "@/components/social/PlatformBadge";
import { SOCIALS } from "@/components/social/socials";
import type { SiteSettingsData } from "@/lib/settings";
import type { SessionsContentData } from "@/lib/content";

function Tiers({ settings, content }: { settings: SiteSettingsData; content: SessionsContentData }) {
  const [cur, setCur] = useState<Currency>("USD");
  const { introMinutes, introDescription, paidTiers } = settings;
  const { tiers } = content;
  const hasTiers = paidTiers.length > 0;
  const durationLabel = hasTiers ? paidTiers.map((t) => t.minutes).join(" or ") + " minutes" : "Duration TBC";
  const first = paidTiers[0];
  const amounts: Amounts = first ? { USD: first.priceUSD, GBP: first.priceGBP, NGN: null } : null;
  const unit = hasTiers ? (paidTiers.length > 1 ? "per session · from" : "per session") : "per session · TBC";

  return (
    <Section tone="card" py="var(--space-8)">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "space-between", alignItems: "end", marginBottom: "var(--space-6)" }}>
        <div>
          <Eyebrow>Three ways in</Eyebrow>
          <h2 style={{ margin: "var(--space-3) 0 0" }}>{tiers.heading}</h2>
        </div>
        <CurrencySwitch currency={cur} onChange={setCur} />
      </div>
      <div className="rg-tiers">
        <TierCard
          eyebrow={tiers.community.eyebrow}
          title={tiers.community.title ?? "Community session"}
          amounts={null}
          bullets={tiers.community.bullets}
          action={tiers.community.ctaLabel}
          externalHref={SOCIALS.whatsapp.url}
          footnote={
            <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "8px" }}>
              <PlatformBadge platform="youtube" live />
              <PlatformBadge platform="instagram" live />
            </span>
          }
        />
        <TierCard
          eyebrow={tiers.intro.eyebrow}
          title={tiers.intro.title ?? "First conversation"}
          amounts={null}
          bullets={[`${introMinutes} ${introDescription}`, ...tiers.intro.bullets]}
          action={tiers.intro.ctaLabel}
          href="/book"
        />
        <TierCard
          eyebrow={tiers.paid.eyebrow}
          title="Clarity Session"
          amounts={amounts}
          currency={cur}
          unit={unit}
          featured
          bullets={[durationLabel, ...tiers.paid.bullets]}
          action={tiers.paid.ctaLabel}
          href="/book"
          footnote={tiers.paid.footnote}
        />
      </div>
    </Section>
  );
}

export function SessionsPageBody({ settings, content, nextOpening }: { settings: SiteSettingsData; content: SessionsContentData; nextOpening: string | null }) {
  const [tab, setTab] = useState("The session");
  const firstTier = settings.paidTiers[0];
  const durationBadge = firstTier ? `${firstTier.minutes} min` : "Duration TBC";
  const feeBadge = firstTier?.priceUSD != null ? `$${firstTier.priceUSD.toLocaleString()}` : "Fee · TBC";

  const panels: Record<string, [string, string][]> = {
    "The session": [
      [firstTier ? `${firstTier.minutes} minutes` : "One session", "One structured conversation, video or phone. No slides to sit through."],
      ...content.extraSessionPoints.map((p): [string, string] => [p.title, p.description]),
    ],
    "How it runs": content.howItRuns.map((p): [string, string] => [p.title, p.description]),
    Afterwards: content.afterwards.map((p): [string, string] => [p.title, p.description]),
  };

  return (
    <div>
      <section style={{ background: "var(--surface-page)", padding: "var(--space-10) var(--gutter-page-lg) var(--space-8)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <Eyebrow>Growth System Model · Stage 01</Eyebrow>
          <div className="rg-sess-hero" style={{ marginTop: "var(--space-4)" }}>
            <div>
              <h1 style={{ fontSize: "var(--size-display-2)", letterSpacing: ".05em" }}>Clarity Session</h1>
              <Rule length={64} />
              <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)", fontSize: "var(--size-body-lg)" }}>{content.heroIntro}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-5)" }}>
                <Badge tone="outline">{durationBadge}</Badge>
                <Badge tone="outline">1:1</Badge>
                <Badge tone="gold">Stage 01 of 05</Badge>
                {firstTier?.priceUSD != null ? (
                  <Badge tone="gold">{feeBadge}</Badge>
                ) : (
                  <Tooltip label="Pricing not supplied">
                    <Badge>Fee · TBC</Badge>
                  </Tooltip>
                )}
              </div>
            </div>
            <Card tone="brand" variant="flat" padding="var(--space-6)">
              <Eyebrow tone="cream">Next opening</Eyebrow>
              <div style={{ fontFamily: "var(--font-display)", fontSize: nextOpening ? "28px" : "18px", color: "var(--gi-cream)", margin: "var(--space-3) 0 var(--space-4)" }}>
                {nextOpening ?? "Pick a time that works on the booking page"}
              </div>
              <Button variant="gold" block href="/book">
                {content.nextOpeningCtaLabel}
              </Button>
            </Card>
          </div>
        </div>
      </section>
      <Tiers settings={settings} content={content} />
      <Section tone="page">
        <Tabs items={Object.keys(panels)} value={tab} onChange={setTab} />
        <div className="rg-panels" style={{ marginTop: "var(--space-7)" }}>
          {panels[tab].map(([t, d]) => (
            <div key={t}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", color: "var(--text-heading)", letterSpacing: ".04em" }}>{t}</div>
              <div style={{ margin: "var(--space-3) 0" }}>
                <Rule length={28} />
              </div>
              <p style={{ fontSize: "var(--size-body-sm)", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="card">
        <div className="rg-quote-cta">
          <Quote attribution={content.testimonial.attribution}>{content.testimonial.quote}</Quote>
          <div style={{ display: "grid", gap: "var(--space-4)", justifyItems: "start" }}>
            <Eyebrow>{content.bottomCta.heading}</Eyebrow>
            <p style={{ margin: 0, maxWidth: "40ch" }}>{content.bottomCta.text}</p>
            <Button variant="secondary" href="/letters">
              {content.bottomCta.ctaLabel}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
