import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import LoadingScreen from "@/app/PageTransition";
import { Suspense } from "react";
import RateLimitedModal from "@/components/RateLimitedModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Combat Surf",
  description: "The official website for Roblox Combat Surf",
  other: {
    "google-site-verification": "Lp7P4fYDHZFo9k_GNrOx0yMsS6b0jzRIZRoC0UpzogY", // google search engine console verification
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen h-screen bg-stone-900 overflow-hidden"}>
        <RateLimitedModal />
        <Suspense>
        <LoadingScreen />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
