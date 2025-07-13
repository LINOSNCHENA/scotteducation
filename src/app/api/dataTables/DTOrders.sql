-- Drop the ordersv1 table if it exists
DROP TABLE IF EXISTS ordersv2 CASCADE;

-- Create the ordersv1 table
CREATE TABLE ordersv2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  plan_title TEXT NOT NULL,
  plan_price TEXT NOT NULL,
  plan_bill NUMERIC NOT NULL,  -- Added numeric billing column
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  requirements TEXT,
  plan_features JSONB NOT NULL, -- Keep as JSONB
  status TEXT DEFAULT 'pending',
  email_id TEXT
);

-- Disable Row Level Security for this table
ALTER TABLE ordersv2 DISABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX idx_orders_email ON ordersv2 (customer_email);
CREATE INDEX idx_orders_status ON ordersv2 (status);

-- Insert five dummy records with varied data
INSERT INTO ordersv2 (
  plan_title,
  plan_price,
  plan_bill,
  customer_name,
  customer_email,
  customer_phone,
  requirements,
  plan_features,
  status,
  email_id
) VALUES 
(
  'Basic Website (1-3 pages)',
  'K3,500',
  3500,
  'John Doe',
  'john.doe@example.com',
  '+260 97 123 4567',
  'Need it completed within 2 weeks',
  '["Responsive design", "Basic SEO", "Contact form"]'::JSONB,
  'completed',
  'email_123456'
),
(
  'E-commerce Store',
  'K15,000',
  15000,
  'Jane Smith',
  'jane.smith@example.com',
  '+260 96 765 4321',
  'Need PayPal integration',
  '["Product catalog", "Shopping cart", "Payment gateway"]'::JSONB,
  'in-progress',
  'email_234567'
),
(
  'School Registration Systems',
  'K12,000',
  12000,
  'Ministry of Education',
  'contact@education.gov.zm',
  '+260 21 112 2334',
  'Must handle 5,000+ students',
  '["Student records", "Payment processing", "Report generation"]'::JSONB,
  'pending',
  'email_345678'
),
(
  'Custom Web Application',
  'K25,000',
  25000,
  'Tech Solutions Ltd',
  'info@techsolutions.co.zm',
  '+260 97 555 1212',
  'Need API integration with our legacy system',
  '["Custom dashboard", "User authentication", "Data analytics"]'::JSONB,
  'completed',
  'email_456789'
),
(
  'Website Redesign',
  'K8,000',
  8000,
  'Sarah Johnson',
  'sarah@johnsonfamily.co.zm',
  '+260 96 888 9999',
  'Modern look while keeping existing content',
  '["UI/UX redesign", "Content migration", "Performance optimization"]'::JSONB,
  'in-progress',
  'email_567890'
);

-- Verify the inserted data
SELECT * FROM ordersv2 ORDER BY created_at DESC;
