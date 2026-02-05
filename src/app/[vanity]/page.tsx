import { db } from "@/lib/firebaseAdmin";
import { redirect } from "next/navigation";
import Custom404 from "../not-found";

interface Props {
  params: Promise<{ vanity?: string }>;
}

export default async function VanityPage({ params }: Props) {
  const Param = await params
  const vanityParam = Param?.vanity;
  
  if (!vanityParam || vanityParam.length < 3 || vanityParam.length > 12) {
    return <div>Vanity URL not provided</div>;
  }

  const vanity = vanityParam.toLowerCase();

  const vDoc = await db.collection("vanities").doc(vanity).get();

  if (!vDoc.exists) {
    return <Custom404 />
  }

  const uid = vDoc.data()?.uid;
  if (!uid) return <div>User not found</div>;

  redirect(`/player/${uid.split(":")[1]}`);
}
