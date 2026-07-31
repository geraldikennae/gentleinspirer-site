import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_content_hero_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line1" varchar NOT NULL,
  	"line2" varchar NOT NULL
  );
  
  CREATE TABLE "home_content_model_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_content_pillars_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_subhead" varchar DEFAULT 'I help individuals and organisations move from ambition to structured progress — through systems, leadership development and disciplined execution.',
  	"model_heading" varchar DEFAULT 'Five stages, in order',
  	"model_intro" varchar DEFAULT 'Clarity precedes movement. Every engagement — a session, a programme, an organisational review — runs on the same five stages.',
  	"pillars_heading" varchar DEFAULT 'Five pillars',
  	"testimonial_quote" varchar DEFAULT 'I stopped guessing at my next quarter.',
  	"testimonial_attribution" varchar DEFAULT 'R., emerging leader',
  	"about_paragraph1" varchar DEFAULT 'A multidisciplinary growth strategist and founder of The Growth Circle, a platform developing individuals and organisations through structured growth systems, leadership development and purpose-driven execution.',
  	"about_paragraph2" varchar DEFAULT 'With a background spanning engineering, project management and business operations, I bring technical precision to the way growth is designed and delivered — helping people move from ambition to structured progress, and from progress to legacy.',
  	"community_heading" varchar DEFAULT 'Free community clarity sessions, every other week',
  	"community_text" varchar DEFAULT 'Group clarity work, live. No booking, no fee — the WhatsApp community gets the schedule and the reminders.',
  	"letter_heading" varchar DEFAULT 'One insight, one framework',
  	"letter_text" varchar DEFAULT 'Structured breakdowns on growth, leadership and execution. No offers.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sessions_content_extra_session_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "sessions_content_how_it_runs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "sessions_content_afterwards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "sessions_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_intro" varchar DEFAULT 'Clarity precedes movement. One hour to define the outcome, locate the constraint, and set the first increment — for a decision that has been running without structure.',
  	"testimonial_quote" varchar DEFAULT 'I came in with a spreadsheet and left with a system.',
  	"testimonial_attribution" varchar DEFAULT 'M., founder',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home_content_hero_quotes" ADD CONSTRAINT "home_content_hero_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_content_model_stages" ADD CONSTRAINT "home_content_model_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_content_pillars_items" ADD CONSTRAINT "home_content_pillars_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_content_extra_session_points" ADD CONSTRAINT "sessions_content_extra_session_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_content_how_it_runs" ADD CONSTRAINT "sessions_content_how_it_runs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_content_afterwards" ADD CONSTRAINT "sessions_content_afterwards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_content_hero_quotes_order_idx" ON "home_content_hero_quotes" USING btree ("_order");
  CREATE INDEX "home_content_hero_quotes_parent_id_idx" ON "home_content_hero_quotes" USING btree ("_parent_id");
  CREATE INDEX "home_content_model_stages_order_idx" ON "home_content_model_stages" USING btree ("_order");
  CREATE INDEX "home_content_model_stages_parent_id_idx" ON "home_content_model_stages" USING btree ("_parent_id");
  CREATE INDEX "home_content_pillars_items_order_idx" ON "home_content_pillars_items" USING btree ("_order");
  CREATE INDEX "home_content_pillars_items_parent_id_idx" ON "home_content_pillars_items" USING btree ("_parent_id");
  CREATE INDEX "sessions_content_extra_session_points_order_idx" ON "sessions_content_extra_session_points" USING btree ("_order");
  CREATE INDEX "sessions_content_extra_session_points_parent_id_idx" ON "sessions_content_extra_session_points" USING btree ("_parent_id");
  CREATE INDEX "sessions_content_how_it_runs_order_idx" ON "sessions_content_how_it_runs" USING btree ("_order");
  CREATE INDEX "sessions_content_how_it_runs_parent_id_idx" ON "sessions_content_how_it_runs" USING btree ("_parent_id");
  CREATE INDEX "sessions_content_afterwards_order_idx" ON "sessions_content_afterwards" USING btree ("_order");
  CREATE INDEX "sessions_content_afterwards_parent_id_idx" ON "sessions_content_afterwards" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_content_hero_quotes" CASCADE;
  DROP TABLE "home_content_model_stages" CASCADE;
  DROP TABLE "home_content_pillars_items" CASCADE;
  DROP TABLE "home_content" CASCADE;
  DROP TABLE "sessions_content_extra_session_points" CASCADE;
  DROP TABLE "sessions_content_how_it_runs" CASCADE;
  DROP TABLE "sessions_content_afterwards" CASCADE;
  DROP TABLE "sessions_content" CASCADE;`)
}
