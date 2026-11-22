import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  supabaseConfigured,
} from "@/lib/supabase/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Temporary diagnostic. Reports only booleans/counts — never key values.
export async function GET() {
  const info: Record<string, unknown> = {
    hasUrl: !!SUPABASE_URL,
    urlHost: SUPABASE_URL ? new URL(SUPABASE_URL).host : null,
    hasAnonKey: !!SUPABASE_ANON_KEY,
    hasServiceKey: !!SUPABASE_SERVICE_ROLE_KEY,
    supabaseConfigured,
  };

  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !key) {
    info.result = "Supabase env not present in THIS deployment.";
    return NextResponse.json(info);
  }
  info.usingKey = SUPABASE_SERVICE_ROLE_KEY ? "service_role" : "anon";

  try {
    const supabase = createClient(SUPABASE_URL, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("photos")
      .select("slot")
      .order("sort_order", { ascending: true });
    info.rowCount = data?.length ?? 0;
    info.slots = data?.map((r) => r.slot) ?? [];
    info.readError = error ? `${error.message} [${error.code ?? ""}]` : null;
  } catch (e) {
    info.crash = e instanceof Error ? e.message : String(e);
  }
  return NextResponse.json(info);
}
