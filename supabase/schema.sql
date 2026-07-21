-- FairwayFind schema. Run this once in the Supabase SQL editor
-- (Project -> SQL Editor -> New query -> paste -> Run).

-- Public profile info for each signed-up user.
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  created_at timestamptz default now()
);

-- Clubs listed for sale via the Sell flow.
-- seller_id references profiles (not auth.users directly) so PostgREST can
-- embed the seller's display name in a single query.
create table if not exists listings (
  id bigint generated always as identity primary key,
  seller_id uuid references profiles(id) not null,
  name text not null,
  type text not null,
  brand text not null,
  year int,
  loft text,
  shaft text,
  condition text not null,
  price numeric not null,
  original_price numeric,
  photos text[] not null default '{}',
  specs jsonb not null default '{}',
  description text,
  created_at timestamptz default now()
);

-- Each signed-in user's cart. club_source distinguishes static seed/demo
-- clubs from real listings created by users, since both use small integer
-- ids that would otherwise collide.
create table if not exists cart_items (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users not null,
  club_id text not null,
  club_source text not null check (club_source in ('seed', 'listing')),
  price numeric not null,
  created_at timestamptz default now(),
  unique (user_id, club_id, club_source)
);

alter table profiles enable row level security;
alter table listings enable row level security;
alter table cart_items enable row level security;

create policy "profiles are viewable by everyone" on profiles
  for select using (true);
create policy "users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);
create policy "users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "listings are viewable by everyone" on listings
  for select using (true);
create policy "users can insert their own listings" on listings
  for insert with check (auth.uid() = seller_id);
create policy "users can update their own listings" on listings
  for update using (auth.uid() = seller_id);
create policy "users can delete their own listings" on listings
  for delete using (auth.uid() = seller_id);

create policy "users can view their own cart" on cart_items
  for select using (auth.uid() = user_id);
create policy "users can insert into their own cart" on cart_items
  for insert with check (auth.uid() = user_id);
create policy "users can delete from their own cart" on cart_items
  for delete using (auth.uid() = user_id);
