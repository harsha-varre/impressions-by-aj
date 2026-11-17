export interface ServiceTier {
  id: string;
  label: string;
  duration: string;
  summary: string;
  inclusions: string[];
  highlighted?: boolean;
}

export const deliverables =
  "Every tier delivers selected edited photos, short reels, long-form video on request and optional drone coverage. Sessions scale 1 → 6 hours, with custom day rates for weddings and arangetrams.";

export const tiers: ServiceTier[] = [
  {
    id: "essential",
    label: "Essential",
    duration: "1 – 2 hr",
    summary: "A focused session for a single moment done well.",
    inclusions: [
      "1 – 2 hour session",
      "Selected edited photos",
      "One short reel",
      "Long-form video on request",
      "Online gallery delivery",
    ],
  },
  {
    id: "signature",
    label: "Signature",
    duration: "3 – 4 hr",
    summary: "Our most-booked tier — a full event, start to finish.",
    inclusions: [
      "3 – 4 hour coverage",
      "Expanded set of edited photos",
      "Two short reels",
      "Long-form video on request",
      "Optional drone coverage",
      "Online gallery delivery",
    ],
    highlighted: true,
  },
  {
    id: "archive",
    label: "Archive",
    duration: "5 – 6 hr",
    summary: "The whole day, every chapter, nothing missed.",
    inclusions: [
      "5 – 6 hour coverage",
      "Full edited photo archive",
      "Multiple short reels",
      "Long-form film included on request",
      "Drone coverage",
      "Priority edit & delivery",
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
    name: "2nd shooter",
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
