import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import crypto from "crypto";
import { getAuth } from "firebase-admin/auth";
import { parseUserAgent } from "@/lib/parseUserAgent";

export async function POST(req: Request) {
  const { code, username, displayName } = await req.json();
  const userAgent = req.headers.get("user-agent");
  const parsedUserAgent = parseUserAgent(userAgent ? userAgent : "");
  const approxLocation = req.headers.get("cf-ipcountry") || "Unknown";
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const countryName = approxLocation !== "Unknown" ? regionNames.of(approxLocation) : "Unknown";

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];

  const decoded = await getAuth().verifyIdToken(token);
  const uid = decoded.uid;

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

  const ref = db
    .collection("users")
    .doc(uid)
    .collection("twoFactor")
    .doc("current");

  const snap = await ref.get();
  if (!snap.exists)
    return NextResponse.json({ error: "No code" }, { status: 400 });

  const data = snap.data()!;
  if (data.used) return NextResponse.json({ error: "Used" }, { status: 400 });
  if (data.expiresAt.toDate() < new Date())
    return NextResponse.json(
      { error: "Expired. Please Refresh page" },
      { status: 400 },
    );

  if (data.attempts >= 5) {
    if (data.attempts === 5) {
      await fetch(
        process.env.DISCORD_WEBHOOK_URL! + "/messages/" + data.messageId,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                color: 0xf54927,
                description: `<:error:939392259160416307> **Failed** Login request for ${displayName} [*(@${username})*](https://www.roblox.com/users/${uid.split(":")[1]}/profile)`,
                fields: [
                  {
                    name: "User Agent",
                    value: `> Browser: **${parsedUserAgent.browser}** | OS: **${parsedUserAgent.os} [${parsedUserAgent.osVersion}]**\n> Device: **${parsedUserAgent.device}**`,
                    inline: false,
                  },
                  {
                    name: "Failed At",
                    value: `> <t:${Math.floor(Date.now() / 1000)}:R>`,
                    inline: true,
                  },
                  {
                    name: "Location",
                    value: `> ${countryName}`,
                    inline: true,
                  },
                  {
                    name: "Was this you?",
                    value: `> **Multiple invalid login attempts** were made. If this wasn't you, **please secure your Roblox account immediately.**`,
                    inline: false,
                  },
                ],
                footer: {
                  text: "(" + uid.split(":")[1] + ") • Login Request Failed. ",
                },
                  thumbnail: {
                    url: avatarUrl,
                  },
                },
              ],
            }),
          },
        );

        await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              color: 0xf54927,
              description: `<:error:939392259160416307>  **${displayName} [*(@${username})*](https://www.roblox.com/users/${uid.split(":")[1]}/profile)** has failed verification. <t:${Math.floor(Date.now() / 1000)}:R> [[Review]](https://discord.com/channels/${process.env.GUILD_ID}/${process.env.CHANNEL_ID}/${data.messageId})`,
            },
          ],
        }),
      });
    }

    await ref.update({ attempts: data.attempts + 1 });

    return NextResponse.json(
      { error: "Too many attempts! Please try again later." },
      { status: 429 },
    );
  }

  const hash = crypto.createHash("sha256").update(code).digest("hex");

  if (hash !== data.codeHash) {
    await ref.update({ attempts: data.attempts + 1 });
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  await ref.update({ used: true });

  await getAuth().setCustomUserClaims(uid, {
    authenticated: true,
  });

  await db.collection("users").doc(uid).update({
    authenticatedCountry: countryName,
    authenticatedAt: new Date(),
  });

  await fetch(
    process.env.DISCORD_WEBHOOK_URL! + "/messages/" + data.messageId,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            color: 0x5ce65c,
            description: `<:undo:939831640493019137> **Succeeded** login request for ${displayName} [*(@${username})*](https://www.roblox.com/users/${uid.split(":")[1]}/profile)`,
            fields: [
              {
                name: "User Agent",
                value: `> Browser: **${parsedUserAgent.browser}** | OS: **${parsedUserAgent.os} [${parsedUserAgent.osVersion}]**\n> Device: **${parsedUserAgent.device}**`,
                inline: false,
              },
              {
                name: "Succeeded At",
                value: `> <t:${Math.floor(Date.now() / 1000)}:R>`,
                inline: true,
              },
              {
                name: "Location",
                value: `> ${countryName}`,
                inline: true,
              },
            ],
            footer: {
              text: "(" + uid.split(":")[1] + ") • Login Request Successful. ",
            },
            thumbnail: {
              url: avatarUrl,
            },
          },
        ],
      }),
    },
  );

  await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          color: 0x5ce65c,
          description: `<:undo:939831640493019137>  **${displayName} [*(@${username})*](https://www.roblox.com/users/${uid.split(":")[1]}/profile)** passed verification <t:${Math.floor(Date.now() / 1000)}:R> [[Review]](https://discord.com/channels/${process.env.GUILD_ID}/${process.env.CHANNEL_ID}/${data.messageId})`,
        },
      ],
    }),
  });

  return NextResponse.json({ success: true });
}
