import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GATE Prep Master - AI-Powered GATE Preparation",
  description:
    "Master GATE with AI-powered question generation, previous year papers, and gamified learning experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <Analytics />
        <body className={inter.className}>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
