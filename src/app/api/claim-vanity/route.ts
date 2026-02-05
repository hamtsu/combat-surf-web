import { adminAuth, db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
    const { vanity } = await req.json();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return new Response("Unauthorized", { status: 401 });

    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const vanityKey = vanity.toLowerCase();

    if (!vanityKey || typeof vanity !== "string" || !/^[a-zA-Z0-9_-]+$/.test(vanityKey) || vanityKey.includes("/")) {
        return new Response(JSON.stringify({ success: false, message: "Invalid vanity format" }), { status: 400 });
    }

    if (vanityKey.length < 3 || vanityKey.length > 12) {
        return new Response(JSON.stringify({ success: false, message: "Vanity must be between 3 and 12 characters" }), { status: 400 });
    }

    const vanityDoc = db.collection("vanities").doc(vanityKey);
    const userDoc = db.collection("users").doc(uid);

    try {
        await db.runTransaction(async (t: any) => {
            const vSnap = await t.get(vanityDoc);
            if (vSnap.exists) throw new Error("Vanity URL already taken");

            //remove old vanity
            const userSnap = await t.get(userDoc);
            const oldVanity = userSnap.data()?.vanityUrl;
            if (oldVanity) t.delete(db.collection("vanities").doc(oldVanity));

            t.set(vanityDoc, { uid, createdAt: FieldValue.serverTimestamp() });
            t.update(userDoc, { vanityUrl: vanityKey, updatedAt: FieldValue.serverTimestamp() });
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err: any) {
        return new Response(err.message, { status: 400 });
    }
}
