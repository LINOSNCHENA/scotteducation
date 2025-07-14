"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/Functions";
import { supabase } from "@/lib/supabase";
import { IOrderRequest } from "@/types/models.eshop";
import { generateOrderInvoice } from "@/services/InvoiceGenerator";
const TableName = "ordersv2";

const OrdersList = () => {
  const [orders, setOrders] = useState<IOrderRequest[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IOrderRequest>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from(TableName).select("*").order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    const { error } = await supabase.from(TableName).delete().eq("id", id);
    if (error) {
      alert("Failed to delete: " + error.message);
      return;
    }

    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const startEdit = (order: IOrderRequest) => {
    setEditingId(order.id || null);
    setEditForm({
      plan_title: order.plan_title,
      plan_price: order.plan_price,
      plan_bill: order.plan_bill,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      requirements: order.requirements,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editingId) return;

    const { error } = await supabase.from(TableName).update(editForm).eq("id", editingId);

    if (error) {
      alert("Failed to update: " + error.message);
      return;
    }

    setOrders((prev) => prev.map((order) => (order.id === editingId ? { ...order, ...editForm } : order)));

    cancelEdit();
  };

  const handleGenerate = (order: IOrderRequest) => {
    generateOrderInvoice(order);
  };

  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-12 bg-gray-50 relative">
      <div className="max-w-9xl mx-auto w-full bg-gray-200 rounded-xl shadow-lg p-2 overflow-auto text-black">
        <h2 className="text-xl font-bold text-center mb-2">Orders ({orders.length})</h2>

        <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-green-200 text-gray-700">
            <tr>
              <th className="px-3 py-2 border">#</th>
              <th className="px-3 py-2 border">Plan</th>
              <th className="px-3 py-2 border">Price</th>
              <th className="px-3 py-2 border">Bill</th>
              <th className="px-3 py-2 border">Customer</th>
              {/* <th className="px-3 py-2 border">Email</th> */}
              <th className="px-3 py-2 border">Phone</th>
              <th className="px-3 py-2 border">Requirements</th>
              <th className="px-3 py-2 border">Features</th>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {orders.map((order, index) => {
              const isEditing = editingId === order.id;
              return (
                <tr key={order.id || index} className="hover:bg-green-50">
                  <td className="px-3 py-2 border">{index + 1}</td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="text" name="plan_title" value={editForm.plan_title || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      order.plan_title
                    )}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="text" name="plan_price" value={editForm.plan_price || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      order.plan_price
                    )}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="text" name="plan_bill" value={editForm.plan_bill || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      order.plan_bill
                    )}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="text" name="customer_name" value={editForm.customer_name || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      order.customer_name
                    )}
                  </td>

                  {/* <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="email" name="customer_email" value={editForm.customer_email || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      order.customer_email
                    )}
                  </td> */}

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="tel" name="customer_phone" value={editForm.customer_phone || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      order.customer_phone || "—"
                    )}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <textarea name="requirements" value={editForm.requirements || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" rows={2} />
                    ) : (
                      order.requirements || "—"
                    )}
                  </td>

                  <td className="px-3 py-2 border text-xs">{order.plan_features?.join(", ") || "—"}</td>

                  <td className="px-3 py-2 border text-xs text-gray-500">{order.created_at ? formatDate(order.created_at) : "—"}</td>

                  <td className="px-3 py-2 border">{order.status || "pending"}</td>

                  <td className="px-3 py-2 border space-x-2">
                    {isEditing ? (
                      <>
                        <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                          Save
                        </button>
                        <button onClick={cancelEdit} className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleGenerate(order)} className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                          Invoice
                        </button>

                        <button onClick={() => startEdit(order)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(order.id!)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersList;
