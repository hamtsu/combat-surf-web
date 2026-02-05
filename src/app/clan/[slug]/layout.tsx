import type { Metadata } from "next";
import { getClan } from "@/lib/getClan";

type Props = {
  params: Promise<{ slug?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const Param = await params
  const clanId = Param?.slug;

  if (!clanId) return ({ title: "Clan", description: "View clan profile" });

  const clan = await getClan(clanId).catch((err) => console.error("Failed to fetch player for metadata:", err));


  let avatarUrl = "";
  try {
    const thumbnailRes = await fetch(
      `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${clanId}&size=420x420&format=Png&isCircular=false`,
    );
    const thumbnailData = await thumbnailRes.json();
    avatarUrl = thumbnailData?.data?.[0]?.imageUrl || "";
  } catch (error) {
    console.error("Failed to fetch Roblox clan icon:", error);
  }

  return {
    openGraph: {
      title: `${clan?.tag || ""} ${clan?.name || clanId}'s clan profile`,
      description: `View the ${clan?.name || clanId} clan profile on the Combat Surf website!`,
      url: `https://combat.surf/clan/${clanId}`,
      siteName: "Combat Surf",
      images: [
        {
          url: avatarUrl,
          width: 100,
          height: 100,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
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
