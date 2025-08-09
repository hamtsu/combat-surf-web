import { getClanInfo } from "@/lib/clanInfo";
import { NextRequest, NextResponse } from "next/server";

const clanNameCache: Record<string, { name: string; cachedAt: number }> = {};
const CACHE_TTL = 15 * 60 * 1000; // 15 mins

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clanId = searchParams.get("clanId");

  if (!clanId) {
    return NextResponse.json({ error: "Missing clanId parameter" }, { status: 400 });
  }

  try {
    const data = await getClanInfo({ clanId });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
