-- The Ultimate Baby Guide (Pre & Post Baby) schema.
-- Run this once in the Supabase SQL editor
-- (Project -> SQL Editor -> New query -> paste -> Run).

-- Public profile info for each signed-up user.
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  created_at timestamptz default now()
);

-- A household. Two parents share one family via an invite code so both
-- of their phones see the same babies, tracker entries, and calendar.
create table if not exists families (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Our Family',
  invite_code text not null unique,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists family_members (
  family_id uuid references families(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  role text not null default 'parent',
  joined_at timestamptz default now(),
  primary key (family_id, user_id)
);

create table if not exists babies (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families(id) on delete cascade not null,
  name text not null,
  birth_date date,
  due_date date,
  created_at timestamptz default now()
);

-- Feeding / diaper / sleep log entries.
create table if not exists tracker_entries (
  id bigint generated always as identity primary key,
  baby_id uuid references babies(id) on delete cascade not null,
  family_id uuid references families(id) on delete cascade not null,
  type text not null check (type in ('feeding', 'diaper', 'sleep')),
  subtype text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  amount text,
  notes text,
  logged_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Shared calendar: appointments, childcare days, anything both parents
-- need visibility into.
create table if not exists calendar_events (
  id bigint generated always as identity primary key,
  family_id uuid references families(id) on delete cascade not null,
  title text not null,
  category text not null default 'appointment',
  start_at timestamptz not null,
  end_at timestamptz,
  notes text,
  assigned_to uuid references profiles(id),
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Security-definer helper so RLS policies can check membership without
-- recursive self-joins on family_members.
create or replace function is_family_member(fid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from family_members
    where family_id = fid and user_id = auth.uid()
  );
$$;

-- Creates a new family, makes the caller its first member, and returns
-- the new family id. Called once by whichever parent sets things up first.
create or replace function create_family(fname text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  fid uuid;
  code text;
begin
  code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
  insert into families (name, invite_code, created_by)
  values (coalesce(nullif(trim(fname), ''), 'Our Family'), code, auth.uid())
  returning id into fid;
  insert into family_members (family_id, user_id, role) values (fid, auth.uid(), 'parent');
  return fid;
end;
$$;

-- Joins the caller to an existing family by invite code (e.g. the second
-- parent, on their own phone). Returns the family id on success.
create or replace function join_family_by_invite_code(code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  fid uuid;
begin
  select id into fid from families where invite_code = upper(trim(code));
  if fid is null then
    raise exception 'Invalid invite code';
  end if;
  insert into family_members (family_id, user_id, role)
  values (fid, auth.uid(), 'parent')
  on conflict do nothing;
  return fid;
end;
$$;

grant execute on function is_family_member(uuid) to authenticated;
grant execute on function create_family(text) to authenticated;
grant execute on function join_family_by_invite_code(text) to authenticated;

alter table profiles enable row level security;
alter table families enable row level security;
alter table family_members enable row level security;
alter table babies enable row level security;
alter table tracker_entries enable row level security;
alter table calendar_events enable row level security;

create policy "profiles are viewable by everyone" on profiles
  for select using (true);
create policy "users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);
create policy "users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "members can view their family" on families
  for select using (is_family_member(id));
create policy "members can update their family" on families
  for update using (is_family_member(id));

create policy "members can view their family roster" on family_members
  for select using (is_family_member(family_id));
create policy "users can remove themselves from a family" on family_members
  for delete using (user_id = auth.uid());

create policy "members can view their babies" on babies
  for select using (is_family_member(family_id));
create policy "members can add babies" on babies
  for insert with check (is_family_member(family_id));
create policy "members can update their babies" on babies
  for update using (is_family_member(family_id));
create policy "members can delete their babies" on babies
  for delete using (is_family_member(family_id));

create policy "members can view tracker entries" on tracker_entries
  for select using (is_family_member(family_id));
create policy "members can add tracker entries" on tracker_entries
  for insert with check (is_family_member(family_id));
create policy "members can update tracker entries" on tracker_entries
  for update using (is_family_member(family_id));
create policy "members can delete tracker entries" on tracker_entries
  for delete using (is_family_member(family_id));

create policy "members can view calendar events" on calendar_events
  for select using (is_family_member(family_id));
create policy "members can add calendar events" on calendar_events
  for insert with check (is_family_member(family_id));
create policy "members can update calendar events" on calendar_events
  for update using (is_family_member(family_id));
create policy "members can delete calendar events" on calendar_events
  for delete using (is_family_member(family_id));
