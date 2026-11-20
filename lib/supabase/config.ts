// Strip any trailing slash so endpoints aren't built with a double slash.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
  /\/+$/,
  ""
);
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Storage bucket that holds uploaded photos. */
export const PHOTO_BUCKET = "photos";

/** True when the public (read) Supabase client can be created. */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** True when privileged (upload/delete) operations are possible. */
export const supabaseAdminConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
);
