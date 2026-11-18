import Link from "next/link";
import { Heart } from "lucide-react";

/**
 * 16:9 blush panel. Italic Caslon headline with the final line in Parisienne,
 * an eyebrow micro-label, and two decorative hearts (rose + mint).
 */
export function Hero() {
  return (
    <section className="shell pt-8 md:pt-12">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-blush md:aspect-video">
        {/* Decorative hearts */}
        <Heart
          className="absolute left-[8%] top-[18%] h-8 w-8 rotate-[-12deg] fill-rose-soft text-rose-soft md:h-11 md:w-11"
          aria-hidden="true"
        />
        <Heart
          className="absolute bottom-[16%] right-[12%] h-6 w-6 rotate-[14deg] fill-mint text-mint md:h-9 md:w-9"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="micro">New Jersey · Est. photography studio</span>
          <h1 className="mt-5 max-w-3xl font-display text-ink">
            <span className="block text-3xl italic leading-[1.1] sm:text-5xl md:text-6xl">
              Seventeen reasons to
            </span>
            <span className="block text-3xl italic leading-[1.1] sm:text-5xl md:text-6xl">
              pick up a camera,
            </span>
            <span className="mt-3 block font-script text-4xl not-italic text-rose-deep sm:text-6xl md:text-7xl">
              beautifully kept
            </span>
          </h1>
          <p className="mt-6 max-w-md font-sans text-sm text-body md:text-base">
            South Asian ceremonies, family milestones, weddings, maternity and
            corporate — photographed across New Jersey.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center bg-rose px-8 font-sans text-sm font-semibold text-white transition-colors hover:bg-rose-hover"
            >
              Start an enquiry
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center border border-rose px-8 font-sans text-sm font-semibold text-rose-deep transition-colors hover:bg-blush/60"
            >
              See the portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
