"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/types/models.eshop";
import { ensureUserExists } from "@/lib/userSyncs";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import UserLoader from "../account/AppendUser";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import { useShopStore } from "../memory/shop";

export default function LandingPage() {
  const { products, setProducts, user, setUser, clearUser } = useShopStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

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
          name: session.user.user_metadata?.full_name || "User",
          full_name: session.user.user_metadata?.full_name,
        };
        setUser(userData);
        setUserEmail(userData.email);
        await ensureUserExists(String(session.user?.id), String(session?.user?.email), String(session.user.user_metadata?.full_name));
      } else {
        router.push("/login");
      }
    }

    fetchProducts();
    checkSession();
  }, [router, setProducts, setUser]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }    


    if (data.user) {
      const userData: IUser = {
        id: data.user.id,
        email: data.user.email || "",
        name: data.user.user_metadata?.full_name || "User",
        full_name: data.user.user_metadata?.full_name,
      };

      setUser(userData);
      setEmail("");
      setPassword("");
    }
    setLoading(false);
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
            <div className="flex flex-col space-y-4">
              <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded mr-2" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 rounded mr-2" />
                <button onClick={handlePasswordLogin} disabled={loading} className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50">
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          )}
        </div>
      </div>
      {userEmail}
      <Cart />
      <div className="grid grid-cols-1 md Tailwind CSS:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
