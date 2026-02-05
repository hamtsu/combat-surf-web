import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata>{
  
  return {
    title: "Leaderboard",
    description: `View the Combat Surf leaderboard and see the top players!`,
    openGraph: {
        title: "Leaderboard",
        description: `View the Combat Surf leaderboard and see the top players!`,
      url: `https://combat.surf/leaderboard`,
      siteName: "Combat Surf",
      images: [
        {
        url: "https://combat.surf/header3.png",
        width: 1200,
        height: 250,
        alt: "Combat Surf map",
      },
      ],
      type: "website",
    },
  };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
