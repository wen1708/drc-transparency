// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";

export const metadata: Metadata = {
  title: "DragonCoin",
  description: "DragonCoin official website and transparency page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />         {/* render once here */}
        <main>{children}</main>
      </body>
    </html>
  );
}
