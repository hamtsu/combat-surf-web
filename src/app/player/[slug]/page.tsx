"use client";

import InventoryPanel from "@/components/Profile/InventoryPanel";
import PlayerHeader from "@/components/Profile/PlayerHeader";
import StatisticPanel from "@/components/StatisticPanel";
import { use, useEffect, useState } from "react";
import { FaSkull, FaTrophy } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/player-info?userId=${slug}`)
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
      });
  }, [slug]);

  if (userInfo === null) {
    return (
      <div className="flex bg-stone-900 text-slate-200 flex-col items-center justify-center w-full h-full p-4">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex bg-stone-900 text-slate-200 flex-col items-center justify-center w-full h-full p-4 gap-9">
        <PlayerHeader userInfo={userInfo} />

        <div className="flex gap-5 items-bottom mt-8">
          <div className="flex flex-col gap-4 animate-fade-in-fifth opacity-0 ">
            <StatisticPanel
              name="Career Kills"
              value={userInfo.stats.career}
              icon={<FaSkull size={30} className="fill-stone-600" />}
            />
            <StatisticPanel
              name="Career Wins"
              value={userInfo.stats.wins}
              icon={<FaTrophy size={30} className="fill-stone-600" />}
            />
          </div>

          <InventoryPanel inventory={userInfo.inventory} />
        </div>
      </div>
    );
  }
}
