export const site = {
  name: "Impressions by AJ",
  shortName: "Impressions",
  tagline: "Capturing moments, frame by frame",
  title: "Impressions by AJ · New Jersey photography",
  description:
    "Impressions by AJ is a New Jersey photography studio covering South Asian ceremonies, family milestones, weddings, maternity and corporate events. Seventeen reasons to pick up a camera.",
  serviceArea: "New Jersey, USA",
  email: "impressionsbyaj21@gmail.com",
  instagram: "@impressionsbyaj",
  instagramUrl: "https://instagram.com/impressionsbyaj",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://impressionsbyaj.com",
  replyWindow: "Reply in ~24 hours",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;
