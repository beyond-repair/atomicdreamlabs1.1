create table if not exists shop_orders (
  id text primary key,
  offer_id text not null,
  offer_name text not null,
  price text not null,
  buyer text not null default '',
  note text not null default '',
  status text not null default 'open',
  created_at timestamptz not null default now()
);
