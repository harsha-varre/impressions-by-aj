import type { Metadata } from "next";
import { PortfolioMasonry } from "@/components/portfolio-masonry";
import { getPortfolioPhotos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A masonry gallery of work from Impressions by AJ — filter by category and open any frame. New Jersey photography.",
  alternates: { canonical: "/portfolio" },
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const photos = await getPortfolioPhotos();
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="shell">
        <span className="micro">Portfolio</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-[1.1] text-ink md:text-6xl">
          Every frame has a reason.
        </h1>
        <p className="mt-6 max-w-xl font-sans text-body">
          Filter by category, then tap any image to open it.
        </p>
        <div className="mt-12">
          <PortfolioMasonry
            photos={photos.map((p) => ({
              id: p.id,
              url: p.url,
              alt: p.alt,
              categorySlug: p.categorySlug,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
