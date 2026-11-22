"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { Trash2, UploadCloud, LogOut, Check, Loader2 } from "lucide-react";
import {
  createUploadUrl,
  recordPhoto,
  deletePhoto,
  signOut,
  type ActionState,
} from "./actions";
import { photoSlots, type Photo } from "@/lib/photos";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { PHOTO_BUCKET } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const groups = ["Site", "Indoor & ceremony", "Outdoor shoots"];
const MAX_BYTES = 25 * 1024 * 1024;

function UploadForm({ slot }: { slot: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [msg, setMsg] = useState<{ ok?: string; error?: string }>({});

  async function handleUpload() {
    const files = Array.from(inputRef.current?.files ?? []);
    if (files.length === 0) {
      setMsg({ error: "Choose at least one image first." });
      return;
    }
    setBusy(true);
    setMsg({});

    const supabase = createBrowserSupabase();
    let done = 0;
    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          setMsg({ error: `"${file.name}" isn't an image.` });
          setBusy(false);
          return;
        }
        if (file.size > MAX_BYTES) {
          setMsg({ error: `"${file.name}" is over 25MB.` });
          setBusy(false);
          return;
        }

        setProgress(`Uploading ${done + 1} of ${files.length}…`);

        const signed = await createUploadUrl(slot, file.name);
        if (signed.error || !signed.path || !signed.token) {
          setMsg({ error: signed.error ?? "Could not start upload." });
          setBusy(false);
          return;
        }

        const { error: upErr } = await supabase.storage
          .from(PHOTO_BUCKET)
          .uploadToSignedUrl(signed.path, signed.token, file, {
            contentType: file.type,
          });
        if (upErr) {
          setMsg({ error: `Upload failed: ${upErr.message}` });
          setBusy(false);
          return;
        }

        const rec = await recordPhoto(slot, signed.path);
        if (rec.error) {
          setMsg({ error: rec.error });
          setBusy(false);
          return;
        }
        done += 1;
      }

      if (inputRef.current) inputRef.current.value = "";
      setMsg({ ok: `Uploaded ${done} image${done === 1 ? "" : "s"}.` });
      router.refresh();
    } catch (err) {
      setMsg({
        error: err instanceof Error ? err.message : "Upload failed.",
      });
    } finally {
      setProgress("");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label
        htmlFor={`files-${slot}`}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-rose/50 bg-white/50 px-6 py-10 text-center transition-colors hover:border-rose hover:bg-blush/30"
      >
        <UploadCloud className="h-6 w-6 text-rose-deep" aria-hidden="true" />
        <span className="font-sans text-sm text-body">
          Choose images (JPG / PNG / WebP, up to 25MB each)
        </span>
        <input
          ref={inputRef}
          id={`files-${slot}`}
          type="file"
          accept="image/*"
          multiple
          disabled={busy}
          className="block w-full text-xs text-muted file:mr-3 file:border-0 file:bg-blush file:px-3 file:py-1.5 file:font-sans file:text-xs file:text-rose-deep"
        />
      </label>
      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleUpload} disabled={busy}>
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {progress || "Uploading…"}
            </>
          ) : (
            "Upload"
          )}
        </Button>
        {msg.ok ? (
          <span className="flex items-center gap-1 font-sans text-xs text-rose-deep">
            <Check className="h-3.5 w-3.5" /> {msg.ok}
          </span>
        ) : null}
        {msg.error ? (
          <span className="font-sans text-xs text-rose-deep" role="alert">
            {msg.error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function DeleteButton({ photo }: { photo: Photo }) {
  const [, action] = useFormState<ActionState, FormData>(deletePhoto, {});
  return (
    <form action={action}>
      <input type="hidden" name="id" value={photo.id} />
      <input type="hidden" name="path" value={photo.path} />
      <DeleteSubmit />
    </form>
  );
}

function DeleteSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Delete photo"
      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity hover:bg-rose-deep group-hover:opacity-100 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function AdminManager({
  userEmail,
  photosBySlot,
  serviceReady,
}: {
  userEmail: string;
  photosBySlot: Record<string, Photo[]>;
  serviceReady: boolean;
}) {
  const [selected, setSelected] = useState(photoSlots[0].key);
  const current = photoSlots.find((s) => s.key === selected) ?? photoSlots[0];
  const photos = photosBySlot[selected] ?? [];

  const grouped = useMemo(
    () =>
      groups.map((g) => ({
        group: g,
        slots: photoSlots.filter((s) => s.group === g),
      })),
    []
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="micro">Studio admin</span>
          <h1 className="font-display text-2xl text-ink">Photos</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted">{userEmail}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-rose-deep hover:text-rose-hover"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </div>

      {!serviceReady ? (
        <p className="mt-6 border border-rose/40 bg-blush/40 p-4 font-sans text-sm text-rose-deep">
          The Supabase service role key isn&rsquo;t set, so uploads are disabled.
          Add <code className="font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          in Vercel and redeploy.
        </p>
      ) : null}

      <div className="mt-6 grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Slot list */}
        <nav className="space-y-6" aria-label="Photo slots">
          {grouped.map(({ group, slots }) => (
            <div key={group}>
              <p className="micro mb-2">{group}</p>
              <ul className="space-y-1">
                {slots.map((s) => {
                  const count = (photosBySlot[s.key] ?? []).length;
                  const active = s.key === selected;
                  return (
                    <li key={s.key}>
                      <button
                        type="button"
                        onClick={() => setSelected(s.key)}
                        className={cn(
                          "flex w-full items-center justify-between px-3 py-2 text-left font-sans text-sm transition-colors",
                          active
                            ? "bg-rose text-white"
                            : "text-body hover:bg-blush/50"
                        )}
                      >
                        <span>{s.label}</span>
                        <span
                          className={cn(
                            "font-mono text-[11px]",
                            active ? "text-white/80" : "text-muted"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Selected slot */}
        <section>
          <h2 className="font-display text-xl text-ink">{current.label}</h2>
          {current.hint ? (
            <p className="mt-1 font-sans text-sm text-muted">{current.hint}</p>
          ) : null}

          <div className="mt-5">
            <UploadForm key={selected} slot={selected} />
          </div>

          <div className="mt-8">
            <p className="micro mb-3">
              {photos.length} photo{photos.length === 1 ? "" : "s"}
            </p>
            {photos.length === 0 ? (
              <p className="font-sans text-sm text-muted">
                No photos yet — the site shows a placeholder for this slot.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo, i) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square overflow-hidden border border-hairline bg-cream"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.alt ?? current.label}
                      className="h-full w-full object-cover"
                    />
                    {i === 0 ? (
                      <span className="absolute left-2 top-2 bg-ink/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
                        Cover
                      </span>
                    ) : null}
                    <DeleteButton photo={photo} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
