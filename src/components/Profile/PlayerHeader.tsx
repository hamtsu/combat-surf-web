"use client";
import { FC, JSX, useEffect, useState } from "react";
import RobloxAvatar from "../RobloxAvatar";
import CopyButton from "../CopyButton";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaCalendarDay,
  FaClipboard,
  FaCrown,
  FaGavel,
  FaShieldAlt,
  FaStar,
  FaWrench,
} from "react-icons/fa";
import PlayerRank from "./PlayerRank";
import Button from "../Button";
import { SiRoblox } from "react-icons/si";
import Tooltip from "../Tooltip";
import NumberDisplay from "../NumberDisplay";
import ClanTag from "../ClanTag";
import { useRouter } from "next/navigation";

type PlayerHeaderProps = {
  rank: string;
  userInfo: {
    userId: string;
    username: string;
    displayName: string;
    level: { value: number; firstJoined: string };
    clanName: string;
    clanTag: string;
    clanId: string;
    clanColorR: number;
    clanColorG: number;
    clanColorB: number;
    clanColorR2: number;
    clanColorG2: number;
    clanColorB2: number;
    bannerUrl?: string;
    backgroundUrl?: string;
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
    clanIconUrl?: string;
    awards?: string[];
  };
};

const PlayerHeader: FC<PlayerHeaderProps> = ({ userInfo, rank }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0.5);
  const [shouldStopTimer, setShouldStopTimer] = useState<boolean>(false);

  useEffect(() => {
    if (
      shouldStopTimer ||
      !userInfo?.awards ||
      userInfo?.awards?.length === 0
    ) {
      setCurrentPage(1);
      return;
    }

    const rotatePage = () => {
      setTimeLeft((prev) => {
        if (prev >= 6) {
          setCurrentPage((prev) => (prev === 1 ? 0 : 1));
          return 0.5;
        } else {
          return prev + 1;
        }
      });
    };

    const infoPageTimer = setInterval(rotatePage, 1000);
    return () => clearInterval(infoPageTimer);
  }, [userInfo?.awards]);

  useEffect(() => {
    if (!rank) return;

    if (rank === "𝓣𝓱𝓮 𝓑𝓸𝔂𝓼❤️" || rank === "⭐God") {
      userInfo.awards = userInfo.awards
        ? [...userInfo.awards, "OWNER"]
        : ["OWNER"];
    }

    if (rank === "Admins" || rank === "Head Admins") {
      userInfo.awards = userInfo.awards
        ? [...userInfo.awards, "ADMIN"]
        : ["ADMIN"];
    }

    if (rank === "Mods" || rank === "Admins" || rank === "Head Admins") {
      userInfo.awards = userInfo.awards
        ? [...userInfo.awards, "STAFF"]
        : ["STAFF"];
    }
  }, [rank]);

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

  const AWARDS: { [key: string]: JSX.Element } = {
    STAFF: (
      <div className="flex flex-col h-full group mx-auto items-center text-indigo-400 text-shadow-md">
        <FaShieldAlt
          size={30}
          className="md:hidden translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-indigo-400"
        />
        <FaShieldAlt
          size={40}
          className="hidden md:block translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-indigo-400"
        />
        <span className="text-sm md:hidden translate-y-2 transition-all group-hover:translate-y-1 font-bold tracking-wider  text-stone-500/40 group-hover:text-indigo-400 group-hover:text-shadow-indigo-400">
          STAFF
        </span>
        <span className="text-sm hidden md:block translate-y-2 transition-all group-hover:translate-y-1 font-bold tracking-wider  text-stone-500/40 group-hover:text-indigo-400 group-hover:text-shadow-indigo-400">
          STAFF MEMBER
        </span>
        <span
          className="opacity-0 transition-opacity group-hover:opacity-100 text-[9px] font-bold text-shadow-none"
          style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
        >
          {" "}
          awarded for being staff
        </span>
      </div>
    ),
    DEV: (
      <div className="flex flex-col h-full group mx-auto items-center text-shadow-md">
        {/* <FaCode size={40} className="translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-lime-400" /> */}
        <h1 className="translate-y-2 group-hover:translate-y-0 transition-all text-stone-500/40 group-hover:rainbow-fade-text text-xl md:text-4xl">
          <b>&lt;/&gt;</b>
        </h1>
        <span className="text-sm translate-y-2 group-hover:translate-y-0 transition-all font-bold tracking-wider not-hover:text-stone-500/40 group-hover:rainbow-fade-text">
          DEVELOPER
        </span>
        <span
          className="opacity-0 transition-opacity group-hover:opacity-100 text-[9px] font-bold text-shadow-none"
          style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
        >
          {" "}
          the website dev!
        </span>
      </div>
    ),
    CONTRIBUTOR: (
      <div className="flex flex-col h-full group mx-auto items-center text-shadow-md">
        <FaWrench
          size={30}
          className="md:hidden translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-purple-400"
        />
        <FaWrench
          size={40}
          className="hidden md:block translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-purple-400"
        />
        <span className="text-sm translate-y-2 group-hover:translate-y-0 transition-all font-bold tracking-wider not-hover:text-stone-500/40 group-hover:text-shadow-purple-400 group-hover:text-purple-400">
          CONTRIBUTOR
        </span>
        <span
          className="opacity-0 transition-opacity group-hover:opacity-100 text-[9px] font-bold text-shadow-none"
          style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
        >
          contributed to the site
        </span>
      </div>
    ),
    ADMIN: (
      <div className="flex flex-col h-full group mx-auto items-center text-shadow-lg">
        <FaGavel
          size={30}
          className="md:hidden translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-purple-500"
        />
        <FaGavel
          size={40}
          className="hidden md:block translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-purple-500"
        />
        <span className="text-sm translate-y-2 group-hover:translate-y-1 transition-all font-bold tracking-wider not-hover:text-stone-500/40 group-hover:text-shadow-purple-500 group-hover:text-purple-500">
          ADMINS
        </span>
        <span
          className="opacity-0 transition-opacity group-hover:opacity-100 text-[9px] font-bold text-shadow-none"
          style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
        >
          {" "}
          awarded to the admins
        </span>
      </div>
    ),
    FIRST: (
      <div className="flex flex-col h-full group mx-auto items-center text-shadow-lg">
        <h1 className="text-xl md:hidden translate-y-2 group-hover:translate-y-0 transition-all text-stone-500/40 group-hover:text-amber-300 group-hover:text-shadow-amber-300">
          #1
        </h1>
        <h1 className="text-4xl hidden md:block translate-y-2 group-hover:translate-y-0 transition-all text-stone-500/40 group-hover:text-amber-300 group-hover:text-shadow-amber-300">
          #1
        </h1>
        <span className="text-sm translate-y-2 group-hover:translate-y-0 transition-all font-bold tracking-wider not-hover:text-stone-500/40 group-hover:text-amber-300 group-hover:text-shadow-amber-400">
          TOP PLAYER
        </span>
        <span
          className="opacity-0 transition-opacity group-hover:opacity-100 text-[9px] font-bold text-shadow-none"
          style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
        >
          {" "}
          #1 leaderboard player
        </span>
      </div>
    ),
    OWNER: (
      <div className="flex flex-col h-full group mx-auto items-center text-shadow-lg">
        <FaCrown
          size={30}
          className="md:hidden translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-amber-400"
        />
        <FaCrown
          size={40}
          className="hidden md:block translate-y-2 group-hover:translate-y-0 transition-all fill-stone-500/40 group-hover:fill-amber-400"
        />
        <span className="text-sm translate-y-2 group-hover:translate-y-1 transition-all font-bold tracking-wider not-hover:text-stone-500/40 group-hover:text-shadow-amber-400 group-hover:text-amber-400">
          OWNER
        </span>
        <span
          className="opacity-0 transition-opacity group-hover:opacity-100 text-[9px] font-bold text-shadow-none"
          style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
        >
          {" "}
          the owner of the game!
        </span>
      </div>
    ),
  };

  const TEMP_PUNISHMENTS = {
    tradebanned: true,
    banned: false,
  };

  return (
    <div className="flex flex-col max-w-[95%] w-[95%] md:max-w-none md:w-fit md:flex-row gap-4 mt-5 md:mt-8">
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
            className={`${userInfo.displayName.length > 5 ? "text-2xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold flex text-shadow-lg gap-0 flex-col`}
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
              backgroundImage: userInfo.clanIconUrl
                ? `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${userInfo.clanIconUrl})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderColor: userInfo.theme?.borderColor || "#44403b",
            }}
          >
            <h1
              className={`text-2xl font-bold opacity-50`}
              style={{
                color: userInfo.theme?.textMuted || "#a1a1a6",
              }}
            >
              Clan Info
            </h1>
            <Tooltip
              text={
                userInfo?.clanName
                  ? `View ${userInfo?.clanName} clan profile`
                  : "No Clan"
              }
              position="top"
            >
              <h2
                onClick={() =>
                  userInfo?.clanId && router.push(`/clan/${userInfo.clanId}`)
                }
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

        <div className="flex gap-1 justify-between md:justify-start md:gap-3">
          <PlayerRank rank={rank} />
          <Button
            onClick={() =>
              window.open(
                `https://www.roblox.com/users/${userInfo.userId}/profile`,
                "_blank",
              )
            }
            className={`opacity-0 animate-fade-in-fourth p-2 px-3 md:px-5 w-fit md:py-2 h-full flex hover:bg-red-500 font-bold hover:text-stone-100 text-lg ml-1 md:ml-0 font-sans transition-colors rounded-lg group`}
            style={{
              backgroundColor: userInfo.theme?.bgSecondary || "#292524",
              color: userInfo.theme?.textMuted || "#d4d4d8",
            }}
          >
            <SiRoblox size={20} className="group-hover:animate-wiggle" />
            <p>Roblox Profile</p>
          </Button>
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
              {userInfo.level.value}
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
                className={`text-xs flex items-center gap-2 font-bold`}
                style={{
                  color: userInfo.theme?.textMuted || "#a1a1a1",
                }}
              >
                <FaCalendarDay
                  size={11}
                  color={userInfo.theme?.textSecondary || "#78716c"}
                />
                <span className="md:block hidden">
                  First Join:{" "}
                  <b>
                    {new Date(userInfo.level.firstJoined).toLocaleDateString(
                      "en-US",
                      { timeZone: "UTC" },
                    )}
                  </b>
                </span>
                <span className="md:hidden block">
                  <b>
                    {new Date(userInfo.level.firstJoined).toLocaleDateString(
                      "en-US",
                      { timeZone: "UTC" },
                    )}
                  </b>
                </span>
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
              {currentPage === 0 &&
              userInfo?.awards &&
              userInfo?.awards?.length > 0 ? (
                <FaStar
                  size={16}
                  style={{
                    fill: userInfo.theme?.iconColor || "#78716c",
                  }}
                />
              ) : (
                <FaClipboard
                  size={16}
                  style={{
                    fill: userInfo.theme?.iconColor || "#78716c",
                  }}
                />
              )}
            </div>
            <h1
              className={`text-2xl block md:hidden font-bold mt-1`}
              style={{
                color: userInfo.theme?.textMuted || "#a1a1a1",
              }}
            >
              {currentPage === 0 &&
              userInfo?.awards &&
              userInfo?.awards?.length > 0
                ? "Awards"
                : "Kills"}
            </h1>
            <h1
              className={`text-2xl hidden md:block font-bold mt-1`}
              style={{
                color: userInfo.theme?.textMuted || "#a1a1a1",
              }}
            >
              {currentPage === 0 &&
              userInfo?.awards &&
              userInfo?.awards?.length > 0
                ? "Awards"
                : "Weapon Kills"}
            </h1>

            {userInfo?.awards && userInfo?.awards?.length > 0 && (
              <>
                <div className="flex gap-1 mx-auto items-center">
                  <div
                    style={{
                      backgroundColor:
                        userInfo.theme?.textSecondary || "#78716c",
                    }}
                    className=" rounded-sm w-8 h-1 overflow-hidden"
                  >
                    {currentPage == 0 && (
                      <div
                        style={{
                          backgroundColor:
                            userInfo.theme?.textPrimary || "#e7e5e4",
                          width: `${shouldStopTimer ? 100 : (timeLeft / 6) * 100}%`,
                        }}
                        className={`rounded-sm h-full transition-all`}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      backgroundColor:
                        userInfo.theme?.textSecondary || "#78716c",
                    }}
                    className=" rounded-sm w-8 h-1 overflow-hidden"
                  >
                    {currentPage == 1 && (
                      <div
                        style={{
                          backgroundColor:
                            userInfo.theme?.textPrimary || "#e7e5e4",
                          width: `${shouldStopTimer ? 100 : (timeLeft / 6) * 100}%`,
                        }}
                        className={`rounded-sm h-full transition-all`}
                      />
                    )}
                  </div>
                </div>

                <Button
                  className="w-fit ml-auto py-2 px-3 flex gap-3 text-lg group"
                  style={{
                    backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
                    color: userInfo.theme?.textMuted || "#a1a1aa",
                  }}
                  onClick={() => {
                    setShouldStopTimer(true);
                    setCurrentPage((prev) => (prev + 1) % 2);
                  }}
                >
                  {currentPage === 0 ? (
                    <div className="flex gap-2 font-bold items-center text-sm">
                      <FaArrowRight
                        size={16}
                        className="group-hover:animate-bounce-right"
                      />
                      Stats{" "}
                    </div>
                  ) : (
                    <div className="flex gap-2 font-bold items-center text-sm">
                      <FaArrowLeft
                        size={16}
                        className="group-hover:animate-bounce-left"
                      />
                      Awards
                    </div>
                  )}
                </Button>
              </>
            )}
          </div>
          {currentPage === 0 && (
            <div className="min-h-[80px] md:min-h-[88px] w-[384px] max-w-[384px] md:w-[440px] md:max-w-[440px] ">
              {userInfo?.awards && userInfo?.awards?.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {userInfo.awards.map((award, index) => (
                    <div
                      key={index}
                      className={`p-1 min-w-[130px] animate-fade-in opacity-0 rounded-md text-xl md:text-2xl items-center font-mono font-bold flex select-none`}
                      style={{
                        backgroundColor:
                          userInfo.theme?.bgTertiary || "#1c1917",
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {AWARDS[award] || award}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-stone-400 text-lg italic w-full h-full flex items-center justify-center font-bold">
                  <p>No awards earned yet.</p>
                </div>
              )}
            </div>
          )}
          {currentPage === 1 && (
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(userInfo.weaponKills).map((_, index) => {
                if (index !== 5) {
                  return (
                    <div
                      key={index}
                      className={`p-1 rounded-md px-3 text-xl md:text-2xl items-center font-mono font-bold flex select-none`}
                      style={{
                        backgroundColor:
                          userInfo.theme?.bgTertiary || "#1c1917",
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
