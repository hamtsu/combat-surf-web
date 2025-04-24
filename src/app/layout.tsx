import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import LoadingScreen from "@/app/loading";

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
      <body className={inter.className + " min-h-screen h-screen bg-stone-100 dark:bg-stone-800"}>
        <LoadingScreen />
        {children}
        <Footer />
      </body>
    </html>
  );
}
