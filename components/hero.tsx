import { Heart } from "lucide-react";
import { ImageSlot } from "./image-slot";
import { getFirstPhoto } from "@/lib/photos";
import { cn } from "@/lib/utils";

/**
 * 16:9 panel — a real photo when the "hero" slot has one, otherwise the striped
 * placeholder. Eyebrow + headline sit lower-left; over a photo they sit on a
 * light translucent panel so the image stays bright and the text stays legible.
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
        <div className="absolute inset-0 flex items-end p-5 md:p-8 lg:p-10">
          <div
            className={cn(
              "max-w-2xl",
              photo &&
                "rounded-2xl bg-ink/30 px-5 py-4 backdrop-blur-sm md:px-7 md:py-6"
            )}
          >
            <span className={photo ? "micro text-white" : "micro"}>
              A New Jersey photography studio · Est. 2021
            </span>
            <h1
              className={cn(
                "mt-3 font-display",
                photo ? "text-white" : "text-ink"
              )}
            >
              <span className="block text-3xl italic leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl">
                Capturing moments,
              </span>
              <span
                className={cn(
                  "mt-1 block font-script text-3xl not-italic sm:text-4xl md:text-5xl lg:text-6xl",
                  photo ? "text-white" : "text-rose-deep"
                )}
              >
                frame by frame.
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
