import Link from "next/link";
import { Hero } from "@/components/hero";
import { IntroStrip } from "@/components/intro-strip";
import { CategoryGrid } from "@/components/category-grid";
import { ServiceTierCard } from "@/components/service-tier";
import { AboutBlock } from "@/components/about-block";
import { EnquiryForm } from "@/components/enquiry-form";
import { ImageSlot } from "@/components/image-slot";
import { MotionSection } from "@/components/motion-section";
import { tiers, servicesIntro } from "@/lib/services";
import { site } from "@/lib/site";

const previewTiles = [
  { accent: "blush", caption: "wedding · 2:3", span: "col-span-2 row-span-2" },
  { accent: "mint", caption: "corporate · 2:1", span: "col-span-2" },
  { accent: "lilac", caption: "cradle · 1:1", span: "col-span-1" },
  { accent: "butter", caption: "", span: "col-span-1" },
  { accent: "blush", caption: "maternity · 1:2", span: "col-span-1 row-span-2" },
  { accent: "mint", caption: "graduation · 2:1", span: "col-span-2" },
  { accent: "lilac", caption: "", span: "col-span-1" },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStrip />

      {/* Full catalogue */}
      <section className="mt-20 bg-wash py-20 md:py-28">
        <div className="shell mb-12">
          <MotionSection>
            <span className="micro">The full catalogue</span>
            <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
              <h2 className="font-display text-3xl leading-[1.05] text-ink md:text-5xl">
                Seventeen reasons
                <br />
                <span className="italic">to pick up a camera.</span>
              </h2>
              <p className="max-w-xs font-sans text-sm text-body">
                From the first candle on a baby&rsquo;s cake to a quiet corporate
                keynote.
              </p>
            </div>
          </MotionSection>
        </div>
        <CategoryGrid />
      </section>

      {/* Portfolio preview */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <MotionSection>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl text-ink md:text-5xl">
                <span className="italic">Portfolio</span> — selected frames.
              </h2>
              <Link
                href="/portfolio"
                className="inline-flex shrink-0 items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-rose-hover hover:text-rose-deep"
              >
                See the gallery <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 grid auto-rows-[90px] grid-cols-4 gap-4 md:auto-rows-[120px]">
              {previewTiles.map((t, i) => (
                <ImageSlot
                  key={i}
                  ratio="1/1"
                  accent={t.accent}
                  caption={t.caption || undefined}
                  captionAlign="left"
                  alt={t.caption || "Portfolio frame"}
                  className={`h-full w-full ${t.span}`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Services — on blush */}
      <section className="bg-blush py-20 md:py-28">
        <div className="shell">
          <MotionSection>
            <span className="micro">What&rsquo;s included</span>
            <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
              <h2 className="font-display text-3xl leading-tight text-ink md:text-5xl">
                One hour, or <span className="italic">the whole day.</span>
              </h2>
              <p className="max-w-xs font-sans text-sm text-body">
                {servicesIntro}
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => (
                <ServiceTierCard key={tier.id} tier={tier} />
              ))}
            </div>
            <Link
              href="/services"
              className="mt-10 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-rose-hover hover:text-rose-deep"
            >
              Add-ons &amp; full details <span aria-hidden="true">→</span>
            </Link>
          </MotionSection>
        </div>
      </section>

      {/* About preview */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <MotionSection>
            <AboutBlock />
          </MotionSection>
        </div>
      </section>

      {/* Contact — on warm wash */}
      <section id="contact" className="bg-wash py-20 md:py-28">
        <div className="shell">
          <MotionSection className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="micro">Enquire</span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-5xl">
                Let&rsquo;s talk about <span className="italic">your day.</span>
              </h2>
              <p className="mt-5 max-w-sm font-sans text-body">
                A short note is enough to start. I&rsquo;ll follow up with a
                quote shaped to the day&rsquo;s shape — not the other way around.
              </p>
              <dl className="mt-8 space-y-3">
                <div className="flex gap-6">
                  <dt className="micro w-16 shrink-0">Email</dt>
                  <dd className="font-sans text-sm text-body">{site.email}</dd>
                </div>
                <div className="flex gap-6">
                  <dt className="micro w-16 shrink-0">Area</dt>
                  <dd className="font-sans text-sm text-body">
                    In and around New Jersey
                  </dd>
                </div>
                <div className="flex gap-6">
                  <dt className="micro w-16 shrink-0">Social</dt>
                  <dd className="font-sans text-sm text-body">
                    {site.instagram}
                  </dd>
                </div>
              </dl>
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
