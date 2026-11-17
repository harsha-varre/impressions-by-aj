import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceTier as Tier } from "@/lib/services";

export function ServiceTierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border p-7",
        tier.highlighted
          ? "border-rose bg-cream shadow-[0_1px_0_0_#d98a94]"
          : "border-hairline bg-cream"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="micro">{tier.label}</span>
        {tier.highlighted ? (
          <span className="rounded-full bg-rose px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
            Most booked
          </span>
        ) : null}
      </div>
      <p className="mt-4 font-display text-4xl text-ink">{tier.duration}</p>
      <p className="mt-2 font-sans text-sm text-body">{tier.summary}</p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.inclusions.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-rose-deep"
              aria-hidden="true"
            />
            <span className="font-sans text-sm text-body">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
