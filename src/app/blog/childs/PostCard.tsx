import Link from "next/link";
import { Post } from "./Model.posts";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <Image src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span className="mr-4">{post.date}</span>
          <span className="mr-4 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-5">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          Read More
        </Link>
      </div>
    </article>
  );
}
