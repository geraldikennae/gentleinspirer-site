import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_sessions" ADD COLUMN "venue" varchar NOT NULL;
  ALTER TABLE "upcoming_sessions" ADD COLUMN "venue_link" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_sessions" DROP COLUMN "venue";
  ALTER TABLE "upcoming_sessions" DROP COLUMN "venue_link";`)
}
