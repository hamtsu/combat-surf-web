"use client";

import { getIdTokenResult, signInWithCustomToken } from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/lib/firebaseClient";

export default function CompleteAuth() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (!token) return;

    signInWithCustomToken(auth, token)
      .then(async (cred) => {
        const tokenResult = await getIdTokenResult(cred.user);

        console.log(tokenResult.claims);

        const robloxUserId = tokenResult.claims.userId;

        router.push("/player/" + robloxUserId + "?welcome=true");
      })
      .catch(console.error);
  }, [params, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-stone-200 mb-4">
        Completing Authentication...
      </h1>
      <p className="text-stone-400">
        Please wait while we log you in and redirect you to your profile.
      </p>
    </div>
  );
}
