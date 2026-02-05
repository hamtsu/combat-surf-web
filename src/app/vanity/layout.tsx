import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata>{
  
  return {
    title: "Vanity URLs",
    description: `Claim your Vanity URL for your Combat Surf profile!`,
    openGraph: {
        title: "Vanity URLs",
        description: `Claim your Vanity URL for your Combat Surf profile!`,
      url: `https://combat.surf/vanity`,
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
