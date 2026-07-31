"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Rule } from "@/components/brand/Rule";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { Tag } from "@/components/core/Tag";
import { Icon } from "@/components/core/Icon";
import type { LettersContentData } from "@/lib/content";

export interface LetterSummary {
  slug: string;
  kind: string;
  title: string;
  dek: string;
  month: string;
}

const TYPES = ["All", "Insight", "Framework", "Story + lesson", "Contrarian"];

export function LettersPageBody({ posts, content }: { posts: LetterSummary[]; content: LettersContentData }) {
  const [type, setType] = useState("All");
  const filtered = posts.filter((p) => type === "All" || p.kind === type);
  return (
    <>
      <Section tone="page" py="var(--space-9)">
        <Eyebrow>Letters</Eyebrow>
        <div className="rg-page-head" style={{ marginTop: "var(--space-4)" }}>
          <div>
            <h1 style={{ fontSize: "var(--size-display-3)" }}>{content.heading}</h1>
            <Rule length={64} />
            <p style={{ marginTop: "var(--space-5)", maxWidth: "46ch" }}>{content.subhead}</p>
          </div>
          <div className="rg-letters-tags">
            {TYPES.map((t) => (
              <Tag key={t} selected={type === t} onClick={() => setType(t)}>
                {t}
              </Tag>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="card" py="var(--space-8)">
        {filtered.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>{content.emptyStateText}</p>
        ) : (
          <div style={{ display: "grid", gap: "1px", background: "var(--border-hairline)" }}>
            {filtered.map((post) => (
              <Link key={post.slug} href={`/letters/${post.slug}`} style={{ border: "none", color: "inherit" }}>
                <Card variant="flat" interactive padding="var(--space-6)" style={{ background: "var(--surface-card)" }}>
                  <div className="rg-letter-row">
                    <div>
                      <Eyebrow tone="accent">{post.kind}</Eyebrow>
                      <div style={{ fontSize: "var(--size-caption)", color: "var(--text-muted)", marginTop: "6px" }}>{post.month}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-2)", color: "var(--text-heading)", letterSpacing: ".03em" }}>{post.title}</div>
                      <p style={{ margin: "8px 0 0", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>{post.dek}</p>
                    </div>
                    <span style={{ color: "var(--gi-gold-deep)", display: "inline-flex" }}>
                      <Icon name="arrow-right" size={18} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
        <div style={{ marginTop: "var(--space-7)", display: "flex", justifyContent: "center" }}>
          <Button variant="secondary">{content.loadMoreLabel}</Button>
        </div>
      </Section>
    </>
  );
}
