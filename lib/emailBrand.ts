import { siteUrl } from "@/lib/urls";
import { renderTemplate } from "@/lib/templates";

// Table-based, all-inline-style markup on purpose -- Outlook desktop renders
// email HTML with Word's engine (no flexbox/grid, unreliable external CSS),
// and Gmail strips <style> blocks in some contexts. This is the bulletproof
// subset that behaves the same across clients.
//
// The banner logo is a small (~12KB), pre-cropped black-on-transparent asset
// at /public/email/banner-logo.png, served from the site itself -- reliable
// as long as gentleinspirer.com is up, which every link in the email already
// depends on. Black-on-cream rather than the earlier gold-on-navy so it
// can't be auto-remapped by email dark-mode heuristics: a light background
// with dark text isn't something those heuristics flip. width/height are
// set explicitly so the header still reserves its space and the alt text
// stays legible even with images blocked.
const LOGO_URL = `${siteUrl()}/email/banner-logo.png`;
const LOGO_WIDTH = 200;
const LOGO_HEIGHT = 122;

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
/* Gmail (and some other clients) auto-remap colors and invert small
   transparent images when an email doesn't declare itself light-only.
   The meta tags above stop most clients; [data-ogsc] is Gmail's own
   dark-mode hook for the ones that ignore the meta tags, so these
   redeclare the real brand colors and un-invert the logo explicitly.
   The banner itself is cream with a black logo/text -- a light
   background with dark text is not something dark-mode remapping
   flips, so there's little left here to override, but the hook stays
   in place in case a client still tries. */
[data-ogsc] .gi-banner-bg{background-color:#FFF8F0 !important;}
[data-ogsc] .gi-body-bg{background-color:#FFF8F0 !important;}
[data-ogsc] .gi-footer-bg{background-color:#1A1A1A !important;}
[data-ogsc] .gi-cta-bg{background-color:#000080 !important;}
[data-ogsc] .gi-heading,[data-ogsc] .gi-signoff,[data-ogsc] .gi-quote{color:#1A1A1A !important;}
[data-ogsc] .gi-footer-text{color:#EBD9A0 !important;}
[data-ogsc] .gi-logo{filter:none !important;}
</style>
</head>
<body style="margin:0;padding:0;background-color:#F4F2ED;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F4F2ED;">{{preheader}}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F2ED;">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#FFF8F0;">

<tr>
<td align="center" bgcolor="#FFF8F0" class="gi-banner-bg" style="background-color:#FFF8F0;padding:40px 40px 30px;border-bottom:2px solid #C79532;">
<img src="${LOGO_URL}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="Gentle Inspirer" class="gi-logo" style="display:block;margin:0 auto 16px;border:0;outline:none;text-decoration:none;color:#1A1A1A;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:12px;" />
<p class="gi-quote" style="margin:0;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-style:italic;color:#1A1A1A;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
</td>
</tr>

<tr>
<td class="gi-body-bg" style="background-color:#FFF8F0;padding:44px 48px 8px 48px;">
<p style="margin:0 0 16px;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:600;">{{eyebrow}}</p>
<h1 class="gi-heading" style="margin:0 0 18px;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:500;">{{headline}}</h1>
<table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
{{bodyHtml}}
{{ctaHtml}}
<p class="gi-signoff" style="margin:30px 0 0;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:#1A1A1A;">
Always Yours,<br />
Gerald I. Egeonu<br />
The Gentle Inspirer
</p>
</td>
</tr>

<tr>
<td bgcolor="#1A1A1A" class="gi-footer-bg" style="background-color:#1A1A1A;padding:30px 48px;">
<p class="gi-footer-text" style="margin:0;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-weight:300;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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

function buildParagraphsHtml(paragraphs: string[]): string {
  return paragraphs
    .filter((p) => p.trim())
    .map((p) => `<p style="margin:0 0 18px;font-family:${FONT_BODY};font-weight:${FONT_BODY_WEIGHT};font-size:15px;line-height:1.7;color:${COLOR.body};">${esc(p)}</p>`)
    .join("\n");
}

function buildCtaHtml(ctaLabel: string | undefined, ctaUrl: string | undefined): string {
  if (!ctaLabel || !ctaUrl) return "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 8px;">
<tr><td bgcolor="${COLOR.navy}" class="gi-cta-bg" style="background-color:${COLOR.navy};border-radius:3px;">
<a href="${esc(ctaUrl)}" target="_blank" style="display:inline-block;padding:15px 34px;font-family:${FONT_BODY};font-size:14px;font-weight:600;color:${COLOR.cream};text-decoration:none;">${esc(ctaLabel)}</a>
</td></tr>
</table>`;
}

function buildFooterNote(unsubscribeUrl: string | undefined): string {
  return unsubscribeUrl
    ? `<a href="${esc(unsubscribeUrl)}" style="color:${COLOR.goldPale};text-decoration:underline;" target="_blank">Unsubscribe</a> any time, no hard feelings.`
    : `You're receiving this because of a recent booking or purchase.`;
}

/** `htmlTemplate` lets admin fully override the shell (Admin -> Email Templates -> "Email design"); falls back to DEFAULT_HTML_TEMPLATE when empty. */
export function renderBrandedEmailHtml(c: BrandedEmailContent, htmlTemplate?: string): string {
  const template = htmlTemplate?.trim() || DEFAULT_HTML_TEMPLATE;
  return renderTemplate(template, {
    preheader: esc(c.preheader),
    eyebrow: esc(c.eyebrow),
    headline: esc(c.headline),
    bodyHtml: buildParagraphsHtml(c.paragraphs),
    ctaHtml: buildCtaHtml(c.ctaLabel, c.ctaUrl),
    footerNote: buildFooterNote(c.unsubscribeUrl),
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
