"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ApproveCartButton from "./ApprovalButton";

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

export default function CarouselCart({ userId }: { userId: string }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  //   const userId = useShopStore((state) => state.userId);

  // Simple fetchCart without useCallback for clarity
  const fetchCart = useCallback(async () => {
    console.log("[fetchCart] started for userId:", userId);
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("carousel_cart").select(`id, quantity, product:product_id ( id, name, price, image_url )`).eq("user_id", userId);

      if (error) {
        console.error("[fetchCart] error:", error);
        setError("Could not load cart.");
        setCartItems([]);
      } else {
        console.log("[fetchCart] data:", data);
        setCartItems(data || []);
      }
    } catch (err) {
      console.error("[fetchCart] unexpected error:", err);
      setError("Unexpected error occurred.");
      setCartItems([]);
    }

    setLoading(false);
    console.log("[fetchCart] finished - loading set to false");
  }, [userId]);

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;

    console.log(`[updateQuantity] item ${id} -> quantity ${quantity}`);
    setUpdatingItemId(id);

    const { error } = await supabase.from("carousel_cart").update({ quantity }).eq("id", id);

    if (error) {
      console.error("[updateQuantity] error:", error);
      alert("Failed to update item quantity.");
    } else {
      console.log("[updateQuantity] success, refetching cart...");
      await fetchCart();
    }

    setUpdatingItemId(null);
  };

  const deleteItem = async (id: number) => {
    console.log(`[deleteItem] deleting item id ${id}`);
    const { error } = await supabase.from("carousel_cart").delete().eq("id", id);

    if (error) {
      console.error("[deleteItem] error:", error);
      alert("Failed to remove item.");
    } else {
      console.log("[deleteItem] success, refetching cart...");
      await fetchCart();
    }
  };

  useEffect(() => {
    if (!userId) {
      console.warn("[useEffect] no userId provided, skipping fetch");
      setLoading(false);
      return;
    }

    // Immediately call fetchCart
    fetchCart();

    // Safety fallback to force loading off after 10 seconds if something hangs
    const timeout = setTimeout(() => {
      console.warn("[Timeout] forcing loading to false after 10s");
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [fetchCart, userId]);

  if (loading) {
    console.log("[render] loading true - showing loading message");
    return <p className="text-gray-600 text-sm">⏳ Loading cart...</p>;
  }

  if (error) {
    console.log("[render] error state:", error);
    return <p className="text-red-500">{error}</p>;
  }

  if (cartItems.length === 0 && !userId) {
    console.log("[render] cart is empty");
    return <p className="text-gray-500">🛒 Your cart is empty.{userId}</p>;
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => {
        const product = Array.isArray(item.product) ? item.product[0] : item.product;

        return (
          <div key={item.id} className="flex items-center border p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <p>User ID: {userId || "Not logged in"}</p>

            {userId ? (
              <>
                <CarouselCart userId={String(userId)} />
                {/* <AdminCarouselCart userId={String(userId)} /> */}
              </>
            ) : (
              <p>Please log in to see your cart</p>
            )}

            {product?.image_url && (
              <Image
                src={product.image_url || "/fallback.png"}
                alt={product.name}
                width={64}
                height={64}
                className="rounded-md mr-4 border object-cover"
                style={{ width: "64px", height: "64px" }}
              />
            )}

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
