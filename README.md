# Impressions by AJ

Marketing site for **Impressions by AJ** — a New Jersey photography studio
covering South Asian ceremonies, family milestones, weddings, maternity and
corporate events.

Built with **Next.js 14 (App Router) + TypeScript**, **Tailwind CSS**,
**Framer Motion**, **next/font** (self-hosted Google fonts), **next/image**,
**lucide-react**, and **Resend** for the enquiry form.

---

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in your values (optional for local UI)
pnpm dev
```

Open <http://localhost:3000>.

> The enquiry form works without a Resend key in development — it logs the
> submission server-side and returns success so you can test the UI flow.

### Scripts

```bash
pnpm dev        # start the dev server
pnpm build      # production build
pnpm start      # serve the production build
pnpm typecheck  # tsc --noEmit
pnpm lint       # next lint
```

---

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | For email | API key from [resend.com](https://resend.com). Without it, the form logs instead of sending. |
| `STUDIO_EMAIL` | Recommended | Where enquiries are delivered. Defaults to `impressionsbyaj21@gmail.com`. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL (no trailing slash) used for metadata, OG and the sitemap. |

### Resend note

The API route sends from `onboarding@resend.dev`, which works out of the box
with any Resend key. To send from your own domain, verify it in Resend and
change the `from` address in `app/api/enquiry/route.ts`.

---

## Swapping placeholder images

Every photo slot is an `<ImageSlot>`. With no `src` it renders the striped
placeholder; give it a `src` and it renders a real `next/image` with a blur
placeholder.

1. Drop real photos into `public/photos/<category-slug>/`, e.g.
   `public/photos/maternity/01.jpg`. Slugs are listed in `lib/categories.ts`.
2. Wire them up where the slot is rendered:

```tsx
<ImageSlot
  src="/photos/maternity/01.jpg"
  alt="Maternity session in a park at golden hour"
  ratio="4/5"
/>
```

Hero, category galleries and the portfolio masonry all use the same component,
so you can swap placeholders for real images incrementally.

---

## Project structure

```
app/
  page.tsx                 Home
  categories/page.tsx      All 17 categories (Indoor 10 / Outdoor 7)
  categories/[slug]/       Per-category page (static for all 17)
  portfolio/page.tsx       Masonry gallery + filters + lightbox
  services/page.tsx        Three tiers + add-ons
  about/page.tsx           About, gear, process timeline
  contact/page.tsx         Enquiry form
  api/enquiry/route.ts     Zod-validated, rate-limited, Resend email
  opengraph-image.tsx      Generated 1200×630 OG image
  sitemap.ts / robots.ts   SEO plumbing
components/                UI primitives + page components
lib/
  categories.ts            Single source of truth for the 17 categories
  services.ts              Tiers + add-ons
  site.ts                  Site config (name, email, nav, …)
  enquiry.ts               Zod schema + form options
  fonts.ts                 next/font definitions
  jsonld.tsx               LocalBusiness + Service structured data
```

---

## Content

- **17 categories** live in `lib/categories.ts` — ten indoor & ceremony, seven
  outdoor. Labels and slugs are fixed; edit copy there and it flows to the grid,
  category pages, portfolio filters, sitemap and JSON-LD.
- **Services** live in `lib/services.ts`.

---

## Accessibility

- WCAG AA text contrast on the pastel surfaces (ink is `#2d2528`).
- Visible focus rings; keyboard-navigable nav, filters and lightbox.
- `prefers-reduced-motion` disables Framer Motion transitions and smooth scroll.
- Alt text on every image slot.

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimpressionsbyaj%2Fimpressions-by-aj&env=RESEND_API_KEY,STUDIO_EMAIL,NEXT_PUBLIC_SITE_URL)

1. Push this repo to GitHub.
2. Import it in Vercel (framework preset: **Next.js** — auto-detected).
3. Add the environment variables above.
4. Deploy.

> Update the deploy-button `repository-url` once you know the repo's real URL.

---

## License

Private project. All photography and brand assets © Impressions by AJ.
