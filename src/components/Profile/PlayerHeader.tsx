"use client";
import React, { FC } from "react";
import RobloxAvatar from "../RobloxAvatar";
import CopyButton from "../CopyButton";
import {
  FaArrowUp,
  FaBookOpen,
  FaCheck,
  FaClipboard,
  FaShieldAlt,
  FaSkull,
  FaTrophy,
  FaUserShield,
} from "react-icons/fa";
import PlayerRank from "./PlayerRank";
import Button from "../Button";
import { SiRoblox } from "react-icons/si";
import Tooltip from "../Tooltip";
import StatisticPanel from "../StatisticPanel";
import { FaCheckDouble, FaShield, FaShieldHalved, FaShieldHeart } from "react-icons/fa6";

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
  const getWeaponName = (index: number) => {
    const weaponNames = [
      "AWP",
      "Deagle",
      "Knife",
      "AK-47",
      "Glock",
      "ShGun",
      "BFG",
    ];
    return weaponNames[index];
  };

  const TEMP_PUNISHMENTS = {
    tradebanned: false,
    banned: true,
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8">
      <div className="flex flex-col gap-3">
        <div className="opacity-0 animate-fade-in-first rounded-md bg-stone-800 h-fit p-3 border-1 border-stone-700 flex ">
          <div className="select-none mt-[-100px] mr-4">
            <RobloxAvatar userId={userInfo.userId} />
          </div>
          <div className={`text-5xl font-bold flex flex-col`}>
            <div className={`${TEMP_PUNISHMENTS.banned && "line-through text-stone-500"} `}>
              <h1>{userInfo.displayName}</h1>
            </div>
            <div className="text-stone-400 text-2xl font-normal flex gap-2 items-center">
              <p className="text-2xl font-normal text-stone-400">
                @{userInfo.username}
              </p>
              <CopyButton text={userInfo.userId} />
            </div>
            <p className="text-base font-bold text-stone-500">
              {TEMP_PUNISHMENTS.banned ? (
                <span className="text-stone-500 flex gap-1 items-center italic">
                  Currently <span className="underline">Banned</span>
                </span>
              ) : (
                <>
                  last seen{" "}
                  <b className="text-stone-400">
                    {userInfo.tasks.LastLoginDate}
                  </b>
                </>
              )}
            </p>
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
            <SiRoblox size={20} className="group-hover:animate-wiggle mr-2" />
            <p>Roblox Profile</p>
          </Button>

          <div className="grow" />

          <div className="bg-stone-800 rounded-md px-2 opacity-0 animate-fade-in-fourth flex items-center gap-1">
            {(TEMP_PUNISHMENTS.tradebanned && TEMP_PUNISHMENTS.banned) ? (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center text-stone-300 px-4 ">
                  <FaShieldAlt size={20} className="text-red-400 mr-2" />
                  Active <b className="text-red-400 underline">Game</b> and{" "}
                  <b className="underline text-red-400 ">Trade</b> ban
                </div>
                <div className="h-[7px] w-full bg-construction" />
              </div>
            ) : TEMP_PUNISHMENTS.tradebanned ? (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center text-stone-300 p-2 px-4 ">
                  <FaShieldAlt size={20} className="text-yellow-400 mr-2" />
                  Active <b className="text-yellow-400 underline">Trade</b> ban
                </div>
              </div>
            ) : TEMP_PUNISHMENTS.banned ? (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center text-stone-300 px-4 ">
                  <FaShieldAlt size={20} className="text-red-400 mr-2" />
                  Active <b className="text-red-400 underline">Game</b> ban
                </div>
                <div className="h-[7px] w-full bg-construction" />
              </div>
            ) : (
              <div className="flex gap-1 items-center text-stone-300 p-1 px-4">
                <FaCheckDouble size={20} className="text-green-500 mr-2" />
                No active bans
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-fit opacity-0 animate-fade-in-third border border-stone-700 bg-stone-800 p-2 rounded-lg flex flex-col gap-2 w-full md:w-fit max-h-[300px]">
        <div className="flex gap-3 items-center">
          <div className="p-2 text-lg md:text-xl bg-stone-900 rounded-md h-fit">
            <FaClipboard size={16} className="fill-stone-600" />
          </div>
          <h1 className="hidden md:block text-2xl font-bold text-stone-400 mt-1">
            Weapon Kills
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(userInfo.weaponKills).map((weapon, index) => (
            <div
              key={index}
              className="bg-stone-900 p-1 rounded-md px-3 text-2xl items-center font-mono font-bold flex select-none "
            >
              <span className="text-stone-400 mr-3 text-lg font-bold ">
                {getWeaponName(index)}
              </span>
              <div className="grow" />
              {String(userInfo.weaponKills[index] ?? "----")
                .padStart(3, "0")
                .split("")
                .map((digit, i) => (
                  <p
                    key={i}
                    className={
                      digit === "0"
                        ? "text-stone-600 tracking-wide"
                        : "text-stone-200 tracking-wide"
                    }
                  >
                    {digit}
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="select-none opacity-0 animate-fade-in-fourth rounded-md bg-stone-800 p-3 border-1 border-stone-700 flex flex-col gap-2 w-full mt-8 md:mt-0 md:w-[300px] h-fit">
          <h1 className="text-7xl md:text-9xl font-bold font-mono text-stone-300">
            {userInfo.level}
          </h1>
          <h2 className="text-4xl md:text-6xl text-stone-400 font-bold flex gap-2">
            <FaArrowUp className="text-stone-500" /> Level
          </h2>
        </div>

        <div className="h-[24px] opacity-0 animate-fade-in-fourth">
          <div className="bg-stone-600 hover:cursor-pointer transition-all rounded-sm w-full h-[12px] flex hover:h-full group overflow-hidden">
            <div
              className="bg-stone-200 h-full rounded-xs "
              style={{ width: `${(userInfo.xp / 100000) * 100}%` }}
            >
              <span className="text-stone-800 shrink-0 px-2 text-xs opacity-0 transition-opacity group-hover:py-1 font-bold group-hover:opacity-80 group-hover:block hidden">
                {userInfo.xp}
              </span>
            </div>
            <span className="text-stone-400 hidden grow-0 group-hover:block group-hover:py-1 font-bold opacity-80 text-xs ml-auto px-2">
              {userInfo.xp < 72000 && (
                <>
                  {" "}
                  100000 <b>XP</b>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
