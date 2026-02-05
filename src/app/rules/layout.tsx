import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata>{
  
  return {
    title: "Rules",
    description: `Read the rules for the Combat Surf community!`,
    openGraph: {
        title: "Rules",
        description: `Read the rules for the Combat Surf community!`,
      url: `https://combat.surf/rules`,
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
