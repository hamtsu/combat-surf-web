import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata>{
  
  return {
    title: "Tradeboard",
    description: `Explore the Tradeboard for Combat Surf!`,
    openGraph: {
        title: "Tradeboard",
        description: `Explore the Tradeboard for Combat Surf!`,
      url: `https://combat.surf/tradeboard`,
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
