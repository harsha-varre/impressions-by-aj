"use client";

import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { categories } from "@/lib/categories";
import { ImageSlot } from "./image-slot";
import { cn } from "@/lib/utils";

interface Tile {
  id: string;
  categorySlug: string;
  categoryTitle: string;
  caption: string;
  span: string;
}

// Build a varied masonry from the category list.
const spanPattern = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-3",
];

const tiles: Tile[] = categories.flatMap((c, ci) =>
  Array.from({ length: 2 }).map((_, j) => {
    const n = ci * 2 + j;
    return {
      id: `${c.slug}-${j}`,
      categorySlug: c.slug,
      categoryTitle: c.title,
      caption: `${c.title} · ${String(n + 1).padStart(2, "0")}`,
      span: spanPattern[n % spanPattern.length],
    };
  })
);

export function PortfolioMasonry() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filters = useMemo(
    () => [
      { slug: null, title: "All" },
      ...categories.map((c) => ({ slug: c.slug, title: c.title })),
    ],
    []
  );

  const visible = useMemo(
    () => (active ? tiles.filter((t) => t.categorySlug === active) : tiles),
    [active]
  );

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? null : (i - 1 + visible.length) % visible.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, visible.length]);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio by category">
        {filters.map((f) => {
          const isActive = active === f.slug;
          return (
            <button
              key={f.slug ?? "all"}
              type="button"
              onClick={() => setActive(f.slug)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-1.5 font-sans text-xs transition-colors",
                isActive
                  ? "border-rose bg-rose text-white"
                  : "border-hairline bg-cream text-body hover:border-rose hover:text-rose-deep"
              )}
            >
              {f.title}
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-6 md:auto-rows-[180px]">
        {visible.map((tile, i) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => setLightbox(i)}
            className={cn(
              "group relative block overflow-hidden text-left",
              tile.span
            )}
            aria-label={`Open ${tile.caption}`}
          >
            <ImageSlot
              ratio="1/1"
              caption={tile.caption}
              alt={`${tile.categoryTitle} photograph`}
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/70 to-transparent p-3 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {tile.caption}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio image viewer"
          >
            <button
              type="button"
              className="absolute right-5 top-5 text-white/90 hover:text-white"
              aria-label="Close viewer"
              onClick={() => setLightbox(null)}
            >
              <X className="h-7 w-7" />
            </button>
            <button
              type="button"
              className="absolute left-4 text-white/80 hover:text-white md:left-8"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) =>
                  i === null ? null : (i - 1 + visible.length) % visible.length
                );
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <div
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageSlot
                ratio="3/2"
                caption={visible[lightbox].caption}
                alt={`${visible[lightbox].categoryTitle} photograph, enlarged`}
                className="w-full"
                sizes="100vw"
              />
              <p className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-white/80">
                {visible[lightbox].caption}
              </p>
            </div>

            <button
              type="button"
              className="absolute right-4 text-white/80 hover:text-white md:right-8"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) =>
                  i === null ? null : (i + 1) % visible.length
                );
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
