//
// Front-end
//

"use client";

import Link from "next/link";

export default function EntryPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome to the Showcase</h1>

        <div className="space-y-4">
          <TabButton label="🎨 Ntemba's Page" href="/page-ntemba" />
          <TabButton label="🧒 Young's Page" href="/page-young" />
          <TabButton label="📘 Pascal's Page" href="/page-pascal" />
        </div>
      </div>
    </main>
  );
}

function TabButton({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block w-full text-center px-6 py-4 rounded-lg bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {label}
    </Link>
  );
}
