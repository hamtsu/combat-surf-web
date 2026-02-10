import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export async function getUserTheme(uid: string) {
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);

  if (!snap.exists()) return null;

  // banner
  let bannerUrl = null;

  if (snap.data().bannerPath) {
    bannerUrl = snap.data().bannerPath + "?updatedAt=" + snap.data().bannerUpdatedAt?.toMillis();
  }

  // background
  let backgroundUrl = null;

  if (snap.data().backgroundPath) {
    backgroundUrl = snap.data().backgroundPath + "?updatedAt=" + snap.data().bannerUpdatedAt?.toMillis();
  }

  // theme
  const theme = snap.data().theme || {};

  // description
  const description = snap.data().description || "";

  // socials
  const socials = snap.data().socials || {};

  // showcase
  const showcase = snap.data().showcase || [];

  // awards
  const awards = snap.data().awards || [];

  return { bannerUrl, backgroundUrl, theme, description, socials, showcase, awards };
}
