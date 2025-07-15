import { NextRequest, NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  lastReset: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 50
const WINDOW_MS = 60 * 1000 

function getClientIp(req: NextRequest): string {
  return req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown"
}

export function middleware(req: NextRequest) {
  const ip = getClientIp(req)
  const now = Date.now()

  const entry = rateLimitMap.get(ip)

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return NextResponse.next()
  }

  if (now - entry.lastReset > WINDOW_MS) {
    // reset time
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return NextResponse.next()
  }

  if (entry.count >= MAX_REQUESTS) {
    return NextResponse.json({ message: "Too many requests. Try again later"}, { status: 429 })
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
}