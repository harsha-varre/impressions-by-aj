import type { Metadata } from "next";
import { Mail, Instagram, MapPin, Clock } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire with Impressions by AJ — share your occasion, session and date. New Jersey photography. Reply in ~24 hours.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    icon: Instagram,
    label: "Instagram",
    value: site.instagram,
    href: site.instagramUrl,
  },
  { icon: MapPin, label: "Service area", value: site.serviceArea },
  { icon: Clock, label: "Response", value: site.replyWindow },
];

export default function ContactPage() {
  return (
    <section className="bg-wash py-16 md:py-24">
      <div className="shell grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <span className="micro">Enquire</span>
          <h1 className="mt-4 font-display text-4xl italic leading-[1.1] text-ink md:text-6xl">
            Tell us about the day.
          </h1>
          <p className="mt-6 max-w-sm font-sans text-body">
            Share the occasion and a rough date and we&rsquo;ll come back with
            availability and a quote. The more you tell us, the better we can
            prepare.
          </p>

          <dl className="mt-10 grid gap-5 sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-3">
                <d.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-rose-deep"
                  aria-hidden="true"
                />
                <div>
                  <dt className="micro">{d.label}</dt>
                  <dd className="mt-1 font-sans text-sm text-body">
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
