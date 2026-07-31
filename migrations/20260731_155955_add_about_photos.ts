import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_content_about_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  ALTER TABLE "home_content_about_photos" ADD CONSTRAINT "home_content_about_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_content_about_photos" ADD CONSTRAINT "home_content_about_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_content_about_photos_order_idx" ON "home_content_about_photos" USING btree ("_order");
  CREATE INDEX "home_content_about_photos_parent_id_idx" ON "home_content_about_photos" USING btree ("_parent_id");
  CREATE INDEX "home_content_about_photos_photo_idx" ON "home_content_about_photos" USING btree ("photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_content_about_photos" CASCADE;`)
}
