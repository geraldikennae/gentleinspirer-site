import Link from "next/link";
import { Logo } from "../brand/Logo";
import { Eyebrow } from "../brand/Eyebrow";
import { SocialLinks } from "../social/SocialLinks";
import { SOCIALS } from "../social/socials";
import { LINKS } from "./links";
import { FooterQuoteRotator } from "./FooterQuoteRotator";

export function Footer({ quotes, contactEmail = "info@gentleinspirer.com" }: { quotes?: string[]; contactEmail?: string }) {
  return (
    <footer style={{ background: "var(--surface-brand-deep)", color: "var(--text-on-brand)", padding: "var(--space-9) var(--gutter-page-lg) var(--space-6)" }}>
      <div className="rg-footer" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div>
          <Logo variant="stacked" tone="gold" height={96} />
          <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", letterSpacing: ".2em", fontSize: "16px", color: "var(--gi-gold)", marginTop: "var(--space-5)" }}>you. on purpose</div>
        </div>
        <div style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
          <Eyebrow tone="cream">Navigate</Eyebrow>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "var(--text-on-brand-muted)", fontSize: "var(--size-body-sm)", border: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start", justifyItems: "start" }}>
          <Eyebrow tone="cream">Elsewhere</Eyebrow>
          <SocialLinks tone="cream" style={{ marginLeft: "-4px" }} />
          <a href={SOCIALS.youtube.url} target="_blank" rel="noopener" style={{ color: "var(--text-on-brand-muted)", fontSize: "var(--size-body-sm)", border: "none" }}>
            Free teachings on YouTube
          </a>
          <a href={SOCIALS.whatsapp.url} target="_blank" rel="noopener" style={{ color: "var(--text-on-brand-muted)", fontSize: "var(--size-body-sm)", border: "none" }}>
            Join the WhatsApp community
          </a>
          <span style={{ color: "var(--text-on-brand-muted)", fontSize: "var(--size-body-sm)" }}>{contactEmail}</span>
        </div>
      </div>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "var(--space-8) auto 0",
          paddingTop: "var(--space-5)",
          borderTop: "1px solid var(--border-on-brand)",
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          justifyContent: "space-between",
          fontSize: "var(--size-caption)",
          color: "rgba(255,248,240,.5)",
        }}
      >
        <span>gentleinspirer — Gerald I. Egeonu</span>
        <FooterQuoteRotator quotes={quotes} />
      </div>
    </footer>
  );
}
