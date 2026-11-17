import Image from "next/image";
import { cn } from "@/lib/utils";

type Ratio = "1/1" | "3/4" | "4/5" | "4/3" | "16/9" | "3/2";

const ratioClass: Record<Ratio, string> = {
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
};

export interface ImageSlotProps {
  /** Aspect ratio of the slot. */
  ratio?: Ratio;
  /** Mono caption shown on the placeholder / as the image label. */
  caption?: string;
  /** Real photo source. When omitted, the striped placeholder renders. */
  src?: string;
  /** Alt text — required whenever a real image is shown; also used for the slot. */
  alt?: string;
  /** Tiny two-digit index, e.g. category number. */
  index?: string;
  className?: string;
  /** Pass sizes for correctly-sized responsive images. */
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a real next/image when `src` is supplied, otherwise a striped
 * placeholder card with a mono caption — mirroring the reference design's
 * repeating-linear-gradient slots.
 */
export function ImageSlot({
  ratio = "3/4",
  caption,
  src,
  alt,
  index,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
}: ImageSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        ratioClass[ratio],
        !src && "image-stripes",
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
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAPrs6QAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end justify-between p-3">
          {index ? (
            <span className="font-mono text-[11px] text-rose-deep/70">
              {index}
            </span>
          ) : (
            <span aria-hidden="true" />
          )}
          {caption ? (
            <span className="max-w-[70%] text-right font-mono text-[10px] uppercase leading-tight tracking-wider text-muted">
              {caption}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
