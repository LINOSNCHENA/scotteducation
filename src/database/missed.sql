-- ===============================
-- 🚀 FULL E-COMMERCE SQL SCHEMA
-- With JSONB order items array
-- ===============================

-- EXTENSIONS (UUID generation)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS TABLE
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
  email TEXT NOT NULL CHECK (char_length(email) > 5),
  name TEXT, userid TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SEED USERS
INSERT INTO users (id, email, name, userid) VALUES
  ('00000000-0000-0000-0000-000000000001', 'john@example.com', 'John Banda','xx'),
  ('00000000-0000-0000-0000-000000000002', 'alice@example.com', 'Alice Zulu','xx'),
  ('00000000-0000-0000-0000-000000000003', 'mike@example.com', 'Mike Phiri','ff'),
  ('00000000-0000-0000-0000-000000000004', 'susan@example.com', 'Susan Mwale','fff'),
  ('00000000-0000-0000-0000-000000000005', 'david@example.com', 'David Lungu','fdfd')
ON CONFLICT (id) DO NOTHING;

-- 2. PRODUCTS TABLE
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  description TEXT,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 100 CHECK (stock_quantity >= 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SEED PRODUCTS
INSERT INTO products (id, name, price, description, image_url) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Paracetamol 500mg', 15.00, 'Pain reliever and fever reducer', '/images/1.png'),
  ('11111111-0000-0000-0000-000000000002', 'Cough Syrup', 28.50, 'Relieves dry cough and sore throat', '/images/2.png'),
  ('11111111-0000-0000-0000-000000000003', 'Hand Sanitizer 100ml', 20.00, 'Kills 99.9% of germs instantly', '/images/3.png'),
  ('11111111-0000-0000-0000-000000000004', 'Vitamin C Tablets', 35.00, 'Boosts immune system', '/images/4.png'),
  ('11111111-0000-0000-0000-000000000005', 'Digital Thermometer', 95.00, 'Fast and accurate temperature reading', '/images/5.png'),
  ('11111111-0000-0000-0000-000000000006', 'Vitamin D Tablets', 35.00, 'Supports bone health', '/images/6.png'),
  ('11111111-0000-0000-0000-000000000007', 'Smartphone', 950.00, 'High-performance digital phone', '/images/7.png');

-- 3. CAROUSEL_CART TABLE
DROP TABLE IF EXISTS carousel_cart CASCADE;

CREATE TABLE IF NOT EXISTS carousel_cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP DEFAULT NOW()
);

-- SEED CART ITEMS
INSERT INTO carousel_cart (product_id, user_id, quantity) VALUES
  ('11111111-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 2),
  ('11111111-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 1),
  ('11111111-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 3),
  ('11111111-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 1),
  ('11111111-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 2);

-- 4. ORDERS TABLE WITH JSONB `items`
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  items JSONB NOT NULL, -- Example: [{product_id: "...", quantity: 2, subtotal: 30}]
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SEED ORDERS (with multiple items in `items`)
INSERT INTO orders (user_id, quantity, total, status, items) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  3,
  90.00,
  'pending',
  '[
    {"product_id": "11111111-0000-0000-0000-000000000001", "quantity": 2, "subtotal": 30.00},
    {"product_id": "11111111-0000-0000-0000-000000000003", "quantity": 1, "subtotal": 60.00}
  ]'
),
(
  '00000000-0000-0000-0000-000000000002',
  1,
  20.00,
  'pending',
  '[
    {"product_id": "11111111-0000-0000-0000-000000000003", "quantity": 1, "subtotal": 20.00}
  ]'
),
(
  '00000000-0000-0000-0000-000000000003',
  1,
  95.00,
  'completed',
  '[
    {"product_id": "11111111-0000-0000-0000-000000000005", "quantity": 1, "subtotal": 95.00}
  ]'
);

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS idx_carousel_cart_user ON carousel_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_carousel_cart_product ON carousel_cart(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_items ON orders USING GIN (items);

-- Full-text search index for products
CREATE INDEX IF NOT EXISTS idx_product_search ON products USING GIN (
  to_tsvector('english', name || ' ' || coalesce(description, ''))
);

-- TEST QUERIES
SELECT * FROM orders;
SELECT * FROM carousel_cart;
SELECT * FROM products;
SELECT * FROM users;
