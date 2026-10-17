import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata>{
  
  return {
    title: "Maintenance",
    description: `We're currently under maintenance. Please check back soon!`,
    openGraph: {
        title: "Maintenance",
        description: `We're currently under maintenance. Please check back soon!`,
      url: `https://combat.surf/maintenance`,
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
