import { NextRequest, NextResponse } from "next/server";
import { getPlayerInfo } from "@/lib/playerInfo";
import { getClanInfo } from "@/lib/clanInfo";
import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

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
        theme: true
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
        bannerPath: info?.bannerUrl || null,
        textBanner: info?.theme?.textBanner || null,
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

      if (cache) {
        if ((cache.players[0]?.id !== data.players[0]?.id)) {
          console.log("New #1 player detected:", data.players[0]?.id);
          await adminEnsureUserDoc('roblox:' + data.players[0]?.id);
          await adminEnsureUserDoc('roblox:' + cache.players[0]?.id);
          await db.collection("users").doc('roblox:' + cache.players[0]?.id).update({
            awards: FieldValue.arrayRemove("FIRST"),
          }).then(async () => {
            await db.collection("users").doc('roblox:' + data.players[0]?.id).update({
              awards: FieldValue.arrayUnion("FIRST"),
            });
          })
        } else {
          await adminEnsureUserDoc('roblox:' + data.players[0]?.id);
          await db.collection("users").doc('roblox:' + data.players[0]?.id).update({
            awards: FieldValue.arrayUnion("FIRST"),
          });
        }
      }

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

async function adminEnsureUserDoc(uid: string) {
  const ref = db.collection("users").doc(uid);
  const snap = await ref.get();

  if (!snap.exists) {
    await ref.set({
      authenticatedAt: null,
      theme: {
        bgPrimary: "#1c1917",
        bgSecondary: "#292524FF",
        bgTertiary: "#1c1917FF",
        textPrimary: "#d6d3d1FF",
        textSecondary: "#78716cFF",
        textMuted: "#a8a29eFF",
        borderColor: "#44403cFF",
        iconColor: "#57534eFF",
        progressTrack: "#57534eFF",
        progressFill: "#e7e5e4FF",
        textOnFill: "#292524FF",
        digitInactive: "#57534eFF",
        digitActive: "#e7e5e4FF",
        textBanner: "#e7e5e4",
      },
      bannerPath: null,
      backgroundPath: null,
      description: "",
      socials: {},
      showcase: [],
      awards: [],
      vanityUrl: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
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
