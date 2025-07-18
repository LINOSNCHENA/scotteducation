-- Clean up existing tables if they exist
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP FUNCTION IF EXISTS update_modified_column CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table with foreign key to categories
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    read_time VARCHAR(50),
    image_url VARCHAR(512),
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Set up RLS (Row Level Security) policies if needed
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create a function for automatic updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updates
CREATE TRIGGER update_categories_modtime
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_posts_modtime
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
('Technology', 'technology'),
('Business', 'business'),
('Design', 'design'),
('Marketing', 'marketing');

-- Insert sample posts (using subqueries to get category IDs)
INSERT INTO posts (title, excerpt, content, date, category_id, read_time, image_url, slug) VALUES
(
    'Getting Started with Next.js',
    'Learn how to build modern web applications with Next.js',
    'Next.js is a React framework that enables server-side rendering and static site generation...',
    '2023-01-15',
    (SELECT id FROM categories WHERE slug = 'technology'),
    '5 min read',
    'https://example.com/nextjs.jpg',
    'getting-started-with-nextjs'
),
(
    'Business Growth Strategies',
    'Key strategies to scale your business effectively',
    'Scaling a business requires careful planning and execution...',
    '2023-02-20',
    (SELECT id FROM categories WHERE slug = 'business'),
    '8 min read',
    'https://example.com/business-growth.jpg',
    'business-growth-strategies'
),
(
    'UI/UX Design Principles',
    'Essential design principles for creating great user experiences',
    'Good design is not just about aesthetics but also about functionality...',
    '2023-03-10',
    (SELECT id FROM categories WHERE slug = 'design'),
    '6 min read',
    'https://example.com/design-principles.jpg',
    'ui-ux-design-principles'
);

-- Create a view for posts with category names
CREATE OR REPLACE VIEW posts_with_categories AS
SELECT 
    p.id,
    p.title,
    p.excerpt,
    p.content,
    p.date,
    p.read_time,
    p.image_url,
    p.slug,
    p.created_at,
    p.updated_at,
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug
FROM posts p
LEFT JOIN categories c ON p.category_id = c.id;

-- Create a function to get posts by category
CREATE OR REPLACE FUNCTION get_posts_by_category(category_slug TEXT)
RETURNS SETOF posts_with_categories AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM posts_with_categories
    WHERE category_slug = $1
    ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql;


select * from posts;