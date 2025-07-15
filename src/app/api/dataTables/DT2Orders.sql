-- 1. First, drop the existing orders table if it has the problematic items column
DROP TABLE IF EXISTS orders CASCADE;

-- 2. Create enum type for order status
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled');

-- 3. Create the corrected orders table (without items column)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    status order_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create order_items table (previously called items)
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_purchase NUMERIC(10, 2) NOT NULL CHECK (price_at_purchase >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Recreate the timestamp trigger
CREATE OR REPLACE FUNCTION update_order_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_modtime
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_order_modified_column();

-- 6. Insert sample data (ensure users exist first)
INSERT INTO users (id, email, name)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'customer1@example.com', 'John Doe'),
    ('22222222-2222-2222-2222-222222222222', 'customer2@example.com', 'Jane Smith')
ON CONFLICT (id) DO NOTHING;

-- 7. Insert sample orders
INSERT INTO orders (id, user_id, quantity, total, status, created_at, products)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 2, 23.98, 'completed', '2023-10-01 09:30:00'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 1, 12.80, 'pending', '2023-10-02 14:15:00');

-- 8. Insert corresponding order items
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '550e8400-e29b-41d4-a716-446655440000', 2, 5.99), -- 2 x Paracetamol
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '550e8400-e29b-41d4-a716-446655440001', 1, 7.50), -- 1 x Ibuprofen
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '550e8400-e29b-41d4-a716-446655440002', 1, 12.80); -- 1 x Amoxicillin

-- 9. Create indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

