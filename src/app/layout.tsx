import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import LoadingScreen from "@/app/PageTransition";
import { Suspense } from "react";
import RateLimitedModal from "@/components/RateLimitedModal";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthProvider } from "@/context/AuthContext";
import AccountOverlay from "@/components/AccountOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Combat Surf",
  description:
    "Join the Combat Surf community on Roblox. Play fast-paced surf maps, compete with friends, and rise through the ranks in this community server inspired surfing game.",
  keywords: [
    "Combat Surf",
    "Roblox Combat Surf",
    "Roblox FPS Surf",
    "Roblox Surf Game",
    "Surfing Game",
    "Combat Surf Community",
    "Roblox Gaming",
    "Combat Surf Website",
    "Roblox Mods",
    "Surfing FPS Roblox",
  ],
  authors: [{ name: "hamtsu", url: "https://github.com/hamtsu" }],
  robots: "index, follow",
  openGraph: {
    title: "Combat Surf",
    description:
      "The fast-paced, skill-based surfing FPS game built on Roblox. Compete, surf, and dominate!",
    url: "https://github.com/hamtsu/combat-surf-web",
    siteName: "Combat Surf",
    images: [
      {
        url: "https://combat.surf/header2.png",
        width: 1200,
        height: 630,
        alt: "Combat Surf map",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Combat Surf",
    description: "Join Combat Surf on Roblox – where surfing meets combat!",
    creator: "@hamtsu",
    images: ["https://combat.surf/header2.png"],
  },
  other: {
    "google-site-verification": "Lp7P4fYDHZFo9k_GNrOx0yMsS6b0jzRIZRoC0UpzogY", // google search engine console verification
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " min-h-screen h-screen bg-stone-900 overflow-hidden"
        }
      >
        <AuthProvider>
          <RateLimitedModal />
          <Suspense>
            <LoadingScreen />
          </Suspense>
          <AccountOverlay />
          {children}
          <Footer />
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId="G-1PG949031B" />
    </html>
  );
}
