import { createClient } from "@supabase/supabase-js";

// Set these in .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
//
// Supabase table (run in SQL editor):
//
//   create table drawings (
//     id uuid default gen_random_uuid() primary key,
//     strokes jsonb not null,
//     from_name text,
//     at_location text,
//     created_at timestamptz default now()
//   );
//   alter table drawings enable row level security;
//   create policy "Public read"   on drawings for select using (true);
//   create policy "Public insert" on drawings for insert with check (true);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);
