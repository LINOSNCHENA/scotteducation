

  -- Create the products table with UUID, stock_quantity, and timestamps
  DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    description TEXT NOT NULL,
    image_url TEXT,x text,
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create update timestamp trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_modtime
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Insert sample pharmaceutical products
INSERT INTO products (id, name, price, description, image_url, stock_quantity,x) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Paracetamol 500mg (100 tablets)', 5.99, 'Pain and fever relief', 'https://example.com/images/paracetamol.jpg', 150,1),
    ('550e8400-e29b-41d4-a716-446655440001', 'Ibuprofen 200mg (30 tablets)', 7.50, 'Anti-inflammatory pain relief', 'https://example.com/images/ibuprofen.jpg', 85,2),
    ('550e8400-e29b-41d4-a716-446655440002', 'Amoxicillin 500mg (Capsules, 10s)', 12.80, 'Antibiotic for bacterial infections', 'https://example.com/images/amoxicillin.jpg', 42,3),
    ('550e8400-e29b-41d4-a716-446655440003', 'Omeprazole 20mg (14 capsules)', 9.25, 'Reduces stomach acid', 'https://example.com/images/omeprazole.jpg', 67,4),
    ('550e8400-e29b-41d4-a716-446655440004', 'Cetirizine 10mg (30 tablets)', 8.40, 'Relieves allergy symptoms', 'https://example.com/images/cetirizine.jpg', 93,5),
    ('550e8400-e29b-41d4-a716-446655440005', 'Vitamin D3 1000IU (60 softgels)', 11.99, 'Supports bone and immune health', 'https://example.com/images/vitamin-d.jpg', 58,6),
    ('550e8400-e29b-41d4-a716-446655440006', 'Hydrocortisone Cream 1% (15g)', 6.75, 'Treats skin inflammation and rashes', 'https://example.com/images/hydrocortisone.jpg', 120,7),
    ('550e8400-e29b-41d4-a716-446655440007', 'Loratadine 10mg (10 tablets)', 5.20, 'Non-drowsy allergy relief', 'https://example.com/images/loratadine.jpg', 75,8),
    ('550e8400-e29b-41d4-a716-446655440008', 'Salbutamol Inhaler (200 doses)', 15.60, 'Relieves asthma symptoms', 'https://example.com/images/salbutamol.jpg', 36,9),
    ('550e8400-e29b-41d4-a716-446655440009', 'Diazepam 5mg (28 tablets)', 18.90, 'Muscle relaxant and sedative', 'https://example.com/images/diazepam.jpg', 24,10);

-- Create an index for better performance on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

select * from products;