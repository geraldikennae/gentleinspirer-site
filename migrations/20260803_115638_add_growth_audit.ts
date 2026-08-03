import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_subscribers_source" AS ENUM('letters', 'growth-audit');
  CREATE TABLE "growth_audit_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"ip" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "growth_audit_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"advice_clarity_line" varchar DEFAULT 'You are moving, but you have not named where.' NOT NULL,
  	"advice_clarity_means" varchar DEFAULT 'Effort is not your problem. Direction is. When the outcome is unnamed, every reasonable option looks equally worth doing, so energy spreads thin and progress feels like motion without distance. This is the most common constraint and the one people are most reluctant to admit, because working hard feels like proof that the direction is fine.' NOT NULL,
  	"advice_clarity_unlock" varchar DEFAULT 'One sentence, written down, that names the single outcome that matters most in the next ninety days. Then a second sentence naming what you are deliberately not doing to protect it. Clarity is not a feeling, it is a written decision you can be held to.' NOT NULL,
  	"advice_clarity_step" varchar DEFAULT 'Write the sentence today. Show it to one person who will tell you if it is vague. If they cannot repeat it back accurately, it is not clear yet.' NOT NULL,
  	"advice_structure_line" varchar DEFAULT 'It depends on you being present.' NOT NULL,
  	"advice_structure_means" varchar DEFAULT 'You know what you want, but the way things are built means nothing happens without you in the room. That is not a people problem or a motivation problem, it is a design problem. Systems that require your attention to function will always cap out at the size of your attention.' NOT NULL,
  	"advice_structure_unlock" varchar DEFAULT 'Move the important work onto a schedule and give every recurring decision a named owner. The test is simple: if you went quiet for a week, what would stop? Whatever stops is where the structure is missing.' NOT NULL,
  	"advice_structure_step" varchar DEFAULT 'Pick the one thing that only happens when you push it. Put it in the calendar on a fixed day, and write down who owns it besides you.' NOT NULL,
  	"advice_execution_line" varchar DEFAULT 'You start well and finish rarely.' NOT NULL,
  	"advice_execution_means" varchar DEFAULT 'The thinking is done and the plan is sound, but the gap between deciding and shipping is where things go quiet. Usually this is because the increments are too large to complete, so each one stays open long enough for the next idea to arrive and pull attention away.' NOT NULL,
  	"advice_execution_unlock" varchar DEFAULT 'Smaller increments with visible completion. Something you can genuinely finish this week, not something you can start this week. Visible progress is the fuel; without it, discipline burns out trying to run on willpower alone.' NOT NULL,
  	"advice_execution_step" varchar DEFAULT 'Take the biggest open thing and cut it down to one piece you can finish in five days. Finish that piece before touching anything else.' NOT NULL,
  	"advice_discipline_line" varchar DEFAULT 'It holds on good weeks and collapses on bad ones.' NOT NULL,
  	"advice_discipline_means" varchar DEFAULT 'You can do the work when conditions are right, which means the system is currently dependent on your mood. Motivation is what you reach for when the design is wrong, and it always runs out at exactly the moment it is needed most.' NOT NULL,
  	"advice_discipline_unlock" varchar DEFAULT 'Consistency over intensity. Something small enough to survive a difficult week is worth more than something ambitious that only survives good ones. The rhythm matters more than the volume.' NOT NULL,
  	"advice_discipline_step" varchar DEFAULT 'Halve one commitment until it is small enough that a bad week cannot break it. Then do not miss it for four weeks.' NOT NULL,
  	"advice_evolution_line" varchar DEFAULT 'You are consistent, but you are not learning.' NOT NULL,
  	"advice_evolution_means" varchar DEFAULT 'The system runs and the work gets done, which is further than most people get. What is missing is the honest look backwards, so the same inefficiencies quietly repeat and last year and this year look more similar than they should.' NOT NULL,
  	"advice_evolution_unlock" varchar DEFAULT 'A short review on a fixed rhythm, not one triggered by things going wrong. Twenty minutes weekly beats an hour quarterly, because it happens before problems compound rather than after.' NOT NULL,
  	"advice_evolution_step" varchar DEFAULT 'Book twenty minutes this Sunday. Ask what moved, what you avoided, and the one thing for next week. Same chair, same time, every week.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "subscribers" ADD COLUMN "source" "enum_subscribers_source" DEFAULT 'letters' NOT NULL;
  ALTER TABLE "subscribers" ADD COLUMN "growth_audit_overall" numeric;
  ALTER TABLE "subscribers" ADD COLUMN "growth_audit_band" varchar;
  ALTER TABLE "subscribers" ADD COLUMN "growth_audit_weakest" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "growth_audit_submissions_id" integer;
  ALTER TABLE "email_templates" ADD COLUMN "growth_audit_subject" varchar DEFAULT 'Your growth audit: {{band}}' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "growth_audit_intro_line" varchar DEFAULT 'Here is your result.' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "growth_audit_closing_note" varchar DEFAULT 'One thing before you go looking for a plan: work on the weakest stage, not the most interesting one. The stages run in order for a reason. A gap in Clarity makes everything after it look broken, and no amount of discipline fixes an outcome you have not named.' NOT NULL;
  ALTER TABLE "email_templates" ADD COLUMN "growth_audit_subscribed_note" varchar DEFAULT 'You are also on the letters now. One idea and one question, roughly weekly, around three hundred words. If it is not useful, unsubscribe and nothing is held against you.' NOT NULL;
  CREATE INDEX "growth_audit_submissions_ip_idx" ON "growth_audit_submissions" USING btree ("ip");
  CREATE INDEX "growth_audit_submissions_updated_at_idx" ON "growth_audit_submissions" USING btree ("updated_at");
  CREATE INDEX "growth_audit_submissions_created_at_idx" ON "growth_audit_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_growth_audit_submissions_fk" FOREIGN KEY ("growth_audit_submissions_id") REFERENCES "public"."growth_audit_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_growth_audit_submissions_i_idx" ON "payload_locked_documents_rels" USING btree ("growth_audit_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "growth_audit_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "growth_audit_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "growth_audit_submissions" CASCADE;
  DROP TABLE "growth_audit_content" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_growth_audit_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_growth_audit_submissions_i_idx";
  ALTER TABLE "subscribers" DROP COLUMN "source";
  ALTER TABLE "subscribers" DROP COLUMN "growth_audit_overall";
  ALTER TABLE "subscribers" DROP COLUMN "growth_audit_band";
  ALTER TABLE "subscribers" DROP COLUMN "growth_audit_weakest";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "growth_audit_submissions_id";
  ALTER TABLE "email_templates" DROP COLUMN "growth_audit_subject";
  ALTER TABLE "email_templates" DROP COLUMN "growth_audit_intro_line";
  ALTER TABLE "email_templates" DROP COLUMN "growth_audit_closing_note";
  ALTER TABLE "email_templates" DROP COLUMN "growth_audit_subscribed_note";
  DROP TYPE "public"."enum_subscribers_source";`)
}
