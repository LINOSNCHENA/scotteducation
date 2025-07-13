// File: src/app/page.tsx
"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import ProductCard from "./components/ProductCard";
import { useShopStore } from "./memory/shop";
import { supabase } from "@/lib/supabase";

export default function LandingPage() {
  // const router = useRouter();
  const { products, setProducts, user, setUser, clearUser } = useShopStore();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) setProducts(data);
    }

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setUser(session.user);
    }

    fetchProducts();
    checkSession();
  }, [setProducts, setUser]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
  };

  return (
    <main className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Medical Shop</h1>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-1 rounded">
              Login with Google
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
