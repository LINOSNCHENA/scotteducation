// src/app/ClientLayout.tsx
"use client";

import dynamic from "next/dynamic";

const TopMenu = dynamic(() => import("./components/Layout/M1TopMenu"), {
  ssr: false,
  loading: () => <div className="bg-blue-800 h-16 w-full" />,
});

const BottomMenu = dynamic(() => import("./components/Layout/M2BottomMenu"), {
  ssr: false,
  loading: () => <div className="h-16 w-full" />,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      <main className="container mx-auto p-4 pb-16">{children}</main>
      <BottomMenu />
    </>
  );
}
