import { ImageSlot } from "./image-slot";

export function AboutBlock() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      <div className="order-2 md:order-1">
        <span className="micro">About · Impressions by AJ</span>
        <h2 className="mt-4 font-display text-3xl italic leading-tight text-ink md:text-4xl">
          A New Jersey photographer who shoots the moment, not the pose.
        </h2>
        <p className="mt-5 font-sans text-body">
          Impressions by AJ is built around South Asian ceremonies and the
          milestones that fill the years between them — housewarmings,
          birthdays, cradle ceremonies, arangetrams, graduations and the quiet
          family afternoons in good light.
        </p>
        <p className="mt-4 font-sans text-body">
          The work is calm and close. We stay out of the way, read the room, and
          come back with photos and film that feel like the day actually felt.
        </p>
      </div>
      <div className="order-1 md:order-2">
        <ImageSlot
          ratio="4/5"
          caption="Portrait · the photographer at work"
          alt="Impressions by AJ at work"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
