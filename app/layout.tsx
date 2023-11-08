import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider, Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Flags Game",
  description: "Guess which flags belong to which countries",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </body>
    </html>
  );
}
