# Admin & photo uploads — setup

The site runs fine with striped placeholders out of the box. To log in at
`/admin` and upload real photos (which then appear across the site with **no
redeploy**), connect Supabase. ~10 minutes, one-time.

## 1. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → **New project**. Pick a name
   (e.g. `impressions-by-aj`) and a strong database password.
2. When it's ready, open **Project Settings → API** and note:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click to reveal) → `SUPABASE_SERVICE_ROLE_KEY`
     *(secret — never share or commit it)*

## 2. Create the table + policies
Open **SQL Editor → New query**, paste the contents of
[`supabase-setup.sql`](./supabase-setup.sql), and **Run**.

## 3. Create the storage bucket
**Storage → New bucket** → name it exactly **`photos`** → turn **Public bucket
ON** → Create.

## 4. Create your admin login
**Authentication → Users → Add user** → enter your email + a password → tick
**Auto Confirm User** → Create. (Only users you add here can log in — there's no
public sign-up.)

## 5. Add the environment variables in Vercel
**Vercel → your project → Settings → Environment Variables**, add all three
(Production + Preview):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | the service_role key |

Then **Deployments → … → Redeploy** so the new variables take effect.

## 6. Use it
1. Go to `https://your-site/admin` → sign in with the user from step 4.
2. Pick a slot on the left (Home hero, a category, About…), drag in images,
   **Upload**. The first photo in a category is its **cover**.
3. The public site updates within moments — no redeploy needed.

### Notes
- Supported: JPG / PNG / WebP, up to 10MB each.
- Delete a photo by hovering it in the admin and clicking the trash icon.
- Local dev: copy `.env.example` to `.env.local` and fill the same values.
- The `/admin` area is `noindex` and gated by Supabase Auth + middleware.
