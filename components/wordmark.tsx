import { cn } from "@/lib/utils";

/** Parisienne "Impressions" above a rule-flanked "BY 'AJ'" in Archivo. */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-script text-ink",
          compact ? "text-2xl" : "text-[28px]"
        )}
      >
        Impressions
      </span>
      <span className="mt-1 flex items-center gap-2">
        <span className="h-px w-4 bg-rose/60" aria-hidden="true" />
        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-rose-deep">
          By &lsquo;AJ&rsquo;
        </span>
        <span className="h-px w-4 bg-rose/60" aria-hidden="true" />
      </span>
    </span>
  );
}
