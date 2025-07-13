"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useShopStore } from "../memory/shop";
import Link from "next/link";
import S13Footer from "../components/LandingPages/P14FooterSmall";

export default function AccountPage() {
  const { user, setUser, userId, setUserId } = useShopStore();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function fetchSessionAndUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const id = session.user.id;
        setUserId(id);

        const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

        if (!error && data) {
          setUser(data);
        }
      }
    }

    fetchSessionAndUser();
  }, [setUser, setUserId]);

  const handleCreateUserAndCart = async () => {
    setLoading(true);
    setStatusMessage("");

    try {
      // 1. Get authenticated user
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        throw new Error("User not authenticated");
      }

      const userId = authUser.id;
      const userEmail = authUser.email ?? "unknown@example.com";

      // 2. Insert user into `users` if not exists
      const { data: existingUser, error: fetchUserError } = await supabase.from("users").select("id").eq("id", userId).single();

      if (!existingUser) {
        const { error: insertUserError } = await supabase.from("users").insert([
          {
            id: userId,
            email: userEmail,
            name: authUser.user_metadata?.full_name ?? null,
          },
        ]);
        if (insertUserError) throw insertUserError;
      }

      // 3. Insert cart for the user (if not already exists)
      const { data: existingCart, error: cartError } = await supabase.from("carousel_cart").select("id").eq("user_id", userId).single();
      //  const { data, error } = await supabase.from("carousel_cart").select(`id, quantity, product:product_id ( id, name, price, image_url )`).eq("user_id", userId);

      console.log(fetchUserError, cartError);

      if (!existingCart) {
        const { error: insertCartError } = await supabase.from("carousel_cart").insert([
          {
            user_id: userId,
          },
        ]);
        if (insertCartError) throw insertCartError;
      }

      setStatusMessage("✅ User and cart successfully created.");
    } catch (err: unknown) {
      console.error(err);
      setStatusMessage("❌ " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

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
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>

      {user ? (
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong> {user.email ?? user.email ?? "—"}
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

      <button onClick={handleCreateUserAndCart} disabled={loading} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition">
        {loading ? "Processing..." : "Create User and Cart"}
      </button>

      {statusMessage && <p className="text-sm text-center text-gray-700">{statusMessage}</p>}
      <S13Footer />
    </div>
  );
}
