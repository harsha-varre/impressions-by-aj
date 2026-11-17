import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageSlot } from "@/components/image-slot";
import { SectionDivider } from "@/components/section-divider";
import { MotionSection } from "@/components/motion-section";
import { indoorCategories, outdoorCategories } from "@/lib/categories";
import type { Category } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "All seventeen photography categories from Impressions by AJ — ten indoor & ceremony and seven outdoor shoots across New Jersey.",
  alternates: { canonical: "/categories" },
};

const accentBg: Record<Category["accent"], string> = {
  wash: "bg-wash",
  blush: "bg-blush",
  mint: "bg-mint",
  lilac: "bg-lilac",
  butter: "bg-butter",
};

function HeroCard({ category, index }: { category: Category; index: number }) {
  const num = String(index).padStart(2, "0");
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block overflow-hidden border border-hairline"
    >
      <div className={`${accentBg[category.accent]} p-1`}>
        <ImageSlot
          ratio="4/3"
          caption={category.title}
          alt={`${category.title} — Impressions by AJ`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="bg-cream p-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] text-rose-deep/70">{num}</span>
          <h3 className="font-display text-xl text-ink transition-colors group-hover:text-rose-deep">
            {category.title}
          </h3>
        </div>
        <p className="mt-2 font-sans text-sm text-body">{category.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-semibold text-rose-deep">
          View category <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function CategoriesPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <span className="micro">All categories</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-[1.1] text-ink md:text-6xl">
            Seventeen reasons to pick up a camera.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-body">
            Ten indoor &amp; ceremony categories and seven outdoor shoots. Each
            one has its own page, write-up and gallery.
          </p>
        </div>
      </section>

      <section className="bg-blush/40 py-16 md:py-24">
        <div className="shell">
          <MotionSection>
            <SectionDivider label="Indoor & ceremony · 10 categories" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {indoorCategories.map((c, i) => (
                <HeroCard key={c.slug} category={c} index={i + 1} />
              ))}
            </div>
          </MotionSection>

          <MotionSection className="mt-20">
            <SectionDivider label="Outdoor shoots · 7 categories" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {outdoorCategories.map((c, i) => (
                <HeroCard key={c.slug} category={c} index={i + 11} />
              ))}
            </div>
          </MotionSection>
        </div>
      </section>
    </>
  );
}
