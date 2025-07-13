"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type DBUser = {
  id: string;
  email: string;
  name?: string;
};

export default function AdminUserTable() {
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [updatedUser, setUpdatedUser] = useState<Partial<DBUser>>({});

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (user: DBUser) => {
    setEditingUser(user.id);
    setUpdatedUser({ name: user.name, email: user.email });
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase.from("users").update(updatedUser).eq("id", id);
    if (error) {
      alert("Update failed: " + error.message);
    } else {
      setEditingUser(null);
      fetchUsers();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) {
        alert("Delete failed: " + error.message);
      } else {
        fetchUsers();
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🛠 Admin User Management</h1>

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 truncate max-w-xs">{user.id}</td>

                  <td className="px-4 py-2">
                    {editingUser === user.id ? (
                      <input
                        type="email"
                        value={updatedUser.email ?? ""}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {editingUser === user.id ? (
                      <input
                        type="text"
                        value={updatedUser.name ?? ""}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.name || "—"
                    )}
                  </td>

                  <td className="px-4 py-2 flex gap-2">
                    {editingUser === user.id ? (
                      <>
                        <button onClick={() => handleUpdate(user.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                          Save
                        </button>
                        <button onClick={() => setEditingUser(null)} className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </>
                    )}
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
