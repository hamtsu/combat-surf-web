import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import LoadingScreen from "@/app/PageTransition";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Combat Surf",
  description: "The official website for Roblox Combat Surf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen h-screen bg-stone-900 overflow-hidden"}>
        <Suspense>
        <LoadingScreen />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
