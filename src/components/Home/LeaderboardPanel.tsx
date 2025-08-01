"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight, FaMedal } from "react-icons/fa";
import { useRouter } from "next/navigation";
import RobloxAvatar from "../RobloxAvatar";
import Button from "../Button";

const LeaderboardPanel = () => {
  const router = useRouter();
  const [players, setPlayers] = useState<any[]>([]);
  const [clans, setClans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.players || []);
        setClans(data.clans || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load leaderboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-full z-0 relative opacity-0 animate-fade-in-sixth bg-stone-800 p-4 rounded-md flex flex-col gap-3 w-full md:w-[650px]">
      <div className="flex gap-4">
        <div className="p-3 bg-stone-900 rounded-md">
          <FaMedal size={25} className="fill-stone-600" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-stone-400 mt-2">
          Leaderboards
        </h1>

        <Button
          onClick={() => router.push("/leaderboard")}
          className="ml-auto px-3 py-2 h-fit flex bg-stone-900 hover:bg-stone-700 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
        >
          <FaArrowRight
            size={15}
            className="fill-stone-200 mr-2 group-hover:animate-bounce-right"
          />
          <p className="text-stone-200 hidden md:block">View all</p>
          <p className="text-stone-200 md:hidden ">All</p>
        </Button>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm italic">Loading leaderboard...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 w-full">
          {/* Player leaderboard */}
          <div className="flex flex-col gap-2">
            {players.map((player, index) => {
              const isTop = index === 0;
              return (
                <div
                  key={player.id}
                  style={{ animationDelay: `${index * 0.1 + (isTop ? 0 : 2.5)}s` }}
                  className={`flex gap-2 items-center p-2 rounded-md ${isTop
                    ? "bg-[url(/header.png)] bg-bottom"
                    : "bg-stone-900 opacity-0 animate-fade-in"
                    }`}
                >
                  <div className={`w-${isTop ? "10" : "5"} bg-stone-500 rounded-md`}>
                    <RobloxAvatar userId={player.id} />
                  </div>
                  <p className={isTop ? "text-yellow-400 font-bold" : "text-stone-200 font-bold"}>
                    {index + 1}.
                  </p>
                  <a
                    href={`/player/${player.id}`}
                    className="text-stone-200 hover:text-amber-300"
                  >
                    {player.name.length > 8 ? player.name.slice(0, 8) + "…" : player.name}
                  </a>
                  <p className="text-stone-400">{player.clan}</p>
                  <p className="text-stone-400">{player.level}</p>
                  <span className="text-stone-500 text-base ml-[-5px]">level</span>
                </div>
              );
            })}
          </div>

          {/* Clan leaderboard */}
          <div className="flex mt-4 md:mt-0 flex-col gap-2 w-full">
            {clans.map((clan, index) => (
              <div
                key={clan.id}
                style={{ animationDelay: `${index * 0.1 + 3}s` }}
                className="flex gap-2 items-center bg-stone-900 p-[0.6rem] rounded-md opacity-0 animate-fade-in"
              >
                <p className="text-stone-200 font-bold">{index + 1}.</p>
                <a
                  href={`/clan/${clan.id}`}
                  className="text-stone-200 hover:text-amber-300"
                >
                  {clan.name.length > 8 ? clan.name.slice(0, 8) + "…" : clan.name}
                </a>
                <p className="text-stone-400">{clan.tag}</p>
                <p className="text-stone-400">{clan.wins}</p>
                <span className="text-stone-500 text-base ml-[-5px]">wins</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPanel;
