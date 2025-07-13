// File: src/app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CarouselCart from "../components/CarouselCart";
import { IUser } from "@/types/models";

export default function CartPage() {
  const router = useRouter();
  const userId = "00000000-0000-0000-0000-000000000001";
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
      if (!error && data) setUser(data);
    }
    fetchUser();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {user && (
        <div className="mb-6 border border-gray-200 rounded p-4 bg-gray-50">
          <h2 className="text-lg font-semibold">User Details</h2>
          <p>
            <strong>Name:</strong> {user.email}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      <CarouselCart userId={userId} />

      <div className="mt-8 grid gap-4">
        <button onClick={() => router.push("/")} className="w-full border border-gray-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg">
          Exit to Products
        </button>
      </div>
    </div>
  );
}
