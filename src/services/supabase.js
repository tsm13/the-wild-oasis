import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wgzbocbfqqiybshzmfvx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnemJvY2JmcXFpeWJzaHptZnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NzcyNjMsImV4cCI6MjAxODE1MzI2M30.kOQSA0oqzyyNiZwq5CtJ6ah1ORQszvMhBry40Mukdy4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
