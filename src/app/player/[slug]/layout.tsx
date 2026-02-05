import type { Metadata } from "next";
import { getPlayer } from "@/lib/getPlayer";

type Props = {
  params: Promise<{ slug?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const Param = await params
  const userId = Param?.slug;

  if (!userId) return ({ title: "Profile", description: "View user profile" });

  const player = await getPlayer(userId).catch((err) => console.error("Failed to fetch player for metadata:", err));

  let avatarUrl = "";
  try {
    const thumbnailRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`,
    );
    const thumbnailData = await thumbnailRes.json();
    avatarUrl = thumbnailData?.data?.[0]?.imageUrl || "";
  } catch (error) {
    console.error("Failed to fetch Roblox avatar:", error);
  }

  return {
    openGraph: {
      title: `${player?.displayName || userId}'s profile`,
      description: `View ${player?.displayName || userId} (${player?.username || userId})'s profile on the Combat Surf website!`,
      url: `https://combat.surf/profile/${userId}`,
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
