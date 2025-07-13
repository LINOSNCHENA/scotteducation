-- 1. Users Table (basic)
create table if not exists users (
  id uuid primary key,
  email text not null,
  name text
);

-- Seed 5 Users
insert into users (id, email, name) values
  ('00000000-0000-0000-0000-000000000001', 'john@example.com', 'John Banda'),
  ('00000000-0000-0000-0000-000000000002', 'alice@example.com', 'Alice Zulu'),
  ('00000000-0000-0000-0000-000000000003', 'mike@example.com', 'Mike Phiri'),
  ('00000000-0000-0000-0000-000000000004', 'susan@example.com', 'Susan Mwale'),
  ('00000000-0000-0000-0000-000000000005', 'david@example.com', 'David Lungu');

-- 2. Products Table
drop table if exists products cascade;
create table if not exists products (
  id serial primary key,
  name text not null,
  price numeric(10,2) not null,
  description text,
  image_url text
);

-- Seed 5 Products
insert into products (name, price, description, image_url) values
  ('Paracetamol2 500mg', 15.00, 'Pain reliever and fever reducer', '/images/1.png'),
  ('Cough Syrup2', 28.50, 'Relieves dry cough and sore throat', '/images/2.png'),
  ('Hand Sanitizer2 100ml', 20.00, 'Kills 99.9% of germs instantly', '/images/3.png'),
  ('Vitamin C Tablets2', 35.00, 'Boosts immune system', '/images/4.png'),
  ('Digital Thermometer2', 95.00, 'Fast and accurate temperature reading', '/images/5.png'),
  ('Vitamin D Tablets3', 35.00, 'Boosts immune system', '/images/6.png'),
  ('Digital Phone3', 95.00, 'Fast and accurate temperature reading', '/images/7.png');
  select * from products;

-- 3. Carousel Cart Table
create table if not exists carousel_cart (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  quantity integer default 1
);

-- Seed 5 Carousel Items
insert into carousel_cart (product_id, user_id, quantity) values
  (1, '00000000-0000-0000-0000-000000000001', 2),
  (2, '00000000-0000-0000-0000-000000000002', 1),
  (3, '00000000-0000-0000-0000-000000000003', 3),
  (4, '00000000-0000-0000-0000-000000000004', 1),
  (5, '00000000-0000-0000-0000-000000000005', 2);

-- 4. Orders Table
create table if not exists orders (
  id serial primary key,
  user_id uuid references users(id) on delete cascade,
  product_id integer references products(id),
  quantity integer not null,
  total numeric(10, 2),
  created_at timestamp default now()
);

-- Seed 5 Orders
insert into orders (user_id, product_id, quantity, total) values
  ('00000000-0000-0000-0000-000000000001', 1, 2, 30.00),
  ('00000000-0000-0000-0000-000000000002', 3, 1, 20.00),
  ('00000000-0000-0000-0000-000000000003', 5, 1, 95.00),
  ('00000000-0000-0000-0000-000000000004', 2, 2, 57.00),
  ('00000000-0000-0000-0000-000000000005', 4, 1, 35.00);

  select * from orders;
