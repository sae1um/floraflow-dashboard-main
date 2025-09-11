CREATE TABLE "greenhouses" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text,
	"room" text,
	"location" text,
	"ownerId" text,
	"claimed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "greenhouseReadings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"greenhouse_id" varchar(36),
	"temperature" numeric(5, 2),
	"humidity" numeric(5, 2),
	"co2" integer,
	"water_level" numeric(5, 2),
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT 'None',
	"created_at" timestamp (6) with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "greenhouses" ADD CONSTRAINT "greenhouses_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "greenhouseReadings" ADD CONSTRAINT "greenhouseReadings_greenhouse_id_greenhouses_id_fk" FOREIGN KEY ("greenhouse_id") REFERENCES "public"."greenhouses"("id") ON DELETE no action ON UPDATE no action;