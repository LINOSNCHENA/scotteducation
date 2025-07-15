import type { Metadata } from "next";
import { APP_TITLE, APP_DESCRIPTION, COMP_LOGO } from "./utils/Branding/DataPascal";
import "./globals.css";
import BottomMenu from "./components/Layout/BottomMenu";
import TopMenu from "./components/Layout/TopMenu";

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
      <body>
        <div className="pb-16">
          {" "}
          {/* Padding for bottom menu */}
          <TopMenu />
          <div className="container mx-auto p-4">{children}</div>
          <BottomMenu />
        </div>
      </body>
    </html>
  );
}
