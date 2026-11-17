import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="micro">404</span>
        <h1 className="mt-4 font-display text-4xl italic text-ink md:text-6xl">
          This frame doesn&rsquo;t exist.
        </h1>
        <p className="mt-5 max-w-sm font-sans text-body">
          The page you&rsquo;re after has moved or never was. Let&rsquo;s get
          you back to the work.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center bg-rose px-8 font-sans text-sm font-semibold text-white transition-colors hover:bg-rose-hover"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
