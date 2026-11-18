import Link from "next/link";
import { ImageSlot } from "./image-slot";

export function AboutBlock() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      <div>
        <span className="micro">About the studio</span>
        <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
          A small studio with a <span className="italic">long memory.</span>
        </h2>
        <p className="mt-5 font-sans text-body">
          Impressions by AJ is a photography &amp; cinema studio based in New
          Jersey, built around South Asian ceremonies, family milestones, and
          the small moments between.
        </p>
        <p className="mt-4 font-sans text-body">
          Every booking comes with a conversation first — about the day, the
          family, the feeling. The pictures follow from there.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center bg-rose px-7 font-sans text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-rose-hover"
          >
            Request a quote
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex h-12 items-center justify-center border border-rose px-7 font-sans text-sm font-semibold uppercase tracking-wider text-rose-deep transition-colors hover:bg-blush/60"
          >
            See the work
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <ImageSlot
          ratio="3/4"
          accent="blush"
          caption="AJ · 3:4"
          alt="Impressions by AJ, the photographer"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <ImageSlot
          ratio="3/4"
          accent="mint"
          caption="gear · 3:4"
          alt="The studio's camera gear"
          className="mt-8"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
    </div>
  );
}
