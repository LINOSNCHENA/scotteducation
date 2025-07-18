import { Category, Post } from "./Model.posts";
import Image from "next/image";

interface SidebarProps {
  categories: Category[];
  popularPosts: Post[];
}

export default function Sidebar({ categories, popularPosts }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Search Widget */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <input type="text" placeholder="Search articles..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Categories Widget */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <a href={`/category/${category.slug}`} className="block py-2 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition">
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts Widget */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
        <ul className="space-y-4">
          {popularPosts.map((post) => (
            <li key={post.id} className="flex items-start gap-3">
              <Image src={post.imageUrl} alt={post.title} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <a href={`/blog/${post.slug}`} className="text-sm font-medium hover:text-blue-600 transition">
                  {post.title}
                </a>
                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
        <form className="space-y-3">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
