"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("account");

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/account");
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

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome to your dashboard. Monitor your progress, view recent activity, and take quick actions.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-lg font-medium text-gray-700">Courses Enrolled</h3>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="text-lg font-medium text-gray-700">Universities Applied</h3>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h3 className="text-lg font-medium text-gray-700">Completed Tasks</h3>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
            </div>
          </section>
        );
      case "account":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account</h2>
            <p className="text-gray-600">My Account preferences.</p>

            <div className="mt-4">{/* <ProfileData showRegistrations={true} /> */}</div>
            <h1 className="text-3xl font-bold mb-8">My Academic Profile</h1>
          </section>
        );

      case "profile":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
            <p className="text-gray-600">Manage your personal information and preferences.</p>
            <div className="mt-4">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {userEmail}
              </p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Edit Profile</button>
            </div>
          </section>
        );

      case "universities":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Universities</h2>
            <p className="text-gray-600">Explore and apply to universities.</p>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">Stanford University - Application Pending</li>
              <li className="text-gray-600">MIT - Application Submitted</li>
              <li className="text-gray-600">Harvard University - Not Applied</li>
            </ul>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Apply to University</button>
          </section>
        );
      case "courses":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses</h2>
            <p className="text-gray-600">View and manage your enrolled courses.</p>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">Introduction to AI - In Progress</li>
              <li className="text-gray-600">Web Development - Completed</li>
              <li className="text-gray-600">Data Science - Enrolled</li>
            </ul>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Browse Courses</button>
          </section>
        );
      case "history":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">History</h2>
            <p className="text-gray-600">Review your recent activities.</p>
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between items-center border-b py-2">
                <span className="text-gray-600">Enrolled in &quot;Introduction to AI&quot; course</span>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center border-b py-2">
                <span className="text-gray-600">Submitted application to Stanford University</span>
                <span className="text-gray-500 text-sm">Yesterday</span>
              </li>
              <li className="flex justify-between items-center border-b py-2">
                <span className="text-gray-600">Completed profile update</span>
                <span className="text-gray-500 text-sm">2 days ago</span>
              </li>
            </ul>
          </section>
        );
      case "settings":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Configure your account settings.</p>
            <div className="mt-4 space-y-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Change Password</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Notification Preferences</button>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">My Dashboard</h2>
        <nav className="space-y-4">
          <button onClick={() => setActiveSection("home")} className={`block text-gray-700 hover:text-blue-600 ${activeSection === "home" ? "text-blue-600 font-semibold" : ""}`}>
            Home
          </button>

          <button
            onClick={() => setActiveSection("profile")}
            className={`block text-gray-700 hover:text-blue-600 ${activeSection === "profile" ? "text-blue-600 font-semibold" : ""}`}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveSection("account")}
            className={`block text-gray-700 hover:text-blue-600 ${activeSection === "account" ? "text-blue-600 font-semibold" : ""}`}
          >
            Account
          </button>

          <button
            onClick={() => setActiveSection("universities")}
            className={`block text-gray-700 hover:text-blue-600 ${activeSection === "universities" ? "text-blue-600 font-semibold" : ""}`}
          >
            Universities
          </button>
          <button
            onClick={() => setActiveSection("courses")}
            className={`block text-gray-700 hover:text-blue-600 ${activeSection === "courses" ? "text-blue-600 font-semibold" : ""}`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveSection("history")}
            className={`block text-gray-700 hover:text-blue-600 ${activeSection === "history" ? "text-blue-600 font-semibold" : ""}`}
          >
            History
          </button>
          <button
            onClick={() => setActiveSection("settings")}
            className={`block text-gray-700 hover:text-blue-600 ${activeSection === "settings" ? "text-blue-600 font-semibold" : ""}`}
          >
            Settings
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
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
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </header>

        {/* Content Area */}
        <div className="space-y-6">{renderSection()}</div>
      </main>
    </div>
  );
}
