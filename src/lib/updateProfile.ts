import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";

// const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];

// // 5mb
// const MAX_SIZE = 5 * 1024 * 1024;

// export async function updateProfileImage(
//   file: File,
//   type: "banner" | "background",
// ): Promise<string> {
//   if (!auth.currentUser) throw new Error("Not logged in");

//   if (!ALLOWED_TYPES.includes(file.type)) {
//     throw new Error(
//       "Invalid file type. Allowed types: PNG, JPG, JPEG, GIF, WEBP",
//     );
//   }

//   if (file.size > MAX_SIZE) {
//     throw new Error("File too large. Max size is 5MB");
//   }

//   const uid = auth.currentUser.uid;
//   // keep original extension
//   const ext = file.name.split(".").pop()?.toLowerCase() ?? "webp";
//   const fileName = `${type}.${ext}`;

//   const fileRef = ref(storage, `user-assets/${uid}/${fileName}`);

//   await uploadBytes(fileRef, file, { contentType: file.type });

//   const field = type === "banner" ? "bannerPath" : "backgroundPath";

//   await updateDoc(doc(db, "users", uid), {
//     [field]: `user-assets/${uid}/${fileName}`,
//     updatedAt: serverTimestamp(),
//   });

//   return `user-assets/${uid}/${fileName}`;
// }

export async function updateTheme(
  theme: { [key: string]: string },
  description: string,
  socials: { [key: string]: string }
): Promise<string> {
  if (!auth.currentUser) throw new Error("Not logged in");

  const uid = auth.currentUser.uid;
  await updateDoc(doc(db, "users", uid), {
    theme: theme,
    description: description,
    socials: socials,
    updatedAt: serverTimestamp(),
  });

  return "Success";
}

export async function updateShowcase(
  showcase: string[]
): Promise<string> {
  if (!auth.currentUser) throw new Error("Not logged in");

  const uid = auth.currentUser.uid;
  await updateDoc(doc(db, "users", uid), {
    showcase: showcase,
    updatedAt: serverTimestamp(),
  });

  return "Success";
}