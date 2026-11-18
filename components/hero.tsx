import { Heart } from "lucide-react";
import { ImageSlot } from "./image-slot";

/**
 * 16:9 striped panel (an ImageSlot that becomes a real photo when a src is
 * supplied). Eyebrow + headline sit lower-left; the final line is in the
 * Parisienne script. Two outline hearts mark the top corners, and a mono
 * caption sits bottom-right.
 */
export function Hero() {
  return (
    <section className="shell pt-8 md:pt-10">
      <div className="relative">
        <ImageSlot
          ratio="16/9"
          accent="blush"
          alt="Impressions by AJ — New Jersey photography"
          priority
          sizes="100vw"
          className="w-full"
        />

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
          <span className="micro">
            A New Jersey photography studio · Est. 2021
          </span>
          <h1 className="mt-4 font-display text-ink">
            <span className="block text-4xl italic leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Capturing moments,
            </span>
            <span className="mt-1 block font-script text-4xl not-italic text-rose-deep sm:text-5xl md:text-6xl lg:text-7xl">
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
