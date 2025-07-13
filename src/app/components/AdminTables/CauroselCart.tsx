"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

// type CartItem = {
//   id: string;
//   quantity: number;
//   product: {
//     id: string;
//     name: string;
//     description: string | null;
//     price: number;
//     image_url: string | null;
//   };
// };

type ProductRaw = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

type CartItemRaw = {
  id: string;
  quantity: number;
  product: ProductRaw | ProductRaw[]; // Supabase sometimes wraps it as an array
};

type CartItem = {
  id: string;
  quantity: number;
  product: ProductRaw;
};

export default function AdminCarouselCart({ userId }: { userId: string }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      // const { data, error } = await supabase.from("cart").select("id, quantity, product:product_id(id, name, description, price, image_url)").eq("user_id", userId);
      const { data, error } = await supabase.from("carousel_cart").select(`id, quantity, product:product_id ( id, name, price, image_url )`).eq("user_id", userId);

      if (error) {
        console.error("Error fetching cart:", error);
      } else if (data) {
        const cleanedItems: CartItem[] = (data as CartItemRaw[]).map((item) => ({
          id: item.id,
          quantity: item.quantity,
          product: Array.isArray(item.product) ? item.product[0] : item.product,
        }));

        setItems(cleanedItems);
      }

      setLoading(false);
    };

    fetchCart();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-500">Loading cart items...</p>;

  if (items.length === 0) return <p className="text-center text-gray-500">Your cart is empty.</p>;

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-4">
        {items.map((item) => (
          <div key={item.id} className="min-w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex-shrink-0">
            {item.product.image_url ? (
              <div className="relative w-full h-40 mb-2">
                <Image src={item.product.image_url} alt={item.product.name} fill className="object-cover rounded" />
              </div>
            ) : (
              <div className="h-40 mb-2 bg-gray-100 flex items-center justify-center text-gray-400 rounded">No Image</div>
            )}
            <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
            <p className="text-sm text-gray-600 truncate">{item.product.description}</p>
            <p className="text-blue-600 font-bold mt-2">${item.product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
