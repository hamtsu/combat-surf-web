import { NextRequest, NextResponse } from "next/server";

const TTL = 5 * 60 * 1000; // 5 min
let cache: any = null;
let cacheTime = 0;
let debounce: Promise<any> | null = null;

async function fetchDatastore<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(`Error fetching datastore ${url}: ${res.status}`);
  return res.json();
}

async function fetchTop20(datastoreName: string) {
  const url = `https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/ordered-data-stores/${datastoreName}/scopes/global/entries?maxPageSize=20&orderBy=value%20desc`;
  const res = await fetch(url, {
    headers: { "x-api-key": process.env.OPENCLOUD_API_KEY || "" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Roblox fetch failed (${datastoreName}): ${res.status}`);
  const json = await res.json();
  return json?.orderedDataStoreEntries ?? [];
}

async function buildLeaderboard(origin: string) {
  const [playerEntries, clanEntries] = await Promise.all([
    fetchTop20("GlobalLeaderboard_CurrentLevel"),
    fetchTop20("GlobalLeaderboard_ClanWinsStoreV2"),
  ]);

  const players = await Promise.all(
    playerEntries.slice(1).map(async (entry: any) => {
      const info = await fetchDatastore<any>(
        `${origin}/api/player-info?userId=${entry.id}&fields=username,globalKills,level,clanId,wins`
      ).catch(() => null);

      const clanDataPromise = info?.clanId
        ? fetchDatastore<any>(`${origin}/api/clan-info?clanId=${info.clanId}`)
            .then((ci: any) => ({
              tag: ci?.tag ?? "",
              clanStyle: {
                colorR: ci?.colorR ?? 0,
                colorG: ci?.colorG ?? 0,
                colorB: ci?.colorB ?? 0,
                colorR2: ci?.colorR2 ?? 0,
                colorG2: ci?.colorG2 ?? 0,
                colorB2: ci?.colorB2 ?? 0,
                colorMode: ci?.colorMode ?? "static",
              },
            }))
            .catch(() => ({
              tag: "",
              clanStyle: {
                colorR: 0,
                colorG: 0,
                colorB: 0,
                colorR2: 0,
                colorG2: 0,
                colorB2: 0,
                colorMode: "static",
              },
            }))
        : Promise.resolve({
            tag: "",
            clanStyle: {
              colorR: 0,
              colorG: 0,
              colorB: 0,
              colorR2: 0,
              colorG2: 0,
              colorB2: 0,
              colorMode: "solid",
            },
          });

      const { tag, clanStyle } = await clanDataPromise;

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
      const info = await fetchDatastore<any>(
        `${origin}/api/clan-info?clanId=${entry.id}`
      ).catch(() => null);
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

async function getCached(origin: string) {
  const now = Date.now();
  if (cache && now - cacheTime < TTL) return cache;

  if (!debounce) {
    debounce = (async () => {
      const data = await buildLeaderboard(origin);
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
    const origin = "127.0.0.1:3000";
    const data = await getCached(origin);

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
