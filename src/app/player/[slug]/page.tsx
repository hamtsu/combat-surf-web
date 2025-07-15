"use client";

import Button from "@/components/Button";
import InventoryPanel from "@/components/Profile/InventoryPanel";
import PlayerHeader from "@/components/Profile/PlayerHeader";
import StatisticPanel from "@/components/StatisticPanel";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FaArrowLeft, FaSkull, FaTrophy, FaUser } from "react-icons/fa";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(
      `/api/player-info?userId=${slug}&fields=username,displayName,level,clanId,inventory,xp,weaponKills,wins,tasks,globalKills`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUserInfo(data);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [slug]);

  if (userInfo === null) {
    return (
      <div className="flex bg-stone-900 text-slate-200 flex-col items-center justify-center w-full h-full p-4">
        <div className="absolute flex gap-2 left-5 top-5">
          <Tooltip text="Go back" position="bottom">
            <Button
              onClick={() => router.back()}
              className="px-5 h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
            >
              <FaArrowLeft
                size={35}
                className="group-hover:animate-bounce-right"
              />
            </Button>
          </Tooltip>

          <div className="flex gap-4 bg-stone-800 rounded-md">
            <div className="flex items-center justify-between text-2xl p-4 gap-4 bg-stone-800 rounded-md">
              <div className="rounded-md bg-stone-900 p-3">
                <FaUser size={25} className="fill-stone-600 " />
              </div>
              <h1 className="text-stone-400 font-bold">Viewing profile</h1>
            </div>
          </div>
        </div>

        <div className="bg-stone-800 rounded-md p-4 text-center">
          <FaUser size={40} className="text-stone-400 mx-auto mt-2" />
          {error ? (
            <>
              <h1 className="text-2xl font-bold text-stone-200 p-4">
                This profile could not be loaded!
              </h1>
              <p className="text-5xl font-bold text-red-400">(ᗒᗣᗕ)</p>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-stone-200 p-4">
              Loading profile...
            </h1>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="overflow-y-scroll flex bg-stone-900 text-slate-200 flex-col items-center justify-center w-full h-full p-4 gap-9">
        <div className="absolute flex gap-2 left-5 top-5">
          <Tooltip text="Go back" position="bottom">
            <Button
              onClick={() => router.back()}
              className="px-5 h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
            >
              <FaArrowLeft
                size={35}
                className="group-hover:animate-bounce-right"
              />
            </Button>
          </Tooltip>

          <div className="flex gap-4 bg-stone-800 rounded-md">
            <div className="flex items-center justify-between text-2xl p-4 gap-4 bg-stone-800 rounded-md">
              <div className="rounded-md bg-stone-900 p-3">
                <FaUser size={25} className="fill-stone-600 " />
              </div>
              <h1 className="text-stone-400 font-bold">
                Viewing <b>{userInfo.username}</b>
              </h1>
            </div>
          </div>
        </div>

        <PlayerHeader userInfo={userInfo} />

        <div className="flex md:flex-row flex-col gap-5 items-bottom md:mt-8 lg:mt-2">
          <div className="flex md:flex-col flex-row gap-4 animate-fade-in-fifth opacity-0 ">
            <StatisticPanel
              name="Career Kills"
              value={userInfo.globalKills}
              icon={<FaSkull size={30} className="fill-stone-600" />}
            />
            <StatisticPanel
              name="Career Wins"
              value={userInfo.wins}
              icon={<FaTrophy size={30} className="fill-stone-600" />}
            />
          </div>

          {/* wip */}
          <InventoryPanel inventory={[]} />
        </div>
      </div>
    );
  }
}
