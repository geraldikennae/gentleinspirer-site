import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Logo } from "../brand/Logo";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  links: NavLink[];
  active?: string;
  action?: ReactNode;
  tone?: "paper" | "brand" | "ink" | "cream";
  style?: CSSProperties;
}

export function NavBar({ links, active, action, tone = "paper", style }: NavBarProps) {
  const dark = tone === "brand" || tone === "ink";
  const ground = tone === "brand" ? "var(--surface-brand)" : tone === "ink" ? "var(--surface-ink)" : tone === "cream" ? "var(--surface-page)" : "var(--surface-card)";
  return (
    <header style={{ background: ground, borderBottom: "1px solid " + (dark ? "var(--border-on-brand)" : "var(--border-hairline)"), ...style }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--gutter-page-lg)",
          height: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-7)",
        }}
      >
        <Link href="/" style={{ display: "flex", border: "none", padding: 0 }}>
          <Logo variant="lockup" tone={dark ? "cream" : "ink"} height={40} priority />
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
          {links.map((l) => {
            const on = l.href === active;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--size-caption)",
                  fontWeight: "var(--weight-body-regular)",
                  letterSpacing: "var(--tracking-caps)",
                  textTransform: "uppercase",
                  color: on ? (dark ? "var(--gi-gold)" : "var(--text-heading)") : dark ? "var(--text-on-brand-muted)" : "var(--text-muted)",
                  borderBottom: "1px solid " + (on ? "var(--gi-gold)" : "transparent"),
                  paddingBottom: "3px",
                  transition: "var(--transition-control)",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          {action}
        </nav>
      </div>
    </header>
  );
}
