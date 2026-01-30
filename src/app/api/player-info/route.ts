import { NextRequest, NextResponse } from "next/server";
import customProfiles from "@/app/CustomProfiles.json";
import { getPlayerInfo } from "@/lib/playerInfo";
import { getUserTheme } from "@/lib/getUserTheme";

type CustomProfile = {
  backgroundImage?: string;
  bannerImage?: string;
  invertBannerText?: boolean;
  blurBackgroundImage?: boolean;
  theme?: Record<string, string>
};

const customProfilesTyped: { [key: string]: CustomProfile } = customProfiles;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const fields = (searchParams.get("fields") || "").split(","); // username,displayName,level,clanId,inventory,xp,weaponKills,wins,tasks,globalKills,banned,tradeBanned,rank,theme
  const inventoryLimit = Number(searchParams.get("inventoryLimit") || "0"); // 0 means no limit
  const inventoryOffset = Number(searchParams.get("inventoryOffset") || "0");

  if (!userId || isNaN(Number(userId))) {
    return NextResponse.json(
      { error: "Missing or invalid userId" },
      { status: 400 }
    );
  }

 try {
    const data = await getPlayerInfo({
      userId,
      fields,
      inventoryLimit,
      inventoryOffset,
    });

    const { bannerUrl, backgroundUrl, theme } = await getUserTheme(`roblox:${userId}`);

    data["bannerUrl"] = bannerUrl;
    data["backgroundUrl"] = backgroundUrl;
    data["theme"] = theme;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
