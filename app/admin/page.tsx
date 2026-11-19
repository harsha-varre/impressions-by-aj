import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { supabaseAdminConfigured } from "@/lib/supabase/config";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { type Photo } from "@/lib/photos";
import { AdminManager } from "./admin-manager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const photosBySlot: Record<string, Photo[]> = {};
  if (supabaseAdminConfigured) {
    const admin = createAdminSupabase();
    const { data } = await admin
      .from("photos")
      .select("id, slot, url, path, alt, sort_order")
      .order("sort_order", { ascending: true });
    for (const row of (data ?? []) as Photo[]) {
      (photosBySlot[row.slot] ??= []).push(row);
    }
  }

  return (
    <AdminManager
      userEmail={user.email ?? ""}
      photosBySlot={photosBySlot}
      serviceReady={supabaseAdminConfigured}
    />
  );
}
