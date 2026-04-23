-- Schema for the portfolio's CollaborativeCanvas feature.
-- Run this in the Supabase SQL editor when (re)creating the project,
-- then copy the project's URL + anon key into .env.local as
--   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
--   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

create table drawings (
  id uuid default gen_random_uuid() primary key,
  strokes jsonb not null,
  aspect double precision,
  from_name text,
  at_location text,
  created_at timestamptz default now()
);

alter table drawings enable row level security;

create policy "Public read"   on drawings for select using (true);
create policy "Public insert" on drawings for insert with check (true);
