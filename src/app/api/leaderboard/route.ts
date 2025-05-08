import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/db";

const cooldownMap = new Map<string, number>();

const COOLDOWN_TIME = 5000;

export async function GET(request: NextRequest) {
  try {
    // cooldowns
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const lastTime = cooldownMap.get(ip) || 0;

    if (now - lastTime < COOLDOWN_TIME) {
      const waitTime = Math.ceil((COOLDOWN_TIME - (now - lastTime)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${waitTime}s before trying again.`, cooldown: waitTime },
        { status: 429 }
      );
    }

    cooldownMap.set(ip, now);

    const db = await getDb();
    const sql = `
      SELECT 
        id, 
        username, 
        displayName, 
        level, 
        clanName, 
        clanTag, 
        careerKills, 
        careerWins
      FROM users
      ORDER BY careerKills DESC
      LIMIT 50
    `;
    const [rows] = await db.execute(sql);

    const leaderboard = (rows as any[]).map((row) => ({
      id: row.id,
      username: row.username,
      displayName: row.displayName,
      level: row.level,
      clanName: row.clanName,
      clanTag: row.clanTag,
      careerKills: row.careerKills,
      careerWins: row.careerWins,
    }));

    return NextResponse.json(leaderboard);
  } catch (error: any) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
