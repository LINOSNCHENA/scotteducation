// File: src/components/ProductDetail.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Product } from "@/types/models";
import { useShopStore } from "../memory/shop";

export default function ProductDetail({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const userId = useShopStore((state) => state.userId);
  //der or session user id
  const router = useRouter();

  const addToCart = async () => {
    const { error } = await supabase.from("carousel_cart").insert({
      product_id: product.id,
      user_id: userId,
      quantity: 1,
    });
    if (!error) setAdded(true);
  };

  const removeFromCart = async () => {
    const { error } = await supabase.from("carousel_cart").delete().eq("user_id", userId).eq("product_id", product.id);
    if (!error) setAdded(false);
  };

  useEffect(() => {
    async function checkCart() {
      const { data } = await supabase.from("carousel_cart").select("id").eq("product_id", product.id).eq("user_id", userId);
      if (data && data.length > 0) setAdded(true);
    }
    checkCart();
  }, [product.id]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          <div className="relative h-64 md:h-full">
            <Image src={product.image_url} alt={product.name} fill className="object-cover" priority />
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
              <button onClick={removeFromCart} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg">
                Remove from Cart
              </button>
            ) : (
              <button onClick={addToCart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg">
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
