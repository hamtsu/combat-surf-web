import { NextRequest, NextResponse } from "next/server";
import { getPlayerInfo } from "@/lib/playerInfo";
import { getClanInfo } from "@/lib/clanInfo";

const TTL = 5 * 60 * 1000; // 5 min
let cache: any = null;
let cacheTime = 0;
let debounce: Promise<any> | null = null;

async function fetchTop20(datastoreName: string) {
  const url = `https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/ordered-data-stores/${datastoreName}/scopes/global/entries?maxPageSize=20&orderBy=value%20desc`;
  const res = await fetch(url, {
    headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
    cache: "no-store",
  });
  if (!res.ok)
    throw new Error(`Roblox fetch failed (${datastoreName}): ${res.status}`);
  const json = await res.json();
  return json?.orderedDataStoreEntries ?? [];
}

async function buildLeaderboard() {
  const [playerEntries, clanEntries] = await Promise.all([
    fetchTop20("GlobalLeaderboard_CurrentLevel"),
    fetchTop20("GlobalLeaderboard_ClanWinsStoreV2"),
  ]);

  const players = await Promise.all(
    playerEntries.slice(1).map(async (entry: any) => {
      const info = await getPlayerInfo({
        userId: String(entry.id),
        fields: ["username", "globalKills", "level", "clanId", "wins"],
      }).catch(() => null);

      const clanData = info?.clanId
        ? await getClanInfo({ clanId: String(info.clanId) }).catch(() => null)
        : null;

      const tag = clanData?.tag ?? "";
      const clanStyle = clanData
        ? {
            colorR: clanData?.colorR ?? 0,
            colorG: clanData?.colorG ?? 0,
            colorB: clanData?.colorB ?? 0,
            colorR2: clanData?.colorR2 ?? 0,
            colorG2: clanData?.colorG2 ?? 0,
            colorB2: clanData?.colorB2 ?? 0,
            colorMode: clanData?.colorMode ?? "static",
          }
        : {
            colorR: 0,
            colorG: 0,
            colorB: 0,
            colorR2: 0,
            colorG2: 0,
            colorB2: 0,
            colorMode: "static",
          };

      return {
        name: info?.username ?? "unknown",
        career: info?.globalKills ?? 0,
        level: entry.value ?? 0,
        clan: tag,
        id: entry.id,
        wins: info?.wins ?? 0,
        clanStyle,
      };
    })
  );

  const clans = await Promise.all(
    clanEntries.map(async (entry: any) => {
      const info = await getClanInfo({ clanId: String(entry.id) }).catch(
        () => null
      );
      return {
        name: info?.name ?? "unknown",
        tag: info?.tag ?? "",
        id: entry.id,
        wins: entry.value ?? 0,
        clanStyle: {
          colorR: info?.colorR ?? 0,
          colorG: info?.colorG ?? 0,
          colorB: info?.colorB ?? 0,
          colorR2: info?.colorR2 ?? 0,
          colorG2: info?.colorG2 ?? 0,
          colorB2: info?.colorB2 ?? 0,
          colorMode: info?.colorMode ?? "static",
        },
      };
    })
  );

  return { players, clans };
}

async function getCached() {
  const now = Date.now();
  if (cache && now - cacheTime < TTL) return cache;

  if (!debounce) {
    debounce = (async () => {
      const data = await buildLeaderboard();
      cache = data;
      cacheTime = Date.now();
      return data;
    })();
  }

  try {
    return await debounce;
  } finally {
    debounce = null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await getCached();

    const msRemaining = Math.max(0, TTL - (Date.now() - cacheTime));

    return NextResponse.json(
      {
        players: data.players,
        clans: data.clans,
        nextUpdate: Math.ceil(msRemaining / 1000),
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch leaderboard" },
      { status: 502 }
    );
  }
}
