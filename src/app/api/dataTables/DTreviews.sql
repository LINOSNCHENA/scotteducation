-- Drop the reviews table if it exists
DROP TABLE IF EXISTS public.reviews_pascal CASCADE;

-- Create the reviews table
CREATE TABLE public.reviews_pascal (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  review TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop the index if it exists
DROP INDEX IF EXISTS idpascal_reviews_created_at;

-- Create an index for faster sorting by date
CREATE INDEX idpascal_reviews_created_at ON public.reviews_pascal(created_at);

-- Enable Row Level Security
ALTER TABLE public.reviews_pascal ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable public read access" ON public.reviews_pascal;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.reviews_pascal;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.reviews_pascal;

-- Create policy for public read access
CREATE POLICY "Enable public read access" 
ON public.reviews_pascal FOR SELECT 
TO authenticated, anon
USING (true);

-- Create policy for insert access
CREATE POLICY "Enable insert for authenticated users"
ON public.reviews_pascal FOR INSERT
TO authenticated
WITH CHECK (true);

-- Temporarily disable RLS to insert seed data
ALTER TABLE public.reviews_pascal DISABLE ROW LEVEL SECURITY;

-- Insert 12 dummy records with African names and realistic reviews
INSERT INTO public.reviews_pascal (name, location, review, rating, avatar_url) VALUES
('Adeola Johnson', 'Lagos, Nigeria', 'Excellent web development services! Our e-commerce platform runs smoothly with great mobile optimization.', 5, 'https://randomuser.me/api/portraits/women/18.jpg'),
('Kwame Asante', 'Accra, Ghana', 'The team delivered our school website ahead of schedule with all requested features.', 4, 'https://randomuser.me/api/portraits/men/18.jpg'),
('Naledi Banda', 'Johannesburg, South Africa', 'Very professional design work. They understood our brand identity perfectly.', 5, 'https://randomuser.me/api/portraits/women/26.jpg'),
('Oluwaseun Adebayo', 'Abuja, Nigeria', 'Our NGO website now gets 3x more donations after their redesign. Highly recommended!', 5, 'https://randomuser.me/api/portraits/men/52.jpg'),
('Amara Diallo', 'Dakar, Senegal', 'Good WordPress development, though there were some minor delays in communication.', 4, 'https://randomuser.me/api/portraits/women/35.jpg'),
('Tendai Moyo', 'Harare, Zimbabwe', 'They built a custom CMS for our news portal that handles high traffic beautifully.', 5, 'https://randomuser.me/api/portraits/men/59.jpg'),
('Fatoumata Diop', 'Bamako, Mali', 'The mobile app they developed has revolutionized our agricultural extension services.', 5, 'https://randomuser.me/api/portraits/women/47.jpg'),
('Jabari Okonkwo', 'Nairobi, Kenya', 'Solid development work, though the initial design took some iterations to get right.', 4, 'https://randomuser.me/api/portraits/men/30.jpg'),
('Zahara Mohammed', 'Dar es Salaam, Tanzania', 'Our tourism booking system works flawlessly thanks to their expertise.', 5, 'https://randomuser.me/api/portraits/women/22.jpg'),
('Kofi Mensah', 'Kumasi, Ghana', 'They integrated payment processing with our existing systems seamlessly.', 5, 'https://randomuser.me/api/portraits/men/33.jpg'),
('Amina Sow', 'Dakar, Senegal', 'Good value for money. The team was patient with our frequent change requests.', 4, 'https://randomuser.me/api/portraits/women/28.jpg'),
('Thando Ndlovu', 'Cape Town, South Africa', 'Exceptional UI/UX design that increased our customer engagement by 40%.', 5, 'https://randomuser.me/api/portraits/women/41.jpg');


-- Re-enable RLS after seed data insertion
-- ALTER TABLE reviews_pascal ENABLE ROW LEVEL SECURITY;

-- Verify the inserted data
SELECT * FROM public.reviews_pascal ORDER BY created_at DESC;
