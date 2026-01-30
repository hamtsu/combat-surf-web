"use client";
import { useRef } from "react";
import Button from "./Button";
import { FaTriangleExclamation, FaXmark } from "react-icons/fa6";
import RobloxAvatar from "./RobloxAvatar";
import { useAuth } from "@/context/AuthContext";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function WelcomeModal({
  userInfo,
  onClose,
}: {
  userInfo: any;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { user, claims, loading } = useAuth();

  if (user)
    return (
      <div
        className="fixed opacity-0 animate-fade-in-fast top-0 left-0 w-screen h-screen px-4 md:px-0 bg-black/80 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div
          ref={modalRef}
          className="bg-stone-800 border border-stone-800 overflow-hidden rounded-md shadow-2xl w-fit text-stone-200 relative"
        >
          <div className="bg-stone-900 p-1 flex w-full shadow-md">
            <h1 className="text-lg font-bold text-stone-200 ml-2">
              Welcome to the exclusive club {userInfo.displayName || "User"}!
            </h1>
            <Button
              onClick={onClose}
              className="ml-auto p-1 hover:bg-red-500 hover:border-red-400 border border-transparent "
            >
              <FaXmark size={18} />
            </Button>
          </div>

          <div className="p-2 md:p-4">
            <div className="flex gap-2 md:gap-4">
              <div className="bg-stone-900 rounded-md w-[170px] h-fit">
                <div className="-mt-5">
                  <RobloxAvatar userId={userInfo.userId} />
                </div>
                <div className="absolute top-[49%] left-5">
                  <FaStar
                    className="absolute text-stone-300 rotate-45 z-10"
                    size={40}
                  />
                  <FaStar
                    className="absolute text-yellow-300 animate-ping rotate-45 z-20"
                    size={40}
                  />
                </div>

                <div className="mt-1 px-2 pb-1">
                    <h1 className="text-lg font-bold">{userInfo.displayName || "User"}</h1>
                    <h2 className="text-stone-400 -mt-2 text-sm">{claims?.groupRole}</h2>
                </div>
              </div>

              <div className="max-w-[500px] flex flex-col gap-4">
                <div className="bg-stone-900 rounded-md  p-2">
                  As you are a{" "}
                  <b>{claims?.groupRole ? claims.groupRole : "Staff Member"}</b>
                  , you now have access to various restricted features on the
                  Combat Surf website!
                </div>

                <div>
                  <div className="bg-red-500 border-red-400 border rounded-md font-bold  p-1 px-2 flex gap-4 items-center">
                    <FaTriangleExclamation className="text-red-300" size={20} />
                    Protected Directory - Important message
                  </div>
                  <div className="text-sm bg-stone-900 text-stone-400 p-2 rounded-md">
                    As this is a protected directory, it is important to ensure
                    the security of your roblox account. If you suspect your
                    roblox account may be compromised, please{" "}
                    <b>contact an admin immediately.</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                className="bg-stone-100 py-2 px-3 flex gap-3 text-lg text-stone-600 hover:bg-stone-200 group"
                onClick={() => {
                  router.push("/player/edit");
                }}
              >
                <FaArrowLeft className="text-stone-600 group-hover:animate-bounce-left" />
                Go to edit profile
              </Button>

              <Button
                className="bg-stone-900 py-2 px-3 flex gap-3 text-lg text-stone-300 hover:bg-stone-700 group"
                onClick={() => {
                  onClose();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
