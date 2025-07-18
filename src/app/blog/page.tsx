import { getPosts } from "./childs/postsAPI";
import type { Metadata } from "next";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default async function BlogPage() {
  // Removed unused params
  const posts: Post[] = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | My Next.js App",
    description: "Read our latest blog posts",
  };
}
