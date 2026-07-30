"use client";

import { useState, type CSSProperties } from "react";
import { Icon } from "../core/Icon";
import { PlatformBadge } from "../social/PlatformBadge";
import type { PlatformKey } from "../social/socials";

export interface VideoCardProps {
  videoId?: string;
  title: string;
  duration?: string;
  href?: string;
  platform?: PlatformKey;
  style?: CSSProperties;
}

export function VideoCard({ videoId, title, duration, href, platform = "youtube", style }: VideoCardProps) {
  const [hover, setHover] = useState(false);
  const link = href || (videoId ? "https://www.youtube.com/watch?v=" + videoId : "https://www.youtube.com/@gentleinspirer");
  return (
    <a href={link} target="_blank" rel="noopener" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: "grid", gap: "var(--space-3)", border: "none", color: "inherit", ...style }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9", background: "var(--gi-ink)", overflow: "hidden", boxShadow: hover ? "var(--shadow-2)" : "none", transition: "box-shadow var(--duration-base) var(--ease-gentle)" }}>
        {videoId && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={"https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
        )}
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <span
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "999px",
              display: "grid",
              placeItems: "center",
              background: hover ? "var(--gi-gold)" : "rgba(255,248,240,.92)",
              color: hover ? "var(--gi-white)" : "var(--gi-ink)",
              transition: "var(--transition-control)",
            }}
          >
            <Icon name="play" size={20} />
          </span>
        </span>
        {duration && (
          <span style={{ position: "absolute", right: "10px", bottom: "10px", background: "rgba(13,13,13,.8)", color: "var(--gi-cream)", fontFamily: "var(--font-body)", fontSize: "11px", padding: "3px 7px", letterSpacing: ".06em" }}>
            {duration}
          </span>
        )}
      </div>
      <div style={{ display: "grid", gap: "8px", justifyItems: "start" }}>
        <PlatformBadge platform={platform} />
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading-3)", letterSpacing: ".03em", color: hover ? "var(--gi-gold-deep)" : "var(--text-heading)", transition: "var(--transition-control)" }}>{title}</div>
      </div>
    </a>
  );
}
