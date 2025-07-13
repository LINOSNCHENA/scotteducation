"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type UserProfileManagerProps = {
  user: {
    id: string;
    email: string;
    name?: string;
    // Add more fields as needed (e.g., phone, role)
  };
};

export default function UserProfileManager({ user }: UserProfileManagerProps) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("users")
      .update({ name, email }) // Add other editable fields here
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      alert("Failed to update user: " + error.message);
    } else {
      alert("User updated successfully!");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete your account?");

    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase.from("users").delete().eq("id", user.id);

    setLoading(false);

    if (error) {
      alert("Failed to delete user: " + error.message);
    } else {
      alert("User deleted.");
      router.push("/"); // Redirect after deletion
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Edit Your Profile</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Name</label>
        <input className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <input className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={handleUpdate} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50">
          {loading ? "Updating..." : "Update"}
        </button>

        <button onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded disabled:opacity-50">
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
