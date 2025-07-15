"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/");
      } else {
        setUserEmail(data.user.email ?? null);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">My Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Profile
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* <BothMenus/> */}
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome 👋</h1>
            {userEmail && (
              <p className="text-gray-500 text-sm">
                Logged in as: <span className="font-medium">{userEmail}</span>
              </p>
            )}
          </div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </header>
        {/* Content Area */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
          <p className="text-gray-600">This is your main dashboard area. You can customize this with charts, stats, recent activity, and more.</p>
        </section>
      </main>
    </div>
  );
}
