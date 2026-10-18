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
  const headers = { "x-api-key": process.env.OPENCLOUD_API_KEY || "" };
  let robloxUserData: any = null;
  let profileData: any = null;
  let legacyMode: boolean | null = null;

  const fetchRobloxUser = async () => {
    if (!robloxUserData) {
      const res = await fetch(
        `https://apis.roblox.com/cloud/v2/users/${userId}`,
        { headers }
      );
      if (!res.ok) throw new Error("Failed to fetch Roblox user data");
      robloxUserData = await res.json();
    }
    return robloxUserData;
  };

  const fetchProfile = async () => {
    if (!profileData) {
      const res = await fetch(`${BASE_URL}LiveGame/entries/Player_${userId}`, {
        headers,
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      profileData = await res.json();
    }
    return profileData;
  };

  const fetchLegacyStore = async (name: string) => {
    const res = await fetch(`${BASE_URL}${name}/entries/${userId}`, {
      headers,
    });
    if (!res.ok) throw new Error(`Failed to fetch ${name}`);
    return res.json();
  };

  const resolveLegacyMode = async () => {
    if (legacyMode !== null) return legacyMode;
    try {
      await fetchProfile();
      legacyMode = false;
    } catch {
      try {
        await fetchLegacyStore("CurrentLevel");
        legacyMode = true;
      } catch {
        legacyMode = false;
      }
    }
    return legacyMode;
  };

  const withLegacyFallback = (
    current: () => Promise<any>,
    legacy: () => Promise<any>
  ) => async () => ((await resolveLegacyMode()) ? legacy() : current());

  const sliceInventory = (fullInventory: any) => {
    if (typeof fullInventory !== "object" || Array.isArray(fullInventory)) {
      return fullInventory;
    }
    const entries = Object.entries(fullInventory);
    if (inventoryLimit > 0) {
      return Object.fromEntries(
        entries.slice(inventoryOffset, inventoryOffset + inventoryLimit)
      );
    }
    return Object.fromEntries(entries);
  };

  const fieldFetchMap: Record<string, () => Promise<any>> = {
    username: async () => (await fetchRobloxUser()).name,
    displayName: async () => (await fetchRobloxUser()).displayName,
    level: withLegacyFallback(
      async () => ({
        value: (await fetchProfile()).value.Data.careerStats?.Level,
      }),
      async () => ({ value: (await fetchLegacyStore("CurrentLevel")).value })
    ),
    clanId: withLegacyFallback(
      async () => (await fetchProfile()).value.Data.clanId,
      async () => (await fetchLegacyStore("newMyClan")).value
    ),
    inventory: withLegacyFallback(
      async () =>
        sliceInventory((await fetchProfile()).value.Data.inventory ?? {}),
      async () => {
        const json = await fetchLegacyStore("newInventory");
        return sliceInventory(json.value?.inventory ?? json.value);
      }
    ),
    xp: withLegacyFallback(
      async () => (await fetchProfile()).value.Data.careerStats?.XP,
      async () => (await fetchLegacyStore("XPStore")).value
    ),
    weaponKills: withLegacyFallback(
      async () => {
        const stats = (await fetchProfile()).value.Data.careerStats ?? {};
        return [
          stats["AWP Kills"],
          stats["Deagle Kills"],
          stats["Knife Kills"],
          stats["AK Kills"],
          stats["Glock Kills"],
          stats["Shotgun Kills"],
          stats["BFG Kills"],
        ];
      },
      async () => (await fetchLegacyStore("WpnKillsStore")).value
    ),
    wins: withLegacyFallback(
      async () => (await fetchProfile()).value.Data.careerStats?.Wins,
      async () => (await fetchLegacyStore("WinStore")).value
    ),
    vip: withLegacyFallback(
      async () => (await fetchProfile()).value.Data.vip,
      async () => undefined
    ),
    tasks: withLegacyFallback(
      async () => {
        const profile = await fetchProfile();
        return {
          Tasks: profile.value.Data.tasks,
          LastLoginDate: profile.value.Data.tasksLastRefresh,
        };
      },
      async () => (await fetchLegacyStore("Tasks")).value
    ),
    globalKills: withLegacyFallback(
      async () => (await fetchProfile()).value.Data.careerStats?.Kills,
      async () => (await fetchLegacyStore("CurrencyStore")).value
    ),
    tradeBanned: withLegacyFallback(
      async () => {
        const profile = await fetchProfile();
        return {
          value: profile.value.Data.tradeBanned,
          tradeBannedAt: profile.revisionCreateTime,
        };
      },
      async () => {
        const json = await fetchLegacyStore("TradeBans");
        return { value: json.value, tradeBannedAt: json.createTime };
      }
    ),
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
      playerInfo[field] = await source();
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

  if (legacyMode) {
    playerInfo.legacy = true;
  }

  return playerInfo;
}
