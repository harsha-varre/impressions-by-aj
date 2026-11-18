const meta = [
  {
    index: "01",
    label: "Formats",
    lines: ["Photo · Video", "Drone · Reels"],
  },
  {
    index: "02",
    label: "Session",
    lines: ["1 hour → 6 hours", "Custom day rates"],
  },
  {
    index: "03",
    label: "Deliverables",
    lines: ["Edited stills", "Short & long cuts"],
  },
];

/** A tagline column followed by three numbered meta columns, under the hero. */
export function IntroStrip() {
  return (
    <div className="shell mt-10 md:mt-14">
      <div className="grid grid-cols-1 gap-8 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
        <p className="font-display text-lg italic leading-snug text-ink">
          A visual studio for families, couples &amp; brands across New Jersey.
        </p>
        {meta.map((item) => (
          <div key={item.index}>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[11px] text-rose-hover">
                {item.index} —
              </span>
              <span className="micro">{item.label}</span>
            </div>
            <div className="mt-3 space-y-1">
              {item.lines.map((line) => (
                <p key={line} className="font-sans text-sm text-body">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
