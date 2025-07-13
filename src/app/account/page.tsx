// File: src/app/account/page.tsx
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useShopStore } from "../memory/shop";
import Link from "next/link";

export default function AccountPage() {
  const { user, setUser, userId, setUserId } = useShopStore();

  useEffect(() => {
    async function fetchSessionAndUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const id = session.user.id;
        setUserId(id);
        const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
        if (!error && data) setUser(data);
      }
    }
    fetchSessionAndUser();
  }, [setUser, setUserId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p>
          Please{" "}
          <Link href="/login/" className="text-blue-600 underline">
            login
          </Link>{" "}
          to view your account.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      {user ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.email ?? user.id ?? "Unknown"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}
