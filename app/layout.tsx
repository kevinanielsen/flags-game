import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Flags Game",
  description: "Guess which flags belong to which countries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="kevin-flags-game.vercel.app"
          src="https://plausible.kevinan.xyz/js/script.js"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
