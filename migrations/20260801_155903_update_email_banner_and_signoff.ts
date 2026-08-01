import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_templates" ALTER COLUMN "html_template" SET DEFAULT '<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>{{headline}}</title>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400&display=swap" rel="stylesheet" type="text/css" />
  <!--<![endif]-->
  </head>
  <body style="margin:0;padding:0;background-color:#F4F2ED;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F4F2ED;">{{preheader}}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F2ED;">
  <tr>
  <td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#FFF8F0;">
  
  <tr>
  <td align="center" bgcolor="#000080" style="background-color:#000080;padding:40px 40px 34px;">
  <img src="https://gentleinspirer.com/email/banner-logo.png" width="150" height="197" alt="Gentle Inspirer" style="display:block;margin:0 auto 18px;border:0;outline:none;text-decoration:none;color:#EBD9A0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:12px;" />
  <p style="margin:0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-style:italic;color:#EBD9A0;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
  </td>
  </tr>
  
  <tr>
  <td style="padding:44px 48px 8px 48px;">
  <p style="margin:0 0 16px;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:600;">{{eyebrow}}</p>
  <h1 style="margin:0 0 18px;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:500;">{{headline}}</h1>
  <table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
  {{bodyHtml}}
  {{ctaHtml}}
  <p style="margin:30px 0 0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:16px;line-height:1.5;color:#1A1A1A;">
  Always Yours,<br />
  Gerald I. Egeonu<br />
  The Gentle Inspirer
  </p>
  </td>
  </tr>
  
  <tr>
  <td bgcolor="#1A1A1A" style="background-color:#1A1A1A;padding:30px 48px;">
  <p style="margin:0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-weight:300;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
  <title>{{headline}}</title>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400&display=swap" rel="stylesheet" type="text/css" />
  <!--<![endif]-->
  </head>
  <body style="margin:0;padding:0;background-color:#F4F2ED;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F4F2ED;">{{preheader}}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F2ED;">
  <tr>
  <td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#FFF8F0;">
  
  <tr>
  <td align="center" bgcolor="#000080" style="background-color:#000080;padding:40px 40px 34px;">
  <img src="https://gentleinspirer.com/email/banner-logo.png" width="150" height="197" alt="Gentle Inspirer" style="display:block;margin:0 auto 18px;border:0;outline:none;text-decoration:none;color:#EBD9A0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:12px;" />
  <p style="margin:0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-style:italic;color:#EBD9A0;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
  </td>
  </tr>
  
  <tr>
  <td style="padding:44px 48px 8px 48px;">
  <p style="margin:0 0 16px;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:600;">{{eyebrow}}</p>
  <h1 style="margin:0 0 18px;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:500;">{{headline}}</h1>
  <table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
  {{bodyHtml}}
  {{ctaHtml}}
  <p style="margin:30px 0 0;font-family:''Cormorant Garamond'',Georgia,''Times New Roman'',serif;font-size:16px;line-height:1.5;color:#1A1A1A;">
  Always Yours,<br />
  Gerald I. Egeonu<br />
  The Gentle Inspirer
  </p>
  </td>
  </tr>
  
  <tr>
  <td bgcolor="#1A1A1A" style="background-color:#1A1A1A;padding:30px 48px;">
  <p style="margin:0;font-family:''Montserrat'',Arial,Helvetica,sans-serif;font-weight:300;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
  </html>' WHERE "html_template" = '<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>{{headline}}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F4F2ED;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F4F2ED;">{{preheader}}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F2ED;">
  <tr>
  <td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#FFF8F0;">
  
  <tr>
  <td align="center" bgcolor="#000080" style="background-color:#000080;padding:40px 40px 34px;">
  <img src="https://gentleinspirer.com/email/banner-logo.png" width="150" height="197" alt="Gentle Inspirer" style="display:block;margin:0 auto 18px;border:0;outline:none;text-decoration:none;color:#EBD9A0;font-family:Arial,Helvetica,sans-serif;font-size:12px;" />
  <p style="margin:0;font-family:Georgia,''Times New Roman'',serif;font-style:italic;color:#EBD9A0;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
  </td>
  </tr>
  
  <tr>
  <td style="padding:44px 48px 8px 48px;">
  <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:bold;">{{eyebrow}}</p>
  <h1 style="margin:0 0 18px;font-family:Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:normal;">{{headline}}</h1>
  <table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
  {{bodyHtml}}
  {{ctaHtml}}
  <p style="margin:30px 0 0;font-family:Georgia,''Times New Roman'',serif;font-size:16px;font-style:italic;color:#1A1A1A;">Gerald I. Egeonu / The Gentle Inspirer</p>
  </td>
  </tr>
  
  <tr>
  <td bgcolor="#1A1A1A" style="background-color:#1A1A1A;padding:30px 48px;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
  </html>';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_templates" ALTER COLUMN "html_template" SET DEFAULT '<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>{{headline}}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F4F2ED;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F4F2ED;">{{preheader}}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F2ED;">
  <tr>
  <td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#FFF8F0;">
  
  <tr>
  <td align="center" bgcolor="#000080" style="background-color:#000080;padding:40px 40px 34px;">
  <img src="https://gentleinspirer.com/email/banner-logo.png" width="150" height="197" alt="Gentle Inspirer" style="display:block;margin:0 auto 18px;border:0;outline:none;text-decoration:none;color:#EBD9A0;font-family:Arial,Helvetica,sans-serif;font-size:12px;" />
  <p style="margin:0;font-family:Georgia,''Times New Roman'',serif;font-style:italic;color:#EBD9A0;font-size:15px;letter-spacing:.01em;">&ldquo;Clarity precedes movement.&rdquo;</p>
  </td>
  </tr>
  
  <tr>
  <td style="padding:44px 48px 8px 48px;">
  <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C79532;font-weight:bold;">{{eyebrow}}</p>
  <h1 style="margin:0 0 18px;font-family:Georgia,''Times New Roman'',serif;font-size:28px;line-height:1.25;color:#1A1A1A;font-weight:normal;">{{headline}}</h1>
  <table role="presentation" width="56" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr><td height="2" bgcolor="#C79532" style="font-size:1px;line-height:2px;">&nbsp;</td></tr></table>
  {{bodyHtml}}
  {{ctaHtml}}
  <p style="margin:30px 0 0;font-family:Georgia,''Times New Roman'',serif;font-size:16px;font-style:italic;color:#1A1A1A;">Gerald I. Egeonu / The Gentle Inspirer</p>
  </td>
  </tr>
  
  <tr>
  <td bgcolor="#1A1A1A" style="background-color:#1A1A1A;padding:30px 48px;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:rgba(255,248,240,.55);text-align:center;">
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
  </html>';`)
}
