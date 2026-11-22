import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client — used only in the admin UI to upload files
 * directly to Storage (bypassing the serverless request-body size limit).
 */
export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
