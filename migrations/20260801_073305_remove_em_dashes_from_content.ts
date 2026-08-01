import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Schema-level defaults only apply to documents created from now on --
// existing singleton globals (and any Letters/Products already written)
// keep whatever text they were saved with. The UPDATE statements below fix
// the actual stored data for the known content fields, each guarded by an
// exact match on the old text so anything already hand-edited in /admin is
// left untouched. The array/collection tables use a generic, idempotent
// replace() chain instead, since their exact prior contents aren't known
// (some may be empty, some may hold real content written after launch).

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "seo_title" SET DEFAULT 'gentleinspirer.com · Clarity precedes movement';
  ALTER TABLE "home_content" ALTER COLUMN "hero_subhead" SET DEFAULT 'I help individuals and organisations move from ambition to structured progress, through systems, leadership development and disciplined execution.';
  ALTER TABLE "home_content" ALTER COLUMN "model_intro" SET DEFAULT 'Clarity precedes movement. Every engagement (a session, a programme, an organisational review) runs on the same five stages.';
  ALTER TABLE "home_content" ALTER COLUMN "about_paragraph2" SET DEFAULT 'With a background spanning engineering, project management and business operations, I bring technical precision to the way growth is designed and delivered, helping people move from ambition to structured progress, and from progress to legacy.';
  ALTER TABLE "home_content" ALTER COLUMN "community_text" SET DEFAULT 'Group clarity work, live. No booking, no fee: the WhatsApp community gets the schedule and the reminders.';
  ALTER TABLE "sessions_content" ALTER COLUMN "hero_intro" SET DEFAULT 'Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment, for a decision that has been running without structure.';
  ALTER TABLE "products_content" ALTER COLUMN "subhead" SET DEFAULT 'Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds; checkout runs on Stripe.';
  ALTER TABLE "booking_content" ALTER COLUMN "community_teaser_text" SET DEFAULT 'Or join the free bi-weekly community session, no booking at all.';
  ALTER TABLE "email_templates" ALTER COLUMN "welcome_subject" SET DEFAULT 'Confirmed: the letters';
  ALTER TABLE "email_templates" ALTER COLUMN "welcome_body" SET DEFAULT 'Confirmed.

  Structured breakdowns on growth, leadership and execution. No offers, just a note when a new letter or product goes up.

  Unsubscribe any time: {{unsubscribeUrl}}';
  ALTER TABLE "email_templates" ALTER COLUMN "new_letter_body" SET DEFAULT '{{title}}

  {{dek}}

  Read it: {{url}}

  Gerald

  Unsubscribe any time: {{unsubscribeUrl}}';
  ALTER TABLE "email_templates" ALTER COLUMN "new_product_body" SET DEFAULT '{{title}}

  {{blurb}}

  Take a look: {{url}}

  Gerald

  Unsubscribe any time: {{unsubscribeUrl}}';

  UPDATE "site_settings" SET "seo_title" = CASE WHEN "seo_title" = 'gentleinspirer.com — Clarity precedes movement' THEN 'gentleinspirer.com · Clarity precedes movement' ELSE "seo_title" END;

  UPDATE "home_content" SET
    "hero_subhead" = CASE WHEN "hero_subhead" = 'I help individuals and organisations move from ambition to structured progress — through systems, leadership development and disciplined execution.' THEN 'I help individuals and organisations move from ambition to structured progress, through systems, leadership development and disciplined execution.' ELSE "hero_subhead" END,
    "model_intro" = CASE WHEN "model_intro" = 'Clarity precedes movement. Every engagement — a session, a programme, an organisational review — runs on the same five stages.' THEN 'Clarity precedes movement. Every engagement (a session, a programme, an organisational review) runs on the same five stages.' ELSE "model_intro" END,
    "about_paragraph2" = CASE WHEN "about_paragraph2" = 'With a background spanning engineering, project management and business operations, I bring technical precision to the way growth is designed and delivered — helping people move from ambition to structured progress, and from progress to legacy.' THEN 'With a background spanning engineering, project management and business operations, I bring technical precision to the way growth is designed and delivered, helping people move from ambition to structured progress, and from progress to legacy.' ELSE "about_paragraph2" END,
    "community_text" = CASE WHEN "community_text" = 'Group clarity work, live. No booking, no fee — the WhatsApp community gets the schedule and the reminders.' THEN 'Group clarity work, live. No booking, no fee: the WhatsApp community gets the schedule and the reminders.' ELSE "community_text" END;

  UPDATE "sessions_content" SET
    "hero_intro" = CASE WHEN "hero_intro" = 'Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment — for a decision that has been running without structure.' THEN 'Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment, for a decision that has been running without structure.' ELSE "hero_intro" END;

  UPDATE "products_content" SET
    "subhead" = CASE WHEN "subhead" = 'Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds — checkout runs on Stripe.' THEN 'Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds; checkout runs on Stripe.' ELSE "subhead" END;

  UPDATE "booking_content" SET
    "community_teaser_text" = CASE WHEN "community_teaser_text" = 'Or join the free bi-weekly community session — no booking at all.' THEN 'Or join the free bi-weekly community session, no booking at all.' ELSE "community_teaser_text" END;

  UPDATE "email_templates" SET
    "welcome_subject" = CASE WHEN "welcome_subject" = 'Confirmed — the letters' THEN 'Confirmed: the letters' ELSE "welcome_subject" END,
    "welcome_body" = replace("welcome_body", 'No offers — just a note', 'No offers, just a note'),
    "new_letter_body" = replace("new_letter_body", E'\n\n— Gerald', E'\n\nGerald'),
    "new_product_body" = replace("new_product_body", E'\n\n— Gerald', E'\n\nGerald');

  UPDATE "sessions_content_how_it_runs" SET
    "title" = replace(replace("title", ' — ', ', '), '—', '-'),
    "description" = replace(replace("description", ' — ', ', '), '—', '-')
  WHERE "title" LIKE '%—%' OR "description" LIKE '%—%';

  UPDATE "sessions_content_extra_session_points" SET
    "title" = replace(replace("title", ' — ', ', '), '—', '-'),
    "description" = replace(replace("description", ' — ', ', '), '—', '-')
  WHERE "title" LIKE '%—%' OR "description" LIKE '%—%';

  UPDATE "sessions_content_tiers_community_bullets" SET "text" = replace(replace("text", ' — ', ', '), '—', '-') WHERE "text" LIKE '%—%';
  UPDATE "sessions_content_tiers_intro_bullets" SET "text" = replace(replace("text", ' — ', ', '), '—', '-') WHERE "text" LIKE '%—%';
  UPDATE "sessions_content_tiers_paid_bullets" SET "text" = replace(replace("text", ' — ', ', '), '—', '-') WHERE "text" LIKE '%—%';

  UPDATE "letters" SET
    "title" = replace(replace("title", ' — ', ', '), '—', '-'),
    "dek" = replace(replace("dek", ' — ', ', '), '—', '-')
  WHERE "title" LIKE '%—%' OR "dek" LIKE '%—%';
  UPDATE "letters" SET "body" = (replace(replace("body"::text, ' — ', ', '), '—', '-'))::jsonb WHERE "body"::text LIKE '%—%';

  UPDATE "_letters_v" SET
    "version_title" = replace(replace("version_title", ' — ', ', '), '—', '-'),
    "version_dek" = replace(replace("version_dek", ' — ', ', '), '—', '-')
  WHERE "version_title" LIKE '%—%' OR "version_dek" LIKE '%—%';
  UPDATE "_letters_v" SET "version_body" = (replace(replace("version_body"::text, ' — ', ', '), '—', '-'))::jsonb WHERE "version_body"::text LIKE '%—%';

  UPDATE "products" SET
    "title" = replace(replace("title", ' — ', ', '), '—', '-'),
    "blurb" = replace(replace("blurb", ' — ', ', '), '—', '-')
  WHERE "title" LIKE '%—%' OR "blurb" LIKE '%—%';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "seo_title" SET DEFAULT 'gentleinspirer.com — Clarity precedes movement';
  ALTER TABLE "home_content" ALTER COLUMN "hero_subhead" SET DEFAULT 'I help individuals and organisations move from ambition to structured progress — through systems, leadership development and disciplined execution.';
  ALTER TABLE "home_content" ALTER COLUMN "model_intro" SET DEFAULT 'Clarity precedes movement. Every engagement — a session, a programme, an organisational review — runs on the same five stages.';
  ALTER TABLE "home_content" ALTER COLUMN "about_paragraph2" SET DEFAULT 'With a background spanning engineering, project management and business operations, I bring technical precision to the way growth is designed and delivered — helping people move from ambition to structured progress, and from progress to legacy.';
  ALTER TABLE "home_content" ALTER COLUMN "community_text" SET DEFAULT 'Group clarity work, live. No booking, no fee — the WhatsApp community gets the schedule and the reminders.';
  ALTER TABLE "sessions_content" ALTER COLUMN "hero_intro" SET DEFAULT 'Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment — for a decision that has been running without structure.';
  ALTER TABLE "products_content" ALTER COLUMN "subhead" SET DEFAULT 'Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds — checkout runs on Stripe.';
  ALTER TABLE "booking_content" ALTER COLUMN "community_teaser_text" SET DEFAULT 'Or join the free bi-weekly community session — no booking at all.';
  ALTER TABLE "email_templates" ALTER COLUMN "welcome_subject" SET DEFAULT 'Confirmed — the letters';
  ALTER TABLE "email_templates" ALTER COLUMN "welcome_body" SET DEFAULT 'Confirmed.

  Structured breakdowns on growth, leadership and execution. No offers — just a note when a new letter or product goes up.

  Unsubscribe any time: {{unsubscribeUrl}}';
  ALTER TABLE "email_templates" ALTER COLUMN "new_letter_body" SET DEFAULT '{{title}}

  {{dek}}

  Read it: {{url}}

  — Gerald

  Unsubscribe any time: {{unsubscribeUrl}}';
  ALTER TABLE "email_templates" ALTER COLUMN "new_product_body" SET DEFAULT '{{title}}

  {{blurb}}

  Take a look: {{url}}

  — Gerald

  Unsubscribe any time: {{unsubscribeUrl}}';`)
}
