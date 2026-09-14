-- Thai Kech — security fixes (13 Sep 2026)
-- Run once in Supabase → SQL Editor → paste everything → Run.
-- Safe to run more than once.

-- 1. Customer bookings (names, phone numbers) must never be readable with the
--    public key that ships in the website. Remove every read policy on bookings.
alter table public.bookings enable row level security;
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'bookings' and cmd in ('SELECT', 'ALL')
  loop
    execute format('drop policy %I on public.bookings', p.policyname);
  end loop;
end $$;

-- 2. The new website form sends requests straight to WhatsApp and no longer
--    writes bookings. Until that version is live, the old form still inserts,
--    so only sane rows are accepted. Once the new form is live, also run:
--    drop policy if exists "Allow public insert bookings" on public.bookings;
drop policy if exists "Allow public insert bookings" on public.bookings;
create policy "Allow public insert bookings" on public.bookings
  for insert
  with check (
    status = 'pending'
    and char_length(customer_name) between 2 and 80
    and char_length(customer_phone) between 6 and 25
    and number_of_clients between 1 and 10
    and booking_date between current_date - 1 and current_date + 60
    and (riad_name is null or char_length(riad_name) <= 120)
    and room_number is null
  );

-- 3. The "leads" table is not used by the website yet: make it private
--    (no public policies at all) if it exists.
do $$
declare p record;
begin
  if exists (
    select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'leads' and c.relkind = 'r'
  ) then
    execute 'alter table public.leads enable row level security';
    for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'leads' loop
      execute format('drop policy %I on public.leads', p.policyname);
    end loop;
  end if;
end $$;

-- 4. Opening hours shown in the website footer.
update public.site_settings set value = 'tous les jours, 8h–22h' where key = 'hours';

-- 5. Check the result: every table should show rls_enabled = true, and the only
--    public policies left should be reading services / site_settings and the
--    insert on bookings.
select c.relname as table_name, c.relrowsecurity as rls_enabled
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r'
order by 1;

select tablename, policyname, cmd
from pg_policies
where schemaname = 'public'
order by 1, 2;
