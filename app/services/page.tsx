import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ServiceTierCard } from "@/components/service-tier";
import { SectionDivider } from "@/components/section-divider";
import { MotionSection } from "@/components/motion-section";
import { tiers, addOns, deliverables } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three photography tiers — Essential (1–2 hr), Signature (3–4 hr) and Archive (5–6 hr) — plus drone, second shooter, long-form film and same-day reel add-ons.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <span className="micro">Services</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-[1.1] text-ink md:text-6xl">
            Three tiers, one standard of care.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-body">{deliverables}</p>
        </div>
      </section>

      {/* Tiers — on blush */}
      <section className="bg-blush py-16 md:py-24">
        <div className="shell">
          <MotionSection>
            <SectionDivider label="Coverage tiers" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => (
                <ServiceTierCard key={tier.id} tier={tier} />
              ))}
            </div>
          </MotionSection>

          <MotionSection className="mt-20">
            <SectionDivider label="Add-ons" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {addOns.map((addon) => (
                <div
                  key={addon.id}
                  className="border border-hairline bg-cream p-6"
                >
                  <Plus className="h-5 w-5 text-rose-deep" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg text-ink">
                    {addon.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-body">
                    {addon.detail}
                  </p>
                </div>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Day-rate note + CTA */}
      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <MotionSection className="border border-hairline bg-wash p-10 md:flex md:items-center md:justify-between md:p-14">
            <div className="max-w-lg">
              <span className="micro">Weddings &amp; arangetrams</span>
              <h2 className="mt-3 font-display text-2xl italic text-ink md:text-3xl">
                Custom day rates for the big ones.
              </h2>
              <p className="mt-4 font-sans text-body">
                Full-day weddings and arangetrams are quoted per event so the
                coverage fits the schedule. Tell us the date and we&rsquo;ll
                build it around you.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center bg-rose px-8 font-sans text-sm font-semibold text-white transition-colors hover:bg-rose-hover md:mt-0"
            >
              Request a quote
            </Link>
          </MotionSection>
          <p className="mt-10 text-center font-mono text-xs uppercase tracking-wider text-muted">
            {site.replyWindow} · {site.email}
          </p>
        </div>
      </section>
    </>
  );
}
