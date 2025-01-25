import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionstring =
  "postgresql://postgres.cahyyznyxqryqmvrdkry:7PaR@Q42RLK!6b7@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";
export const connection = postgres(connectionstring);
export const db = drizzle(connection);
