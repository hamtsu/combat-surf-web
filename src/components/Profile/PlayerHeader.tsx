"use client";
import React, { FC } from "react";
import RobloxAvatar from "../RobloxAvatar";
import CopyButton from "../CopyButton";
import {
  FaArrowUp,
  FaCheckCircle,
  FaClipboard,
  FaShieldAlt,
} from "react-icons/fa";
import PlayerRank from "./PlayerRank";
import Button from "../Button";
import { SiRoblox } from "react-icons/si";
import Tooltip from "../Tooltip";
import NumberDisplay from "../NumberDisplay";
import ClanTag from "../ClanTag";
import { useRouter } from "next/navigation";

type PlayerHeaderProps = {
  userInfo: {
    userId: string;
    username: string;
    displayName: string;
    level: number;
    clanName: string;
    clanTag: string;
    clanId: string;
    clanColorR: number;
    clanColorG: number;
    clanColorB: number;
    clanColorR2: number;
    clanColorG2: number;
    clanColorB2: number;
    bannerImage?: string;
    backgroundImage?: string;
    invertBannerText?: boolean;
    clanColorMode: "fade" | "static" | "gradiant" | "gradiant2" | "gradiant3";
    weaponKills: number[];
    inventory: {
      id: number;
      name: string;
      type: string;
      skin: string;
      rarity: string;
      value: number;
      imageUrl: string;
    }[];
    tradeBanned?: boolean;
    xp: number;
    tasks?: {
      LastLoginDate: string;
    };
    theme?: any;
  };
};

const PlayerHeader: FC<PlayerHeaderProps> = ({ userInfo }) => {
  const router = useRouter();

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
    tradebanned: true,
    banned: false,
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-5 md:mt-8">
      <div className="flex flex-col gap-3">
        <div
          style={{
            backgroundImage: userInfo.bannerUrl
              ? `url(${userInfo.bannerUrl})`
              : undefined,
            backgroundColor: !userInfo.bannerUrl
              ? userInfo.theme?.bgSecondary || "#292524"
              : undefined,
            borderColor: userInfo.theme?.borderColor || "#44403b",
          }}
          className={`opacity-0 animate-fade-in-first rounded-md ${
            userInfo.bannerUrl ? "bg-center bg-cover" : ""
          } shadow-lg h-fit p-3 border-1 flex`}
        >
          <div className="select-none w-[140px] md:w-fit mt-[-50px] md:mt-[-100px] mr-4">
            <RobloxAvatar userId={userInfo.userId} />
          </div>

          <div
            className={`text-4xl md:text-5xl font-bold flex text-shadow-lg gap-0 flex-col`}
            style={{
              color:
                userInfo.theme?.textBanner ||
                (userInfo.invertBannerText ? "#1c1917" : "#e7e5e4"),
            }}
          >
            <div
              className={TEMP_PUNISHMENTS.banned ? "line-through" : ""}
              style={{
                color: userInfo.theme?.textBanner || undefined,
                ...(TEMP_PUNISHMENTS.banned && {
                  color: userInfo.theme?.textSecondary || "#78716c",
                }),
              }}
            >
              <h1>{userInfo.displayName}</h1>
            </div>

            <div
              className={`text-xl opacity-80 md:text-2xl font-normal flex gap-2 h-fit items-center`}
              style={{
                color:
                  userInfo.theme?.textBanner ||
                  (userInfo.invertBannerText ? "#57534e" : "#e7e5e4"),
              }}
            >
              <p
                className={`font-normal text-shadow-lg`}
                style={{
                  color:
                    userInfo.theme?.textBanner ||
                    (userInfo.invertBannerText ? "#57534e" : "#e7e5e4"),
                }}
              >
                @{userInfo.username}
              </p>
              <CopyButton
                text={userInfo.userId}
                inverted={userInfo.invertBannerText}
                textBanner={userInfo.theme?.textBanner || false}
              />
            </div>

            <p
              className="font-bold text-sm opacity-80 md:text-base"
              style={{
                color:
                  userInfo.theme?.textBanner ||
                  (userInfo.invertBannerText ? "#57534e" : "#e7e5e4"),
              }}
            >
              {TEMP_PUNISHMENTS.banned ? (
                <span
                  className={`flex ml-[2px] gap-1 items-center italic`}
                  style={{
                    color:
                      userInfo.theme?.textBanner ||
                      (userInfo.invertBannerText ? "#57534e" : "#e7e5e4"),
                  }}
                >
                  Currently <span className="underline">Banned</span>
                </span>
              ) : (
                <>
                  last seen{" "}
                  <b
                    className="ml-[2px]"
                    style={{
                      color:
                        userInfo.theme?.textBanner ||
                        (userInfo.invertBannerText ? "#44403c" : "#e7e5e4"),
                    }}
                  >
                    {userInfo.tasks ? userInfo.tasks.LastLoginDate : "Unknown"}
                  </b>
                </>
              )}
            </p>
          </div>

          <div
            className={`select-none hidden md:flex flex-col gap-2 mx-3 mt-[-50px] shadow-lg border-t-3 h-fit p-3 rounded-md`}
            style={{
              backgroundColor: userInfo.theme?.bgTertiary || "#18161a",
              borderColor: userInfo.theme?.borderColor || "#44403b",
            }}
          >
            <h1
              className={`text-2xl font-bold`}
              style={{
                color: userInfo.theme?.textMuted || "#a1a1a6",
              }}
            >
              Clan Info
            </h1>
            <Tooltip
              text={`View ${userInfo.clanName} clan profile`}
              position="top"
            >
              <h2
                onClick={() => router.push(`/clan/${userInfo.clanId}`)}
                className={`text-4xl font-bold hover:underline hover:cursor-pointer`}
                style={{
                  color: userInfo.theme?.textPrimary || "#f5f5f5",
                }}
              >
                {userInfo.clanName || "No Clan"}
              </h2>
            </Tooltip>
            <h2
              className={`text-3xl font-bold`}
              style={{
                color: userInfo.theme?.textMuted || "#a1a1a6",
              }}
            >
              <ClanTag
                text={userInfo.clanTag}
                colorR={userInfo.clanColorR}
                colorG={userInfo.clanColorG}
                colorB={userInfo.clanColorB}
                colorR2={userInfo.clanColorR2}
                colorG2={userInfo.clanColorG2}
                colorB2={userInfo.clanColorB2}
                colorMode={userInfo.clanColorMode}
              />
            </h2>
          </div>
        </div>

        <div className="flex gap-1 md:gap-3">
          <PlayerRank userId={userInfo.userId} />
          <Button
            onClick={() =>
              window.open(
                `https://www.roblox.com/users/${userInfo.userId}/profile`,
                "_blank"
              )
            }
            className={`opacity-0 animate-fade-in-fourth p-2 px-3 md:px-5 w-fit md:py-2 h-full flex hover:bg-red-500 font-bold hover:text-stone-100 text-lg ml-1 md:ml-0 font-sans transition-colors rounded-lg group`}
            style={{
              backgroundColor: userInfo.theme?.bgSecondary || "#292524",
              color: userInfo.theme?.textMuted || "#d4d4d8",
            }}
          >
            <SiRoblox size={20} className="group-hover:animate-wiggle" />
            <p className="hidden md:block">Roblox Profile</p>
          </Button>

          <div className="md:grow" />

          <div
            className={`shadow-lg rounded-md px-2 opacity-0 animate-fade-in-fourth flex items-center gap-1`}
            style={{
              backgroundColor: userInfo.theme?.bgSecondary || "#292524",
            }}
          >
            {userInfo.tradeBanned && TEMP_PUNISHMENTS.banned ? (
              <div className="flex flex-col gap-1">
                <div
                  className={`flex gap-1 items-center px-4`}
                  style={{
                    color: userInfo.theme?.textMuted || "#d4d4d8",
                  }}
                >
                  <FaShieldAlt size={20} className="text-red-400 mr-2" />
                  Active <b className="text-red-400 underline">Game</b> and{" "}
                  <b className="underline text-red-400">Trade</b> ban
                </div>
                <div className="h-[7px] w-full bg-construction" />
              </div>
            ) : userInfo.tradeBanned ? (
              <div className="flex flex-col gap-1">
                <div
                  className={`flex gap-1 items-center p-2 px-4`}
                  style={{
                    color: userInfo.theme?.textMuted || "#d4d4d8",
                  }}
                >
                  <FaShieldAlt size={20} className="text-yellow-400 mr-2" />
                  Active <b className="text-yellow-400 underline">Trade</b> ban
                </div>
              </div>
            ) : TEMP_PUNISHMENTS.banned ? (
              <div className="flex flex-col gap-1">
                <div
                  className={`flex gap-1 items-center px-4`}
                  style={{
                    color: userInfo.theme?.textMuted || "#d4d4d8",
                  }}
                >
                  <FaShieldAlt size={20} className="text-red-400 mr-2" />
                  Active <b className="text-red-400 underline">Game</b> ban
                </div>
                <div className="h-[7px] w-full bg-construction" />
              </div>
            ) : (
              <Tooltip text="No active bans" position="top">
                <div
                  className={`flex select-none hover:cursor-pointer gap-1 font-bold items-center p-1 md:px-4`}
                  style={{
                    color: userInfo.theme?.textSecondary || "#a1a1a1",
                  }}
                >
                  <FaCheckCircle size={20} className="text-stone-500 mr-2" />
                  <p className="hidden md:block">No active bans</p>
                  <p className="md:hidden">No Bans</p>
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-3 md:mt-0 gap-2">
        <div className="flex gap-2">
          <div
            className={`select-none opacity-0 items-center animate-fade-in-third rounded-md shadow-lg p-1 px-3 border-1 flex gap-2 md:mt-0 h-fit`}
            style={{
              backgroundColor: userInfo.theme?.bgSecondary || "#292524",
              borderColor: userInfo.theme?.borderColor || "#44403b",
            }}
          >
            <h1
              className={`text-5xl font-bold font-mono`}
              style={{
                color: userInfo.theme?.textPrimary || "#d4d4d8",
              }}
            >
              {userInfo.level}
            </h1>
            <h2
              className={`text-3xl mt-auto font-bold flex gap-2`}
              style={{
                color: userInfo.theme?.textMuted || "#a1a1a1",
              }}
            >
              Level
              <FaArrowUp
                className={`my-auto hidden md:block`}
                style={{
                  color: userInfo.theme?.textSecondary || "#78716c",
                }}
              />
            </h2>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div
              className={`shadow-lg opacity-0 animate-fade-in-third w-full h-full rounded-sm flex items-center gap-2 px-2 py-1`}
              style={{
                backgroundColor: userInfo.theme?.bgSecondary || "#292524",
              }}
            >
              <h1
                className={`text-xs font-bold`}
                style={{
                  color: userInfo.theme?.textMuted || "#a1a1a1",
                }}
              >
                No Badges
              </h1>
            </div>

            <div className="h-[25px] mt-auto w-full opacity-0 animate-fade-in-fourth">
              <div
                className={`shadow-lg select-none border-1 transition-all rounded-sm w-full h-full flex hover:h-full group overflow-hidden`}
                style={{
                  backgroundColor: userInfo.theme?.progressTrack || "#78716c",
                  borderColor: userInfo.theme?.borderColor || "#44403b",
                }}
              >
                <div
                  className={`h-full rounded-xs`}
                  style={{
                    backgroundColor: userInfo.theme?.progressFill || "#d4d4d8",
                    width: `${(userInfo.xp / 100000) * 100}%`,
                  }}
                >
                  <span
                    className={`shrink-0 h-full px-2 text-[10px] md:text-xs transition-opacity py-1 flex gap-1 items-center font-bold opacity-80`}
                    style={{
                      color: userInfo.theme?.textOnFill || "#1c1917",
                    }}
                  >
                    {userInfo.xp > 72000 ? (
                      <>
                        {userInfo.xp} / 100000 <b>XP</b>
                      </>
                    ) : (
                      <>{userInfo.xp}</>
                    )}
                  </span>
                </div>
                <span
                  className={`grow-0 py-1 font-bold opacity-80 text-[10px] md:text-xs ml-auto px-2`}
                  style={{
                    color: userInfo.theme?.textMuted || "#a1a1a1",
                  }}
                >
                  {userInfo.xp < 72000 && (
                    <>
                      100000 <b>XP</b>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`h-fit opacity-0 animate-fade-in-fourth border shadow-lg p-2 rounded-lg flex flex-col gap-2 w-full md:w-fit max-h-[300px]`}
          style={{
            borderColor: userInfo.theme?.borderColor || "#44403b",
            backgroundColor: userInfo.theme?.bgSecondary || "#292524",
          }}
        >
          <div className="flex gap-3 items-center">
            <div
              className={`p-2 text-lg md:text-xl rounded-md h-fit`}
              style={{
                backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
              }}
            >
              <FaClipboard
                size={16}
                style={{
                  fill: userInfo.theme?.iconColor || "#78716c",
                }}
              />
            </div>
            <h1
              className={`text-2xl font-bold mt-1`}
              style={{
                color: userInfo.theme?.textMuted || "#a1a1a1",
              }}
            >
              Weapon Kills
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(userInfo.weaponKills).map((weapon, index) => {
              if (index !== 5) {
                return (
                  <div
                    key={index}
                    className={`p-1 rounded-md px-3 text-xl md:text-2xl items-center font-mono font-bold flex select-none`}
                    style={{
                      backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
                    }}
                  >
                    <span
                      className={`mr-1 md:mr-3 text-xs md:text-lg font-bold`}
                      style={{
                        color: userInfo.theme?.textMuted || "#a1a1a1",
                      }}
                    >
                      {getWeaponName(index)}
                    </span>
                    <div className="grow" />
                    <NumberDisplay
                      number={userInfo.weaponKills[index]}
                      theme={userInfo.theme}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
