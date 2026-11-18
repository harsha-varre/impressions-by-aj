import type { ServiceTier as Tier } from "@/lib/services";

export function ServiceTierCard({ tier }: { tier: Tier }) {
  return (
    <div className="flex h-full flex-col border border-hairline bg-cream p-7">
      <span className="font-mono text-[11px] uppercase tracking-label text-rose-hover">
        {tier.index} · {tier.label}
      </span>
      <p className="mt-4 font-display text-3xl text-ink">
        <span className="italic">{tier.duration.replace(/\s*hours?$/, "")} </span>
        hours
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.inclusions.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1 text-rose-deep" aria-hidden="true">
              ▸
            </span>
            <span className="font-sans text-sm text-body">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
