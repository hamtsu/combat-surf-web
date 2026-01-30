import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];

  const decoded = await getAuth().verifyIdToken(token);
  const uid = decoded.uid;

  await getAuth().setCustomUserClaims(uid, {
    authenticated: false,
  });

  return NextResponse.json({ success: true });
}
