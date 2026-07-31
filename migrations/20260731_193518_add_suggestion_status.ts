import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_topic_suggestions_status" AS ENUM('New', 'Considering', 'Planned', 'Done');
  ALTER TABLE "topic_suggestions" ADD COLUMN "status" "enum_topic_suggestions_status" DEFAULT 'New' NOT NULL;
  ALTER TABLE "topic_suggestions" ADD COLUMN "admin_notes" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "topic_suggestions" DROP COLUMN "status";
  ALTER TABLE "topic_suggestions" DROP COLUMN "admin_notes";
  DROP TYPE "public"."enum_topic_suggestions_status";`)
}
