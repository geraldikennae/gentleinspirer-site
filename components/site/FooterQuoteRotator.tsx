"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FALLBACK_QUOTES = ["Growth is designed, not desired.", "Clarity precedes movement.", "Consistency beats intensity.", "Systems outlast motivation.", "Structure turns ambition into progress.", "Leaders build leaders, not followers.", "Legacy is built on purpose."];

// Same timing/easing as the hero quote slider, for a consistent feel.
const INTERVAL_MS = 6500;
const FADE_MS = 320;
const EASE = "cubic-bezier(.22,.61,.36,1)";

function normalize(i: number, length: number): number {
  return ((i % length) + length) % length;
}

export function FooterQuoteRotator({ quotes }: { quotes?: string[] }) {
  const QUOTES = quotes && quotes.length > 0 ? quotes : FALLBACK_QUOTES;
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

  return (
    <span
      style={{
        opacity: reducedMotion ? 1 : visible ? 1 : 0,
        transition: reducedMotion ? "none" : `opacity ${FADE_MS}ms ${EASE}`,
      }}
    >
      {QUOTES[index]}
    </span>
  );
}
