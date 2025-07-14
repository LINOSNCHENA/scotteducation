// File: src/components/CarouselCart.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CarouselCartItem, Product } from "@/types/models";

export default function CarouselCart(userId: string) {
  // export default function CarouselCart({ userId }: { userId: string }) {
  const [items, setItems] = useState<CarouselCartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchCart() {
      const { data: cart } = await supabase.from("carousel_cart").select("*").eq("user_id", userId);
      const ids = cart?.map((item) => item.product_id) || [];
      const { data: productsData } = await supabase.from("products").select("*").in("id", ids);
      setItems(cart || []);
      setProducts(productsData || []);
    }
    fetchCart();
  }, [userId]);

  return (
    <div className="p-4 border-t">
      <h2 className="text-xl font-semibold mb-2">Your Carousel Cart</h2>
      <ul>
        {items.map((item) => {
          const product = products.find((p) => p.id === item.product_id);
          if (!product) return null;
          return (
            <li key={item.id} className="mb-2">
              {product.name} - ZMW {product.price} × {item.quantity}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
