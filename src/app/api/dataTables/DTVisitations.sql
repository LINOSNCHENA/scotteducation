-- Drop the visits table if it exists
DROP TABLE IF EXISTS visitsv2 CASCADE;

-- Create the visits table
CREATE TABLE visitsv2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip TEXT NOT NULL,
  city TEXT,
  country TEXT,
  region TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  asn TEXT NOT NULL DEFAULT 'unknown',
  device_id TEXT NOT NULL DEFAULT 'unknown'
);

-- Enable Row Level Security
ALTER TABLE visitsv2 ENABLE ROW LEVEL SECURITY;

-- Create admin access policy #1
CREATE POLICY "Enable all access for admin"
  ON visitsv2
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create policy for public read access #2
CREATE POLICY "Enable public read access" 
  ON visitsv2 FOR SELECT 
  TO authenticated, anon
  USING (true);

  -- Allow INSERT access to authenticated and anonymous users #3
  CREATE POLICY "Allow insert for all visitors"
  ON visitsv2
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);



-- Insert sample records for testing
INSERT INTO visitsv2 (
  ip, city, country, region, latitude, longitude, user_agent, asn, device_id
) VALUES
  ('2602:1234:abcd::1', 'Pemba', 'Zambia', 'Lion-King Road', -15.4167, 28.2833, 'T1-Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/89.0', 'AS1234', 'dev-01'),
  ('192.168.1.100', 'Monze', 'Zambia', 'Fairview Road', -15.4175, 28.2850, 'T2-Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15', 'AS5678', 'dev-02'),
  ('102.223.50.77', 'Choma', 'Zambia', 'Livingstone Highway', -16.8101, 26.9855, 'T3-Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0.0.0 Safari/537.36', 'AS9999', 'dev-03'),
  ('81.170.22.45', 'Västerås', 'Sweden', 'Stora Gatan 1', 59.6099, 16.5448, 'T4-Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 Chrome/115.0.0.0 Mobile', 'AS2222', 'dev-04'),
  ('188.120.233.1', 'Kazan', 'Russia', 'Bauman Street', 55.7963, 49.1088, 'T5-Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko', 'AS3333', 'dev-05');

-- Verify the inserted data
SELECT * FROM visitsv2 ORDER BY created_at DESC;
