-- Impressions by AJ — Supabase setup
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

-- 1) Photos table ----------------------------------------------------------
create table if not exists public.photos (
  id          uuid primary key default gen_random_uuid(),
  slot        text not null,            -- e.g. 'hero', 'maternity', 'about-aj'
  url         text not null,            -- public URL of the stored image
  path        text not null,            -- storage object path (for deletes)
  alt         text,                     -- optional alt text
  sort_order  int  not null default 0,  -- order within a slot (0 = cover)
  created_at  timestamptz not null default now()
);

create index if not exists photos_slot_order_idx
  on public.photos (slot, sort_order);

-- 2) Row Level Security ----------------------------------------------------
alter table public.photos enable row level security;

-- Anyone may READ photos (the public site renders them).
drop policy if exists "photos public read" on public.photos;
create policy "photos public read"
  on public.photos for select
  to anon, authenticated
  using (true);

-- Writes happen only through the server using the service_role key, which
-- bypasses RLS — so no insert/update/delete policy is granted to anon users.

-- 3) Storage bucket --------------------------------------------------------
-- Create a PUBLIC bucket named "photos":
--   Dashboard → Storage → New bucket → name: photos → Public bucket: ON
-- (Uploads/deletes run server-side with the service_role key.)

-- 4) Admin user ------------------------------------------------------------
-- Create your login:
--   Dashboard → Authentication → Users → Add user → enter email + password,
--   and tick "Auto Confirm User".
-- There is no public sign-up — only users you add here can log in at /admin.
