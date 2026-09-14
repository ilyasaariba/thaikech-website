-- Thai Kech — leads from the WhatsApp booking form (name, phone, people, date).
-- Safe to run more than once. Run after supabase/security-fixes.sql.
-- This is now the only table the website writes to: treatments, prices and
-- contact details live in the code (src/content), not in Supabase.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

alter table public.leads
  add column if not exists customer_name text,
  add column if not exists customer_phone text,
  add column if not exists people integer,
  add column if not exists requested_date date,
  add column if not exists service_id text,
  -- Page the request came from, e.g. '/tarifs' or '/en/prices'.
  add column if not exists source text,
  add column if not exists locale text not null default 'fr',
  add column if not exists status text not null default 'new';

-- Treatments are defined in the code, so service_id is no longer tied to the
-- old services table (a new treatment would otherwise fail to save).
alter table public.leads drop constraint if exists leads_service_id_fkey;

-- Leads hold names and phone numbers: nobody can read them with the public
-- key. The website may only insert well-formed rows; you read leads in the
-- Supabase Table Editor.
alter table public.leads enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'leads' loop
    execute format('drop policy %I on public.leads', p.policyname);
  end loop;
end $$;

grant insert on table public.leads to anon, authenticated;

create policy "Allow public insert leads" on public.leads
  for insert
  with check (
    char_length(customer_name) between 2 and 80
    and customer_phone ~ '^[+0-9 ().-]{8,25}$'
    and people between 1 and 10
    and requested_date between current_date - 1 and current_date + 60
    and (service_id is null or service_id ~ '^[a-z0-9-]{1,60}$')
    and (source is null or source ~ '^/[a-z0-9/-]{0,120}$')
    and locale in ('fr', 'en')
    and status = 'new'
  );
