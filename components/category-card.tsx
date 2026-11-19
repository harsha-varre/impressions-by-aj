import Link from "next/link";
import { ImageSlot } from "./image-slot";
import { accentFor, type Category } from "@/lib/categories";

/**
 * A colored striped square (or the category's cover photo) with a cream footer
 * holding the two-digit index and the Caslon title.
 */
export function CategoryCard({
  category,
  index,
  src,
}: {
  category: Category;
  index: number;
  src?: string;
}) {
  const num = String(index).padStart(2, "0");
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block border border-hairline bg-cream transition-colors hover:border-rose/50"
    >
      <div className="p-2">
        <ImageSlot
          ratio="1/1"
          accent={accentFor(index)}
          src={src}
          alt={`${category.title} — Impressions by AJ`}
          className="transition-transform duration-500 group-hover:scale-[1.01]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="px-4 pb-4 pt-1">
        <span className="font-mono text-[11px] text-rose-hover">{num}</span>
        <h3 className="mt-1 font-display text-lg leading-tight text-ink transition-colors group-hover:text-rose-deep">
          {category.title}
        </h3>
      </div>
    </Link>
  );
}
