import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata>{
  
  return {
    title: "Login",
    description: `Login to Combat Surf to access your account and personalized features.`,
    openGraph: {
        title: "Login",
        description: `Login to Combat Surf to access your account and personalized features.`,
      url: `https://combat.surf/login`,
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
