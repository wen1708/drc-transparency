import "./globals.css";
import Providers from "./providers";
import type { ReactNode } from "react";

export const metadata = {
  title: "DRC Transparency",
  description: "DragonCoin Transparency Page"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <Providers>
          <div className="min-h-screen bg-white">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
