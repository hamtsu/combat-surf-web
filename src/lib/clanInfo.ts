type ClanNameCacheEntry = { name: string; cachedAt: number };

const clanNameCache: Record<string, ClanNameCacheEntry> = {};
const CLAN_NAME_TTL = 15 * 60 * 1000; // 15 mins

export async function getClanInfo({ clanId }: { clanId: string }) {
  if (!clanId) throw new Error("Missing clanId");

  const base = `https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/data-stores/newNewClansData/entries/Clan_${clanId}`;
  const res = await fetch(base, {
    headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
  });
  if (!res.ok) throw new Error("Failed to fetch clan information");
  const data = await res.json();

  let cached = clanNameCache[clanId];
  const now = Date.now();

  if (!cached || now - cached.cachedAt > CLAN_NAME_TTL) {
    const clanNameRes = await fetch(`https://groups.roblox.com/v1/groups/${clanId}`);
    if (!clanNameRes.ok) throw new Error("Failed to fetch clan name");
    const clanNameData = await clanNameRes.json();
    cached = { name: clanNameData.name, cachedAt: now };
    clanNameCache[clanId] = cached;
  }

  return {
    id: clanId,
    tag: data.value?.tag,
    name: cached.name,
    cachedAt: cached.cachedAt,
    createdAt: data.createTime,
    owner: data.value?.owner,
    wins: data.value?.wins,
    colorMode: data.value?.colorMode,
    member1: data.value?.member1,
    member2: data.value?.member2,
    member3: data.value?.member3,
    member4: data.value?.member4,
    member5: data.value?.member5,
    member6: data.value?.member6,
    member7: data.value?.member7,
    member8: data.value?.member8,
    member9: data.value?.member9,
    colorR: data.value?.colorR,
    colorG: data.value?.colorG,
    colorB: data.value?.colorB,
    colorR2: data.value?.colorR2,
    colorG2: data.value?.colorG2,
    colorB2: data.value?.colorB2,
  };
}
