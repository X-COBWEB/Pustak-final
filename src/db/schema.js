import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(), //The left side is the variable name that we will be seeing in our dasboard
  name: varchar("name", { length: 50 }).notNull().unique(), //While the name inside the quotes are the ones that appear on our tables
  description: text("description").notNull(),
  subname: varchar("subname", { length: 100 }),
  createdat: timestamp("create_at").default(sql`CURRENT_TIMESTAMP`),
  upodatedat: timestamp("update_at").default(sql`CURRENT_TIMESTAMP`),
});
