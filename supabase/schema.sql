-- Run this once in Supabase -> SQL Editor.
-- Design: the table is locked down by RLS with NO policies for anon/authenticated,
-- so nobody can read or write it directly. The only way in is the submit_lead()
-- function, which validates, enforces 5 submissions per IP-hash per hour, and inserts.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 100),
  email       text not null check (char_length(email) between 5 and 254),
  service     text not null check (service in ('Audit', 'Build', 'Secure')),
  website_url text check (website_url is null or char_length(website_url) <= 300),
  message     text not null check (char_length(message) between 10 and 2000),
  ip_hash     text
);

create index if not exists leads_ip_hash_created_idx
  on public.leads (ip_hash, created_at desc);

alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
-- (intentionally no policies: direct access is denied)

create or replace function public.submit_lead(
  p_name text,
  p_email text,
  p_service text,
  p_website text,
  p_message text,
  p_ip_hash text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count int;
begin
  select count(*) into recent_count
  from public.leads
  where ip_hash = p_ip_hash
    and created_at > now() - interval '1 hour';

  if recent_count >= 5 then
    return 'rate_limited';
  end if;

  insert into public.leads (name, email, service, website_url, message, ip_hash)
  values (p_name, p_email, p_service, nullif(p_website, ''), p_message, p_ip_hash);

  return 'ok';
end;
$$;

revoke all on function public.submit_lead(text, text, text, text, text, text) from public;
grant execute on function public.submit_lead(text, text, text, text, text, text) to anon;
