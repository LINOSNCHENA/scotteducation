-- ================================
-- 🚀 FULL E-COMMERCE SCHEMA SCRIPT
-- ================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL CHECK (char_length(email) > 5),
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SEED USERS
INSERT INTO users (id, email, name) VALUES
  ('00000000-0000-0000-0000-000000000001', 'john@example.com', 'John Banda'),
  ('00000000-0000-0000-0000-000000000002', 'alice@example.com', 'Alice Zulu'),
  ('00000000-0000-0000-0000-000000000003', 'mike@example.com', 'Mike Phiri'),
  ('00000000-0000-0000-0000-000000000004', 'susan@example.com', 'Susan Mwale'),
  ('00000000-0000-0000-0000-000000000005', 'david@example.com', 'David Lungu')
ON CONFLICT (id) DO NOTHING;

-- 2. PRODUCTS TABLE
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE IF NOT EXISTS products (
 id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  description TEXT,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 100 CHECK (stock_quantity >= 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SEED PRODUCTS
INSERT INTO products (name, price, description, image_url) VALUES
  ('Paracetamol 500mg', 15.00, 'Pain reliever and fever reducer', '/images/1.png'),
  ('Cough Syrup', 28.50, 'Relieves dry cough and sore throat', '/images/2.png'),
  ('Hand Sanitizer 100ml', 20.00, 'Kills 99.9% of germs instantly', '/images/3.png'),
  ('Vitamin C Tablets', 35.00, 'Boosts immune system', '/images/4.png'),
  ('Digital Thermometer', 95.00, 'Fast and accurate temperature reading', '/images/5.png'),
  ('Vitamin D Tablets', 35.00, 'Supports bone health', '/images/6.png'),
  ('Smartphone', 950.00, 'High-performance digital phone', '/images/7.png');

-- 3. CAROUSEL_CART TABLE (your cart table)
DROP TABLE IF EXISTS carousel_cart CASCADE;

CREATE TABLE IF NOT EXISTS carousel_cart (
 id UUID PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP DEFAULT NOW()
);

-- SEED CART ITEMS
INSERT INTO carousel_cart (product_id, user_id, quantity) VALUES
  (1, '00000000-0000-0000-0000-000000000001', 2),
  (2, '00000000-0000-0000-0000-000000000002', 1),
  (3, '00000000-0000-0000-0000-000000000003', 3),
  (4, '00000000-0000-0000-0000-000000000004', 1),
  (5, '00000000-0000-0000-0000-000000000005', 2);

-- 4. ORDERS TABLE
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE IF NOT EXISTS orders (
 id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  items: json,
);

-- SEED ORDERS
INSERT INTO orders (user_id, product_id, quantity, total) VALUES
  ('00000000-0000-0000-0000-000000000001', 1, 2, 30.00),
  ('00000000-0000-0000-0000-000000000002', 3, 1, 20.00),
  ('00000000-0000-0000-0000-000000000003', 5, 1, 95.00),
  ('00000000-0000-0000-0000-000000000004', 2, 2, 57.00),
  ('00000000-0000-0000-0000-000000000005', 4, 1, 35.00);

-- 5. INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_carousel_cart_user ON carousel_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_carousel_cart_product ON carousel_cart(product_id);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_product ON orders(product_id);

-- Optional: Full-text search index for products
CREATE INDEX IF NOT EXISTS idx_product_search ON products USING GIN (
  to_tsvector('english', name || ' ' || coalesce(description, ''))
);

-- Test query to check data
SELECT * FROM orders;
SELECT * FROM carousel_cart;
SELECT * FROM products;
SELECT * FROM users;
