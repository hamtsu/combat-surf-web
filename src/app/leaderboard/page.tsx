"use client";
import Button from "@/components/Button";
import LeaderboardUpdate from "@/components/LeaderboardUpdate";
import RobloxAvatar from "@/components/RobloxAvatar";
import Tooltip from "@/components/Tooltip";
import WIPModal from "@/components/WIPModal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaStar, FaTrophy } from "react-icons/fa";
import { FaShield, FaUsers } from "react-icons/fa6";


const Page = () => {
  const router = useRouter();
  const [players, setPlayers] = useState<any[]>([]);
  const [clans, setClans] = useState<any[]>([]);

  const [cooldown, setCooldown] = useState<any>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => {
        if (res.status === 429) {
          setCooldown(true);
          return null;
        }
        if (!res.ok) {
          setError(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          if (data.cooldown) {
            setCooldown(true);
          } else {
            console.log(data.players)
            setPlayers(data.players || []);
            setClans(data.clans || []);
            setCooldown(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, []);


  if (players.length < 3) {
  return (
    <div className="text-stone-300 text-lg mt-20">
      Not enough leaderboard data to display top players.
    </div>
  );
}

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center md:justify-center pb-46 pt-5 md:pt-0 md:pb-20">
      <WIPModal />
      <div className=" flex gap-2 left-5 top-5">
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
        <Tooltip text="Click to view profile" position="bottom">
          <div
            onClick={() => router.push("/player/" + players[1].id)}
            className="bg-stone-800 mb-auto pb-3 rounded-md h-fit opacity-0 hover:translate-y-2 transition-transform animate-fade-in-second select-none hover:cursor-pointer"
          >
            <div className="flex flex-col items-center p-2 rounded-md bg-gray-400 h-fit">
              <h1 className="justify-self-end flex w-full justify-between ml-auto font-bold font-mono text-stone-800 text-xl">
                <FaStar size={20} className="fill-stone-800 animate-pulse" />
                2nd
              </h1>
              <div className="w-16 md:w-36 rounded-md">
                <RobloxAvatar userId={players[1].id} />
              </div>

              <h2 className="text-slate-600 font-bold text-xl mt-3">
                {players[1].name}
              </h2>

              <FaStar size={35} className="fill-gray-600 animate-wiggle" />
            </div>
            <h3 className="text-stone-400 text-lg mt-3 text-center">
              clan: <b>{players[1].clan}</b>
            </h3>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              {players[1].career} career
            </h2>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              {players[1].wins} wins
            </h2>
          </div>
        </Tooltip>

        <Tooltip text="Click to view profile" position="bottom">
          <div
            onClick={() => router.push("/player/" + players[0].id)}
            className="bg-stone-800 pb-3 rounded-md h-full hover:translate-y-2 transition-transform animate-fade-in-first opacity-0 select-none hover:cursor-pointer"
          >
            <div className="flex flex-col items-center p-2 rounded-md bg-yellow-400 h-fit shadow-[0_0px_50px_rgba(255,192,0,0.8)]">
              <h1 className="justify-self-end w-full flex justify-between ml-auto font-bold font-mono text-yellow-600 text-xl">
                <FaTrophy
                  size={20}
                  className="fill-yellow-600 mt-1 animate-pulse"
                />
                1st
              </h1>
              <div className="w-16 md:w-36 rounded-md">
                <RobloxAvatar userId={players[0].id} />
              </div>

              <h2 className="text-yellow-600 font-bold text-xl mt-3">
                {players[0].name}
              </h2>
              <FaTrophy
                size={50}
                className="fill-yellow-600 mt-1 animate-wiggle"
              />
            </div>
            <h3 className="text-stone-400 text-lg mt-3 text-center">
              clan: <b>{players[0].clan}</b>
            </h3>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              {players[0].career} career
            </h2>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              {players[0].wins} wins
            </h2>
          </div>
        </Tooltip>

        <Tooltip text="Click to view profile" position="bottom">
          <div
            onClick={() => router.push("/player/" + players[2].id)}
            className="bg-stone-800 mb-auto pb-3 rounded-md hover:translate-y-2 transition-transform h-fit animate-fade-in-third opacity-0 select-none hover:cursor-pointer"
          >
            <div className="flex flex-col items-center p-2 rounded-md bg-stone-700 h-fit">
              <h1 className="justify-self-end ml-auto font-bold font-mono text-stone-400 text-xl">
                3rd
              </h1>
              <div className="w-16 md:w-36 rounded-md">
                <RobloxAvatar userId={players[2].id} />
              </div>

              <h2 className="text-stone-400 font-bold text-xl mt-3">
                {players[2].name}
              </h2>
            </div>
            <h3 className="text-stone-400 text-lg mt-3 text-center">
              clan: <b>{players[2].clan}</b>
            </h3>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              {players[2].career} career
            </h2>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              {players[2].wins} wins
            </h2>
          </div>
        </Tooltip>
      </div>

      <div className="md:w-6/8 px-2 md:px-0 w-full flex md:flex-row flex-col gap-4 justify-center md:overflow-y-scroll rounded-md">

        <div className="flex flex-col gap-2 bg-stone-800 rounded-md p-4 w-full opacity-0 animate-fade-in-fourth h-fit">
          <div className="p-2 px-3 font-bold rounded-md bg-stone-900 text-stone-400 flex items-center gap-2 text-lg">
            <FaUsers /> Best players
          </div>
          <div className="flex flex-col gap-2 w-full">
            {players.map((x, index) => {
              const player = players[index]
                ? players[index]
                : {
                  name: "Player" + (index + 1),
                  id: undefined,
                  career: 0,
                  wins: 0,
                  clan: "[NONE]",
                };

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
                    <p className="text-stone-300 hidden md:block">{player.clan}</p>
                    <p className="text-stone-400">{player.career}</p>
                    <span className="text-stone-500 text-base ml-[-5px]">
                      kills
                    </span>
                    <p className="text-stone-400 hidden md:block">{player.wins}</p>
                    <span className="text-stone-500 text-base hidden md:block ml-[-5px]">
                      wins
                    </span>
                  </div>
                );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-stone-800 h-fit rounded-md p-4 w-full opacity-0 animate-fade-in-fifth mr-2">
          <div className="p-2 px-3 font-bold rounded-md bg-stone-900 text-stone-400 flex items-center gap-2 text-lg">
            <FaShield /> Top clans
          </div>
          <div className="flex flex-col gap-2 w-full">
            {clans.map((clan, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 0.1 + 3}s` }}
                className="flex h-[48px] gap-2 text-lg items-center bg-stone-900 p-[0.6rem] rounded-md opacity-0 animate-fade-in"
              >
                <p className="text-stone-200 font-bold">{index + 1}.</p>
                 <a
                      href={`/clan/${clan.id}`}
                      className="text-stone-200 hover:text-amber-300 font-bold"
                    >
                      {clan.name}
                    </a>
                <p className="text-stone-400">{clan.tag}</p>
                <p className="text-stone-400">{clan.wins}</p>
                <span className="text-stone-500 text-base ml-[-5px]">wins</span>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
