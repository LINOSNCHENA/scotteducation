// src/app/layout.tsx
import type { Metadata } from "next";
import { APP_TITLE, APP_DESCRIPTION, COMP_LOGO } from "./utils/Branding/DataPascal";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  icons: COMP_LOGO,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
