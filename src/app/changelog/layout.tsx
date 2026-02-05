import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata>{
  
  return {
    title: "Changelog",
    description: `See the latest updates and changes in Combat Surf!`,
    openGraph: {
        title: "Changelog",
        description: `See the latest updates and changes in Combat Surf!`,
      url: `https://combat.surf/changelog`,
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
