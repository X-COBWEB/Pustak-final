CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"subname" varchar(100),
	"create_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"update_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
