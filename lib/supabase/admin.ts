import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "./config";

/**
 * Service-role Supabase client — bypasses RLS. SERVER ONLY. Never import this
 * into a Client Component or expose the key. Used for privileged writes
 * (storage uploads, photo row inserts/deletes) after the caller's admin
 * session has been verified.
 */
export function createAdminSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase admin is not configured.");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
