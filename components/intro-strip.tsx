const items = [
  {
    index: "01",
    label: "Tagline",
    value: "Capturing moments, frame by frame",
  },
  {
    index: "02",
    label: "Formats",
    value: "Photos · Short reels · Long-form film · Drone",
  },
  {
    index: "03",
    label: "Session",
    value: "1 → 6 hours · custom day rates",
  },
  {
    index: "04",
    label: "Deliverables",
    value: "Selected edits, delivered in an online gallery",
  },
];

/** Four-column meta row under the hero. */
export function IntroStrip() {
  return (
    <div className="shell mt-12 md:mt-16">
      <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.index} className="bg-cream p-6">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[11px] text-rose-deep/70">
                {item.index}
              </span>
              <span className="micro">— {item.label}</span>
            </div>
            <p className="mt-3 font-display text-base text-ink">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
