"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { auth } from "@/lib/firebaseClient";
import {
  FaArrowLeft,
  FaArrowRight,
  FaDoorOpen,
  FaLock,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import RobloxAvatar from "./RobloxAvatar";

const AccountOverlay = () => {
  const { user, claims, loading } = useAuth();
  const router = useRouter();
  const [optionsShown, setOptionsShown] = useState(false);

  if (loading) return null;

  return (
    <div className="fixed top-6 right-6 z-50 gap-2">
      {user ? (
        <>
          <div className="flex items-center gap-2">
            {optionsShown && (
              <div className="bg-stone-900 min-w-[140px] select-none h-[75px] animate-fade-in p-2 rounded-md shadow-lg flex flex-col">
                <h2 className="text-stone-500 text-xs">Logged in as</h2>
                <h1 className="font-semibold text-2xl text-stone-200 pr-3">
                  {claims?.displayName || "User"}
                </h1>
                <h2 className="text-stone-400 -mt-2 text-sm">
                  {claims?.username || "User"}
                </h2>
              </div>
            )}

            <div
              onClick={() => setOptionsShown(!optionsShown)}
              className="max-w-[75px] w-[75px] bg-stone-900 shadow-lg p-2 transition-all rounded-md group hover:cursor-pointer overflow-hidden relative"
            >
              <div className="absolute hover:cursor-pointer p-1 w-[80%] h-[79%] bg-transparent transition-all group-hover:bg-white/10 rounded-md">
                {optionsShown ? (
                  <FaArrowRight
                    className="m-auto h-full text-transparent transition-all group-hover:text-stone-200/50"
                    size={25}
                  />
                ) : (
                  <FaArrowLeft
                    className="m-auto h-full text-transparent transition-all group-hover:text-stone-200/50"
                    size={25}
                  />
                )}
              </div>
              <div className="select-none">
                {" "}
                <RobloxAvatar userId={claims?.userId} />
              </div>
            </div>
          </div>
          {optionsShown && (
            <div className="flex flex-col gap-1 mt-2 w-full">
              <Button
                className="bg-stone-900 py-2 px-3 shadow-lg opacity-0 animate-fade-in-first flex gap-3 font-bold text-xl text-stone-300 hover:bg-red-500 group"
                onClick={() => auth.signOut()}
              >
                <FaDoorOpen className="text-stone-300" />
                Logout
              </Button>
              <div className="flex items-center gap-1">
                <Button
                  className="bg-stone-900 shadow-lg py-2 px-3 opacity-0 animate-fade-in-second w-full flex gap-3 font-bold text-sm hover:text-stone-800 text-stone-300 hover:bg-stone-200 group"
                  onClick={() => router.push(`/player/${claims?.userId}`)}
                >
                  <FaUser className="text-stone-300 group-hover:text-stone-800" />
                  Profile
                </Button>
                <Button
                  className="bg-stone-900 shadow-lg py-2 px-3 opacity-0 animate-fade-in-third text-nowrap flex gap-3 font-bold text-sm text-stone-300 hover:bg-blue-500 group"
                  onClick={() => router.push(`/player/edit`)}
                >
                  <FaUserEdit className="text-stone-300" />
                  Edit
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="">
          <Button
            className="bg-stone-800/70 transition-all py-2 px-3 flex gap-2 text-stone-300/70 hover:text-stone-300 hover:bg-stone-800 group"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            <FaLock className="text-stone-400/70 group-hover:animate-wiggle group-hover:text-stone-400" />
            Staff
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountOverlay;
