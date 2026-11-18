import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label: string;
  /** Optional right-aligned meta, e.g. "10 CATEGORIES". */
  meta?: string;
  className?: string;
}

/** A micro-label on the left, a rule across the middle, optional meta on the right. */
export function SectionDivider({ label, meta, className }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="micro shrink-0">{label}</span>
      <span className="hairline w-full" aria-hidden="true" />
      {meta ? (
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
