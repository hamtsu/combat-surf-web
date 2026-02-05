import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

const REQUIRED_GROUP_ID = 5479316;
const MIN_RANK = 2; // mod

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenRes = await fetch("https://apis.roblox.com/oauth/v1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.NEXT_PUBLIC_ROBLOX_OAUTH_CLIENT_ID!,
      client_secret: process.env.ROBLOX_OAUTH_SECRET!,
      redirect_uri: `https://${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/roblox/callback`,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.json({ error: "OAuth failed" }, { status: 401 });
  }

  const tokenData = await tokenRes.json();

  const userRes = await fetch("https://apis.roblox.com/oauth/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  if (!userRes.ok) {
    return NextResponse.json({ error: "Userinfo failed" }, { status: 401 });
  }

  const user = await userRes.json();
  const robloxUserId = Number(user.sub);

  const groupsRes = await fetch(
    `https://groups.roblox.com/v2/users/${robloxUserId}/groups/roles`,
  );

  if (!groupsRes.ok) {
    return NextResponse.json({ error: "Group fetch failed" }, { status: 403 });
  }

  const groupsData = await groupsRes.json();

  const group = groupsData.data.find(
    (g: any) => g.group.id === REQUIRED_GROUP_ID,
  );

  if (!group || group.role.rank < MIN_RANK) {
    return NextResponse.json(
      { error: "Insufficient group rank" },
      { status: 403 },
    );
  }

  const firebaseToken = await adminAuth.createCustomToken(
    `roblox:${robloxUserId}`,
    {
      username: user.preferred_username,
      displayName: user.name,
      userId: robloxUserId,
      groupRank: group.role.rank,
      groupRole: group.role.name,
      provider: "roblox",
    },
  );

  return NextResponse.redirect(
    `https://combat.surf/auth/complete?token=${firebaseToken}`,
  );
}
