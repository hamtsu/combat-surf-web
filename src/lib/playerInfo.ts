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
  let profileData: any = null;

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

  const fetchProfile = async () => {
    if (!profileData) {
      const res = await fetch(`${BASE_URL}LiveGame/entries/Player_${userId}`, {
        headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      profileData = await res.json();
    }
    return profileData;
  };

  const fieldFetchMap: Record<string, () => Promise<any>> = {
    username: async () => (await fetchRobloxUser()).name,
    displayName: async () => (await fetchRobloxUser()).displayName,
    level: async () => {
      const profile = await fetchProfile();
      return { value: profile.value.Data.careerStats?.Level };
    },
    clanId: async () => (await fetchProfile()).value.Data.clanId,
    inventory: async () => {
      const profile = await fetchProfile();
      const fullInventory = profile.value.Data.inventory ?? {};
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
    xp: async () => (await fetchProfile()).value.Data.careerStats?.XP,
    weaponKills: async () => {
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
    wins: async () => (await fetchProfile()).value.Data.careerStats?.Wins,
    tasks: async () => {
      const profile = await fetchProfile();
      return {
        Tasks: profile.value.Data.tasks,
        LastLoginDate: profile.value.Data.tasksLastRefresh,
      };
    },
    globalKills: async () => (await fetchProfile()).value.Data.careerStats?.Kills,
    tradeBanned: async () => {
      const profile = await fetchProfile();
      return {
        value: profile.value.Data.tradeBanned,
        tradeBannedAt: profile.revisionCreateTime,
      };
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

  return playerInfo;
}
