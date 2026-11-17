import { indoorCategories, outdoorCategories } from "@/lib/categories";
import { CategoryCard } from "./category-card";
import { SectionDivider } from "./section-divider";
import { MotionSection } from "./motion-section";

/** The full 17-card grid, split Indoor (10) / Outdoor (7). */
export function CategoryGrid() {
  return (
    <div className="shell">
      <MotionSection>
        <SectionDivider label="Indoor & ceremony · 10 categories" />
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {indoorCategories.map((category, i) => (
            <CategoryCard key={category.slug} category={category} index={i + 1} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mt-16">
        <SectionDivider label="Outdoor shoots · 7 categories" />
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {outdoorCategories.map((category, i) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={i + 11}
            />
          ))}
        </div>
      </MotionSection>
    </div>
  );
}
