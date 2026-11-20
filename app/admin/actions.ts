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

export async function uploadPhotos(
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

  const slot = String(formData.get("slot") ?? "");
  if (!photoSlots.some((s) => s.key === slot)) {
    return { error: "Unknown photo slot." };
  }

  const files = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) {
    return { error: "Choose at least one image to upload." };
  }

  const admin = createAdminSupabase();

  // Determine the next sort order for this slot.
  const { data: existing } = await admin
    .from("photos")
    .select("sort_order")
    .eq("slot", slot)
    .order("sort_order", { ascending: false })
    .limit(1);
  let order = existing && existing.length ? existing[0].sort_order + 1 : 0;

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return { error: `"${file.name}" is not an image.` };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { error: `"${file.name}" is larger than 10MB.` };
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${slot}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;

    const { error: upErr } = await admin.storage
      .from(PHOTO_BUCKET)
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
    if (upErr) {
      return { error: `Upload failed: ${upErr.message}` };
    }

    const {
      data: { publicUrl },
    } = admin.storage.from(PHOTO_BUCKET).getPublicUrl(path);

    const { error: insErr } = await admin.from("photos").insert({
      slot,
      url: publicUrl,
      path,
      alt: null,
      sort_order: order,
    });
    if (insErr) {
      // Roll back the orphaned file.
      await admin.storage.from(PHOTO_BUCKET).remove([path]);
      return { error: `Could not save photo: ${insErr.message}` };
    }
    order += 1;
  }

  refresh();
  revalidatePath("/admin");
  return { ok: `Uploaded ${files.length} image${files.length > 1 ? "s" : ""}.` };
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
