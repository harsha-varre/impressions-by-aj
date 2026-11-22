import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Aperture, Film, Send } from "lucide-react";
import { ImageSlot } from "@/components/image-slot";
import { SectionDivider } from "@/components/section-divider";
import { MotionSection } from "@/components/motion-section";
import { getFirstPhoto } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Impressions by AJ — a New Jersey photographer covering South Asian ceremonies and family milestones. Gear, process and approach.",
  alternates: { canonical: "/about" },
};

const gear = [
  "Full-frame mirrorless bodies, dual card slots",
  "Fast primes — 35mm, 50mm, 85mm",
  "Zoom coverage — 24–70mm & 70–200mm",
  "Off-camera lighting for indoor ceremonies",
  "Licensed drone for aerial coverage",
  "Cinema rig for long-form film",
];

const process = [
  {
    icon: Send,
    title: "Enquire",
    body: "Tell us the occasion and date. We reply within ~24 hours with availability and a quote.",
  },
  {
    icon: Camera,
    title: "Plan",
    body: "We walk through the schedule, the must-have moments and any family rituals to watch for.",
  },
  {
    icon: Aperture,
    title: "Shoot",
    body: "On the day we stay close and quiet — covering the ritual, the room and the in-between.",
  },
  {
    icon: Film,
    title: "Deliver",
    body: "Selected edits, short reels and long-form film land in an online gallery you can share.",
  },
];

export const revalidate = 60;

export default async function AboutPage() {
  const portrait = await getFirstPhoto("about-aj");
  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="shell grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="micro">About the studio</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink md:text-6xl">
              A small studio with a{" "}
              <span className="italic">long memory.</span>
            </h1>
            <p className="mt-6 font-sans text-body">
              Impressions by AJ is a photography &amp; cinema studio based in New
              Jersey, built around South Asian ceremonies, family milestones, and
              the small moments between.
            </p>
            <p className="mt-4 font-sans text-body">
              Every booking comes with a conversation first — about the day, the
              family, the feeling. The pictures follow from there.
            </p>
          </div>
          <ImageSlot
            ratio="4/5"
            accent="blush"
            src={portrait?.url}
            caption="AJ · 4:5"
            alt={portrait?.alt ?? "Impressions by AJ, the photographer"}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-blush/40 py-16 md:py-24">
        <div className="shell">
          <MotionSection>
            <SectionDivider label="How it works · four steps" />
            <ol className="mt-10 grid gap-6 md:grid-cols-4">
              {process.map((step, i) => (
                <li
                  key={step.title}
                  className="border border-hairline bg-cream p-6"
                >
                  <div className="flex items-center justify-between">
                    <step.icon
                      className="h-6 w-6 text-rose-deep"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[11px] text-rose-deep/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-body">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </MotionSection>
        </div>
      </section>

      {/* Gear */}
      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <MotionSection>
            <SectionDivider label="In the bag" />
            <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {gear.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-hairline pb-4 font-sans text-body"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                  {item}
                </li>
              ))}
            </ul>
          </MotionSection>

          <MotionSection className="mt-16 text-center">
            <p className="font-script text-3xl text-rose-deep md:text-4xl">
              {site.tagline}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-12 items-center bg-rose px-8 font-sans text-sm font-semibold text-white transition-colors hover:bg-rose-hover"
            >
              Start an enquiry
            </Link>
          </MotionSection>
        </div>
      </section>
    </>
  );
}
