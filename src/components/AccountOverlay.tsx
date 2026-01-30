"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { auth } from "@/lib/firebaseClient";
import { usePathname } from "next/navigation";
import {
  FaAngleDown,
  FaAngleUp,
  FaCheck,
  FaDoorOpen,
  FaLock,
  FaQuestion,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import RobloxAvatar from "./RobloxAvatar";
import { FaXmark } from "react-icons/fa6";
import { ScaleLoader } from "react-spinners";

const AccountOverlay = () => {
  const { user, claims, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [optionsShown, setOptionsShown] = useState(false);
  const [twoStepShown, setTwoStepShown] = useState(false);
  const [hide, setHide] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogoutFirst = () => {
    setTwoStepShown(true);
  };

  const handleLogout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    const token = await user.getIdToken();

    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setLogoutLoading(false);
        setOptionsShown(false);
        auth.signOut();
      })
      .catch((err) => {
        setLogoutLoading(false);
        console.log(err);
      });
  };

  const handleViewProfile = () => {
    setOptionsShown(false);
    router.push(`/player/${claims?.userId}`);
  };

  const handleEditProfile = () => {
    setOptionsShown(false);
    router.push(`/player/edit`);
  };

  useEffect(() => {
    if (pathname == "/auth/login") {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [pathname]);

  if (!loading && !hide)
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
                    <FaAngleUp
                      className="m-auto h-full text-transparent transition-all group-hover:text-stone-200/50"
                      size={25}
                    />
                  ) : (
                    <FaAngleDown
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
              <div className="flex animate-fade-in flex-col gap-1 mt-2 w-full">
                {!twoStepShown ? (
                  <Button
                    className="bg-stone-900 py-2 px-3 shadow-lg flex gap-3 font-bold text-xl text-stone-300 hover:bg-red-500 group"
                    onClick={handleLogoutFirst}
                  >
                    <FaDoorOpen className="text-stone-300" />
                    Logout
                  </Button>
                ) : (
                  <div className="flex gap-1">
                    <Button
                      className="bg-stone-900 py-2 px-3 shadow-lg flex gap-3 font-bold text-xl text-stone-300 hover:bg-green-600 group"
                      onClick={handleLogout}
                    >
                      {logoutLoading ? (
                        <div className="w-full">
                          <ScaleLoader color="#d6d3d1" height={10} />
                        </div>
                      ) : (
                        <>
                          <FaCheck className="text-stone-300" />
                          Yes
                        </>
                      )}
                    </Button>
                    <Button
                      className="bg-stone-900 py-2 px-3 shadow-lg flex gap-3 font-bold text-xl text-stone-300 hover:bg-red-500 group"
                      onClick={() => setTwoStepShown(false)}
                    >
                      <FaXmark className="text-stone-300" />
                      No
                    </Button>
                    <div className="bg-stone-900 rounded-md p-2 px-3 items-center flex text-stone-200">
                      <FaQuestion />
                    </div>
                  </div>
                )}

                {claims.authenticated && (
                  <div className="flex items-center gap-1">
                    <Button
                      className="bg-stone-900 shadow-lg py-2 px-3 w-full flex gap-3 font-bold text-sm hover:text-stone-800 text-stone-300 hover:bg-stone-200 group"
                      onClick={handleViewProfile}
                    >
                      <FaUser className="text-stone-300 group-hover:text-stone-800" />
                      Profile
                    </Button>
                    <Button
                      className="bg-stone-900 shadow-lg py-2 px-3 text-nowrap flex gap-3 font-bold text-sm text-stone-300 hover:bg-blue-500 group"
                      onClick={handleEditProfile}
                    >
                      <FaUserEdit className="text-stone-300" />
                      Edit
                    </Button>
                  </div>
                )}
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
