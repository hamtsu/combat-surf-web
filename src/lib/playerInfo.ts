export type CustomTheme = Record<string, string>;
export type CustomProfile = {
  backgroundImage?: string;
  bannerImage?: string;
  invertBannerText?: boolean;
  blurBackgroundImage?: boolean;
  theme?: CustomTheme;
};

export type PlayerInfoOptions = {
  userId: string;
  fields: string[];
  inventoryLimit?: number;
  inventoryOffset?: number;
  customProfiles?: Record<string, CustomProfile>;
};

export async function getPlayerInfo(opts: PlayerInfoOptions) {
  const {
    userId,
    fields,
    inventoryLimit = 0,
    inventoryOffset = 0,
    customProfiles,
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
    level: `${BASE_URL}CurrentLevel/entries/${userId}`,
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
    tradeBanned: `${BASE_URL}TradeBans/entries/${userId}`,
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

  await Promise.all(tasks);

  if (fields.includes("theme") && customProfiles) {
    const customProfile = customProfiles[userId];
    playerInfo["backgroundImage"] = customProfile?.backgroundImage || "";
    playerInfo["bannerImage"] = customProfile?.bannerImage || "";
    playerInfo["invertBannerText"] = customProfile?.invertBannerText || false;
    playerInfo["blurBackgroundImage"] =
      customProfile?.blurBackgroundImage || false;
    playerInfo["theme"] = customProfile?.theme || {};
  }

  return playerInfo;
}
