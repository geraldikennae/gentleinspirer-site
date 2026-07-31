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

const PANELS: Record<string, [string, string][]> = {
  "How it runs": [
    ["First ten minutes", "We name the outcome. Most people arrive with tactics and no defined outcome."],
    ["The middle", "We find the constraint — usually structural, rarely motivational."],
    ["Last ten minutes", "One increment, defined tightly enough to be observable next week."],
  ],
  Afterwards: [
    ["Same day", "The Clarity brief arrives: outcome, constraint, first increment."],
    ["Two weeks on", "One review question by email. Consistency over intensity."],
    ["Stage two", "Move on to Structure when the increment is holding — not before."],
  ],
};

function Tiers({ settings }: { settings: SiteSettingsData }) {
  const [cur, setCur] = useState<Currency>("USD");
  const { introMinutes, introDescription, paidTiers } = settings;
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
          <h2 style={{ margin: "var(--space-3) 0 0" }}>Start free, go deeper when it&rsquo;s useful</h2>
        </div>
        <CurrencySwitch currency={cur} onChange={setCur} />
      </div>
      <div className="rg-tiers">
        <TierCard
          eyebrow="Community · Bi-weekly · Free"
          title="Community session"
          amounts={null}
          bullets={["Live on YouTube or Instagram", "Group clarity work, open Q&A", "No booking — just show up"]}
          action="Get the reminder"
          externalHref={SOCIALS.whatsapp.url}
          footnote={
            <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "8px" }}>
              <PlatformBadge platform="youtube" live />
              <PlatformBadge platform="instagram" live />
            </span>
          }
        />
        <TierCard
          eyebrow="1:1 · Introductory · Free"
          title="First conversation"
          amounts={null}
          bullets={[`${introMinutes} ${introDescription}`, "Define whether stage one fits", "No preparation needed"]}
          action="Request a slot"
          href="/book"
        />
        <TierCard
          eyebrow="1:1 · Paid"
          title="Clarity Session"
          amounts={amounts}
          currency={cur}
          unit={unit}
          featured
          bullets={[durationLabel, "Written Clarity brief the same day", "Two-week review question"]}
          action="Book a session"
          href="/book"
          footnote="Checkout runs on Stripe."
        />
      </div>
    </Section>
  );
}

export function SessionsPageBody({ settings }: { settings: SiteSettingsData }) {
  const [tab, setTab] = useState("The session");
  const firstTier = settings.paidTiers[0];
  const durationBadge = firstTier ? `${firstTier.minutes} min` : "Duration TBC";
  const feeBadge = firstTier?.priceUSD != null ? `$${firstTier.priceUSD.toLocaleString()}` : "Fee · TBC";

  const panels: Record<string, [string, string][]> = {
    "The session": [
      [firstTier ? `${firstTier.minutes} minutes` : "One session", "One structured conversation, video or phone. No slides to sit through."],
      ["One decision", "We define the outcome first, then work backwards to the constraint."],
      ["A written system", "Your stage-one Clarity brief, in writing, the same day."],
    ],
    ...PANELS,
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
              <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)", fontSize: "var(--size-body-lg)" }}>
                Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment — for a decision that has been running without structure.
              </p>
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
              <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--gi-cream)", margin: "var(--space-3) 0 var(--space-4)" }}>
                Thu 14 March
                <br />
                10:00 WAT
              </div>
              <Button variant="gold" block href="/book">
                Take this time
              </Button>
            </Card>
          </div>
        </div>
      </section>
      <Tiers settings={settings} />
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
          <Quote attribution="M., founder">I came in with a spreadsheet and left with a system.</Quote>
          <div style={{ display: "grid", gap: "var(--space-4)", justifyItems: "start" }}>
            <Eyebrow>Not ready to book?</Eyebrow>
            <p style={{ margin: 0, maxWidth: "40ch" }}>Read a framework breakdown first. Same structure, same voice as the session.</p>
            <Button variant="secondary" href="/letters">
              Read the letters
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
