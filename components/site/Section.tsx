import type { CSSProperties, ReactNode } from "react";

type Tone = "page" | "card" | "brand" | "ink" | "gold";

export interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  py?: string;
  style?: CSSProperties;
}

export function Section({ children, tone = "page", py = "var(--section-y)", style }: SectionProps) {
  const grounds: Record<Tone, string> = {
    page: "var(--surface-page)",
    card: "var(--surface-card)",
    brand: "var(--surface-brand)",
    ink: "var(--surface-ink)",
    gold: "var(--surface-accent)",
  };
  return (
    <section style={{ background: grounds[tone], padding: py + " var(--gutter-page-lg)", ...style }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>{children}</div>
    </section>
  );
}
