-- ============================================
-- Reset and Seed 'subscriptionsv1' Table
-- ============================================

-- 1. Drop the table if it already exists
DROP TABLE IF EXISTS subscriptionsv2 CASCADE;

-- 2. Create the updated table
CREATE TABLE subscriptionsv2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  address JSONB,
  district TEXT NOT NULL DEFAULT 'PBA',
  compound TEXT NOT NULL DEFAULT 'MZE',
  unsubscribed TEXT NOT NULL DEFAULT 'No',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Disable Row Level Security for full access
ALTER TABLE subscriptionsv2 DISABLE ROW LEVEL SECURITY;

-- 4. Insert dummy subscription records
INSERT INTO subscriptionsv2 (name, email, location, address, district, compound, unsubscribed)
VALUES
  (
    'Adebayo Ogunlesi',
    'adebayo.ogunlesi@example.com',
    'Lagos',
    '{"street": "24 Marina Rd", "zip": "101001"}',
    'Lagos Island',
    'Victoria Island',
    'No'
  ),
  (
    'Naledi Mokgosi',
    'naledi.mokgosi@example.com',
    'Johannesburg',
    '{"street": "17 Vilakazi St", "zip": "2001"}',
    'Soweto',
    'Orlando West',
    'No'
  ),
  (
    'Kwame Nkrumah',
    'kwame.nkrumah@example.com',
    'Accra',
    '{"street": "1 Independence Ave", "zip": "GA1"}',
    'Central',
    'Osu',
    'No'
  );

-- 5. View all records
SELECT * FROM subscriptionsv2;
