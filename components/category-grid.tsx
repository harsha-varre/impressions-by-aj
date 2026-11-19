import { indoorCategories, outdoorCategories } from "@/lib/categories";
import { getPhotosMap } from "@/lib/photos";
import { CategoryCard } from "./category-card";
import { SectionDivider } from "./section-divider";
import { MotionSection } from "./motion-section";

/** The full 17-card grid (4-up), split Indoor (10) / Outdoor (7). */
export async function CategoryGrid() {
  const photos = await getPhotosMap();
  const coverFor = (slug: string) => photos[slug]?.[0]?.url;

  return (
    <div className="shell">
      <MotionSection>
        <SectionDivider label="Indoor & ceremony" meta="10 categories" />
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {indoorCategories.map((category, i) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={i + 1}
              src={coverFor(category.slug)}
            />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mt-14">
        <SectionDivider label="Outdoor shoots" meta="7 categories" />
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {outdoorCategories.map((category, i) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={i + 11}
              src={coverFor(category.slug)}
            />
          ))}
        </div>
      </MotionSection>
    </div>
  );
}
