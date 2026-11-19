import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Cookie-bound Supabase client for Server Components, Route Handlers and
 * Server Actions. Used for auth (reading the signed-in admin).
 */
export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set({ name, value, ...options })
          );
        } catch {
          // Called from a Server Component where cookies are read-only — safe
          // to ignore; the middleware refreshes the session instead.
        }
      },
    },
  });
}
