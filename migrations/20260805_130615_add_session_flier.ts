import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_sessions" ADD COLUMN "flier_id" integer;
  ALTER TABLE "upcoming_sessions" ADD CONSTRAINT "upcoming_sessions_flier_id_media_id_fk" FOREIGN KEY ("flier_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "upcoming_sessions_flier_idx" ON "upcoming_sessions" USING btree ("flier_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_sessions" DROP CONSTRAINT "upcoming_sessions_flier_id_media_id_fk";
  
  DROP INDEX "upcoming_sessions_flier_idx";
  ALTER TABLE "upcoming_sessions" DROP COLUMN "flier_id";`)
}
