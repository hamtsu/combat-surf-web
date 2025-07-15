"use client";
import React, { FC } from "react";
import RobloxAvatar from "../RobloxAvatar";
import CopyButton from "../CopyButton";
import { FaArrowUp } from "react-icons/fa";
import PlayerRank from "./PlayerRank";
import Button from "../Button";
import { SiRoblox } from "react-icons/si";

type PlayerHeaderProps = {
  userInfo: {
    userId: string;
    username: string;
    displayName: string;
    level: number;
    clanName: string;
    clanTag: string;
    stats: {
      globalKills: number;
      wins: number;
      weaponKills: number;
    };
    inventory: {
      id: number;
      name: string;
      type: string;
      skin: string;
      rarity: string;
      value: number;
      imageUrl: string;
    }[];
  };
};

const PlayerHeader: FC<PlayerHeaderProps> = ({ userInfo }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-3">
        <div className="opacity-0 animate-fade-in-first rounded-md bg-stone-800 h-fit p-3 border-2 border-stone-700 flex gap-8">
          <div className="select-none mt-[-100px]">
            <RobloxAvatar userId={userInfo.userId} />
          </div>
          <div className="text-6xl font-bold flex flex-col">
            <div>
              <h1>{userInfo.displayName}</h1>
              <p className="text-2xl font-normal text-stone-400">
                @{userInfo.username}
              </p>
            </div>
            <div className="text-stone-400 text-2xl font-normal flex gap-2 items-center">
              <p className="text-lg">({userInfo.userId})</p>
              <CopyButton text={userInfo.userId} />
            </div>
          </div>

          <div className="select-none hidden md:flex flex-col gap-2 mx-3 bg-stone-900 mt-[-50px] shadow-lg border-t-3 border-t-stone-700 h-fit p-3 rounded-md">
            <h1 className="text-3xl font-bold text-stone-400">Clan Info</h1>
            <h2 className="text-5xl font-bold text-stone-300">
              {userInfo.clanName}
            </h2>

            <h2 className="text-3xl font-bold text-stone-400">
              {userInfo.clanTag}
            </h2>
          </div>
        </div>

        <div className="flex gap-3">
          <PlayerRank userId={userInfo.userId} />
          <Button
            onClick={() =>
              window.open(
                `https://www.roblox.com/users/${userInfo.userId}/profile`,
                "_blank"
              )
            }
            className="opacity-0 animate-fade-in-fourth px-5 w-fit py-2 h-full flex bg-stone-800 hover:bg-red-500 text-stone-200/80 font-bold hover:text-stone-100 text-lg font-sans transition-colors rounded-lg group"
          >
            <SiRoblox
              size={20}
              className="group-hover:animate-wiggle mr-2"
            />
            <p>
            Roblox Profile
            </p>
          </Button>
        </div>
      </div>

      <div className="select-none opacity-0 animate-fade-in-second rounded-md bg-stone-800 p-3 border-2 border-stone-700 flex flex-col gap-2 w-full mt-8 md:mt-0 md:w-[300px] h-fit">
        <h1 className="text-7xl md:text-9xl font-bold font-mono text-slate-300">
          {userInfo.level}
        </h1>
        <h2 className="text-4xl md:text-6xl text-stone-400 font-bold flex gap-2">
          <FaArrowUp className="text-stone-500" /> Level
        </h2>
      </div>
    </div>
  );
};

export default PlayerHeader;
