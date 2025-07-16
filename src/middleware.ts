import { NextRequest, NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  lastReset: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 15; // 15 req per minute
const WINDOW_MS = 60 * 1000;

function getClientIp(req: NextRequest): string {
  return (
    req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown"
  );
}

export function middleware(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();

  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return NextResponse.next();
  }

  if (now - entry.lastReset > WINDOW_MS) {
    // reset time
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname;
  console.warn(path);
  if (
    path == "/api/player-rank" ||
    path == "/api/game-info" ||
    path == "/api/avatar" ||
    path == "/api/changelogs"
  ) {
    // allow more requests for these endpoints
    if (entry.count >= MAX_REQUESTS + 10) {
      const res = NextResponse.json(
        {
          message: "Too many requests. Try again later",
         // waitSeconds: 60 - Math.round((now - entry.lastReset) / 1000),
        },
        { status: 429 }
      );

      res.cookies.set("rateLimitExceeded", "true", {
        maxAge: WINDOW_MS / 1000, 
      })

      return res;
    }
  } else if (entry.count >= MAX_REQUESTS) {
    const res = NextResponse.json(
        {
          message: "Too many requests. Try again later",
         // waitSeconds: 60 - Math.round((now - entry.lastReset) / 1000),
        },
        { status: 429 }
      );

      res.cookies.set("rateLimitExceeded", "true", {
        maxAge: WINDOW_MS / 1000, 
      })
      
      return res;
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/player-info",
    "/api/clan-info",
    "/api/changelogs",
    "/api/leaderboard",
    "/api/player-rank",
    "/api/game-info",
    "/api/avatar",
    "/item-list",
  ],
};
