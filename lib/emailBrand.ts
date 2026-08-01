import { siteUrl } from "@/lib/urls";

// Table-based, all-inline-style markup on purpose -- Outlook desktop renders
// email HTML with Word's engine (no flexbox/grid, unreliable external CSS),
// and Gmail strips <style> blocks in some contexts. This is the bulletproof
// subset that behaves the same across clients.
//
// The logo is a small (1.5KB), pre-resized asset at /public/email/logo.png,
// served from the site itself -- reliable as long as gentleinspirer.com is
// up, which every link in the email already depends on. width/height are
// set explicitly so the navy header still reserves its space and the alt
// text stays legible even with images blocked, which is the standard email
// answer to "always be there" (there's no way to make an image render with
// images-off; the honest fallback is a graceful blank instead of a broken
// layout).
const LOGO_URL = `${siteUrl()}/email/logo.png`;
const LOGO_SIZE = 88;

const COLOR = {
  navy: "#000080",
  ink: "#1A1A1A",
  gold: "#C79532",
  goldPale: "#EBD9A0",
  cream: "#FFF8F0",
  body: "#3A3A3C",
  footerMuted: "rgba(255,248,240,.55)",
};

const FONT_DISPLAY = "Georgia,'Times New Roman',serif";
const FONT_BODY = "Arial,Helvetica,sans-serif";

export interface BrandedEmailContent {
  preheader: string;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaUrl: string;
  /** Omit for transactional emails (booking/purchase) that aren't tied to the subscriber list. */
  unsubscribeUrl?: string;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function renderBrandedEmailHtml(c: BrandedEmailContent): string {
  const paragraphsHtml = c.paragraphs
    .filter((p) => p.trim())
    .map((p) => `<p style="margin:0 0 18px;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${COLOR.body};">${esc(p)}</p>`)
    .join("\n");

  const unsubscribeLine = c.unsubscribeUrl
    ? `<a href="${esc(c.unsubscribeUrl)}" style="color:${COLOR.goldPale};text-decoration:underline;" target="_blank">Unsubscribe</a> any time, no hard feelings.`
    : `You're receiving this because of a recent booking or purchase.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>${esc(c.headline)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F2ED;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F4F2ED;">${esc(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F2ED;">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${COLOR.cream};">

<tr>
<td align="center" bgcolor="${COLOR.navy}" style="background-color:${COLOR.navy};padding:32px 40px;">
<img src="${LOGO_URL}" width="${LOGO_SIZE}" height="${LOGO_SIZE}" alt="gentleinspirer" style="display:block;border:0;outline:none;text-decoration:none;color:${COLOR.cream};font-family:${FONT_BODY};font-size:12px;" />
</td>
</tr>

<tr>
<td style="padding:44px 48px 8px 48px;">
<p style="margin:0 0 16px;font-family:${FONT_BODY};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${COLOR.gold};font-weight:bold;">${esc(c.eyebrow)}</p>
<h1 style="margin:0 0 18px;font-family:${FONT_DISPLAY};font-size:28px;line-height:1.25;color:${COLOR.ink};font-weight:normal;">${esc(c.headline)}</h1>
<table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="${COLOR.gold}" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
${paragraphsHtml}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 8px;">
<tr><td bgcolor="${COLOR.navy}" style="background-color:${COLOR.navy};border-radius:3px;">
<a href="${esc(c.ctaUrl)}" target="_blank" style="display:inline-block;padding:15px 34px;font-family:${FONT_BODY};font-size:14px;font-weight:bold;color:${COLOR.cream};text-decoration:none;">${esc(c.ctaLabel)}</a>
</td></tr>
</table>
<p style="margin:30px 0 0;font-family:${FONT_DISPLAY};font-size:17px;font-style:italic;color:${COLOR.ink};">Gerald</p>
</td>
</tr>

<tr>
<td bgcolor="${COLOR.ink}" style="background-color:${COLOR.ink};padding:38px 48px;">
<p style="margin:0 0 20px;font-family:${FONT_DISPLAY};font-style:italic;color:${COLOR.goldPale};font-size:14px;text-align:center;">&ldquo;Clarity precedes movement.&rdquo;</p>
<p style="margin:0;font-family:${FONT_BODY};font-size:11px;line-height:1.7;color:${COLOR.footerMuted};text-align:center;">
gentleinspirer.com - Gerald I. Egeonu<br />
${unsubscribeLine}
</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
}

export function renderBrandedEmailText(c: BrandedEmailContent): string {
  const lines = [c.headline, "", ...c.paragraphs.filter((p) => p.trim()), "", `${c.ctaLabel}: ${c.ctaUrl}`, "", "Gerald", ""];
  if (c.unsubscribeUrl) {
    lines.push(`Unsubscribe any time: ${c.unsubscribeUrl}`);
  }
  return lines.join("\n");
}
