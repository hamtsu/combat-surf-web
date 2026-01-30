import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { User } from "firebase/auth";

export async function ensureUserDoc(user: User) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      authenticatedAt: null,
      theme: {
        bgPrimary: "#1c1917",
        bgSecondary: "#292524FF",
        bgTertiary: "#1c1917FF",
        textPrimary: "#d6d3d1FF",
        textSecondary: "#78716cFF",
        textMuted: "#a8a29eFF",
        borderColor: "#44403cFF",
        iconColor: "#57534eFF",
        progressTrack: "#57534eFF",
        progressFill: "#e7e5e4FF",
        textOnFill: "#292524FF",
        digitInactive: "#57534eFF",
        digitActive: "#e7e5e4FF",
        textBanner: "#e7e5e4",
      },
      bannerPath: null,
      backgroundPath: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}
