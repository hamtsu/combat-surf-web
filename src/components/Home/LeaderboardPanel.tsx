"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight, FaMedal } from "react-icons/fa";
import { useRouter } from "next/navigation";
import RobloxAvatar from "../RobloxAvatar";
import Button from "../Button";
import { FaTriangleExclamation } from "react-icons/fa6";
import Tooltip from "../Tooltip";
import ClanTag from "../ClanTag";

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
        <div className="p-3 h-fit bg-stone-900 rounded-md">
          <FaMedal size={25} className="fill-stone-600" />
        </div>

        <div className="text-2xl md:text-3xl font-bold text-stone-400 mt-2">
          Leaderboards
          <div className="md:hidden hover:cursor-pointer text-sm text-yellow-400 h-fit my-auto font-bold flex items-center gap-1">
            <FaTriangleExclamation className="text-yellow-500" /> Using Mock
            Data
          </div>
        </div>

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
        <div className="text-stone-400 text-lg italic w-full h-full flex items-center justify-center font-bold"><p>Loading leaderboard...</p></div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 w-full">
          {/* Player leaderboard */}
          <div className="flex flex-col gap-2">
            {players.slice(0, 5).map((player, index) => {
              const isTop = index === 0;
              return (
                <div
                  key={player.id}
                  style={{
                    animationDelay: `${index * 0.1 + (isTop ? 0 : 2.5)}s`,
                  }}
                  className={`flex gap-2 items-center p-2 rounded-md select-none ${
                    isTop
                      ? "bg-[url(/header.png)] bg-bottom"
                      : "bg-stone-900 opacity-0 animate-fade-in"
                  }`}
                >
                  <div
                    className={`w-${
                      isTop ? "10" : "5"
                    } bg-stone-500 rounded-md`}
                  >
                    <RobloxAvatar userId={player.id} />
                  </div>
                  <p
                    className={
                      isTop
                        ? "text-yellow-400 font-bold"
                        : "text-stone-200 font-bold"
                    }
                  >
                    {index + 1}.
                  </p>
                  <a
                    href={`/player/${player.id}`}
                    className="text-stone-200 hover:text-amber-300"
                  >
                    {player.name.length > 8
                      ? player.name.slice(0, 8) + "…"
                      : player.name}
                  </a>
                  <div className="font-bold">
                    <ClanTag
                      text={player.clan}
                      colorR={player.clanStyle.colorR}
                      colorG={player.clanStyle.colorG}
                      colorB={player.clanStyle.colorB}
                      colorR2={player.clanStyle.colorR2}
                      colorG2={player.clanStyle.colorG2}
                      colorB2={player.clanStyle.colorB2}
                      colorMode={player.clanStyle.colorMode}
                    />
                  </div>
                  <p className="text-stone-400">{player.level}</p>
                  <span className="text-stone-500 text-base ml-[-5px]">
                    level
                  </span>
                </div>
              );
            })}
          </div>

          {/* Clan leaderboard */}
          <div className="flex mt-4 md:mt-0 flex-col gap-2 w-full">
            {clans.slice(0, 5).map((clan, index) => (
              <div
                key={clan.id}
                style={{ animationDelay: `${index * 0.1 + 3}s` }}
                className="flex select-none gap-2 items-center bg-stone-900 p-[0.6rem] rounded-md opacity-0 animate-fade-in"
              >
                <p className="text-stone-200 font-bold">{index + 1}.</p>
                <a
                  href={`/clan/${clan.id}`}
                  className="text-stone-200 hover:text-amber-300"
                >
                  {clan.name.length > 8
                    ? clan.name.slice(0, 8) + "…"
                    : clan.name}
                </a>
                <div className="font-bold">
                    <ClanTag
                      text={clan.tag}
                      colorR={clan.clanStyle.colorR}
                      colorG={clan.clanStyle.colorG}
                      colorB={clan.clanStyle.colorB}
                      colorR2={clan.clanStyle.colorR2}
                      colorG2={clan.clanStyle.colorG2}
                      colorB2={clan.clanStyle.colorB2}
                      colorMode={clan.clanStyle.colorMode}
                    />
                  </div>
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
