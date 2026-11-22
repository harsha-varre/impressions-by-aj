import Image from "next/image";
import { cn } from "@/lib/utils";

type Ratio = "1/1" | "3/4" | "4/5" | "4/3" | "16/9" | "3/2" | "2/1" | "2/3";
type Accent = "rose" | "blush" | "mint" | "butter" | "lilac";

const ratioClass: Record<Ratio, string> = {
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
  "2/1": "aspect-[2/1]",
  "2/3": "aspect-[2/3]",
};

const stripeClass: Record<Accent, string> = {
  rose: "stripes-rose",
  blush: "stripes-blush",
  mint: "stripes-mint",
  butter: "stripes-butter",
  lilac: "stripes-lilac",
};

export interface ImageSlotProps {
  ratio?: Ratio;
  /** Mono caption shown on the placeholder / as the image label. */
  caption?: string;
  /** Where the mono caption sits inside the placeholder. */
  captionAlign?: "left" | "right";
  /** Accent colour of the striped placeholder. */
  accent?: Accent;
  /** Real photo source. When omitted, the striped placeholder renders. */
  src?: string;
  /** Alt text — required whenever a real image is shown; also used for the slot. */
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a real next/image when `src` is supplied, otherwise an accent-tinted
 * striped placeholder with an optional mono caption — mirroring the reference
 * design's repeating-linear-gradient slots.
 */
export function ImageSlot({
  ratio = "3/4",
  caption,
  captionAlign = "right",
  accent = "rose",
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
}: ImageSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        ratioClass[ratio],
        !src && stripeClass[accent],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? caption ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized
          className="object-cover"
        />
      ) : caption ? (
        <div
          className={cn(
            "absolute inset-0 flex items-end p-3",
            captionAlign === "right" ? "justify-end" : "justify-start"
          )}
        >
          <span className="font-mono text-[10px] lowercase tracking-wider text-ink/55">
            {caption}
          </span>
        </div>
      ) : null}
    </div>
  );
}
