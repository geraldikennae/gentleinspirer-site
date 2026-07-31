import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_content_teachings_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"video_id" varchar
  );
  
  ALTER TABLE "home_content_teachings_videos" ADD CONSTRAINT "home_content_teachings_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_content_teachings_videos_order_idx" ON "home_content_teachings_videos" USING btree ("_order");
  CREATE INDEX "home_content_teachings_videos_parent_id_idx" ON "home_content_teachings_videos" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_content_teachings_videos" CASCADE;`)
}
