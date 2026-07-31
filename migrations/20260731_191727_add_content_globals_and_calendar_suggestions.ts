import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "upcoming_sessions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "topic_suggestions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"suggestion" varchar NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sessions_content_tiers_community_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "sessions_content_tiers_intro_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "sessions_content_tiers_paid_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "letters_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Structured breakdowns, three times a week' NOT NULL,
  	"subhead" varchar DEFAULT 'Insights, frameworks, stories and the occasional contrarian read. Newest first.' NOT NULL,
  	"load_more_label" varchar DEFAULT 'Earlier letters' NOT NULL,
  	"empty_state_text" varchar DEFAULT 'No letters in this category yet.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "products_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Tools that hold structure when I''m not in the room' NOT NULL,
  	"subhead" varchar DEFAULT 'Ebooks, workbooks and courses built on the same five stages as the sessions. Pay in dollars or pounds — checkout runs on Stripe.' NOT NULL,
  	"cta_label" varchar DEFAULT 'Free teachings first' NOT NULL,
  	"cta_caption" varchar DEFAULT 'Everything paid has a free counterpart on YouTube.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "booking_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Book stage one' NOT NULL,
  	"community_teaser_text" varchar DEFAULT 'Or join the free bi-weekly community session — no booking at all.' NOT NULL,
  	"community_teaser_cta_label" varchar DEFAULT 'Get the schedule' NOT NULL,
  	"held_heading" varchar DEFAULT 'Held for you' NOT NULL,
  	"held_again_label" varchar DEFAULT 'Book another' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "email_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"welcome_subject" varchar DEFAULT 'Confirmed — the letters' NOT NULL,
  	"welcome_body" varchar DEFAULT 'Confirmed.
  
  Structured breakdowns on growth, leadership and execution. No offers — just a note when a new letter or product goes up.
  
  Unsubscribe any time: {{unsubscribeUrl}}' NOT NULL,
  	"new_letter_subject" varchar DEFAULT 'New letter: {{title}}' NOT NULL,
  	"new_letter_body" varchar DEFAULT '{{title}}
  
  {{dek}}
  
  Read it: {{url}}
  
  — Gerald
  
  Unsubscribe any time: {{unsubscribeUrl}}' NOT NULL,
  	"new_product_subject" varchar DEFAULT 'New: {{title}}' NOT NULL,
  	"new_product_body" varchar DEFAULT '{{title}}
  
  {{blurb}}
  
  Take a look: {{url}}
  
  — Gerald
  
  Unsubscribe any time: {{unsubscribeUrl}}' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "upcoming_sessions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "topic_suggestions_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "contact_email" varchar DEFAULT 'info@gentleinspirer.com' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "seo_title" varchar DEFAULT 'gentleinspirer.com — Clarity precedes movement' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "seo_description" varchar DEFAULT 'Growth is designed, not desired. Structured growth systems, leadership development and disciplined execution with Gerald I. Egeonu, founder of The Growth Circle.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "next_opening_cta_label" varchar DEFAULT 'Take this time' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_heading" varchar DEFAULT 'Start free, go deeper when it''s useful' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_community_eyebrow" varchar DEFAULT 'Community · Bi-weekly · Free' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_community_title" varchar DEFAULT 'Community session' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_community_cta_label" varchar DEFAULT 'Get the reminder' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_intro_eyebrow" varchar DEFAULT '1:1 · Introductory · Free' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_intro_title" varchar DEFAULT 'First conversation' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_intro_cta_label" varchar DEFAULT 'Request a slot' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_paid_eyebrow" varchar DEFAULT '1:1 · Paid' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_paid_cta_label" varchar DEFAULT 'Book a session' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "tiers_paid_footnote" varchar DEFAULT 'Checkout runs on Stripe.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "bottom_cta_heading" varchar DEFAULT 'Not ready to book?' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "bottom_cta_text" varchar DEFAULT 'Read a framework breakdown first. Same structure, same voice as the session.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "bottom_cta_cta_label" varchar DEFAULT 'Read the letters' NOT NULL;
  ALTER TABLE "sessions_content_tiers_community_bullets" ADD CONSTRAINT "sessions_content_tiers_community_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_content_tiers_intro_bullets" ADD CONSTRAINT "sessions_content_tiers_intro_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_content_tiers_paid_bullets" ADD CONSTRAINT "sessions_content_tiers_paid_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "upcoming_sessions_updated_at_idx" ON "upcoming_sessions" USING btree ("updated_at");
  CREATE INDEX "upcoming_sessions_created_at_idx" ON "upcoming_sessions" USING btree ("created_at");
  CREATE INDEX "topic_suggestions_updated_at_idx" ON "topic_suggestions" USING btree ("updated_at");
  CREATE INDEX "topic_suggestions_created_at_idx" ON "topic_suggestions" USING btree ("created_at");
  CREATE INDEX "sessions_content_tiers_community_bullets_order_idx" ON "sessions_content_tiers_community_bullets" USING btree ("_order");
  CREATE INDEX "sessions_content_tiers_community_bullets_parent_id_idx" ON "sessions_content_tiers_community_bullets" USING btree ("_parent_id");
  CREATE INDEX "sessions_content_tiers_intro_bullets_order_idx" ON "sessions_content_tiers_intro_bullets" USING btree ("_order");
  CREATE INDEX "sessions_content_tiers_intro_bullets_parent_id_idx" ON "sessions_content_tiers_intro_bullets" USING btree ("_parent_id");
  CREATE INDEX "sessions_content_tiers_paid_bullets_order_idx" ON "sessions_content_tiers_paid_bullets" USING btree ("_order");
  CREATE INDEX "sessions_content_tiers_paid_bullets_parent_id_idx" ON "sessions_content_tiers_paid_bullets" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_upcoming_sessions_fk" FOREIGN KEY ("upcoming_sessions_id") REFERENCES "public"."upcoming_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_topic_suggestions_fk" FOREIGN KEY ("topic_suggestions_id") REFERENCES "public"."topic_suggestions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_upcoming_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("upcoming_sessions_id");
  CREATE INDEX "payload_locked_documents_rels_topic_suggestions_id_idx" ON "payload_locked_documents_rels" USING btree ("topic_suggestions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "topic_suggestions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sessions_content_tiers_community_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sessions_content_tiers_intro_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sessions_content_tiers_paid_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "letters_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "booking_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_templates" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "upcoming_sessions" CASCADE;
  DROP TABLE "topic_suggestions" CASCADE;
  DROP TABLE "sessions_content_tiers_community_bullets" CASCADE;
  DROP TABLE "sessions_content_tiers_intro_bullets" CASCADE;
  DROP TABLE "sessions_content_tiers_paid_bullets" CASCADE;
  DROP TABLE "letters_content" CASCADE;
  DROP TABLE "products_content" CASCADE;
  DROP TABLE "booking_content" CASCADE;
  DROP TABLE "email_templates" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_upcoming_sessions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_topic_suggestions_fk";
  
  DROP INDEX "payload_locked_documents_rels_upcoming_sessions_id_idx";
  DROP INDEX "payload_locked_documents_rels_topic_suggestions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "upcoming_sessions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "topic_suggestions_id";
  ALTER TABLE "site_settings" DROP COLUMN "contact_email";
  ALTER TABLE "site_settings" DROP COLUMN "seo_title";
  ALTER TABLE "site_settings" DROP COLUMN "seo_description";
  ALTER TABLE "sessions_content" DROP COLUMN "next_opening_cta_label";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_heading";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_community_eyebrow";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_community_title";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_community_cta_label";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_intro_eyebrow";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_intro_title";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_intro_cta_label";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_paid_eyebrow";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_paid_cta_label";
  ALTER TABLE "sessions_content" DROP COLUMN "tiers_paid_footnote";
  ALTER TABLE "sessions_content" DROP COLUMN "bottom_cta_heading";
  ALTER TABLE "sessions_content" DROP COLUMN "bottom_cta_text";
  ALTER TABLE "sessions_content" DROP COLUMN "bottom_cta_cta_label";`)
}
