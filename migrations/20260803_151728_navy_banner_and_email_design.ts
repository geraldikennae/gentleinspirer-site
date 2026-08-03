import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_email_templates_design_display_font" AS ENUM('Cormorant Garamond', 'Montserrat', 'Georgia', 'Arial');
  CREATE TYPE "public"."enum_email_templates_design_body_font" AS ENUM('Cormorant Garamond', 'Montserrat', 'Georgia', 'Arial');
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
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:{{bodyBg}};">
  
  <tr>
  <td align="center" bgcolor="{{bannerBg}}" class="gi-banner-bg" style="background-color:{{bannerBg}};font-size:0;line-height:0;">
  <img src="{{bannerUrl}}" width="600" alt="Gentle Inspirer -- Clarity precedes movement." class="gi-logo" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;color:#FFFFFF;font-family:{{bodyFont}};font-size:13px;line-height:1.5;" />
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
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:{{bodyBg}};">
  
  <tr>
  <td align="center" bgcolor="{{bannerBg}}" class="gi-banner-bg" style="background-color:{{bannerBg}};font-size:0;line-height:0;">
  <img src="{{bannerUrl}}" width="600" alt="Gentle Inspirer -- Clarity precedes movement." class="gi-logo" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;color:#FFFFFF;font-family:{{bodyFont}};font-size:13px;line-height:1.5;" />
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
  </html>';
  ALTER TABLE "email_templates" ADD COLUMN "design_banner_id" integer;
  ALTER TABLE "email_templates" ADD COLUMN "design_display_font" "enum_email_templates_design_display_font" DEFAULT 'Cormorant Garamond';
  ALTER TABLE "email_templates" ADD COLUMN "design_body_font" "enum_email_templates_design_body_font" DEFAULT 'Montserrat';
  ALTER TABLE "email_templates" ADD COLUMN "design_page_bg" varchar DEFAULT '#F4F2ED';
  ALTER TABLE "email_templates" ADD COLUMN "design_body_bg" varchar DEFAULT '#FFF8F0';
  ALTER TABLE "email_templates" ADD COLUMN "design_banner_bg" varchar DEFAULT '#000080';
  ALTER TABLE "email_templates" ADD COLUMN "design_accent" varchar DEFAULT '#C79532';
  ALTER TABLE "email_templates" ADD COLUMN "design_heading_color" varchar DEFAULT '#1A1A1A';
  ALTER TABLE "email_templates" ADD COLUMN "design_body_color" varchar DEFAULT '#3A3A3C';
  ALTER TABLE "email_templates" ADD COLUMN "design_cta_bg" varchar DEFAULT '#000080';
  ALTER TABLE "email_templates" ADD COLUMN "design_cta_color" varchar DEFAULT '#FFF8F0';
  ALTER TABLE "email_templates" ADD COLUMN "design_footer_bg" varchar DEFAULT '#1A1A1A';
  ALTER TABLE "email_templates" ADD COLUMN "design_footer_color" varchar DEFAULT '#EBD9A0';
  ALTER TABLE "email_templates" ADD CONSTRAINT "email_templates_design_banner_id_media_id_fk" FOREIGN KEY ("design_banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "email_templates_design_design_banner_idx" ON "email_templates" USING btree ("design_banner_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_templates" DROP CONSTRAINT "email_templates_design_banner_id_media_id_fk";
  
  DROP INDEX "email_templates_design_design_banner_idx";
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
  ALTER TABLE "email_templates" DROP COLUMN "design_banner_id";
  ALTER TABLE "email_templates" DROP COLUMN "design_display_font";
  ALTER TABLE "email_templates" DROP COLUMN "design_body_font";
  ALTER TABLE "email_templates" DROP COLUMN "design_page_bg";
  ALTER TABLE "email_templates" DROP COLUMN "design_body_bg";
  ALTER TABLE "email_templates" DROP COLUMN "design_banner_bg";
  ALTER TABLE "email_templates" DROP COLUMN "design_accent";
  ALTER TABLE "email_templates" DROP COLUMN "design_heading_color";
  ALTER TABLE "email_templates" DROP COLUMN "design_body_color";
  ALTER TABLE "email_templates" DROP COLUMN "design_cta_bg";
  ALTER TABLE "email_templates" DROP COLUMN "design_cta_color";
  ALTER TABLE "email_templates" DROP COLUMN "design_footer_bg";
  ALTER TABLE "email_templates" DROP COLUMN "design_footer_color";
  DROP TYPE "public"."enum_email_templates_design_display_font";
  DROP TYPE "public"."enum_email_templates_design_body_font";`)
}
