import { NextRequest, NextResponse } from "next/server";

type CacheEntry = {
  data: any;
  expiry: number;
};

const avatarCache = new Map<string, CacheEntry>();

const CACHE_TTL = 10 * 60 * 1000; // 10 min

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  const now = Date.now();

  const cached = avatarCache.get(userId);
  if (cached && cached.expiry > now) {
    return NextResponse.json(cached.data);
  }

  try {
    const res = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch avatar");
    }

    const data = await res.json();

    avatarCache.set(userId, {
      data,
      expiry: now + CACHE_TTL,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
