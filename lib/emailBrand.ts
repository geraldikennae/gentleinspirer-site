import { siteUrl } from "@/lib/urls";
import { renderTemplate } from "@/lib/templates";

// Table-based, all-inline-style markup on purpose -- Outlook desktop renders
// email HTML with Word's engine (no flexbox/grid, unreliable external CSS),
// and Gmail strips <style> blocks in some contexts. This is the bulletproof
// subset that behaves the same across clients.
//
// The banner logo is a small (~8KB) asset at /public/email/banner-logo.png,
// served from the site itself -- reliable as long as gentleinspirer.com is
// up, which every link in the email already depends on. width/height are set
// explicitly so the header still reserves its space and the alt text stays
// legible even with images blocked.
//
// Dark-mode note, learned the hard way twice: mobile Gmail's dark mode
// darkens *light* backgrounds. It leaves already-dark ones alone, because
// there is nothing to darken. So the cream banner was the worst case -- a
// light panel is precisely what gets remapped -- and the navy one before it
// failed for a different reason: a transparent logo gets its colors flipped
// along with the surrounding panel.
//
// Hence the current shape: a dark navy banner (nothing to darken) carrying a
// logo whose navy background is baked into the PNG as opaque pixels. Clients
// recolor CSS backgrounds, never image pixels, so the lockup keeps its navy
// and its white mark no matter what any client decides to do to the cell
// behind it. Worst case the panel shifts and the logo reads as a navy block
// on a lighter field -- off, but never the invisible white-on-white or
// inverted mess the transparent version produced.
const DEFAULT_BANNER_URL = `${siteUrl()}/email/banner.png`;
const BANNER_WIDTH = 600;

/** Font choices offered in Admin -> Email Templates -> Email design, mapped to
 *  the full stack sent in the email. Custom fonts only load in a minority of
 *  clients (Apple Mail, Outlook for Mac); Gmail ignores the webfont link
 *  entirely, so each stack ends in something installed everywhere. */
export const EMAIL_FONT_STACKS: Record<string, string> = {
  "Cormorant Garamond": "'Cormorant Garamond',Georgia,'Times New Roman',serif",
  Montserrat: "'Montserrat',Arial,Helvetica,sans-serif",
  Georgia: "Georgia,'Times New Roman',serif",
  Arial: "Arial,Helvetica,sans-serif",
};

/** Styling from the Email Templates global, all optional -- anything unset
 *  falls back to the brand defaults below. */
export interface EmailDesign {
  htmlTemplate?: string;
  bannerUrl?: string;
  displayFont?: string;
  bodyFont?: string;
  pageBg?: string;
  bodyBg?: string;
  bannerBg?: string;
  accent?: string;
  headingColor?: string;
  bodyColor?: string;
  ctaBg?: string;
  ctaColor?: string;
  footerBg?: string;
  footerColor?: string;
}

type ResolvedDesign = Required<Omit<EmailDesign, "htmlTemplate">>;

function resolveDesign(d?: EmailDesign): ResolvedDesign {
  return {
    bannerUrl: d?.bannerUrl || DEFAULT_BANNER_URL,
    displayFont: d?.displayFont || EMAIL_FONT_STACKS["Cormorant Garamond"],
    bodyFont: d?.bodyFont || EMAIL_FONT_STACKS.Montserrat,
    pageBg: d?.pageBg || "#F4F2ED",
    bodyBg: d?.bodyBg || COLOR.cream,
    bannerBg: d?.bannerBg || COLOR.navy,
    accent: d?.accent || COLOR.gold,
    headingColor: d?.headingColor || COLOR.ink,
    bodyColor: d?.bodyColor || COLOR.body,
    ctaBg: d?.ctaBg || COLOR.navy,
    ctaColor: d?.ctaColor || COLOR.cream,
    footerBg: d?.footerBg || COLOR.ink,
    footerColor: d?.footerColor || COLOR.goldPale,
  };
}

/** Builds the design from the Email Templates global: maps the admin's font
 *  choice to a full stack and an uploaded banner to an absolute URL (emails
 *  can't resolve site-relative paths). */
export function emailDesignFrom(templates: { htmlTemplate?: string | null; design?: unknown }): EmailDesign {
  const d = (templates.design ?? {}) as Record<string, unknown>;
  const banner = d.banner as { url?: string | null } | string | number | null | undefined;
  const bannerPath = banner && typeof banner === "object" ? banner.url : undefined;
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
  return {
    htmlTemplate: templates.htmlTemplate ?? undefined,
    bannerUrl: bannerPath ? (bannerPath.startsWith("http") ? bannerPath : `${siteUrl()}${bannerPath}`) : undefined,
    displayFont: EMAIL_FONT_STACKS[str(d.displayFont) ?? ""],
    bodyFont: EMAIL_FONT_STACKS[str(d.bodyFont) ?? ""],
    pageBg: str(d.pageBg),
    bodyBg: str(d.bodyBg),
    bannerBg: str(d.bannerBg),
    accent: str(d.accent),
    headingColor: str(d.headingColor),
    bodyColor: str(d.bodyColor),
    ctaBg: str(d.ctaBg),
    ctaColor: str(d.ctaColor),
    footerBg: str(d.footerBg),
    footerColor: str(d.footerColor),
  };
}

const COLOR = {
  navy: "#000080",
  ink: "#1A1A1A",
  gold: "#C79532",
  goldPale: "#EBD9A0",
  cream: "#FFF8F0",
  body: "#3A3A3C",
  footerMuted: "rgba(255,248,240,.55)",
};

// Brand fonts, loaded from Google Fonts where the email client supports it
// (Apple/iOS Mail, Gmail's app, most webmail) and falling back to a close
// system serif/sans where it doesn't (Outlook desktop strips <link>/
// @font-face entirely and always uses the fallback stack -- this is normal
// for email, not a bug).
const FONT_DISPLAY = "'Cormorant Garamond',Georgia,'Times New Roman',serif";
const FONT_BODY = "'Montserrat',Arial,Helvetica,sans-serif";
const FONT_BODY_WEIGHT = "300"; // Montserrat Light

export interface BrandedEmailContent {
  preheader: string;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  /** Omit when there's nothing meaningful to link to (e.g. a booking confirmation). */
  ctaLabel?: string;
  ctaUrl?: string;
  /** Omit for transactional emails (booking/purchase) that aren't tied to the subscriber list. */
  unsubscribeUrl?: string;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// The shell admin can edit from Admin -> Email Templates -> "Email design
// (HTML)". {{ }} placeholders are filled in per-send; everything else
// (banner, sign-off, colors, structure) is literal HTML they're free to
// change. Keep it table-based/inline-styled if you touch it -- see the note
// above about Outlook/Gmail.
export const DEFAULT_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>{{headline}}</title>
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400&display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<style>
/* Dark-mode defenses, in order of how much they can be trusted.
   The meta tags above are the only ones that stop a client outright,
   and plenty ignore them. [data-ogsc] is Outlook.com's hook (Original
   Get Safe Color) -- despite an earlier comment here calling it
   Gmail's, Gmail has no such selector and cannot be targeted this way,
   which is why two rounds of tuning these rules never fixed Gmail.
   Gmail is handled structurally instead: a dark banner it has no
   reason to darken, and a logo whose background is baked into the
   image so no CSS rule is needed to protect it. */
[data-ogsc] .gi-banner-bg{background-color:{{bannerBg}} !important;}
[data-ogsc] .gi-body-bg{background-color:{{bodyBg}} !important;}
[data-ogsc] .gi-footer-bg{background-color:{{footerBg}} !important;}
[data-ogsc] .gi-cta-bg{background-color:{{ctaBg}} !important;}
[data-ogsc] .gi-heading,[data-ogsc] .gi-signoff{color:{{headingColor}} !important;}
[data-ogsc] .gi-footer-text{color:{{footerColor}} !important;}
</style>
</head>
<body style="margin:0;padding:0;background-color:{{pageBg}};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:{{pageBg}};">{{preheader}}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:{{pageBg}};">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="${BANNER_WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:${BANNER_WIDTH}px;max-width:${BANNER_WIDTH}px;background-color:{{bodyBg}};">

<tr>
<td align="center" bgcolor="{{bannerBg}}" class="gi-banner-bg" style="background-color:{{bannerBg}};font-size:0;line-height:0;">
<img src="{{bannerUrl}}" width="${BANNER_WIDTH}" alt="Gentle Inspirer -- Clarity precedes movement." class="gi-logo" style="display:block;width:100%;max-width:${BANNER_WIDTH}px;height:auto;border:0;outline:none;text-decoration:none;color:#FFFFFF;font-family:{{bodyFont}};font-size:13px;line-height:1.5;" />
</td>
</tr>

<tr>
<td class="gi-body-bg" style="background-color:{{bodyBg}};padding:44px 48px 8px 48px;">
<p style="margin:0 0 16px;font-family:{{bodyFont}};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:{{accent}};font-weight:600;">{{eyebrow}}</p>
<h1 class="gi-heading" style="margin:0 0 18px;font-family:{{displayFont}};font-size:28px;line-height:1.25;color:{{headingColor}};font-weight:500;">{{headline}}</h1>
<table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="{{accent}}" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
{{bodyHtml}}
{{ctaHtml}}
<p class="gi-signoff" style="margin:30px 0 0;font-family:{{displayFont}};font-size:16px;line-height:1.5;color:{{headingColor}};">
Always Yours,<br />
Gerald I. Egeonu<br />
The Gentle Inspirer
</p>
</td>
</tr>

<tr>
<td bgcolor="{{footerBg}}" class="gi-footer-bg" style="background-color:{{footerBg}};padding:30px 48px;">
<p class="gi-footer-text" style="margin:0;font-family:{{bodyFont}};font-weight:300;font-size:11px;line-height:1.7;color:{{footerColor}};text-align:center;">
gentleinspirer.com - The Gentle Inspirer<br />
{{footerNote}}
</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;

function buildParagraphsHtml(paragraphs: string[], d: ResolvedDesign): string {
  return paragraphs
    .filter((p) => p.trim())
    .map((p) => `<p style="margin:0 0 18px;font-family:${d.bodyFont};font-weight:${FONT_BODY_WEIGHT};font-size:15px;line-height:1.7;color:${d.bodyColor};">${esc(p)}</p>`)
    .join("\n");
}

function buildCtaHtml(ctaLabel: string | undefined, ctaUrl: string | undefined, d: ResolvedDesign): string {
  if (!ctaLabel || !ctaUrl) return "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 8px;">
<tr><td bgcolor="${d.ctaBg}" class="gi-cta-bg" style="background-color:${d.ctaBg};border-radius:3px;">
<a href="${esc(ctaUrl)}" target="_blank" style="display:inline-block;padding:15px 34px;font-family:${d.bodyFont};font-size:14px;font-weight:600;color:${d.ctaColor};text-decoration:none;">${esc(ctaLabel)}</a>
</td></tr>
</table>`;
}

function buildFooterNote(unsubscribeUrl: string | undefined, d: ResolvedDesign): string {
  return unsubscribeUrl
    ? `<a href="${esc(unsubscribeUrl)}" style="color:${d.footerColor};text-decoration:underline;" target="_blank">Unsubscribe</a> any time, no hard feelings.`
    : `You're receiving this because of a recent booking or purchase.`;
}

/** Renders the shell. `design.htmlTemplate` lets admin fully override the
 *  markup (Admin -> Email Templates -> "Email design (HTML)"); everything else
 *  in `design` fills the {{ }} style placeholders, so colours, fonts and the
 *  banner can be changed from the admin fields without editing HTML. */
export function renderBrandedEmailHtml(c: BrandedEmailContent, design?: EmailDesign): string {
  const d = resolveDesign(design);
  const template = design?.htmlTemplate?.trim() || DEFAULT_HTML_TEMPLATE;
  return renderTemplate(template, {
    ...d,
    preheader: esc(c.preheader),
    eyebrow: esc(c.eyebrow),
    headline: esc(c.headline),
    bodyHtml: buildParagraphsHtml(c.paragraphs, d),
    ctaHtml: buildCtaHtml(c.ctaLabel, c.ctaUrl, d),
    footerNote: buildFooterNote(c.unsubscribeUrl, d),
  });
}

export function renderBrandedEmailText(c: BrandedEmailContent): string {
  const lines = [c.headline, "", ...c.paragraphs.filter((p) => p.trim()), ""];
  if (c.ctaLabel && c.ctaUrl) {
    lines.push(`${c.ctaLabel}: ${c.ctaUrl}`, "");
  }
  lines.push("Always Yours,", "Gerald I. Egeonu", "The Gentle Inspirer", "");
  if (c.unsubscribeUrl) {
    lines.push(`Unsubscribe any time: ${c.unsubscribeUrl}`);
  }
  return lines.join("\n");
}
