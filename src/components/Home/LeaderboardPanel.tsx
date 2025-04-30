"use client";

import React from "react";
import { FaArrowRight, FaMedal } from "react-icons/fa";
import { useRouter } from "next/navigation";
import RobloxAvatar from "../RobloxAvatar";
import Button from "../Button";

const MOCK_DATA = [
  { name: "hamtsuu", career: 8950, wins: 165, clan: "[C5]", id: "97752529" },
  { name: "smudgeplayz", career: 1000, wins: 100, clan: "[1X]", id: "1248971940" },
  { name: "testuser", career: 800, wins: 200, clan: "[NONE]", id: "1" },
  { name: "Player4", career: 700, wins: 200 },
  { name: "Player5", career: 600, wins: 200 },
];

const MOCK_CLANS = [
  { name: "Test", prefix: "[TEST]", wins: 200 },
  { name: "Clan2", prefix: "[2]", wins: 200 },
  { name: "Clan3", prefix: "[3]", wins: 200 },
  { name: "Clan4", prefix: "[4]", wins: 200 },
  { name: "Clan5", prefix: "[5]", wins: 200 },
];

const LeaderboardPanel = () => {
  const router = useRouter();

  return (
    <div className="h-full bg-stone-800 p-4 rounded-md flex flex-col gap-3 w-full md:w-[650px]">
      <div className="flex gap-4">
        <div className="p-3 bg-stone-900 rounded-md">
          <FaMedal size={25} className="fill-stone-600" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-stone-400 mt-2">Leaderboards</h1>

        <Button
          onClick={() => router.push("/leaderboard")}
          className="ml-auto px-3 py-2 h-fit flex bg-stone-900 hover:bg-stone-700 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
        >
          <FaArrowRight
            size={15}
            className="fill-stone-200 mr-2 group-hover:animate-bounce-right"
          />
          <p className="text-stone-200">View all</p>
        </Button>
      </div>

      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-2">
          {MOCK_DATA.map((player, index) => {
            if (index == 0)
              return (
                <div
                  key={index}
                  className="flex gap-2 items-center text-lg bg-[url(/header.png)] bg-bottom p-2 rounded-md"
                >
                  <div className="w-10">
                    <RobloxAvatar userId={player.id} />
                  </div>
                  <p className="text-yellow-400 font-bold">{index + 1}.</p>
                  <a href={`/player/${player.id}`} className="text-stone-200 hover:text-amber-300">{player.name}</a>
                  <p className="text-stone-200">{player.clan}</p>
                  <p className="text-stone-400">{player.career}</p>
                  <span className="text-stone-500 text-base ml-[-5px]">
                    kills
                  </span>
                  <p className="text-stone-400">{player.wins}</p>
                  <span className="text-stone-500 text-base ml-[-5px]">
                    wins
                  </span>
                </div>
              );
            if (index >= 1)
              return (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 0.1 + 3 }s` }}
                  className="flex gap-2 items-center bg-stone-900 p-2 rounded-md opacity-0 animate-fade-in"
                >
                  <div className="w-5 bg-stone-500 rounded-md">
                    <RobloxAvatar userId={player.id} />
                  </div>
                  <p className="text-stone-200 font-bold">{index + 1}.</p>
                  <a href={`/player/${player.id}`} className="text-stone-200 hover:text-amber-300">
                    {player.name}
                  </a>
                  <p className="text-stone-400">{player.career}</p>
                  <span className="text-stone-500 text-base ml-[-5px]">
                    kills
                  </span>
                  <p className="text-stone-400">{player.wins}</p>
                  <span className="text-stone-500 text-base ml-[-5px]">
                    wins
                  </span>
                </div>
              );
          })}
        </div>

        <div className="hidden md:flex flex-col gap-2 w-full">
          {MOCK_CLANS.map((clan, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 0.1 + 4 }s` }}
              className="flex gap-2 items-center bg-stone-900 p-[0.6rem] rounded-md opacity-0 animate-fade-in"
            >
              <p className="text-stone-200 font-bold">{index + 1}.</p>
              <p className="text-stone-200">{clan.name}</p>
              <p className="text-stone-400">{clan.prefix}</p>
              <p className="text-stone-400">{clan.wins}</p>
              <span className="text-stone-500 text-base ml-[-5px]">wins</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPanel;
