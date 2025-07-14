// components/Cart/CarouselCart.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ApproveCartButton from "./ApprovalButton";
import { useShopStore } from "../memory/shop";
// import AdminCarouselCart from "../AdminTables/CauroselCart";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
};

type CartItem = {
  id: number;
  quantity: number;
  product: Product | Product[];
};

export default function CarouselCart() {
  const userId = useShopStore((state) => state.userId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);

  const fetchCart = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    console.log("[fetchCart] started for userId:", userId);
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("carousel_cart").select(`id, quantity, product:product_id ( id, name, price, image_url )`).eq("user_id", userId);

      if (error) throw error;
      setCartItems(data || []);
    } catch (err) {
      console.error("[fetchCart] error:", err);
      setError("Could not load cart.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;

    setUpdatingItemId(id);
    const { error } = await supabase.from("carousel_cart").update({ quantity }).eq("id", id);

    if (error) {
      console.error("[updateQuantity] error:", error);
      alert("Failed to update item quantity.");
    } else {
      await fetchCart();
    }
    setUpdatingItemId(null);
  };

  const deleteItem = async (id: number) => {
    const { error } = await supabase.from("carousel_cart").delete().eq("id", id);

    if (error) {
      console.error("[deleteItem] error:", error);
      alert("Failed to remove item.");
    } else {
      await fetchCart();
    }
  };

  useEffect(() => {
    fetchCart();
    const timeout = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timeout);
  }, [fetchCart]);

  if (loading) return <p className="text-gray-600 text-sm">⏳ Loading cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!userId) return <p className="text-gray-500">Please log in to see your cart</p>;
  if (cartItems.length === 0) return <p className="text-gray-500">🛒 Your cart is empty.</p>;

  return (
    <div className="space-y-4">
      {cartItems.map((item) => {
        const product = Array.isArray(item.product) ? item.product[0] : item.product;
        return (
          <div key={item.id} className="flex items-center border p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            {product?.image_url && <Image src={product.image_url} alt={product.name} width={64} height={64} className="rounded-md mr-4 border object-cover" />}
            <div className="flex-grow">
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">💰 ${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2 gap-3">
                <label htmlFor={`qty-${item.id}`} className="text-sm font-medium">
                  Quantity:
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min={1}
                  disabled={updatingItemId === item.id}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-20 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:underline text-sm" disabled={updatingItemId === item.id}>
                  ❌ Remove
                </button>
              </div>
            </div>
            <ApproveCartButton userId={userId} />
          </div>
        );
      })}
    </div>
  );
}
