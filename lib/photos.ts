import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { categories } from "./categories";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  supabaseConfigured,
} from "./supabase/config";

export interface Photo {
  id: string;
  slot: string;
  url: string;
  path: string;
  alt: string | null;
  sort_order: number;
}

export interface PhotoSlot {
  key: string;
  label: string;
  group: string;
  /** Rough intent, for admin hints. */
  hint?: string;
}

/** Every slot the admin can manage. */
export const photoSlots: PhotoSlot[] = [
  { key: "hero", label: "Home hero", group: "Site", hint: "One wide 16:9 image." },
  ...categories.map<PhotoSlot>((c) => ({
    key: c.slug,
    label: c.title,
    group: c.group === "indoor" ? "Indoor & ceremony" : "Outdoor shoots",
    hint: "First image is the category cover; the rest fill its gallery.",
  })),
];

// Reads run only on the server (Server Components / ISR), so we use the
// service-role key when available — it bypasses RLS, so photos show regardless
// of table read policies. Falls back to the anon key. The key never reaches
// the browser (non-public env is stripped from client bundles).
function readClient() {
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY!;
  return createClient(SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Fetches all photos once per render and groups them by slot (React cache
 * dedupes the multiple callers on a page). Pages set `revalidate` for ISR, and
 * admin mutations call revalidatePath for near-instant refresh. Returns an
 * empty map when Supabase isn't configured, so the site renders placeholders.
 */
export const getPhotosMap = cache(
  async (): Promise<Record<string, Photo[]>> => {
    if (!supabaseConfigured) return {};
    try {
      const supabase = readClient();
      const { data, error } = await supabase
        .from("photos")
        .select("id, slot, url, path, alt, sort_order")
        .order("sort_order", { ascending: true });
      if (error || !data) return {};
      const map: Record<string, Photo[]> = {};
      for (const row of data as Photo[]) {
        (map[row.slot] ??= []).push(row);
      }
      return map;
    } catch {
      return {};
    }
  }
);

export async function getPhotos(slot: string): Promise<Photo[]> {
  const map = await getPhotosMap();
  return map[slot] ?? [];
}

export async function getFirstPhoto(slot: string): Promise<Photo | null> {
  const list = await getPhotos(slot);
  return list[0] ?? null;
}

/** All category photos flattened, for the portfolio gallery. */
export async function getPortfolioPhotos(): Promise<
  (Photo & { categorySlug: string })[]
> {
  const map = await getPhotosMap();
  const out: (Photo & { categorySlug: string })[] = [];
  for (const c of categories) {
    for (const p of map[c.slug] ?? []) {
      out.push({ ...p, categorySlug: c.slug });
    }
  }
  return out;
}
