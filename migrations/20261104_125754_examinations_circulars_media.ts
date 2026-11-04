import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_examinations_circulars_circular_list_category" AS ENUM('Timetable', 'Fee', 'Results', 'Notice', 'Condonation');
  CREATE TYPE "payload"."enum__examinations_circulars_v_version_circular_list_category" AS ENUM('Timetable', 'Fee', 'Results', 'Notice', 'Condonation');
  CREATE TABLE "payload"."examinations_circulars_circular_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" "payload"."enum_examinations_circulars_circular_list_category",
  	"date" varchar,
  	"file" varchar,
  	"item_id" varchar
  );
  
  CREATE TABLE "payload"."_examinations_circulars_v_version_circular_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" "payload"."enum__examinations_circulars_v_version_circular_list_category",
  	"date" varchar,
  	"file" varchar,
  	"item_id" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "payload"."media" ADD COLUMN "prefix" varchar DEFAULT '';
  ALTER TABLE "payload"."examinations_circulars_circular_list" ADD CONSTRAINT "examinations_circulars_circular_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."examinations_circulars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_examinations_circulars_v_version_circular_list" ADD CONSTRAINT "_examinations_circulars_v_version_circular_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_examinations_circulars_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "examinations_circulars_circular_list_order_idx" ON "payload"."examinations_circulars_circular_list" USING btree ("_order");
  CREATE INDEX "examinations_circulars_circular_list_parent_id_idx" ON "payload"."examinations_circulars_circular_list" USING btree ("_parent_id");
  CREATE INDEX "_examinations_circulars_v_version_circular_list_order_idx" ON "payload"."_examinations_circulars_v_version_circular_list" USING btree ("_order");
  CREATE INDEX "_examinations_circulars_v_version_circular_list_parent_id_idx" ON "payload"."_examinations_circulars_v_version_circular_list" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."examinations_circulars_circular_list" CASCADE;
  DROP TABLE "payload"."_examinations_circulars_v_version_circular_list" CASCADE;
  ALTER TABLE "payload"."media" DROP COLUMN "prefix";
  DROP TYPE "payload"."enum_examinations_circulars_circular_list_category";
  DROP TYPE "payload"."enum__examinations_circulars_v_version_circular_list_category";`)
}
