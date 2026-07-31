"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";

const FALLBACK_QUOTES: [string, string][] = [
  ["Growth is designed,", "not desired."],
  ["Clarity precedes", "movement."],
  ["Consistency beats", "intensity."],
  ["Systems outlast", "motivation."],
  ["Structure turns ambition", "into progress."],
  ["Leaders build leaders,", "not followers."],
  ["Legacy is built", "on purpose."],
];

const INTERVAL_MS = 6500;
const FADE_MS = 320;
const EASE = "cubic-bezier(.22,.61,.36,1)";

function normalize(i: number, length: number): number {
  return ((i % length) + length) % length;
}

export function HeroQuoteSlider({ quotes }: { quotes?: { line1: string; line2: string }[] }) {
  const QUOTES: [string, string][] = quotes && quotes.length > 0 ? quotes.map((q) => [q.line1, q.line2]) : FALLBACK_QUOTES;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const indexRef = useRef(0);
  const fadeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const next = normalize(target, QUOTES.length);
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
      if (reducedMotion) {
        setIndex(next);
        return;
      }
      setVisible(false);
      fadeTimeoutRef.current = window.setTimeout(() => {
        setIndex(next);
        setVisible(true);
      }, FADE_MS);
    },
    [reducedMotion, QUOTES.length],
  );

  // Re-armed on every index change, whether from auto-advance or a manual
  // click — that's what makes manual navigation reset the auto-advance clock.
  useEffect(() => {
    const id = window.setInterval(() => {
      goTo(indexRef.current + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, goTo]);

  useEffect(
    () => () => {
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
    },
    [],
  );

  const [line1, line2] = QUOTES[index];

  return (
    <div style={{ margin: "var(--space-5) 0 var(--space-5)" }}>
      <div style={{ minHeight: "168px", display: "flex", alignItems: "center" }}>
        <h1
          style={{
            color: "var(--gi-cream)",
            fontSize: "var(--size-display-1)",
            letterSpacing: ".05em",
            margin: 0,
            fontWeight: "var(--weight-display-light)",
            opacity: reducedMotion ? 1 : visible ? 1 : 0,
            transform: reducedMotion ? "none" : visible ? "translateY(0)" : "translateY(8px)",
            transition: reducedMotion ? "none" : `opacity ${FADE_MS}ms ${EASE}, transform ${FADE_MS}ms ${EASE}`,
          }}
        >
          {line1}
          <br />
          {line2}
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
        <div role="tablist" aria-label="Quotes" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {QUOTES.map((q, i) => (
            <button
              key={q.join("|")}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show quote ${i + 1} of ${QUOTES.length}`}
              onClick={() => goTo(i)}
              style={{
                height: "2px",
                width: i === index ? "28px" : "8px",
                background: i === index ? "var(--gi-gold)" : "rgba(255,248,240,.34)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: `width ${FADE_MS}ms ${EASE}, background-color ${FADE_MS}ms ${EASE}`,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous quote"
            style={{ display: "inline-flex", padding: "6px", background: "none", border: "none", cursor: "pointer", color: "var(--text-on-brand-muted)", transition: "var(--transition-control)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gi-cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-on-brand-muted)")}
          >
            <Icon name="arrow-left" size={16} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next quote"
            style={{ display: "inline-flex", padding: "6px", background: "none", border: "none", cursor: "pointer", color: "var(--text-on-brand-muted)", transition: "var(--transition-control)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gi-cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-on-brand-muted)")}
          >
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
