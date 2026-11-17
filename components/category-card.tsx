import Link from "next/link";
import { ImageSlot } from "./image-slot";
import type { Category } from "@/lib/categories";

export function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const num = String(index).padStart(2, "0");
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block"
    >
      <ImageSlot
        ratio="1/1"
        index={num}
        caption={category.title}
        alt={`${category.title} — Impressions by AJ`}
        className="transition-transform duration-500 group-hover:scale-[1.01]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-mono text-[11px] text-rose-deep/70">{num}</span>
        <h3 className="font-display text-lg leading-tight text-ink transition-colors group-hover:text-rose-deep">
          {category.title}
        </h3>
      </div>
      <p className="mt-1 pl-7 font-sans text-xs text-muted">{category.blurb}</p>
    </Link>
  );
}
