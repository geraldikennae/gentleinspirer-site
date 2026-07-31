"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 6500;
const FADE_MS = 600;
const EASE = "cubic-bezier(.22,.61,.36,1)";

export function PhotoSlideshow({ photos, alt, fallbackSrc }: { photos: string[]; alt: string; fallbackSrc: string }) {
  const slides = photos.length > 0 ? photos : [fallbackSrc];
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", overflow: "hidden" }}>
      {slides.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- uploaded photo URLs are external (Vercel Blob), same pattern as ProductCard's cover image
        <img
          key={src}
          src={src}
          alt={alt}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: i === index ? 1 : 0,
            transition: reducedMotion ? "none" : `opacity ${FADE_MS}ms ${EASE}`,
          }}
        />
      ))}
    </div>
  );
}
