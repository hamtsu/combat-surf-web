import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

// export async function claimVanity(uid: string, vanity: string) {
//     const vanityDoc = doc(db, "vanities", vanity.toLowerCase());
//     const userDoc = doc(db, "users", uid);

//     if (!vanity || typeof vanity !== "string" || !/^[a-zA-Z0-9_-]+$/.test(vanity) || vanity.includes("/")) {
//         return { success: false, message: "Invalid vanity format" };
//     }

//     if (vanity.length < 3 || vanity.length > 12) {
//         return { success: false, message: "Vanity must be between 3 and 12 characters" };
//     }

//     try {
//         await runTransaction(db, async (transaction) => {
//             const vSnap = await transaction.get(vanityDoc);
//             if (vSnap.exists()) {
//                 throw new Error("Vanity URL already taken");
//             }

//             transaction.set(vanityDoc, {
//                 uid,
//                 createdAt: serverTimestamp(),
//             });

//             transaction.update(userDoc, {
//                 vanityUrl: vanity.toLowerCase(),
//                 updatedAt: serverTimestamp(),
//             });
//         });

//         return { success: true };
//     } catch (err: any) {
//         return { success: false, message: err.message };
//     }
// }

export async function checkVanityAvailability(vanity: string) {
    const vanityDoc = doc(db, "vanities", vanity.toLowerCase());
    const snap = await getDoc(vanityDoc);
    return !snap.exists();
}

export async function checkVanityClaimedByUser(uid: string) {
    const userDoc = doc(db, "users", uid);
    const snap = await getDoc(userDoc);
    if (!snap.exists()) return false;
    const data = snap.data();
    return data?.vanityUrl ? data?.vanityUrl : false;
}
