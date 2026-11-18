export type CategoryGroup = "indoor" | "outdoor";

export interface Category {
  slug: string;
  title: string;
  group: CategoryGroup;
  /** Short subtitle shown under the title on cards. */
  blurb: string;
  /** Longer write-up for the category page. */
  description: string;
  /** Rotating accent surface for hero cards. */
  accent: "wash" | "blush" | "mint" | "lilac" | "butter";
  /** Number of placeholder gallery slots to render. */
  gallery: number;
}

/**
 * Seventeen reasons to pick up a camera.
 * Indoor & ceremony (10) then Outdoor shoots (7).
 * Labels and slugs are fixed — do not rename.
 */
export const categories: Category[] = [
  {
    slug: "house-warming",
    title: "House warming",
    group: "indoor",
    blurb: "A new threshold, blessed and remembered.",
    description:
      "The first lamp, the first meal, the first guests through a new door. Housewarming coverage is quiet and warm — the details you arranged, the family who came, the rooms before they fill with everyday life.",
    accent: "wash",
    gallery: 8,
  },
  {
    slug: "birthdays",
    title: "Birthdays 1 – 50",
    group: "indoor",
    blurb: "From first candles to milestone fifties.",
    description:
      "Every birthday has its own key. A first with cake on the floor, a sweet milestone, a fiftieth surrounded by decades of people. We shoot the room, the reactions and the small rituals that make the day yours.",
    accent: "blush",
    gallery: 9,
  },
  {
    slug: "baby-shower",
    title: "Baby shower",
    group: "indoor",
    blurb: "The anticipation, softly lit.",
    description:
      "Seemantham, godh bharai or an afternoon with friends — the baby shower is anticipation made visible. Soft light, gentle colour, and the people gathering around a beginning.",
    accent: "mint",
    gallery: 8,
  },
  {
    slug: "cradle-ceremony",
    title: "Cradle ceremony",
    group: "indoor",
    blurb: "Naming day, held close.",
    description:
      "The cradle, the name whispered into a tiny ear, the grandparents who waited for this. Barasala and naming ceremonies are tender and fast — we stay close and unobtrusive.",
    accent: "lilac",
    gallery: 8,
  },
  {
    slug: "sweet-sixteen",
    title: "Sweet Sixteen",
    group: "indoor",
    blurb: "Sixteen, and knowing it.",
    description:
      "A sweet sixteen is a portrait of a person becoming themselves. Styled frames, candid dance floor, and the friends who showed up for the moment.",
    accent: "butter",
    gallery: 8,
  },
  {
    slug: "family-reunions",
    title: "Family reunions",
    group: "indoor",
    blurb: "Everyone in one frame, finally.",
    description:
      "The whole family in one place is rare and worth keeping. Group portraits that people actually like, plus the in-between hours — cooking, laughing, catching up across generations.",
    accent: "wash",
    gallery: 9,
  },
  {
    slug: "corporate-events",
    title: "Corporate events",
    group: "indoor",
    blurb: "Polished, on brand, on time.",
    description:
      "Conferences, launches, awards nights and team milestones. Clean, brand-aware coverage with fast turnaround — headshots, stage, candids and the details your marketing team will reuse all year.",
    accent: "blush",
    gallery: 9,
  },
  {
    slug: "engagement",
    title: "Engagement",
    group: "indoor",
    blurb: "The yes, and everyone around it.",
    description:
      "Ring ceremony, nischayathartham, or a quiet proposal — the engagement is where the story turns. We cover the ritual and the room full of people who have been waiting for it.",
    accent: "mint",
    gallery: 9,
  },
  {
    slug: "half-saree-ceremony",
    title: "Half saree ceremony",
    group: "indoor",
    blurb: "Langa voni, a coming of age.",
    description:
      "The half saree ceremony marks a daughter stepping into a new chapter. Rich colour, careful styling and the family rituals that surround her on the day.",
    accent: "lilac",
    gallery: 8,
  },
  {
    slug: "arangetram",
    title: "Arangetram",
    group: "indoor",
    blurb: "Years of practice, one stage.",
    description:
      "An arangetram is a debut years in the making. We document the full arc — the preparation, the guru, the performance under stage light, and the pride in the front row. Custom day coverage available.",
    accent: "butter",
    gallery: 10,
  },
  {
    slug: "kids-family",
    title: "Kids & family",
    group: "outdoor",
    blurb: "Golden hour, real faces.",
    description:
      "Outdoor family sessions built around light and play. Parks, backyards and open fields where kids can be kids — no stiff poses, just the people you love in good light.",
    accent: "mint",
    gallery: 9,
  },
  {
    slug: "pre-post-wedding",
    title: "Pre & post wedding",
    group: "outdoor",
    blurb: "The couple, before and after the vows.",
    description:
      "Pre-wedding shoots to announce the story, post-wedding sessions to relive it. Locations across New Jersey, styled to the two of you, with drone and long-form film on request.",
    accent: "blush",
    gallery: 10,
  },
  {
    slug: "model-shoots",
    title: "Model shoots",
    group: "outdoor",
    blurb: "Portfolio frames that work.",
    description:
      "Editorial and portfolio work for models, creators and brands. Directed outdoor sessions with an eye for shape, light and the one frame a casting director stops on.",
    accent: "lilac",
    gallery: 9,
  },
  {
    slug: "gym-shoots",
    title: "Gym shoots",
    group: "outdoor",
    blurb: "Strength, in its own light.",
    description:
      "Athlete and fitness sessions that show effort and form. Shot for the lift, the line and the discipline — on location or in your gym.",
    accent: "butter",
    gallery: 8,
  },
  {
    slug: "graduation",
    title: "Graduation",
    group: "outdoor",
    blurb: "The walk, and the person who earned it.",
    description:
      "Campus portraits and ceremony coverage. The cap toss, the family who drove in, and the quiet frame of someone who just finished something hard.",
    accent: "wash",
    gallery: 8,
  },
  {
    slug: "maternity",
    title: "Maternity",
    group: "outdoor",
    blurb: "A brief season, kept.",
    description:
      "Maternity sessions in open, gentle light. We work with movement and comfort to make frames you will want on the wall — a short season held still.",
    accent: "lilac",
    gallery: 9,
  },
  {
    slug: "traditional-events",
    title: "Traditional events",
    group: "outdoor",
    blurb: "Culture, colour and ritual, outdoors.",
    description:
      "Festivals, processions and open-air ceremonies. We cover the scale and the small sacred moments inside it, with drone coverage for the frames only height can give.",
    accent: "mint",
    gallery: 10,
  },
];

export const indoorCategories = categories.filter((c) => c.group === "indoor");
export const outdoorCategories = categories.filter((c) => c.group === "outdoor");

/** Rotating pastel accent for the striped placeholder cards. */
export const accentCycle = ["blush", "mint", "butter", "lilac"] as const;
export type Accent = (typeof accentCycle)[number];

export function accentFor(index: number): Accent {
  return accentCycle[(index - 1) % accentCycle.length];
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function relatedCategories(slug: string, count = 3): Category[] {
  const current = getCategory(slug);
  if (!current) return categories.slice(0, count);
  const sameGroup = categories.filter(
    (c) => c.group === current.group && c.slug !== slug
  );
  const others = categories.filter((c) => c.group !== current.group);
  return [...sameGroup, ...others].slice(0, count);
}
