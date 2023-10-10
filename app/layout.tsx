import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider, Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";

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
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
