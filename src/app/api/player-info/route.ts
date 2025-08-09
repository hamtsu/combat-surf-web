import { NextRequest, NextResponse } from "next/server";
import customProfiles from "@/app/CustomProfiles.json";

type CustomProfile = {
  backgroundImage?: string;
  bannerImage?: string;
  invertBannerText?: boolean;
  blurBackgroundImage?: boolean;
  theme?: {
    bgPrimary?: string;
    bgSecondary?: string;
    bgTertiary?: string;
    textPrimary?: string;
    textSecondary?: string;
    textMuted?: string;
    borderColor?: string;
    iconColor?: string;
    progressTrack?: string;
    progressFill?: string;
    textOnFill?: string;
    textBanner?: string;
  };
};

const customProfilesTyped: { [key: string]: CustomProfile } = customProfiles;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const fields = (searchParams.get("fields") || "").split(","); // username,displayName,level,clanId,inventory,xp,weaponKills,wins,tasks,globalKills,banned,tradeBanned,rank,theme
  let customProfile: any;
  const inventoryLimit = Number(searchParams.get("inventoryLimit") || "0"); // 0 means no limit
  const inventoryOffset = Number(searchParams.get("inventoryOffset") || "0");

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

    let robloxUserData: any = null;

    const fetchRobloxUser = async () => {
      if (!robloxUserData) {
        const res = await fetch(
          `https://apis.roblox.com/cloud/v2/users/${userId}`,
          {
            headers: {
              "x-api-key": process.env.OPENCLOUD_API_KEY || "",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch Roblox user data");
        robloxUserData = await res.json();
      }
      return robloxUserData;
    };

    const fieldFetchMap: Record<string, string | (() => Promise<any>)> = {
      username: async () => (await fetchRobloxUser()).name,
      displayName: async () => (await fetchRobloxUser()).displayName,
      level: `${BASE_URL}CurrentLevel/entries/${userId}`,
      clanId: `${BASE_URL}newMyClan/entries/${userId}`,
      inventory: async () => {
        const res = await fetch(`${BASE_URL}newInventory/entries/${userId}`, {
          headers: {
            "x-api-key": process.env.OPENCLOUD_API_KEY || "",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch inventory");
        const json = await res.json();
        const fullInventory = json.value.inventory ?? json.value;

        if (typeof fullInventory !== "object" || Array.isArray(fullInventory)) {
          return fullInventory;
        }

        const entries = Object.entries(fullInventory);

        if (inventoryLimit > 0) {
          const sliced = entries.slice(
            inventoryOffset,
            inventoryOffset + inventoryLimit
          );
          return Object.fromEntries(sliced);
        } else {
          return Object.fromEntries(entries);
        }
      },
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

    if (fields.includes("theme")) {
      playerInfo["backgroundImage"] = customProfile?.backgroundImage || "";
      playerInfo["bannerImage"] = customProfile?.bannerImage || "";
      playerInfo["invertBannerText"] = customProfile?.invertBannerText || false;
      playerInfo["blurBackgroundImage"] =
        customProfile?.blurBackgroundImage || false;
      playerInfo["theme"] = customProfile?.theme || {};
    }

    return NextResponse.json(playerInfo);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
