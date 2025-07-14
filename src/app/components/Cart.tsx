import { useShopStore } from "../memory/shop";
import { supabase } from "@/lib/supabase";
import { IOrder } from "@/types/models.eshop";
import { useState } from "react";

export default function Cart() {
  const { cart, user, clearCart } = useShopStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const handlePlaceOrder = async () => {
    if (!user) {
      setError("Please log in to place an order.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);
    console.log(cart[0]);
    const order: IOrder = {
      id: crypto.randomUUID(),
      user_id: user.id,
      products: cart.map((item) => ({
        product_id: String(item.product.id),
        quantity: item.quantity,
        subtotal: item.quantity
      })),
      total,
      created_at: new Date().toISOString(),
      quantity: cart.length,
      status: "pending",
    };

    const { id, ...orderWithoutId } = order;
    console.log(order, id);
    const { error } = await supabase.from("orders").insert([orderWithoutId]);
    const { data } = await supabase.from("users").select("*").eq("userid", user?.id); //.single();
    console.log("==========|Data|====================");
    console.log(data);
    setUserId(data?.[0]?.id ?? null);

    if (error) {
      setError("Failed to place order: " + error.message);
    } else {
      clearCart();
      alert("Order placed successfully!");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="text-xl font-bold">
        Your Cart | {userId} |userid={JSON.stringify(user?.id)}{" "}
      </h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between py-2">
              <span>{item.product.name}</span>
              <span>
                {item.quantity} x ${item.product.price} = ${item.quantity * item.product.price}
              </span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button onClick={handlePlaceOrder} disabled={loading} className="bg-blue-600 text-white px-4 py-1 rounded mt-4 disabled:opacity-50">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
