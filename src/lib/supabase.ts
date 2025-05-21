import { createClient } from "@supabase/supabase-js";

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase credentials are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
  );
}

// Create a dummy client if credentials are missing to prevent runtime errors
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient("https://placeholder-url.supabase.co", "placeholder-key");
