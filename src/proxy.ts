import { NextRequest, NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  lastReset: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const rateLimitConfig: Record<string, { limit: number; windowMs: number }> = {
  "/api/player-rank": { limit: 50, windowMs: 60 * 1000 }, // only used on individual profile pages
  "/api/avatar": { limit: 150, windowMs: 60 * 1000 }, // used on homepage (leaderboard panel), leaderboard, player profiles, clan info page
  "/api/changelogs": { limit: 50, windowMs: 60 * 1000 },
  "/api/player-info": { limit: 100, windowMs: 60 * 1000 },
  "/api/clan-info": { limit: 80, windowMs: 60 * 1000 }, // player profiles, clan info
  "/item-list": { limit: 30, windowMs: 60 * 1000 },
  "/api/game-info": { limit: 40, windowMs: 60 * 1000 }, // used on homepage
  "/api/group-icon": { limit: 40, windowMs: 60 * 1000 }, // used on clan info page
  "/api/player-search": { limit: 50, windowMs: 60 * 1000 }, // used on homepage, player profiles
  "/api/leaderboard": { limit: 50, windowMs: 60 * 1000 },
  "/api/auth/logout": { limit: 20, windowMs: 60 * 1000 },
  "/api/auth/roblox/callback": { limit: 20, windowMs: 60 * 1000 }, // used during Roblox OAuth login
  "/api/auth/2fa/verify": { limit: 20, windowMs: 60 * 1000 }, // used during 2FA verification
  "/api/auth/2fa/request": { limit: 10, windowMs: 60 * 1000 }, // used during 2FA verification
  "/api/claim-vanity": { limit: 10, windowMs: 60 * 1000 }, // used during vanity URL claiming
  "/api/upload-asset": { limit: 15, windowMs: 60 * 1000 }, // used during asset uploading
};

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function proxy(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const path = req.nextUrl.pathname;

  const config = rateLimitConfig[path];
  if (!config) return NextResponse.next(); // no rate limit configured

  const key = `${ip}:${path}`;
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.lastReset > config.windowMs) {
    // new entry or window expired
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return NextResponse.next();
  }

  if (entry.count >= config.limit) {
    const res = NextResponse.json(
      {
        message: "Too many requests. Try again later.",
        // waitSeconds: Math.ceil((config.windowMs - (now - entry.lastReset)) / 1000)
      },
      { status: 429 },
    );

    res.cookies.set("rateLimitExceeded", "true", {
      maxAge: config.windowMs / 1000,
    });

    return res;
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/player-rank", // only used on individual profile pages
    "/api/avatar", // used on homepage (leaderboard panel), leaderboard, player profiles, clan info page
    "/api/changelogs", // used on changelog pages
    "/api/player-info", // used on player profile pages
    "/api/clan-info", // used on clan info pages
    "/item-list", // used on item list pages
    "/api/game-info", // used on homepage
    "/api/group-icon", // used on clan info page
    "/api/player-search", // used on homepage, player profiles
    "/api/leaderboard", // used on leaderboard pages,
    "/api/auth/logout",
    "/api/auth/roblox/callback", // used during Roblox OAuth login
    "/api/auth/2fa/verify", // used during 2FA verification
    "/api/auth/2fa/request", // used during 2FA verification
    "/api/claim-vanity", // used during vanity URL claiming
    "/api/upload-asset",
  ],
};
