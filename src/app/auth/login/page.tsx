"use client";

import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaArrowLeft, FaLock, FaUserLock } from "react-icons/fa";
import { SiRoblox } from "react-icons/si";

const Login = () => {
  const router = useRouter();
  const { user, claims, loading } = useAuth();

  const login = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_ROBLOX_OAUTH_CLIENT_ID!,
      response_type: "code",
      scope: "openid profile",
      redirect_uri: `${window.location.origin}/api/auth/roblox/callback`,
    });

    window.location.href = `https://apis.roblox.com/oauth/v1/authorize?${params}`;
  };

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4 p-4 md:px-48 bg-stone-900">
      <div className="rounded-md bg-stone-800 p-4 h-fit">
        <h1 className="text-5xl md:text-8xl font-bold text-stone-300 flex items-center gap-2">
          <FaUserLock size={80} className="text-stone-500 hidden md:block" />
          <FaUserLock size={40} className="text-stone-500 md:hidden" /> Staff
          Login
        </h1>
        <div className="text-stone-400 text-lg pt-1 flex items-center gap-1">
          Connect your roblox account to access member features.
        </div>

        <div className="w-full rounded-md overflow-hidden bg-stone-900 text-stone-400 mt-6">
          <div className="h-2 bg-construction-yellow w-full" />
          <div className="p-2 font-mono text-xs md:text-base flex gap-2 items-center">
            <FaLock className="text-stone-500 md:mr-2" size={20} />
            <div>
              This is a <b>staff and honorary member</b> restricted directory
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            className="bg-stone-900 py-2 px-3 flex gap-3 font-bold text-base md:text-xl text-stone-300 hover:bg-red-500 group"
            onClick={login}
          >
            <SiRoblox className="text-stone-300 animate-wiggle" />
            Login with Roblox
          </Button>
          <Button
            className="bg-stone-900 py-2 px-3 flex gap-3 text-base md:text-lg text-stone-300 hover:bg-stone-700 group"
            onClick={() => {
              router.back();
            }}
          >
            <FaArrowLeft className="text-stone-300 group-hover:animate-bounce-left" />
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
