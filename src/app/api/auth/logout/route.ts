import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];

  const decoded = await adminAuth.verifyIdToken(token);
  const uid = decoded.uid;

  await adminAuth.setCustomUserClaims(uid, {
    authenticated: false,
  });

  return NextResponse.json({ success: true });
}
