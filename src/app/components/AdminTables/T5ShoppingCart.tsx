"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type ProductRaw = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

type CartItemRaw = {
  id: string;
  user_id: string;
  quantity: number;
  product: ProductRaw | ProductRaw[];
};

type CartItem = {
  id: string;
  user_id: string;
  quantity: number;
  product: ProductRaw;
};

export default function F5ShopAdminCarouselCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("carousel_cart").select(`id, user_id, quantity, product:product_id ( id, name, description, price, image_url )`);

    if (error) {
      console.error("Error fetching cart:", error);
    } else if (data) {
      const cleanedItems: CartItem[] = (data as CartItemRaw[]).map((item) => ({
        id: item.id,
        user_id: item.user_id,
        quantity: item.quantity,
        product: Array.isArray(item.product) ? item.product[0] : item.product,
      }));

      setItems(cleanedItems);
    }

    setLoading(false);
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdatingId(id);
    const { error } = await supabase.from("carousel_cart").update({ quantity }).eq("id", id);
    if (error) {
      alert("Failed to update quantity");
    } else {
      fetchCart();
    }
    setUpdatingId(null);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const { error } = await supabase.from("carousel_cart").delete().eq("id", id);
    if (error) {
      alert("Failed to delete item");
    } else {
      fetchCart();
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading cart items...</p>;

  if (items.length === 0) return <p className="text-center text-gray-500">No cart items available.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">🛒 5. Admin Carousel Cart Table</h2>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2 border text-xs text-gray-600">{item.user_id}</td>
              <td className="p-2 border font-medium">{item.product.name}</td>
              <td className="p-2 border">
                {item.product.image_url ? (
                  <Image src={item.product.image_url} alt={item.product.name} width={48} height={48} className="rounded" />
                ) : (
                  <span className="text-gray-400 italic">No image</span>
                )}
              </td>
              <td className="p-2 border text-green-700 font-semibold">ZMW {item.product.price.toFixed(2)}</td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  disabled={updatingId === item.id}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border rounded text-center"
                />
              </td>
              <td className="p-2 border">
                <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:underline text-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
