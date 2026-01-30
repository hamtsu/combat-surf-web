import "server-only";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert(
      JSON.parse(Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!,
      "base64"
    ).toString("utf-8"))
    ),
  });
}

export const adminAuth = getAuth();
export const db = getFirestore()
