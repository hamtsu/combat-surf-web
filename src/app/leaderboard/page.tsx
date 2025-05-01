"use client";
import Button from "@/components/Button";
import RobloxAvatar from "@/components/RobloxAvatar";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft, FaTrophy } from "react-icons/fa";

const MOCK_DATA = [
  { name: "hamtsuu", career: 8950, wins: 165, clan: "[C5]", id: "97752529" },
  {
    name: "smudgeplayz",
    career: 1000,
    wins: 100,
    clan: "[1X]",
    id: "1248971940",
  },
  { name: "testuser", career: 800, wins: 200, clan: "[NONE]", id: "1" },
  { name: "Player4", career: 700, wins: 200, clan: "[NONE]" },
  { name: "Player5", career: 600, wins: 200, clan: "[NONE]" },
  { name: "Player6", career: 700, wins: 200, clan: "[NONE]" },
  { name: "Player7", career: 600, wins: 200, clan: "[NONE]" },
  { name: "Player8", career: 700, wins: 200, clan: "[NONE]" },
  { name: "Player9", career: 600, wins: 200, clan: "[NONE]" },
  { name: "Player10", career: 600, wins: 200, clan: "[NONE]" },
];

const MOCK_CLANS = [
  { name: "Test", prefix: "[TEST]", wins: 200 },
  { name: "Clan2", prefix: "[2]", wins: 200 },
  { name: "Clan3", prefix: "[3]", wins: 200 },
  { name: "Clan4", prefix: "[4]", wins: 200 },
  { name: "Clan5", prefix: "[5]", wins: 200 },
  { name: "Clan6", prefix: "[2]", wins: 200 },
  { name: "Clan7", prefix: "[3]", wins: 200 },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center justify-center pb-24">
      <div className="absolute flex gap-2 left-5 top-5">
        <Tooltip text="Go Back" position="bottom">
          <Button
            onClick={() => router.push("/")}
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
              <FaTrophy size={25} className="fill-stone-600 " />
            </div>
            <h1 className="text-stone-400 font-bold">Leaderboards</h1>
          </div>
        </div>
      </div>

      <div className="flex gap-2 my-4">
        <div
          onClick={() => router.push("/player/" + MOCK_DATA[1].id)}
          className="bg-stone-800 pb-3 rounded-md h-fit opacity-0 hover:translate-y-2 transition-transform animate-fade-in-second select-none hover:cursor-pointer"
        >
          <div className="flex flex-col items-center p-2 rounded-md bg-slate-400 h-fit">
            <h1 className="justify-self-end ml-auto font-bold font-mono text-stone-800 text-xl">
              2nd
            </h1>
            <div className="w-36 rounded-md">
              <RobloxAvatar userId={MOCK_DATA[1].id} />
            </div>

            <h2 className="text-slate-600 font-bold text-xl mt-3">
              {MOCK_DATA[1].name}
            </h2>
          </div>
          <h3 className="text-stone-400 text-lg mt-3 text-center">
            clan: <b>{MOCK_DATA[1].clan}</b>
          </h3>
          <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
            {MOCK_DATA[1].career} career
          </h2>
          <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
            {MOCK_DATA[1].wins} wins
          </h2>
        </div>

        <div
          onClick={() => router.push("/player/" + MOCK_DATA[0].id)}
          className="bg-stone-800 pb-3 rounded-md h-full hover:translate-y-2 transition-transform animate-fade-in-first opacity-0 select-none hover:cursor-pointer"
        >
          <div className="flex flex-col items-center p-2 rounded-md bg-yellow-400 h-fit shadow-[0_0px_50px_rgba(255,192,0,0.8)]">
            <h1 className="justify-self-end ml-auto font-bold font-mono text-stone-800 text-xl">
              1st
            </h1>
            <div className="w-36 rounded-md">
              <RobloxAvatar userId={MOCK_DATA[0].id} />
            </div>

            <h2 className="text-yellow-600 font-bold text-xl mt-3">
              {MOCK_DATA[0].name}
            </h2>
            <FaTrophy size={50} className="fill-yellow-600 mt-1" />
          </div>
          <h3 className="text-stone-400 text-lg mt-3 text-center">
            clan: <b>{MOCK_DATA[0].clan}</b>
          </h3>
          <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
            {MOCK_DATA[0].career} career
          </h2>
          <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
            {MOCK_DATA[0].wins} wins
          </h2>
        </div>

        <div
          onClick={() => router.push("/player/" + MOCK_DATA[2].id)}
          className="bg-stone-800 pb-3 rounded-md hover:translate-y-2 transition-transform h-fit animate-fade-in-third opacity-0 select-none hover:cursor-pointer"
        >
          <div className="flex flex-col items-center p-2 rounded-md bg-yellow-700 h-fit">
            <h1 className="justify-self-end ml-auto font-bold font-mono text-stone-800 text-xl">
              3rd
            </h1>
            <div className="w-36 rounded-md">
              <RobloxAvatar userId={MOCK_DATA[2].id} />
            </div>

            <h2 className="text-yellow-900 font-bold text-xl mt-3">
              {MOCK_DATA[2].name}
            </h2>
          </div>
          <h3 className="text-stone-400 text-lg mt-3 text-center">
            clan: <b>{MOCK_DATA[2].clan}</b>
          </h3>
          <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
            {MOCK_DATA[2].career} career
          </h2>
          <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
            {MOCK_DATA[2].wins} wins
          </h2>
        </div>
      </div>

      <div className="w-6/8 flex gap-4 justify-center items-center">
        <div className="flex gap-2 my-2 bg-stone-800 rounded-md p-4 w-full opacity-0 animate-fade-in-fourth">
          <div className="flex flex-col gap-2 w-full">
            {MOCK_DATA.map((player, index) => {
              if (index > 2)
                return (
                  <div
                    key={index}
                    style={{ animationDelay: `${index * 0.1 + 3}s` }}
                    className="flex text-lg gap-2 items-center bg-stone-900 p-2 rounded-md opacity-0 animate-fade-in"
                  >
                    <div className="w-8 bg-stone-500 rounded-md">
                      <RobloxAvatar userId={player.id} />
                    </div>

                    <p className="text-stone-200 font-bold">{index + 1}.</p>

                    <a
                      href={`/player/${player.id}`}
                      className="text-stone-200 hover:text-amber-300 font-bold"
                    >
                      {player.name}
                    </a>
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
            })}
          </div>
        </div>

        <div className="flex gap-2 my-2 bg-stone-800 rounded-md p-4 w-full opacity-0 animate-fade-in-fifth">
          <div className="flex flex-col gap-2 w-full">
            {MOCK_CLANS.map((clan, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 0.1 + 3}s` }}
                className="flex gap-2 text-lg items-center bg-stone-900 p-[0.6rem] rounded-md opacity-0 animate-fade-in"
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
    </div>
  );
};

export default Page;
