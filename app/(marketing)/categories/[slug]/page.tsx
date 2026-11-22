import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ImageSlot } from "@/components/image-slot";
import { MotionSection } from "@/components/motion-section";
import { SectionDivider } from "@/components/section-divider";
import { JsonLd, categoryServiceJsonLd } from "@/lib/jsonld";
import {
  categories,
  getCategory,
  relatedCategories,
  accentFor,
} from "@/lib/categories";
import { getPhotos } from "@/lib/photos";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.title} photography`,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: `${category.title} photography · ${site.name}`,
      description: category.description,
      url: `${site.url}/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const photos = await getPhotos(category.slug);
  const related = relatedCategories(category.slug, 3);
  const accent = accentFor(categories.findIndex((c) => c.slug === category.slug) + 1);
  const galleryCount = Math.max(photos.length, category.gallery);
  const groupLabel =
    category.group === "indoor" ? "Indoor & ceremony" : "Outdoor shoots";

  return (
    <>
      <JsonLd data={categoryServiceJsonLd(category)} />

      {/* Hero */}
      <section className="bg-cream py-12 md:py-16">
        <div className="shell">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-rose-deep hover:text-rose-hover"
          >
            <ArrowLeft className="h-4 w-4" /> All categories
          </Link>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <span className="micro">{groupLabel}</span>
              <h1 className="mt-4 font-display text-4xl italic leading-[1.1] text-ink md:text-6xl">
                {category.title}
              </h1>
              <p className="mt-6 max-w-md font-sans text-body">
                {category.description}
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex h-12 items-center bg-rose px-8 font-sans text-sm font-semibold text-white transition-colors hover:bg-rose-hover"
              >
                Enquire about {category.title.toLowerCase()}
              </Link>
            </div>
            <ImageSlot
              ratio="4/5"
              accent={accent}
              src={photos[0]?.url}
              caption={`${category.slug} · 4:5`}
              captionAlign="left"
              alt={photos[0]?.alt ?? `${category.title} — Impressions by AJ`}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-blush/40 py-16 md:py-24">
        <div className="shell">
          <MotionSection>
            <SectionDivider label={`${category.title} · selected frames`} />
            <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
              {Array.from({ length: galleryCount }).map((_, i) => {
                const photo = photos[i];
                return (
                  <ImageSlot
                    key={i}
                    ratio={i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/5"}
                    accent={accent}
                    src={photo?.url}
                    caption={
                      photo
                        ? undefined
                        : `${category.slug} · ${String(i + 1).padStart(2, "0")}`
                    }
                    captionAlign="left"
                    alt={photo?.alt ?? `${category.title} photograph ${i + 1}`}
                    className="break-inside-avoid"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                );
              })}
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Related + CTA */}
      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <MotionSection>
            <SectionDivider label="Related categories" />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/categories/${r.slug}`}
                  className="group block"
                >
                  <ImageSlot
                    ratio="4/3"
                    caption={r.title}
                    alt={`${r.title} — Impressions by AJ`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <h3 className="mt-3 flex items-center gap-2 font-display text-lg text-ink transition-colors group-hover:text-rose-deep">
                    {r.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                </Link>
              ))}
            </div>
          </MotionSection>

          <MotionSection className="mt-20 border border-hairline bg-wash p-10 text-center md:p-16">
            <p className="font-script text-3xl text-rose-deep md:text-4xl">
              {site.tagline}
            </p>
            <h2 className="mt-4 font-display text-2xl italic text-ink md:text-3xl">
              Planning {category.title.toLowerCase()}? Let&rsquo;s talk.
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center bg-rose px-8 font-sans text-sm font-semibold text-white transition-colors hover:bg-rose-hover"
            >
              Start an enquiry
            </Link>
          </MotionSection>
        </div>
      </section>
    </>
  );
}
