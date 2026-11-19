import { Heart } from "lucide-react";
import { ImageSlot } from "./image-slot";
import { getFirstPhoto } from "@/lib/photos";

/**
 * 16:9 panel — a real photo when the "hero" slot has one, otherwise the striped
 * placeholder. Eyebrow + headline sit lower-left; the final line is script.
 */
export async function Hero() {
  const photo = await getFirstPhoto("hero");

  return (
    <section className="shell pt-8 md:pt-10">
      <div className="relative">
        <ImageSlot
          ratio="16/9"
          accent="blush"
          src={photo?.url}
          alt={photo?.alt ?? "Impressions by AJ — New Jersey photography"}
          priority
          sizes="100vw"
          className="w-full"
        />

        {/* Legibility scrim only when a real photo is present */}
        {photo ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
            aria-hidden="true"
          />
        ) : null}

        {/* Decorative hearts */}
        <Heart
          className="absolute left-5 top-5 h-7 w-7 rotate-[-10deg] text-rose/70 md:left-8 md:top-8 md:h-9 md:w-9"
          aria-hidden="true"
        />
        <Heart
          className="absolute right-5 top-5 h-5 w-5 rotate-[12deg] text-rose-soft md:right-8 md:top-8 md:h-7 md:w-7"
          aria-hidden="true"
        />

        {/* Overlay copy, lower-left */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
          <span className={photo ? "micro text-rose-soft" : "micro"}>
            A New Jersey photography studio · Est. 2021
          </span>
          <h1 className={photo ? "mt-4 font-display text-white" : "mt-4 font-display text-ink"}>
            <span className="block text-4xl italic leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Capturing moments,
            </span>
            <span
              className={
                photo
                  ? "mt-1 block font-script text-4xl not-italic text-rose-soft sm:text-5xl md:text-6xl lg:text-7xl"
                  : "mt-1 block font-script text-4xl not-italic text-rose-deep sm:text-5xl md:text-6xl lg:text-7xl"
              }
            >
              frame by frame.
            </span>
          </h1>
        </div>

        {/* Mono caption */}
        <span className="absolute bottom-5 right-5 bg-cream/80 px-2 py-1 font-mono text-[11px] text-ink/60 md:bottom-8 md:right-8">
          hero · 16:9
        </span>
      </div>
    </section>
  );
}
