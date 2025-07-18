// src/app/components/Layout/TopMenu.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store.users";
import { useRouter } from "next/navigation";

export default function TopMenu() {
  const router = useRouter();
  const { currentUser, signOut, initialize } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state and handle hydration
  useEffect(() => {
    const initAuth = async () => {
      await initialize();
      setIsLoading(false);
    };
    initAuth();
  }, [initialize]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <nav className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <div className="flex space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            {/* Other skeleton links */}
          </div>
          <div className="animate-pulse">Loading user...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-6 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/universities" className="hover:underline">
            Universities
          </Link>
          <Link href="/registration" className="hover:underline">
            Registration
          </Link>
          <Link href="/programs" className="hover:underline">
            Program
          </Link>
          <Link href="/courses" className="hover:underline">
            Courses
          </Link>
          <Link href="/students" className="hover:underline">
            Students
          </Link>
          <Link href="/leisure" className="hover:underline">
            Leisure
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-small">
          {currentUser ? (
            <>
              <span>Welcome, {currentUser.email || currentUser.user_metadata?.name || "User"}</span>
              <Link href="/account" className="hover:underline bg-green-600 px-3 py-1 rounded">
                My Account
              </Link>
              <button onClick={handleLogout} className="hover:underline bg-red-600 px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline bg-blue-600 px-3 py-1 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
