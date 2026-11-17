import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label: string;
  className?: string;
}

/** A rule-flanked micro-label, e.g. "INDOOR & CEREMONY · 10 CATEGORIES". */
export function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="hairline w-10 shrink-0 md:w-16" aria-hidden="true" />
      <span className="micro shrink-0">{label}</span>
      <span className="hairline w-full" aria-hidden="true" />
    </div>
  );
}
