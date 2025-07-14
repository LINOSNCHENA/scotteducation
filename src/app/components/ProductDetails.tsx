"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useShopStore } from "../memory/shop";
import { IProduct } from "@/types/models.eshop";

export default function ProductDetail({ product }: { product: IProduct }) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useShopStore((state) => state.userId);
  const router = useRouter();

  const addToCart = async () => {
    if (!userId) return alert("Please login first.");
    setLoading(true);
    // Check if item already in cart
    const { data: existingItems, error: fetchError } = await supabase.from("carousel_cart").select("id, quantity").eq("user_id", userId).eq("product_id", product.id).single();

    if (fetchError && fetchError.code !== "PGRST116") {
      alert("Error checking cart: " + fetchError.message);
      setLoading(false);
      return;
    }
    if (existingItems) {
      // Update quantity +1
      const newQuantity = existingItems.quantity + 1;
      const { error: updateError } = await supabase.from("carousel_cart").update({ quantity: newQuantity }).eq("id", existingItems.id);

      if (updateError) {
        alert("Failed to update cart quantity: " + updateError.message);
      } else {
        setAdded(true);
      }
    } else {
      // Insert new cart item
      const { error: insertError } = await supabase.from("carousel_cart").insert({
        product_id: product.id,
        user_id: userId,
        quantity: 1,
      });

      if (insertError) {
        alert("Failed to add to cart: " + insertError.message);
      } else {
        setAdded(true);
      }
    }
    setLoading(false);
  };

  const removeFromCart = async () => {
    if (!userId) return alert("Please login first.");
    setLoading(true);
    const { error } = await supabase.from("carousel_cart").delete().eq("user_id", userId).eq("product_id", product.id);

    if (error) {
      alert("Failed to remove from cart: " + error.message);
    } else {
      setAdded(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function checkCart() {
      if (!userId) return;

      const { data, error } = await supabase.from("carousel_cart").select("id").eq("product_id", product.id).eq("user_id", userId).single();

      if (!error && data) {
        setAdded(true);
      } else {
        setAdded(false);
      }
    }
    checkCart();
  }, [product.id, userId]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          <div className="relative h-64 md:h-full">
            <Image src={product.image_url || "/fallback.png"} alt={product.name} fill className="object-cover" priority />
          </div>
        </div>
        <div className="p-8 md:w-1/2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Product Details</div>
          <h1 className="mt-2 text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
          <div className="mt-6">
            <span className="text-3xl font-bold text-gray-900">ZMW {product.price.toFixed(2)}</span>
            {product.price > 100 && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Free Shipping</span>}
          </div>
          <div className="mt-8 grid gap-4">
            {added ? (
              <button onClick={removeFromCart} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50">
                Remove from Cart
              </button>
            ) : (
              <button onClick={addToCart} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50">
                Add to Cart
              </button>
            )}
            <button onClick={() => router.push("/")} className="w-full border border-gray-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg">
              Exit to Products
            </button>
            <button onClick={() => router.push("/cart")} className="w-full border border-gray-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg">
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
