import { getUserTheme } from "./getUserTheme";

export type PlayerInfoOptions = {
  userId: string;
  fields: string[];
  inventoryLimit?: number;
  inventoryOffset?: number;
  theme?: boolean;
};

export async function getPlayerInfo(opts: PlayerInfoOptions) {
  const {
    userId,
    fields,
    inventoryLimit = 0,
    inventoryOffset = 0,
    theme = false,
  } = opts;

  if (!userId || isNaN(Number(userId))) {
    throw new Error("Missing or invalid userId");
  }

  const BASE_URL = `https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/data-stores/`;
  let robloxUserData: any = null;

  const fetchRobloxUser = async () => {
    if (!robloxUserData) {
      const res = await fetch(
        `https://apis.roblox.com/cloud/v2/users/${userId}`,
        {
          headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
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
    level: async () => {
      const res = await fetch(`${BASE_URL}CurrentLevel/entries/${userId}`, {
        headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
      });
      if (!res.ok) throw new Error("Failed to fetch firstjoined");
      const json = await res.json();
      return { value: json.value, firstJoined: json.createTime };
    },
    clanId: `${BASE_URL}newMyClan/entries/${userId}`,
    inventory: async () => {
      const res = await fetch(`${BASE_URL}newInventory/entries/${userId}`, {
        headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
      });
      if (!res.ok) throw new Error("Failed to fetch inventory");
      const json = await res.json();
      const fullInventory = json.value?.inventory ?? json.value;

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
      }
      return Object.fromEntries(entries);
    },
    xp: `${BASE_URL}XPStore/entries/${userId}`,
    weaponKills: `${BASE_URL}WpnKillsStore/entries/${userId}`,
    wins: `${BASE_URL}WinStore/entries/${userId}`,
    tasks: `${BASE_URL}Tasks/entries/${userId}`,
    globalKills: `${BASE_URL}CurrencyStore/entries/${userId}`,
    tradeBanned: async () => {
      const res = await fetch(`${BASE_URL}TradeBans/entries/${userId}`, {
        headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
      });
      if (!res.ok) throw new Error("Failed to fetch tradeBanned");
      const json = await res.json();
      return { value: json.value, tradeBannedAt: json.createTime };
    },
    rank: async () => {
      const res = await fetch(
        `https://groups.roblox.com/v2/users/${userId}/groups/roles`
      );
      if (!res.ok) throw new Error("Failed to fetch user groups");
      const data = await res.json();
      const match = data?.data?.find(
        (g: any) => String(g?.group?.id) === "5479316"
      );
      return match?.role?.name ?? null;
    },
  };

  const playerInfo: any = { userId };
  const tasks = fields.map(async (field) => {
    const source = fieldFetchMap[field];
    if (!source) return;
    try {
      if (typeof source === "string") {
        const res = await fetch(source, {
          headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
        });
        if (!res.ok) throw new Error(`Failed to fetch ${field}`);
        const json = await res.json();
        playerInfo[field] = json.value ?? json;
      } else {
        playerInfo[field] = await source();
      }
    } catch (e: any) {
      console.warn(`Skipping field ${field} due to error: ${e.message}`);
    }
  });

  if (theme) {
    const themeData = await getUserTheme(`roblox:${userId}`);

    if (themeData) {
      playerInfo["bannerUrl"] = themeData.bannerUrl;
      playerInfo["backgroundUrl"] = themeData.backgroundUrl;
      playerInfo["description"] = themeData.description;
      playerInfo["theme"] = themeData.theme;
      playerInfo["socials"] = themeData.socials;
      playerInfo["showcase"] = themeData.showcase;
      playerInfo["awards"] = themeData.awards;
      playerInfo["buddy"] = themeData.buddy;
    }
  }
  
  await Promise.all(tasks);

  return playerInfo;
}
