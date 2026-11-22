"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminSupabase } from "@/lib/supabase/admin";
import {
  PHOTO_BUCKET,
  supabaseConfigured,
  supabaseAdminConfigured,
} from "@/lib/supabase/config";
import { CACHE_TAG, photoSlots } from "@/lib/photos";

export type ActionState = { error?: string; ok?: string };

/** Confirm there is a signed-in admin before any privileged write. */
async function requireUser() {
  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authorised.");
  return user;
}

export async function signIn(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  if (!supabaseConfigured) {
    return { error: "Supabase isn't configured (missing URL / anon key)." };
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    // Surface the real reason to help diagnose setup issues.
    const code = error.code ?? error.status ?? "";
    return { error: `${error.message}${code ? ` [${code}]` : ""}` };
  }
  if (!data.user) {
    return { error: "Signed in but no user returned — check your keys." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function refresh() {
  revalidateTag(CACHE_TAG);
  revalidatePath("/", "layout");
}

function sanitizeExt(filename: string): string {
  const ext = (filename.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return ext || "jpg";
}

/**
 * Step 1 of an upload: mint a signed URL so the browser can send the (large)
 * file straight to Supabase Storage, bypassing the serverless body limit.
 */
export async function createUploadUrl(
  slot: string,
  filename: string
): Promise<{ path?: string; token?: string; error?: string }> {
  try {
    await requireUser();
  } catch {
    return { error: "Your session expired. Please sign in again." };
  }
  if (!supabaseAdminConfigured) {
    return { error: "Supabase service role key is not configured." };
  }
  if (!photoSlots.some((s) => s.key === slot)) {
    return { error: "Unknown photo slot." };
  }

  const path = `${slot}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${sanitizeExt(filename)}`;

  const admin = createAdminSupabase();
  const { data, error } = await admin.storage
    .from(PHOTO_BUCKET)
    .createSignedUploadUrl(path);
  if (error || !data) {
    return { error: `Could not start upload: ${error?.message ?? "unknown"}` };
  }
  return { path: data.path, token: data.token };
}

/**
 * Step 2 of an upload: once the browser has pushed the file to `path`, record
 * the row so the site can show it.
 */
export async function recordPhoto(
  slot: string,
  path: string
): Promise<ActionState> {
  try {
    await requireUser();
  } catch {
    return { error: "Your session expired. Please sign in again." };
  }
  if (!supabaseAdminConfigured) {
    return { error: "Supabase service role key is not configured." };
  }
  if (!photoSlots.some((s) => s.key === slot)) {
    return { error: "Unknown photo slot." };
  }

  const admin = createAdminSupabase();

  const { data: existing } = await admin
    .from("photos")
    .select("sort_order")
    .eq("slot", slot)
    .order("sort_order", { ascending: false })
    .limit(1);
  const order = existing && existing.length ? existing[0].sort_order + 1 : 0;

  const {
    data: { publicUrl },
  } = admin.storage.from(PHOTO_BUCKET).getPublicUrl(path);

  const { error } = await admin.from("photos").insert({
    slot,
    url: publicUrl,
    path,
    alt: null,
    sort_order: order,
  });
  if (error) {
    await admin.storage.from(PHOTO_BUCKET).remove([path]);
    return { error: `Could not save photo: ${error.message}` };
  }

  refresh();
  revalidatePath("/admin");
  return { ok: "Uploaded." };
}

export async function deletePhoto(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireUser();
  } catch {
    return { error: "Your session expired. Please sign in again." };
  }
  if (!supabaseAdminConfigured) {
    return { error: "Supabase service role key is not configured." };
  }

  const id = String(formData.get("id") ?? "");
  const path = String(formData.get("path") ?? "");
  if (!id) return { error: "Missing photo id." };

  const admin = createAdminSupabase();
  if (path) {
    await admin.storage.from(PHOTO_BUCKET).remove([path]);
  }
  const { error } = await admin.from("photos").delete().eq("id", id);
  if (error) return { error: `Could not delete: ${error.message}` };

  refresh();
  revalidatePath("/admin");
  return { ok: "Photo removed." };
}
