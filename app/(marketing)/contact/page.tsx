import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire with Impressions by AJ — share your occasion and session. New Jersey photography. Reply in ~24 hours.",
  alternates: { canonical: "/contact" },
};

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Area", value: "In and around New Jersey" },
  { label: "Social", value: site.instagram, href: site.instagramUrl },
];

export default function ContactPage() {
  return (
    <section className="bg-wash py-16 md:py-24">
      <div className="shell grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <span className="micro">Enquire</span>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink md:text-6xl">
            Let&rsquo;s talk about <span className="italic">your day.</span>
          </h1>
          <p className="mt-6 max-w-sm font-sans text-body">
            A short note is enough to start. I&rsquo;ll follow up with a quote
            shaped to the day&rsquo;s shape — not the other way around.
          </p>

          <dl className="mt-10 space-y-4">
            {details.map((d) => (
              <div key={d.label} className="flex gap-6">
                <dt className="micro w-16 shrink-0">{d.label}</dt>
                <dd className="font-sans text-sm text-body">
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel={d.href.startsWith("http") ? "noreferrer" : undefined}
                      className="hover:text-rose-deep"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border border-hairline bg-cream p-6 md:p-8">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
