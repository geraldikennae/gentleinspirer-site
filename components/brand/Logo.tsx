import Image from "next/image";
import type { CSSProperties } from "react";

type Variant = "mark" | "wordmark" | "lockup" | "stacked";
type Tone = "ink" | "cream" | "gold";

const SRC: Record<Variant, Record<Tone, string>> = {
  mark: { ink: "mark-ink.png", cream: "mark-cream.png", gold: "mark-gold.png" },
  wordmark: { ink: "wordmark-ink.png", cream: "wordmark-cream.png", gold: "wordmark-gold.png" },
  lockup: { ink: "lockup-ink.png", cream: "lockup-cream.png", gold: "lockup-gold.png" },
  stacked: { ink: "stacked-ink.png", cream: "stacked-cream.png", gold: "stacked-gold.png" },
};
const RATIO: Record<Variant, number> = {
  mark: 321 / 659,
  wordmark: 1187 / 69,
  lockup: 1275 / 477,
  stacked: 1187 / 725,
};

export interface LogoProps {
  variant?: Variant;
  tone?: Tone;
  height?: number;
  alt?: string;
  style?: CSSProperties;
  priority?: boolean;
}

export function Logo({ variant = "lockup", tone = "ink", height = 40, alt = "gentleinspirer", style, priority }: LogoProps) {
  const file = SRC[variant][tone];
  const width = Math.round(height * RATIO[variant]);
  return (
    <Image
      src={`/logo/${file}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      style={{ height, width, display: "block", objectFit: "contain", ...style }}
    />
  );
}
