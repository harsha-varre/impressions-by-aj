import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { site, nav } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-wash">
      <div className="shell py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-script text-3xl text-ink">{site.tagline}</p>
            <p className="mt-3 font-sans text-sm text-body">
              {site.serviceArea}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-rose-deep hover:text-rose-hover"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {site.email}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-rose-deep hover:text-rose-hover"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                {site.instagram}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="micro mb-1">Explore</span>
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-body transition-colors hover:text-rose-deep"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            New Jersey, USA
          </p>
        </div>
      </div>
    </footer>
  );
}
