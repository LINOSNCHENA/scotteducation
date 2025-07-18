// app/components/PostCard.tsx
"use client";

import { useState } from "react";
import { Post } from "./Model.posts";
// import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  onUpdate: (updatedPost: Post) => void;
  onDelete?: (postId: string) => void; // Optional delete handler
}

export function PostCard({ post: initialPost, onUpdate, onDelete }: PostCardProps) {
  const [post, setPost] = useState(initialPost);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          // Include other editable fields here
        }),
      });

      if (!response.ok) {
        throw new Error((await response.text()) || "Failed to update post");
      }

      const updatedPost = await response.json();
      onUpdate(updatedPost);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating post:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setPost(initialPost); // Revert to original post on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error((await response.text()) || "Failed to delete post");
      }

      onDelete(post.id);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        {isEditing ? (
          <>
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

            <input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
              disabled={isLoading}
              placeholder="Post title"
            />

            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full p-2 mb-3 border rounded min-h-[100px]"
              disabled={isLoading}
              placeholder="Post content"
            />

            <div className="flex gap-2">
              <button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setIsEditing(false);
                  setPost(initialPost);
                  setError(null);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
            <p className="text-gray-600 mb-4 whitespace-pre-line">{post.content}</p>

            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Edit Post
              </button>

              {onDelete && (
                <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" disabled={isLoading}>
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
