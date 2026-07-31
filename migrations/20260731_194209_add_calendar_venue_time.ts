import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_sessions" ADD COLUMN "venue" varchar;
  ALTER TABLE "upcoming_sessions" ADD COLUMN "venue_link" varchar;
  UPDATE "upcoming_sessions" SET "venue" = 'TBC' WHERE "venue" IS NULL;
  ALTER TABLE "upcoming_sessions" ALTER COLUMN "venue" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_sessions" DROP COLUMN "venue";
  ALTER TABLE "upcoming_sessions" DROP COLUMN "venue_link";`)
}
