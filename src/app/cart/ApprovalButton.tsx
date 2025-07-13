"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ApproveCartButton({ userId }: { userId: string }) {
  const [approving, setApproving] = useState(false);
  const [message, setMessage] = useState("");

  const handleApprove = async () => {
    setApproving(true);
    setMessage("");

    // Step 1: Fetch cart items
    const { data: cartItems, error: cartError } = await supabase.from("carousel_cart").select("id, quantity, product:product_id (id, price)").eq("user_id", userId);

    if (cartError || !cartItems || cartItems.length === 0) {
      setMessage("❌ Failed to fetch cart or cart is empty.");
      setApproving(false);
      return;
    }

    // Step 2: Build orders
    // const orderInserts = cartItems.map((item) => ({
    //   user_id: userId,
    //   product_id: item.product.id,
    //   quantity: item.quantity,
    //   total: Number(item.product.price) * item.quantity,
    // }));

    const orderInserts = cartItems.map((item) => {
      const product = Array.isArray(item.product) ? item.product[0] : item.product;
      return {
        user_id: userId,
        product_id: product.id,
        quantity: item.quantity,
        total: Number(product.price) * item.quantity,
      };
    });

    // Step 3: Insert into orders
    const { error: orderError } = await supabase.from("orders").insert(orderInserts);

    if (orderError) {
      console.error("Order error:", orderError);
      setMessage("❌ Failed to create order.");
      setApproving(false);
      return;
    }

    // Step 4: Delete from cart
    const cartIds = cartItems.map((item) => item.id);
    const { error: deleteError } = await supabase.from("carousel_cart").delete().in("id", cartIds);

    if (deleteError) {
      console.warn("Partial success: Order created but cart not cleared.");
      setMessage("✅ Order placed, but cart not cleared.");
    } else {
      setMessage("✅ Order successfully placed!");
    }

    setApproving(false);
  };

  return (
    <div className="pt-4 text-center">
      <button onClick={handleApprove} disabled={approving} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition">
        {approving ? "Approving..." : "✅ Approve Cart & Place Order"}
      </button>

      {message && <p className="mt-3 text-sm text-gray-700 font-medium">{message}</p>}
    </div>
  );
}
