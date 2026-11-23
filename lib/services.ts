export interface ServiceTier {
  id: string;
  index: string;
  label: string;
  duration: string;
  inclusions: string[];
}

export const servicesIntro =
  "Sessions scale from basic to full-day coverage with photo, video and drone — delivered to your spec.";

export const deliverables =
  "Every tier delivers selected edited photos, short reels, long-form video on request and optional drone coverage. Sessions scale 1 → 6 hours, with custom day rates for weddings and arangetrams.";

export const tiers: ServiceTier[] = [
  {
    id: "essential",
    index: "01",
    label: "Essential",
    duration: "1 – 2 hours",
    inclusions: [
      "1 photographer",
      "Edited stills",
      "Short reel",
      "Ideal for cradle, cake-cut, baby shower",
    ],
  },
  {
    id: "signature",
    index: "02",
    label: "Signature",
    duration: "3 – 4 hours",
    inclusions: [
      "Photo + video",
      "Edited stills + short cut",
      "Optional drone",
      "Birthdays, engagements, reunions",
    ],
  },
  {
    id: "archive",
    index: "03",
    label: "Archive",
    duration: "5 – 6 hours",
    inclusions: [
      "Full photo + video + drone",
      "Short & long-form films",
      "Two photographers available",
      "Weddings, arangetrams, galas",
    ],
  },
];

export interface AddOn {
  id: string;
  name: string;
  detail: string;
}

export const addOns: AddOn[] = [
  {
    id: "drone",
    name: "Drone coverage",
    detail: "Aerial frames for venues, processions and scale.",
  },
  {
    id: "second-shooter",
    name: "Two photographers",
    detail: "A second angle so no moment runs twice.",
  },
  {
    id: "long-form-film",
    name: "Long-form film",
    detail: "An edited cinematic film of the full day.",
  },
  {
    id: "same-day-reel",
    name: "Same-day reel",
    detail: "A short reel cut and delivered before you leave.",
  },
];
