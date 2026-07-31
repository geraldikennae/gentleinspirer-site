"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type CSSProperties, type ReactNode } from "react";
import { Logo } from "../brand/Logo";
import { IconButton } from "../core/IconButton";

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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile panel on navigation — adjusted during render (React's
  // recommended pattern for "reset state when a prop changes") rather than
  // in an effect, so it doesn't cost an extra render pass.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const dark = tone === "brand" || tone === "ink";
  const ground = tone === "brand" ? "var(--surface-brand)" : tone === "ink" ? "var(--surface-ink)" : tone === "cream" ? "var(--surface-page)" : "var(--surface-card)";
  const hairline = "1px solid " + (dark ? "var(--border-on-brand)" : "var(--border-hairline)");

  const linkStyle = (on: boolean): CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: "var(--size-caption)",
    fontWeight: "var(--weight-body-bold)",
    letterSpacing: "var(--tracking-caps)",
    textTransform: "uppercase",
    color: on ? (dark ? "var(--gi-gold)" : "var(--text-heading)") : dark ? "var(--text-on-brand-muted)" : "var(--text-muted)",
    borderBottom: "1px solid " + (on ? "var(--gi-gold)" : "transparent"),
    paddingBottom: "3px",
    transition: "var(--transition-control)",
  });

  return (
    <header style={{ background: ground, borderBottom: hairline, position: "relative", ...style }}>
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

        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle(l.href === active)}>
              {l.label}
            </Link>
          ))}
          {action}
        </nav>

        <div className="nav-toggle">
          <IconButton name={open ? "x" : "menu"} label={open ? "Close menu" : "Open menu"} variant={dark ? "onBrand" : "ghost"} onClick={() => setOpen((o) => !o)} />
        </div>
      </div>

      <div
        className={"nav-mobile-panel" + (open ? " is-open" : "")}
        style={{ background: ground, borderTop: hairline, padding: "var(--space-5) var(--gutter-page-lg) var(--space-6)", gap: "var(--space-4)" }}
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} style={{ ...linkStyle(l.href === active), fontSize: "var(--size-body)", borderBottom: "none", paddingBottom: 0 }}>
            {l.label}
          </Link>
        ))}
        <div style={{ marginTop: "var(--space-2)" }}>{action}</div>
      </div>
    </header>
  );
}
