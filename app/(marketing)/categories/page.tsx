import type { Metadata } from "next";
import { CategoryGrid } from "@/components/category-grid";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "All seventeen photography categories from Impressions by AJ — ten indoor & ceremony and seven outdoor shoots across New Jersey.",
  alternates: { canonical: "/categories" },
};

export const dynamic = "force-dynamic";

export default function CategoriesPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <span className="micro">All categories</span>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
            <h1 className="font-display text-4xl leading-[1.05] text-ink md:text-6xl">
              Seventeen reasons
              <br />
              <span className="italic">to pick up a camera.</span>
            </h1>
            <p className="max-w-xs font-sans text-sm text-body">
              Eleven indoor &amp; ceremony categories and six outdoor shoots —
              each with its own page, write-up and gallery.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-wash py-16 md:py-24">
        <CategoryGrid />
      </section>
    </>
  );
}
