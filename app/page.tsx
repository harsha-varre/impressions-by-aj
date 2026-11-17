import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { IntroStrip } from "@/components/intro-strip";
import { CategoryGrid } from "@/components/category-grid";
import { CategoryCard } from "@/components/category-card";
import { ServiceTierCard } from "@/components/service-tier";
import { AboutBlock } from "@/components/about-block";
import { EnquiryForm } from "@/components/enquiry-form";
import { ImageSlot } from "@/components/image-slot";
import { SectionDivider } from "@/components/section-divider";
import { MotionSection } from "@/components/motion-section";
import { categories } from "@/lib/categories";
import { tiers, deliverables } from "@/lib/services";
import { site } from "@/lib/site";

const signature = categories.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStrip />

      {/* Signature categories */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <MotionSection>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="micro">Signature work</span>
                <h2 className="mt-3 max-w-xl font-display text-3xl italic leading-tight text-ink md:text-5xl">
                  Six of the moments we&rsquo;re asked for most.
                </h2>
              </div>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-rose-deep hover:text-rose-hover"
              >
                All 17 categories <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
              {signature.map((c, i) => (
                <CategoryCard key={c.slug} category={c} index={i + 1} />
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Full catalogue */}
      <section className="bg-blush/40 py-20 md:py-28">
        <div className="shell mb-12">
          <MotionSection>
            <span className="micro">The full catalogue</span>
            <h2 className="mt-3 max-w-2xl font-display text-3xl italic leading-tight text-ink md:text-5xl">
              Seventeen reasons to pick up a camera.
            </h2>
          </MotionSection>
        </div>
        <CategoryGrid />
      </section>

      {/* Portfolio preview */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <MotionSection>
            <div className="flex items-end justify-between">
              <div>
                <span className="micro">Portfolio</span>
                <h2 className="mt-3 font-display text-3xl italic leading-tight text-ink md:text-5xl">
                  A look at the frames.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden items-center gap-2 font-sans text-sm font-semibold text-rose-deep hover:text-rose-hover sm:inline-flex"
              >
                Open gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {categories.slice(0, 8).map((c, i) => (
                <ImageSlot
                  key={c.slug}
                  ratio="1/1"
                  caption={`${c.title} · ${String(i + 1).padStart(2, "0")}`}
                  alt={`${c.title} photograph`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ))}
            </div>
            <Link
              href="/portfolio"
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-rose-deep hover:text-rose-hover sm:hidden"
            >
              Open gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionSection>
        </div>
      </section>

      {/* Services preview — on blush */}
      <section className="bg-blush py-20 md:py-28">
        <div className="shell">
          <MotionSection>
            <SectionDivider label="Services · three tiers" />
            <h2 className="mt-8 max-w-2xl font-display text-3xl italic leading-tight text-ink md:text-5xl">
              Sessions that scale from one hour to the whole day.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-body">{deliverables}</p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => (
                <ServiceTierCard key={tier.id} tier={tier} />
              ))}
            </div>
            <Link
              href="/services"
              className="mt-10 inline-flex items-center gap-2 font-sans text-sm font-semibold text-rose-deep hover:text-rose-hover"
            >
              Add-ons &amp; full details <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionSection>
        </div>
      </section>

      {/* About preview */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <MotionSection>
            <AboutBlock />
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 font-sans text-sm font-semibold text-rose-deep hover:text-rose-hover"
            >
              More about the studio <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionSection>
        </div>
      </section>

      {/* Contact — on warm wash */}
      <section id="contact" className="bg-wash py-20 md:py-28">
        <div className="shell">
          <MotionSection className="grid gap-12 md:grid-cols-2">
            <div>
              <span className="micro">Enquire</span>
              <h2 className="mt-3 font-display text-3xl italic leading-tight text-ink md:text-5xl">
                Tell us about the day.
              </h2>
              <p className="mt-5 max-w-sm font-sans text-body">
                Share the occasion and a rough date and we&rsquo;ll come back
                with availability and a quote. {site.replyWindow}.
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
                {site.email} · {site.instagram}
              </p>
            </div>
            <div className="border border-hairline bg-cream p-6 md:p-8">
              <EnquiryForm />
            </div>
          </MotionSection>
        </div>
      </section>
    </>
  );
}
