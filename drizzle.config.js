import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.js", //A schema of a database is the blueprint or structure that defines how data is organized and stored in a database. It describes the tables, fields (columns), relationships, constraints, and other elements that make up the database. Essentially, it provides a logical view of the entire database.
  out: "./drizzle",
  dialect: "postgresql",
  dbcredentials: {
    url: "postgresql://postgres.cahyyznyxqryqmvrdkry:7PaR@Q42RLK!6b7@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  },
});
