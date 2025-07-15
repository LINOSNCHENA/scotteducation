// File: src/app/page.tsx
"use client";

import { useEffect } from "react";
import { IUser } from "@/types/models.eshop";
import { supabase } from "@/lib/supabase";
import UserLoader from "../account/AppendUser";
import ProductCard from "../components/Ntemba/LandingPages/ProductCard";
import { useShopStore } from "../memory/shop";

export default function LandingPage() {
  const { products, setProducts, user, setUser, clearUser } = useShopStore();
  console.log(user);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) setProducts(data);
    }
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const userData: IUser = {
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || "User", // Default name
          full_name: session.user.user_metadata?.full_name,
        };
        setUser(userData);
      }
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
        <UserLoader />
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
