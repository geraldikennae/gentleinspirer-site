"use client";

import { useState } from "react";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Tag } from "@/components/core/Tag";
import { Icon } from "@/components/core/Icon";

const POSTS: [string, string, string, string][] = [
  ["Framework", "From chaos to structure", "A five-part breakdown of the system that replaces a motivation problem with a structural one.", "March"],
  ["Insight", "Growth is not accidental", "Every outcome you admire was designed. Usually by someone with less talent and a better system.", "March"],
  ["Contrarian", "Leadership beyond motivation", "If your team needs a speech every Monday, you have a structure problem, not a morale problem.", "February"],
  ["Story + lesson", "The quarter I ran on intensity", "What consistency cost me, and what it later returned.", "February"],
];

export default function Letters() {
  const [type, setType] = useState("All");
  const types = ["All", "Insight", "Framework", "Story + lesson", "Contrarian"];
  return (
    <div>
      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Letters</Eyebrow>
        <div className="rg-page-head" style={{ marginTop: "var(--space-4)" }}>
          <div>
            <h1 style={{ fontSize: "var(--size-display-3)" }}>
              Structured breakdowns,
              <br />
              three times a week
            </h1>
            <Rule length={64} />
            <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>Insights, frameworks, stories and the occasional contrarian read. Newest first.</p>
          </div>
          <div className="rg-letters-tags">
            {types.map((t) => (
              <Tag key={t} selected={type === t} onClick={() => setType(t)}>
                {t}
              </Tag>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="card" py="var(--space-8)">
        <div style={{ display: "grid", gap: "1px", background: "var(--border-hairline)" }}>
          {POSTS.filter((p) => type === "All" || p[0] === type).map(([kind, title, dek, month]) => (
            <Card key={title} variant="flat" interactive padding="var(--space-6)" style={{ background: "var(--surface-card)" }}>
              <div className="rg-letter-row">
                <div>
                  <Eyebrow tone="accent">{kind}</Eyebrow>
                  <div style={{ fontSize: "var(--size-caption)", color: "var(--text-muted)", marginTop: "6px" }}>{month}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--text-heading)", letterSpacing: ".03em" }}>{title}</div>
                  <p style={{ margin: "8px 0 0", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>{dek}</p>
                </div>
                <span style={{ color: "var(--gi-gold-deep)", display: "inline-flex" }}>
                  <Icon name="arrow-right" size={18} />
                </span>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-7)", display: "flex", justifyContent: "center" }}>
          <Button variant="secondary">Earlier letters</Button>
        </div>
      </Section>
    </div>
  );
}
