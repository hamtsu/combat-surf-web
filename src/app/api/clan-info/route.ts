import { NextRequest, NextResponse } from "next/server";

const clanNameCache: Record<string, { name: string; cachedAt: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 mins

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clanId = searchParams.get("clanId");

  if (!clanId) {
    return NextResponse.json({ error: "Missing clanId parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/data-stores/newNewClansData/entries/Clan_${clanId}`,
      { headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" } }
    );
    if (!res.ok) throw new Error("Failed to fetch clan information");
    const data = await res.json();

    let cached = clanNameCache[clanId];
    const now = Date.now();

    if (!cached || now - cached.cachedAt > CACHE_TTL) {
      const clanNameRes = await fetch(`https://groups.roblox.com/v1/groups/${clanId}`);
      if (!clanNameRes.ok) throw new Error("Failed to fetch clan name");
      const clanNameData = await clanNameRes.json();
      cached = { name: clanNameData.name, cachedAt: now };
      clanNameCache[clanId] = cached;
    }

    return NextResponse.json({
      tag: data.value.tag,
      name: cached.name,
      cachedAt: cached.cachedAt,
      owner: data.value.owner,
      wins: data.value.wins,
      colorMode: data.value.colorMode,
      member1: data.value.member1,
      member2: data.value.member2,
      member3: data.value.member3,
      member4: data.value.member4,
      member5: data.value.member5,
      member6: data.value.member6,
      member7: data.value.member7,
      member8: data.value.member8,
      member9: data.value.member9,
      colorR: data.value.colorR,
      colorG: data.value.colorG,
      colorB: data.value.colorB,
      colorR2: data.value.colorR2,
      colorG2: data.value.colorG2,
      colorB2: data.value.colorB2,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
