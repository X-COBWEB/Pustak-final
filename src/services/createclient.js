import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cahyyznyxqryqmvrdkry.supabase.co/auth/v1/callback",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhaHl5em55eHFyeXFtdnJka3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMjE4NzMsImV4cCI6MjA1MDc5Nzg3M30.UMlRcCmCsykUz7jmsJ6tH-OW3eJ4EgQ4vquKr-nI2jE"
);
