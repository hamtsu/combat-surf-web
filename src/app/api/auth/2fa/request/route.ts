import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import crypto from "crypto";
import { getAuth } from "firebase-admin/auth";

export async function POST(req: Request) {
  const { username, displayName, rank } = await req.json();
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];

  const decoded = await getAuth().verifyIdToken(token);
  const uid = decoded.uid;

  const ref = db
    .collection("users")
    .doc(uid)
    .collection("twoFactor")
    .doc("current");

  const snap = await ref.get();

  if (snap.exists) {
    const data = snap.data()!;
    const expired = data.expiresAt.toDate() < new Date();

    if (!expired && !data.used) {
      return NextResponse.json(
        { error: "2FA code already active" },
        { status: 429 },
      );
    }
  }

  const code = crypto.randomInt(100_000_000, 1_000_000_000).toString();
  const hash = crypto.createHash("sha256").update(code).digest("hex");

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  let avatarUrl = "";
  try {
    const thumbnailRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${uid.split(":")[1]}&size=150x150&format=Png&isCircular=false`,
    );
    const thumbnailData = await thumbnailRes.json();
    avatarUrl = thumbnailData?.data?.[0]?.imageUrl || "";
  } catch (error) {
    console.error("Failed to fetch Roblox avatar:", error);
  }

  await fetch(process.env.DISCORD_WEBHOOK_URL! + "?wait=true", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          color: 0x2f3136,
          description: `<:users:944475367782105088> **Login request for ${displayName} [*(@${username})*](https://www.roblox.com/users/${uid.split(":")[1]}/profile)**\n> ||\`\`\`${code.slice(0, 3) + " " + code.slice(3, 6) + " " + code.slice(6, 9)}\`\`\`|| Enter this code to **complete your login**`,
          fields: [
            {
              name: "Requested",
              value: `> <t:${Math.floor(Date.now() / 1000)}:R>`,
              inline: true,
            },
            {
              name: "Expires in",
              value: `> <t:${Math.floor((Date.now() + 4 * 60 * 1000) / 1000)}:R>`,
              inline: true,
            },
            {
              name: "Rank",
              value: `> ${rank}`,
              inline: false,
            },
          ],
          footer: {
            text: "(" + uid.split(":")[1] + ") • Do not share this code. ",
            icon_url: "https://i.imgur.com/2cJjt1N.png",
          },
          thumbnail: {
            url: avatarUrl,
          },
        },
      ],
    }),
  }).then(async (res) => {
    const data = await res.json();
    const messageId = data.id;
    await ref.set({
      codeHash: hash,
      expiresAt,
      used: false,
      attempts: 0,
      messageId: messageId,
      createdAt: new Date(),
    });
  });

  return NextResponse.json({ success: true });
}
