export interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    readTime: string;
    imageUrl: string;
    slug: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}