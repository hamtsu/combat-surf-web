import { doc, getDoc } from "firebase/firestore";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebaseClient";

export async function getUserTheme(uid: string) {
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);

  if (!snap.exists()) return null;

  // banner
  let bannerUrl = null;

  if (snap.data().bannerPath) {
    const bannerFileRef = storageRef(storage, snap.data().bannerPath);
    bannerUrl = await getDownloadURL(bannerFileRef);
  }

  // background
  let backgroundUrl = null;

  if (snap.data().backgroundPath) {
    const backgroundFileRef = storageRef(storage, snap.data().backgroundPath);
    backgroundUrl = await getDownloadURL(backgroundFileRef);
  }

  // theme
  const theme = snap.data().theme || {};

  return { bannerUrl, backgroundUrl, theme };
}
