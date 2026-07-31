import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sessions_content_why_section_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_lead_in" varchar DEFAULT 'Clarity Sessions don''t hand you the way out. They hand you the framework to find it yourself.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_paragraph1" varchar DEFAULT 'Most people arrive at confusion believing they need someone to hand them a way out. What they actually need is the Structure to see the situation clearly enough to walk out themselves. Clarity Sessions exist to build that Structure: a repeatable framework for discernment, not a dependency on being told what to do.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_paragraph2" varchar DEFAULT 'We do not spoon feed conclusions. We equip you with the tools of Understanding, the questions that reveal what is actually happening beneath the conflict or confusion, and the Alignment between what you know and what you have been avoiding. Clarity precedes movement, and movement that is not yours to own will not hold.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_paragraph3" varchar DEFAULT 'This is the difference between relief and transformation. Relief is temporary; someone solved it for you. Transformation is permanent; you now carry the framework with you into every future confusion.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_who_its_for_heading" varchar DEFAULT 'Who It''s For' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_who_its_for_text" varchar DEFAULT 'You''re standing inside a decision, a relationship, a business crossroad, or a season that no longer makes sense, and the people around you keep offering opinions instead of Structure. You''re not looking for someone to solve it. You''re looking to think clearly again.' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_how_it_works_heading" varchar DEFAULT 'How It Works' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_book_cta_label" varchar DEFAULT 'Ready to go deeper?' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_book_cta_button_label" varchar DEFAULT 'Book a Clarity Session' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_community_cta_label" varchar DEFAULT 'Want to experience it first?' NOT NULL;
  ALTER TABLE "sessions_content" ADD COLUMN "why_section_community_cta_button_label" varchar DEFAULT 'Join the Community for Free Sessions' NOT NULL;
  ALTER TABLE "sessions_content_why_section_how_it_works_steps" ADD CONSTRAINT "sessions_content_why_section_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sessions_content_why_section_how_it_works_steps_order_idx" ON "sessions_content_why_section_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "sessions_content_why_section_how_it_works_steps_parent_id_idx" ON "sessions_content_why_section_how_it_works_steps" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "sessions_content_why_section_how_it_works_steps" CASCADE;
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_lead_in";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_paragraph1";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_paragraph2";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_paragraph3";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_who_its_for_heading";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_who_its_for_text";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_how_it_works_heading";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_book_cta_label";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_book_cta_button_label";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_community_cta_label";
  ALTER TABLE "sessions_content" DROP COLUMN "why_section_community_cta_button_label";`)
}
