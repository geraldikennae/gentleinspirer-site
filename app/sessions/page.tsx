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
import { CurrencySwitch, type Currency } from "@/components/commerce/Price";
import { PlatformBadge } from "@/components/social/PlatformBadge";
import { SOCIALS } from "@/components/social/socials";

const PANELS: Record<string, [string, string][]> = {
  "The session": [
    ["60 minutes", "One structured conversation, video or phone. No slides to sit through."],
    ["One decision", "We define the outcome first, then work backwards to the constraint."],
    ["A written system", "Your stage-one Clarity brief, in writing, the same day."],
  ],
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

function Tiers() {
  const [cur, setCur] = useState<Currency>("USD");
  return (
    <Section tone="card" py="var(--space-8)">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "var(--space-6)" }}>
        <div>
          <Eyebrow>Three ways in</Eyebrow>
          <h2 style={{ margin: "var(--space-3) 0 0" }}>Start free, go deeper when it&rsquo;s useful</h2>
        </div>
        <CurrencySwitch currency={cur} onChange={setCur} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-5)" }}>
        <TierCard
          eyebrow="Community · Bi-weekly · Free"
          title="Community session"
          amounts={null}
          bullets={["Live on YouTube or Instagram", "Group clarity work, open Q&A", "No booking — just show up"]}
          action="Get the reminder"
          externalHref={SOCIALS.whatsapp.url}
          footnote={
            <span style={{ display: "inline-flex", gap: "8px" }}>
              <PlatformBadge platform="youtube" live />
              <PlatformBadge platform="instagram" live />
            </span>
          }
        />
        <TierCard eyebrow="1:1 · Introductory · Free" title="First conversation" amounts={null} bullets={["20 minutes, one to one", "Define whether stage one fits", "No preparation needed"]} action="Request a slot" href="/book" />
        <TierCard
          eyebrow="1:1 · Paid"
          title="Clarity Session"
          amounts={{ USD: null, GBP: null, NGN: null }}
          currency={cur}
          unit="per session · TBC"
          featured
          bullets={["60 or 90 minutes", "Written Clarity brief the same day", "Two-week review question"]}
          action="Book a session"
          href="/book"
          footnote="Paystack or Stripe at checkout. Pricing to be confirmed."
        />
      </div>
    </Section>
  );
}

export default function SessionPage() {
  const [tab, setTab] = useState("The session");
  return (
    <div>
      <section style={{ background: "var(--surface-page)", padding: "var(--space-10) var(--gutter-page-lg) var(--space-8)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <Eyebrow>Growth System Model · Stage 01</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr .7fr", gap: "var(--space-9)", alignItems: "end", marginTop: "var(--space-4)" }}>
            <div>
              <h1 style={{ fontSize: "var(--size-display-2)", letterSpacing: ".05em" }}>Clarity Session</h1>
              <Rule length={64} />
              <p style={{ marginTop: "var(--space-5)", maxWidth: "var(--measure-prose)", fontSize: "var(--size-body-lg)" }}>
                Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment — for a decision that has been running without structure.
              </p>
              <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-5)" }}>
                <Badge tone="outline">60 min</Badge>
                <Badge tone="outline">1:1</Badge>
                <Badge tone="gold">Stage 01 of 05</Badge>
                <Tooltip label="Pricing not supplied">
                  <Badge>Fee · TBC</Badge>
                </Tooltip>
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
      <Tiers />
      <Section tone="page">
        <Tabs items={Object.keys(PANELS)} value={tab} onChange={setTab} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-7)", marginTop: "var(--space-7)" }}>
          {PANELS[tab].map(([t, d]) => (
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-9)", alignItems: "center" }}>
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
