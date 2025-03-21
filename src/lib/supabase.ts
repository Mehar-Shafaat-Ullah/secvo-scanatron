
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Import the supabase client like this:
// import { supabaseClient } from "@/lib/supabase";

export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL || "https://hjbxuuvdtmaxuoyxlkdh.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqYnh1dXZkdG1heHVveXhsa2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NDIzNjksImV4cCI6MjA1ODExODM2OX0.eKRja5MR1aXl4MlPI324_QQHfiNu1SFm7BWnbBvDL3c"
);
