import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { APP_TITLE, APP_DESCRIPTION, COMP_LOGO } from "./utils/Branding/DataPascal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  icons: COMP_LOGO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <BothMenus /> */}
        {children}
      </body>
    </html>
  );
}
