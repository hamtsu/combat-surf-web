import { NextRequest, NextResponse } from "next/server";
import customProfiles from "@/app/CustomProfiles.json";

type CustomProfile = {
  backgroundImage?: string;
  bannerImage?: string;
  invertBannerText?: boolean;
  blurBackgroundImage?: boolean;
};

const customProfilesTyped: { [key: string]: CustomProfile } = customProfiles;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const fields = (searchParams.get("fields") || "username,displayName").split(
    ","
  ); // username,level,clanId,inventory,xp,weaponKills,wins,tasks,globalKills,displayName,banned,tradeBanned,rank
  let customProfile: any

  if (!userId || isNaN(Number(userId))) {
    return NextResponse.json(
      { error: "Missing or invalid userId" },
      { status: 400 }
    );
  }

  if (customProfilesTyped[userId]) {
    customProfile = customProfilesTyped[userId];
  }

  try {
    const BASE_URL = `https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/data-stores/`;

    const fieldFetchMap: Record<string, string | (() => Promise<any>)> = {
      username: async () => {
        const res = await fetch(`https://users.roblox.com/v1/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch username");
        const data = await res.json();
        return data.name;
      },
      displayName: async () => {
        const res = await fetch(`https://users.roblox.com/v1/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch display name");
        const data = await res.json();
        return data.displayName;
      },
      level: `${BASE_URL}CurrentLevel/entries/${userId}`,
      clanId: `${BASE_URL}newMyClan/entries/${userId}`,
      inventory: `${BASE_URL}newInventory/entries/${userId}`,
      xp: `${BASE_URL}XPStore/entries/${userId}`,
      weaponKills: `${BASE_URL}WpnKillsStore/entries/${userId}`,
      wins: `${BASE_URL}WinStore/entries/${userId}`,
      tasks: `${BASE_URL}Tasks/entries/${userId}`,
      globalKills: `${BASE_URL}CurrencyStore/entries/${userId}`,
      tradeBanned: `${BASE_URL}TradeBans/entries/${userId}`,
      rank: async () => {
        const res = await fetch(
          `https://groups.roblox.com/v2/users/${userId}/groups/roles`
        );
        if (!res.ok) throw new Error("Failed to user groups");
        const data = await res.json();
        data?.data?.forEach((group: any) => {
          if (group.group.id == "5479316") {
            return group.role.name;
          }
        });
      },
      // TODO banned field
    };

    const playerInfo: any = { userId };

    const fetchPromises = fields.map(async (field) => {
      const source = fieldFetchMap[field];
      if (!source) return;

      try {
        if (typeof source === "string") {
          const res = await fetch(source, {
            headers: {
              "x-api-key": process.env.OPENCLOUD_API_KEY || "",
            },
          });
          if (!res.ok) throw new Error(`Failed to fetch ${field}`);
          const json = await res.json();
          playerInfo[field] = json.value ?? json; // if no .value
        } else {
          playerInfo[field] = await source(); // username and display name
        }
      } catch (error: any) {
        console.warn(`Skipping field "${field}" due to error:`, error.message);
      }
    });

    await Promise.all(fetchPromises);

    playerInfo["backgroundImage"] = customProfile?.backgroundImage || "";
    playerInfo["bannerImage"] = customProfile?.bannerImage || "";
    playerInfo["invertBannerText"] = customProfile?.invertBannerText || false;
    playerInfo["blurBackgroundImage"] = customProfile?.blurBackgroundImage || false;

    return NextResponse.json(playerInfo);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
