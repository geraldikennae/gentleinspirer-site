import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_templates" ALTER COLUMN "welcome_body" SET DEFAULT 'Structured breakdowns on growth, leadership and execution, three times a week. No offers, just a note when a new letter or product goes up.';
  ALTER TABLE "email_templates" ALTER COLUMN "new_letter_body" SET DEFAULT '{{dek}}';
  ALTER TABLE "email_templates" ALTER COLUMN "new_product_body" SET DEFAULT '{{blurb}}';
  ALTER TABLE "email_templates" ADD COLUMN "welcome_eyebrow" varchar DEFAULT 'Welcome' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "welcome_headline" varchar DEFAULT 'Confirmed. You''re on the list.' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "welcome_cta_label" varchar DEFAULT 'Read the latest letter' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "new_letter_eyebrow" varchar DEFAULT 'New Letter' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "new_letter_headline" varchar DEFAULT '{{title}}' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "new_letter_cta_label" varchar DEFAULT 'Read the letter' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "new_product_eyebrow" varchar DEFAULT 'New Product' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "new_product_headline" varchar DEFAULT '{{title}}' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "new_product_cta_label" varchar DEFAULT 'Take a look' NOT NULL;

  -- The three body columns above already existed with the old,
  -- boilerplate-laden text (signoff, "Read it: {{url}}", unsubscribe line
  -- all baked into the paragraph itself) -- the shell now renders those as
  -- fixed elements, so any row still holding exactly that old default gets
  -- swapped to the new, paragraph-only text. Anything already hand-edited
  -- in /admin won't match and is left alone.
  UPDATE "email_templates" SET "welcome_body" = 'Structured breakdowns on growth, leadership and execution, three times a week. No offers, just a note when a new letter or product goes up.'
  WHERE "welcome_body" = E'Confirmed.\n\nStructured breakdowns on growth, leadership and execution. No offers, just a note when a new letter or product goes up.\n\nUnsubscribe any time: {{unsubscribeUrl}}';

  UPDATE "email_templates" SET "new_letter_body" = '{{dek}}'
  WHERE "new_letter_body" = E'{{title}}\n\n{{dek}}\n\nRead it: {{url}}\n\nGerald\n\nUnsubscribe any time: {{unsubscribeUrl}}';

  UPDATE "email_templates" SET "new_product_body" = '{{blurb}}'
  WHERE "new_product_body" = E'{{title}}\n\n{{blurb}}\n\nTake a look: {{url}}\n\nGerald\n\nUnsubscribe any time: {{unsubscribeUrl}}';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  ALTER TABLE "email_templates" DROP COLUMN "welcome_eyebrow";
  ALTER TABLE "email_templates" DROP COLUMN "welcome_headline";
  ALTER TABLE "email_templates" DROP COLUMN "welcome_cta_label";
  ALTER TABLE "email_templates" DROP COLUMN "new_letter_eyebrow";
  ALTER TABLE "email_templates" DROP COLUMN "new_letter_headline";
  ALTER TABLE "email_templates" DROP COLUMN "new_letter_cta_label";
  ALTER TABLE "email_templates" DROP COLUMN "new_product_eyebrow";
  ALTER TABLE "email_templates" DROP COLUMN "new_product_headline";
  ALTER TABLE "email_templates" DROP COLUMN "new_product_cta_label";`)
}
