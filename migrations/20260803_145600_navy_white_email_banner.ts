import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
ALTER TABLE "email_templates" ALTER COLUMN "html_template" SET DEFAULT '<!DOCTYPE html>
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
   and plenty ignore them. [data-ogsc] is Outlook.com''s hook (Original
   Get Safe Color) -- despite an earlier comment here calling it
   Gmail''s, Gmail has no such selector and cannot be targeted this way,
   which is why two rounds of tuning these rules never fixed Gmail.
   Gmail is handled structurally instead: a dark banner it has no
   reason to darken, and a logo whose background is baked into the
   image so no CSS rule is needed to protect it. */
[data-ogsc] .gi-banner-bg{background-color:#000080 !important;}
[data-ogsc] .gi-body-bg{background-color:#FFF8F0 !important;}
[data-ogsc] .gi-footer-bg{background-color:#1A1A1A !important;}
[data-ogsc] .gi-cta-bg{background-color:#000080 !important;}
[data-ogsc] .gi-heading,[data-ogsc] .gi-signoff{color:#1A1A1A !important;}
[data-ogsc] .gi-quote,[data-ogsc] .gi-footer-text{color:#FFFFFF !important;}
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
<td align="center" bgcolor="#000080" class="gi-banner-bg" style="background-color:#000080;padding:40px 40px 30px;border-bottom:2px solid #C79532;">
<img src="https://gentleinspirer.com/email/banner-logo.png" width="200" height="122" alt="Gentle Inspirer" class="gi-logo" style="display:block;margin:0 auto 16px;border:0;outline:none;text-decoration:none;color:#FFFFFF;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:12px;" />
<p class="gi-quote" style="margin:0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-style:italic;color:#FFFFFF;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
</td>
</tr>

<tr>
<td class="gi-body-bg" style="background-color:#FFF8F0;padding:44px 48px 8px 48px;">
<p style="margin:0 0 16px;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:600;">{{eyebrow}}</p>
<h1 class="gi-heading" style="margin:0 0 18px;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:500;">{{headline}}</h1>
<table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
{{bodyHtml}}
{{ctaHtml}}
<p class="gi-signoff" style="margin:30px 0 0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:16px;line-height:1.5;color:#1A1A1A;">
Always Yours,<br />
Gerald I. Egeonu<br />
The Gentle Inspirer
</p>
</td>
</tr>

<tr>
<td bgcolor="#1A1A1A" class="gi-footer-bg" style="background-color:#1A1A1A;padding:30px 48px;">
<p class="gi-footer-text" style="margin:0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-weight:300;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
</html>';
UPDATE "email_templates" SET "html_template" = '<!DOCTYPE html>
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
   and plenty ignore them. [data-ogsc] is Outlook.com''s hook (Original
   Get Safe Color) -- despite an earlier comment here calling it
   Gmail''s, Gmail has no such selector and cannot be targeted this way,
   which is why two rounds of tuning these rules never fixed Gmail.
   Gmail is handled structurally instead: a dark banner it has no
   reason to darken, and a logo whose background is baked into the
   image so no CSS rule is needed to protect it. */
[data-ogsc] .gi-banner-bg{background-color:#000080 !important;}
[data-ogsc] .gi-body-bg{background-color:#FFF8F0 !important;}
[data-ogsc] .gi-footer-bg{background-color:#1A1A1A !important;}
[data-ogsc] .gi-cta-bg{background-color:#000080 !important;}
[data-ogsc] .gi-heading,[data-ogsc] .gi-signoff{color:#1A1A1A !important;}
[data-ogsc] .gi-quote,[data-ogsc] .gi-footer-text{color:#FFFFFF !important;}
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
<td align="center" bgcolor="#000080" class="gi-banner-bg" style="background-color:#000080;padding:40px 40px 30px;border-bottom:2px solid #C79532;">
<img src="https://gentleinspirer.com/email/banner-logo.png" width="200" height="122" alt="Gentle Inspirer" class="gi-logo" style="display:block;margin:0 auto 16px;border:0;outline:none;text-decoration:none;color:#FFFFFF;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:12px;" />
<p class="gi-quote" style="margin:0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-style:italic;color:#FFFFFF;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
</td>
</tr>

<tr>
<td class="gi-body-bg" style="background-color:#FFF8F0;padding:44px 48px 8px 48px;">
<p style="margin:0 0 16px;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:600;">{{eyebrow}}</p>
<h1 class="gi-heading" style="margin:0 0 18px;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:500;">{{headline}}</h1>
<table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
{{bodyHtml}}
{{ctaHtml}}
<p class="gi-signoff" style="margin:30px 0 0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:16px;line-height:1.5;color:#1A1A1A;">
Always Yours,<br />
Gerald I. Egeonu<br />
The Gentle Inspirer
</p>
</td>
</tr>

<tr>
<td bgcolor="#1A1A1A" class="gi-footer-bg" style="background-color:#1A1A1A;padding:30px 48px;">
<p class="gi-footer-text" style="margin:0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-weight:300;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
</html>';
`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
ALTER TABLE "email_templates" ALTER COLUMN "html_template" SET DEFAULT '<!DOCTYPE html>
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
   transparent images when an email doesn''t declare itself light-only.
   The meta tags above stop most clients; [data-ogsc] is Gmail''s own
   dark-mode hook for the ones that ignore the meta tags, so these
   redeclare the real brand colors and un-invert the logo explicitly.
   The banner itself is cream with a black logo/text -- a light
   background with dark text is not something dark-mode remapping
   flips, so there''s little left here to override, but the hook stays
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
<img src="https://gentleinspirer.com/email/banner-logo.png" width="200" height="122" alt="Gentle Inspirer" class="gi-logo" style="display:block;margin:0 auto 16px;border:0;outline:none;text-decoration:none;color:#1A1A1A;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:12px;" />
<p class="gi-quote" style="margin:0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-style:italic;color:#1A1A1A;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
</td>
</tr>

<tr>
<td class="gi-body-bg" style="background-color:#FFF8F0;padding:44px 48px 8px 48px;">
<p style="margin:0 0 16px;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:600;">{{eyebrow}}</p>
<h1 class="gi-heading" style="margin:0 0 18px;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:500;">{{headline}}</h1>
<table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
{{bodyHtml}}
{{ctaHtml}}
<p class="gi-signoff" style="margin:30px 0 0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:16px;line-height:1.5;color:#1A1A1A;">
Always Yours,<br />
Gerald I. Egeonu<br />
The Gentle Inspirer
</p>
</td>
</tr>

<tr>
<td bgcolor="#1A1A1A" class="gi-footer-bg" style="background-color:#1A1A1A;padding:30px 48px;">
<p class="gi-footer-text" style="margin:0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-weight:300;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
</html>';
UPDATE "email_templates" SET "html_template" = '<!DOCTYPE html>
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
   transparent images when an email doesn''t declare itself light-only.
   The meta tags above stop most clients; [data-ogsc] is Gmail''s own
   dark-mode hook for the ones that ignore the meta tags, so these
   redeclare the real brand colors and un-invert the logo explicitly.
   The banner itself is cream with a black logo/text -- a light
   background with dark text is not something dark-mode remapping
   flips, so there''s little left here to override, but the hook stays
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
<img src="https://gentleinspirer.com/email/banner-logo.png" width="200" height="122" alt="Gentle Inspirer" class="gi-logo" style="display:block;margin:0 auto 16px;border:0;outline:none;text-decoration:none;color:#1A1A1A;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:12px;" />
<p class="gi-quote" style="margin:0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-style:italic;color:#1A1A1A;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
</td>
</tr>

<tr>
<td class="gi-body-bg" style="background-color:#FFF8F0;padding:44px 48px 8px 48px;">
<p style="margin:0 0 16px;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:600;">{{eyebrow}}</p>
<h1 class="gi-heading" style="margin:0 0 18px;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:500;">{{headline}}</h1>
<table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
{{bodyHtml}}
{{ctaHtml}}
<p class="gi-signoff" style="margin:30px 0 0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:16px;line-height:1.5;color:#1A1A1A;">
Always Yours,<br />
Gerald I. Egeonu<br />
The Gentle Inspirer
</p>
</td>
</tr>

<tr>
<td bgcolor="#1A1A1A" class="gi-footer-bg" style="background-color:#1A1A1A;padding:30px 48px;">
<p class="gi-footer-text" style="margin:0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-weight:300;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
</html>';
`)
}
