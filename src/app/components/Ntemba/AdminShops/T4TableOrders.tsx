"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  user: {
    email: string;
    name: string | null;
  };
};

export default function F4AdminOrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("orders").select("*, user:users(id, email, name)").order("created_at", { ascending: false });
    console.log(data);

    if (error) {
      console.error("Failed to fetch orders:", error);
    } else {
      setOrders(data as Order[]);
    }
    setLoading(false);
  };

  const toggleStatus = async (orderId: string, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "complete" : "pending";
    setUpdating(orderId);

    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);

    if (error) {
      console.error("Update failed:", error);
    } else {
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    }
    setUpdating(null);
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">🧾 4. Admin Orders Panel</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white shadow rounded-lg">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 break-all">{order.id}</td>
                  <td className="py-3 px-4">
                    {order.user?.name ?? "Unknown"}
                    <br />
                    <span className="text-xs text-gray-500">{order.user?.email}</span>
                  </td>
                  <td className="py-3 px-4">${order.total?.toFixed(2)}</td>
                  <td className="py-3 px-4 capitalize">{order.status}</td>
                  <td className="py-3 px-4">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleStatus(order.id, order.status)}
                      disabled={updating === order.id}
                      className={`px-3 py-1 rounded text-white text-xs font-medium ${
                        order.status === "pending" ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"
                      } disabled:opacity-50`}
                    >
                      Mark {order.status === "pending" ? "Complete" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
