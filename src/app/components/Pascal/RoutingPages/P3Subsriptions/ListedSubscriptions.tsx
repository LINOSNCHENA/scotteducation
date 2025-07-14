"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/Functions";
import { supabase } from "@/lib/supabase";
import { ISubscription } from "@/types/Models.subscriptions";
const TableName = "subscriptionsv2";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ISubscription>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      const { data, error } = await supabase.from(TableName).select("*").order("subscribed_at", { ascending: false });

      if (error) console.error(error.message);
      else setSubscriptions(data || []);

      setLoading(false);
    };

    fetchSubscriptions();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this subscription?");
    if (!confirm) return;

    const { error } = await supabase.from(TableName).delete().eq("id", id);
    if (error) return alert("Failed to delete: " + error.message);

    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const startEdit = (sub: ISubscription) => {
    setEditingId(sub.id || null);
    setEditForm({ ...sub });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editingId) return;

    const { error } = await supabase.from(TableName).update(editForm).eq("id", editingId);

    if (error) return alert("Failed to update: " + error.message);

    setSubscriptions((prev) => prev.map((sub) => (sub.id === editingId ? { ...sub, ...editForm } : sub)));

    cancelEdit();
  };

  if (loading) return <div className="text-center py-10">Loading subscriptions...</div>;

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-12 bg-white relative">
      <div className="max-w-9xl mx-auto w-full bg-gray-200 rounded-xl shadow-lg p-2 overflow-auto text-black">
        {/* <WatermarkBackground altText={COMP_MOTTO} /> */}
        <h2 className="text-lg font-bold text-center mb-2">Subscriptions ({subscriptions.length})</h2>
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-white text-gray-700">
            <tr>
              <th className="px-3 py-2 border">#</th>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Location</th>
              <th className="px-3 py-2 border">District</th>
              <th className="px-3 py-2 border">Compound</th>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {subscriptions.map((sub, index) => {
              const isEditing = editingId === sub.id;
              return (
                <tr key={sub.id || index} className="hover:bg-green-50">
                  <td className="px-3 py-2 border">{index + 1}</td>

                  <td className="px-3 py-2 border">
                    {isEditing ? <input type="text" name="name" value={editForm.name || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" /> : sub.name}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? <input type="email" name="email" value={editForm.email || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" /> : sub.email}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="text" name="location" value={editForm.location || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      sub.location || "—"
                    )}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="text" name="district" value={editForm.district || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      sub.district
                    )}
                  </td>

                  <td className="px-3 py-2 border">
                    {isEditing ? (
                      <input type="text" name="compound" value={editForm.compound || ""} onChange={handleEditChange} className="border px-2 py-1 w-full" />
                    ) : (
                      sub.compound
                    )}
                  </td>

                  <td className="px-3 py-2 border text-xs text-gray-500">{sub.subscribed_at ? formatDate(sub.subscribed_at) : "—"}</td>

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
                        <button onClick={() => startEdit(sub)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(sub.id!)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
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

export default SubscriptionList;
