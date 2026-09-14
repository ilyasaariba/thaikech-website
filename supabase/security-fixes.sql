-- Thai Kech — security fixes (14 Sep 2026)
-- Run once in Supabase → SQL Editor → paste everything → Run.
-- Safe to run more than once, before or after supabase/leads.sql.

-- 1. Customer bookings (names, phone numbers) must never be reachable with the
--    public key that ships in the website. The site no longer writes bookings
--    (requests go to WhatsApp and the leads table), so remove every policy and
--    every public privilege. Old bookings stay visible in the Supabase dashboard.
alter table public.bookings enable row level security;
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'bookings' loop
    execute format('drop policy %I on public.bookings', p.policyname);
  end loop;
end $$;
revoke all on table public.bookings from anon, authenticated;

-- 2. Opening hours in the old site_settings table (kept in sync, although the
--    website now reads its settings from the code).
update public.site_settings set value = 'tous les jours, 8h–22h' where key = 'hours';

-- 3. Check the result: every table should show rls_enabled = true. The only
--    public policies left should be reading services / site_settings and, once
--    supabase/leads.sql has run, inserting into leads.
select c.relname as table_name, c.relrowsecurity as rls_enabled
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r'
order by 1;

select tablename, policyname, cmd
from pg_policies
where schemaname = 'public'
order by 1, 2;
