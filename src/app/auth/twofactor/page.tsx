"use client";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaLock, FaLockOpen } from "react-icons/fa";
import PinInput from "@/components/PinInput";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";

export default function TwoFactor() {
  const { user, claims, loading } = useAuth();
  const router = useRouter();

  const [twoFactorStarted, setTwoFactorStarted] = useState(true);
  const [codeIncorrect, setCodeIncorrect] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const requestStartedRef = useRef(false);

  useEffect(() => {
    if (!loading && !user) {
      console.log("No user, redirecting to login");
      router.replace("/auth/login");
      return;
    }

    if (!twoFactorStarted || requestStartedRef.current) return;

    if (claims?.authenticated) {
      router.replace("/");
      return;
    }

    const startTwoFactor = async () => {
      const token = await user.getIdToken();

      await fetch("/api/auth/2fa/request", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: claims?.displayName,
          username: claims?.username,
          rank: claims?.groupRole,
        }),
      });
    };
    if (user) {
      requestStartedRef.current = true;
      startTwoFactor();
    }
  }, [
    user,
    claims?.displayName,
    claims?.groupRole,
    claims?.username,
    claims?.authenticated,
    twoFactorStarted,
    loading,
    router,
  ]);

  const handleSubmit = async (pin: string) => {
    setInputDisabled(true);
    const token = await user.getIdToken();

    const res = await fetch("/api/auth/2fa/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: pin,
        displayName: claims?.displayName,
        username: claims?.username,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setTwoFactorStarted(false);
      setCodeVerified(true);
      setCodeIncorrect(false);
      const robloxUserId = claims.userId;
      await auth.currentUser?.getIdToken(true); // refresh token to get new claims

      router.push("/player/" + robloxUserId + "?welcome=true");
    } else {
      setCodeIncorrect(data.error);
      setInputDisabled(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen">
      {twoFactorStarted ? (
        <>
          <FaLock size={80} className="text-stone-700 mb-10" />
          <h1 className="text-2xl font-bold text-stone-200 mb-4">
            Two Factor Authentication
          </h1>
          <p className="text-stone-400">
            Please enter your authentication code sent in the{" "}
            <span className="bg-stone-800 rounded-md font-mono">
              #website-2fa
            </span>{" "}
            channel.
          </p>

          <div className="mt-8 animate-fade-in">
            <PinInput
              handleSubmit={handleSubmit}
              inputDisabled={inputDisabled}
            />
            {inputDisabled && (
              <p className="text-center text-stone-400 mt-2">Verifying...</p>
            )}
          </div>

          {codeIncorrect && (
            <p className="text-red-500 mt-4 flex gap-1 items-center">
              <FaTriangleExclamation /> {codeIncorrect}
            </p>
          )}
        </>
      ) : codeVerified ? (
        <>
          <FaLockOpen size={80} className="text-green-700 mb-10" />
          <h1 className="text-2xl font-bold text-stone-200 mb-4">
            Thank you, {claims?.displayName || "User"}!
          </h1>
          <p className="text-stone-400">
            Please wait while we log you in and redirect you to your profile.
          </p>
        </>
      ) : (
        <>
          <FaLock size={80} className="text-stone-700 mb-10" />
          <h1 className="text-2xl font-bold text-stone-200 mb-4">
            Two Factor Authentication
          </h1>
          <p className="text-stone-400">
            Ensure you are in the Discord to receive your authentication code.
          </p>
        </>
      )}
    </div>
  );
}
