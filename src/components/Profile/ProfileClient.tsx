"use client";

import Button from "@/components/Button";
import ClanTag from "@/components/ClanTag";
import ItemModal from "@/components/ItemModal";
import InventoryPanel from "@/components/Profile/InventoryPanel";
import PlayerHeader from "@/components/Profile/PlayerHeader";
import Searchbar from "@/components/Searchbar";
import ShowcaseItemContent from "@/components/ShowcaseItem";
import StatisticPanel from "@/components/StatisticPanel";
import Tooltip from "@/components/Tooltip";
import WelcomeModal from "@/components/WelcomeModal";
import { checkNewGenImage, normalizeName } from "@/lib/normalizeItems";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaDiscord,
  FaExternalLinkAlt,
  FaSkull,
  FaTiktok,
  FaTrophy,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

export default function ProfileClient({
  initialUserInfo,
}: {
  initialUserInfo: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome");

  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean | null>(false);
  const [userInfo, setUserInfo] = useState<any | null>(initialUserInfo);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0.5);
  const [shouldStopTimer, setShouldStopTimer] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo?.username) {
      document.title = `Combat Surf • ${userInfo.username}`;
    }
  }, [userInfo?.username]);

  useEffect(() => {
    if (shouldStopTimer) return;

    const rotatePage = () => {
      setTimeLeft((prev) => {
        if (prev >= 6) {
          setCurrentPage((prev) => (prev + 1) % 3);
          return 0.5;
        } else {
          return prev + 1;
        }
      });
    };

    const infoPageTimer = setInterval(rotatePage, 1000);
    return () => clearInterval(infoPageTimer);
  }, [currentPage]);

  useEffect(() => {
    if (initialUserInfo === null || !initialUserInfo.level) {
      setError("User info is null or invalid");
      return;
    }
    setUserInfo(initialUserInfo);

    if (userInfo.clanId && userInfo.clanId !== "-1") {
      fetch(`/api/clan-info?clanId=${userInfo.clanId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed fetching clan info");
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log("data", data);
          if (data) {
            setUserInfo((u: any) => ({
              ...u,
              clanTag: data.tag,
              clanName: data.name,
              clanColorR: data.colorR,
              clanColorG: data.colorG,
              clanColorB: data.colorB,
              clanColorR2: data.colorR2,
              clanColorG2: data.colorG2,
              clanColorB2: data.colorB2,
              clanColorMode: data.colorMode,
            }));
          }
        });

      fetch(`/api/group-icon?clanId=${userInfo.clanId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed fetching clan icon");
          return res.json();
        })
        .then((data) => {
          if (data) {
            setUserInfo((u: any) => ({
              ...u,
              clanIconUrl: data.data[0]?.imageUrl || null,
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setError(error);
        });
    }
    if (welcome !== null) {
      setShowWelcome(true);
    }
  }, [welcome, initialUserInfo]);

  if (userInfo === null || !userInfo.level) {
    return (
      <div className="flex bg-stone-900 text-slate-200 flex-col items-center justify-center w-full h-full p-4">
        <div className="absolute flex gap-2 md:left-5 top-5">
          <Tooltip text="Go back" position="bottom">
            <Button
              onClick={() => router.back()}
              className="px-5 h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
            >
              <FaArrowLeft
                size={35}
                className="group-hover:animate-bounce-right"
              />
            </Button>
          </Tooltip>

          <div className="flex gap-4 bg-stone-800 rounded-md">
            <div className="flex items-center justify-between text-xl md:text-2xl md:p-4 p-2 gap-4 bg-stone-800 rounded-md">
              <div className="rounded-md bg-stone-900 p-3">
                <FaUser size={25} className="fill-stone-600 " />
              </div>
              <h1 className="text-stone-400 font-bold">Viewing profile</h1>
            </div>
          </div>
        </div>

        <div className="bg-stone-800 rounded-md p-4 text-center">
          <FaUser size={40} className="text-stone-400 mx-auto mt-2" />
          {error ? (
            <>
              <h1 className="text-2xl font-bold text-stone-200 p-4">
                This profile could not be loaded!
              </h1>
              <p className="text-5xl font-bold text-red-400">(ᗒᗣᗕ)</p>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-stone-200 p-4">
              Loading profile...
            </h1>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <>
        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
        {showWelcome && (
          <WelcomeModal
            userInfo={userInfo}
            onClose={() => setShowWelcome(null)}
          />
        )}
        <div
          className={`overflow-y-scroll flex bg-center bg-cover text-slate-200 flex-col items-center md:justify-center overflow-x-hidden w-full h-full p-4 gap-3 pb-42 md:pb-0`}
          style={{
            ...(userInfo.backgroundUrl
              ? { backgroundImage: `url(${userInfo.backgroundUrl})` }
              : {}),
            backgroundColor: userInfo.theme?.bgPrimary || "#0d0d0d",
          }}
        >
          {userInfo.blurBackgroundImage && (
            <div className="absolute -z-1 w-full h-full backdrop-blur-[2px]" />
          )}

          <div
            className="hidden md:block p-2 mt-30 mb-0 md:absolute md:mt-0 md:mx-auto top-4 rounded-md shadow-lg"
            style={{
              backgroundColor: userInfo.theme?.bgSecondary || "#292524",
            }}
          >
            <Searchbar theme={userInfo.theme} />
          </div>

          <div className="md:absolute flex w-full justify-start gap-2 left-0 md:left-5 md:top-5">
            <Tooltip text="Go back" position="bottom">
              <Button
                onClick={() => router.back()}
                className="px-5 h-full py-3 flex shadow-lg hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg group"
                style={{
                  backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                  color: userInfo.theme?.textSecondary || "#a1a1aa",
                }}
              >
                <FaArrowLeft
                  size={35}
                  className="group-hover:animate-bounce-right"
                />
              </Button>
            </Tooltip>

            <div
              className="flex gap-4 w-fit shadow-lg rounded-md pr-2 md:pr-0"
              style={{
                backgroundColor: userInfo.theme?.bgSecondary || "#292524",
              }}
            >
              <div
                className="flex items-center w-full md:w-fit justify-between text-xl md:text-2xl md:p-4 p-2 gap-4 rounded-md"
                style={{
                  backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                }}
              >
                <div
                  className="rounded-md p-3"
                  style={{
                    backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
                  }}
                >
                  <FaUser
                    size={25}
                    style={{
                      fill: userInfo.theme?.iconColor || "#78716c",
                    }}
                  />
                </div>
                <h1
                  style={{
                    color: userInfo.theme?.textPrimary || "#a1a1aa",
                  }}
                  className="font-bold hidden md:block"
                >
                  Viewing <b>{userInfo.username}</b>
                </h1>
                <h1
                  style={{
                    color: userInfo.theme?.textPrimary || "#a1a1aa",
                  }}
                  className="font-bold md:hidden"
                >
                  <b>{userInfo.username}</b>
                </h1>
              </div>
            </div>
          </div>

          <PlayerHeader userInfo={userInfo} />

          <div className="flex md:flex-row flex-col gap-5 items-bottom md:mt-4 lg:mt-1">
            <div className="flex flex-col gap-4 animate-fade-in-fifth opacity-0 ">
              <div className="flex gap-2 w-full ">
                <div className="flex md:hidden w-full flex-col gap-1">
                  <div
                    className="self-start grow select-none md:hidden opacity-0 animate-fade-in-third rounded-md shadow-lg p-1 px-3 flex flex-col w-full h-fit"
                    style={{
                      backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                      backgroundImage: userInfo.clanIconUrl
                        ? `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${userInfo.clanIconUrl})`
                        : "",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h1
                      className="text-base text-nowrap md:text-2xl font-bold"
                      style={{
                        color: userInfo.theme?.textMuted || "#a1a1aa",
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
                        className="hidden md:block md:text-5xl font-bold hover:underline hover:cursor-pointer"
                        style={{
                          color: userInfo.theme?.textPrimary || "#a1a1aa",
                        }}
                      >
                        {userInfo.clanName || "No Clan"}
                      </h2>
                    </Tooltip>
                    <h2
                      className="text-xl md:text-3xl font-bold"
                      style={{
                        color: userInfo.theme?.textMuted || "#a1a1aa",
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
                  <Button
                    onClick={() => router.push(`/clan/${userInfo.clanId}`)}
                    className="text-base md:hidden font-bold p-1 px-2"
                    style={{
                      backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                      color: userInfo.theme?.textMuted || "#a1a1aa",
                    }}
                  >
                    <FaExternalLinkAlt className="mr-1" /> Clan
                  </Button>
                </div>
                <div className="flex gap-2">
                  <StatisticPanel
                    name="Career Kills"
                    value={userInfo.globalKills}
                    buddy={userInfo.userId === "97752529" ? true : false}
                    icon={
                      <FaSkull
                        size={18}
                        style={{
                          fill: userInfo.theme?.iconColor || "#78716c",
                        }}
                      />
                    }
                    theme={userInfo.theme}
                  />

                  <StatisticPanel
                    name="Career Wins"
                    value={userInfo.wins}
                    icon={
                      <FaTrophy
                        size={18}
                        style={{
                          fill: userInfo.theme?.iconColor || "#78716c",
                        }}
                      />
                    }
                    theme={userInfo.theme}
                  />
                </div>
              </div>

              <div className="flex-col gap-2 max-w-screen px-0 flex">
                <div
                  style={{
                    backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                    borderColor: userInfo.theme?.borderColor || "#b1b5b8",
                  }}
                  className="rounded-md w-full h-full p-3 flex flex-col gap-2 mx-auto md:mx-0 select-none opacity-0 animate-fade-in-second shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="p-2 text-lg md:text-3xl rounded-md h-fit mr-2"
                      style={{
                        backgroundColor:
                          userInfo.theme?.bgTertiary || "#1c1917",
                      }}
                    >
                      <FaBookOpen
                        size={16}
                        style={{
                          fill: userInfo.theme?.iconColor || "#78716c",
                        }}
                      />
                    </div>

                    <h1
                      className="text-xl md:hidden block font-bold"
                      style={{
                        color: userInfo.theme?.textPrimary || "#a1a1aa",
                      }}
                    >
                      {currentPage === 0 &&
                        "Profile"}
                      {currentPage === 1 && "Showcase"}
                      {currentPage === 2 && "Bans"}
                    </h1>
                    <h1
                      className="text-xl hidden md:block font-bold"
                      style={{
                        color: userInfo.theme?.textPrimary || "#a1a1aa",
                      }}
                    >
                      {currentPage === 0 &&
                        (userInfo.displayName.length > 10
                          ? `Profile`
                          : `${userInfo.displayName}'s Info`)}
                      {currentPage === 1 && "Skin Showcase"}
                      {currentPage === 2 && "Infractions"}
                    </h1>

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
                      <div
                        style={{
                          backgroundColor:
                            userInfo.theme?.textSecondary || "#78716c",
                        }}
                        className=" rounded-sm w-8 h-1 overflow-hidden"
                      >
                        {currentPage == 2 && (
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
                        backgroundColor:
                          userInfo.theme?.bgTertiary || "#1c1917",
                        color: userInfo.theme?.textMuted || "#a1a1aa",
                      }}
                      onClick={() => {
                        setShouldStopTimer(true);
                        setCurrentPage((prev) => (prev + 1) % 3);
                      }}
                    >
                      {currentPage === 0 ? (
                        <div className="flex gap-2 font-bold items-center text-sm">
                          <FaArrowRight
                            size={16}
                            className="group-hover:animate-bounce-right"
                          />
                          Next{" "}
                        </div>
                      ) : currentPage === 1 ? (
                        <div className="flex gap-2 font-bold items-center text-sm">
                          <FaArrowRight
                            size={16}
                            className="group-hover:animate-bounce-right"
                          />
                          Next{" "}
                        </div>
                      ) : (
                        <div className="flex gap-2 font-bold items-center text-sm">
                          <FaArrowLeft
                            size={16}
                            className="group-hover:animate-bounce-left"
                          />
                          Back{" "}
                        </div>
                      )}
                    </Button>
                  </div>
                  {currentPage == 0 ? (
                    <>
                      <div
                        className="p-2 rounded-md"
                        style={{
                          backgroundColor:
                            userInfo.theme?.bgTertiary || "#1c1917",
                          color: userInfo.theme?.textMuted || "#a1a1aa",
                        }}
                      >
                        {userInfo.socials &&
                        Object.keys(userInfo.socials).length > 0 ? (
                          <div className="flex flex-wrap gap-4">
                            {userInfo.socials.discord && (
                              <div className="flex items-center gap-1">
                                <FaDiscord className="inline mr-1" size={18} />
                                {userInfo.socials.discord}
                              </div>
                            )}
                            {userInfo.socials.youtube && (
                              <a
                                href={`https://www.youtube.com/${userInfo.socials.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline hover:cursor-pointer flex items-center gap-1"
                              >
                                <FaYoutube className="inline mr-1" size={18} />
                                {userInfo.socials.youtube}
                              </a>
                            )}
                            {userInfo.socials.twitter && (
                              <a
                                href={`https://twitter.com/${userInfo.socials.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline hover:cursor-pointer flex items-center gap-1"
                              >
                                <FaTwitter className="inline mr-1" size={18} />
                                {userInfo.socials.twitter}
                              </a>
                            )}
                            {userInfo.socials.tiktok && (
                              <a
                                href={`https://www.tiktok.com/@${userInfo.socials.tiktok}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline hover:cursor-pointer flex items-center gap-1 "
                              >
                                <FaTiktok className="inline mr-1" size={18} />
                                {userInfo.socials.tiktok}
                              </a>
                            )}
                          </div>
                        ) : (
                          <i
                            style={{
                              color: userInfo.theme?.textMuted || "#a1a1aa",
                            }}
                          >
                            No social links provided.
                          </i>
                        )}
                      </div>
                      <div
                        style={{
                          color: userInfo.theme?.textPrimary || "#a1a1aa",
                        }}
                        className="px-1 mt-2"
                      >
                        <h1
                          style={{
                            color: userInfo.theme?.textMuted || "#a1a1aa",
                          }}
                        >
                          Description
                        </h1>
                        <div className="text-lg max-w-[400px] max-h-[140px] mb-2 overflow-y-auto break-words scrollbar-hide">
                          {userInfo.description ? (
                            userInfo.description
                              .split("\n")
                              .map((line: string, index: number) => (
                                <span key={index}>
                                  {line}
                                  <br />
                                </span>
                              ))
                          ) : (
                            <i>No description yet.</i>
                          )}
                        </div>
                      </div>
                    </>
                  ) : currentPage == 2 ? (
                    <div className="p-2 px-3">
                      {userInfo.tradeBanned && false ? (
                        <div
                          style={{
                            color: userInfo.theme?.textMuted || "#d4d4d8",
                          }}
                          className="flex gap-1"
                        >
                          <FaTriangleExclamation
                            size={70}
                            className="text-red-400 mr-2"
                          />
                          <div>
                            <h1 className="font-bold text-lg">
                              In Poor Standing
                            </h1>
                            <p className="text-base text-red-400">
                              Active <b>Game and Trade</b> ban on record
                            </p>
                            <p className="text-sm">
                              Recorded at{" "}
                              {new Date(
                                userInfo.tradeBanned.tradeBannedAt,
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ) : userInfo.tradeBanned ? (
                        <div
                          style={{
                            color: userInfo.theme?.textMuted || "#d4d4d8",
                          }}
                          className="flex gap-1"
                        >
                          <FaTriangleExclamation
                            size={70}
                            className="text-yellow-400 mr-2"
                          />
                          <div>
                            <h1 className="font-bold text-lg">
                              In Poor Standing
                            </h1>
                            <p className="text-base text-yellow-400">
                              Active <b>Trade Ban</b> on record
                            </p>
                            <p className="text-sm">
                              Recorded at{" "}
                              {new Date(
                                userInfo.tradeBanned.tradeBannedAt,
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ) : false ? (
                        <div
                          style={{
                            color: userInfo.theme?.textMuted || "#d4d4d8",
                          }}
                          className="flex gap-1"
                        >
                          <FaTriangleExclamation
                            size={70}
                            className="text-red-400 mr-2"
                          />
                          <div>
                            <h1 className="font-bold text-lg">
                              In Poor Standing
                            </h1>
                            <p className="text-base text-red-400">
                              Active <b>Game Ban</b> on record
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            color: userInfo.theme?.textMuted || "#d4d4d8",
                          }}
                          className="flex gap-1"
                        >
                          <FaCheckCircle
                            size={70}
                            className="text-green-500 mr-2"
                          />
                          <div>
                            <h1 className="font-bold text-lg">
                              In Good Standing
                            </h1>
                            <p className="text-base text-green-500 -mt-1">
                              No <b>active</b> bans on record
                            </p>
                            <p className="text-sm">
                              * not including discord infractions
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <div
                        style={{
                          backgroundColor:
                            userInfo.theme?.bgTertiary || "#1c1917",
                        }}
                        className={`${(!userInfo.showcase || !userInfo?.showcase[0]) && "w-[170px] h-[70px] md:w-[205px] md:h-[85px]"} rounded-md`}
                      >
                        {userInfo.showcase && userInfo?.showcase[0] && (
                          <div
                            onClick={() =>
                              setSelectedItem(
                                userInfo.inventory[userInfo.showcase[0]],
                              )
                            }
                            style={{
                              backgroundPosition: checkNewGenImage(
                                userInfo.inventory[userInfo.showcase[0]]
                                  .SubType,
                                userInfo.inventory[userInfo.showcase[0]].Name,
                              )
                                ? "top"
                                : "center",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: `url(/items/${normalizeName(userInfo.inventory[userInfo.showcase[0]].SubType, userInfo.inventory[userInfo.showcase[0]].Name)}`,
                              animationDelay: `${0.1}s`,
                              opacity: 0,
                              backgroundColor:
                                userInfo.theme?.bgSecondary || "#292524",
                            }}
                            className="z-0 group hover:cursor-pointer overflow-hidden bg-size-[102%] animate-fade-in text-stone-200 flex flex-col gap-2 max-w-[205px] h-[70px] md:h-[85px] bg-stone-900 rounded-md"
                          >
                            <ShowcaseItemContent
                              item={userInfo.inventory[userInfo.showcase[0]]}
                              theme={userInfo.theme}
                            />
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          backgroundColor:
                            userInfo.theme?.bgTertiary || "#1c1917",
                        }}
                        className="w-full h-full rounded-md"
                      >
                        {userInfo.showcase && userInfo?.showcase[1] && (
                          <div
                            onClick={() =>
                              setSelectedItem(
                                userInfo.inventory[userInfo.showcase[1]],
                              )
                            }
                            style={{
                              backgroundPosition: checkNewGenImage(
                                userInfo.inventory[userInfo.showcase[1]]
                                  .SubType,
                                userInfo.inventory[userInfo.showcase[1]].Name,
                              )
                                ? "top"
                                : "center",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: `url(/items/${normalizeName(userInfo.inventory[userInfo.showcase[1]].SubType, userInfo.inventory[userInfo.showcase[1]].Name)}`,
                              animationDelay: `${0.2}s`,
                              opacity: 0,
                              backgroundColor:
                                userInfo.theme?.bgSecondary || "#292524",
                            }}
                            className="z-0 overflow-hidden group bg-size-[102%] hover:cursor-pointer animate-fade-in text-stone-200 flex flex-col gap-2 max-w-[205px] h-[70px] md:h-[85px]  bg-stone-900 rounded-md"
                          >
                            <ShowcaseItemContent
                              item={userInfo.inventory[userInfo.showcase[1]]}
                              theme={userInfo.theme}
                            />
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          backgroundColor:
                            userInfo.theme?.bgTertiary || "#1c1917",
                        }}
                        className={`${(!userInfo.showcase || !userInfo?.showcase[2]) && "w-[170px] h-[70px] md:w-[205px] md:h-[85px]"} rounded-md`}
                      >
                        {userInfo.showcase && userInfo?.showcase[2] && (
                          <div
                            onClick={() =>
                              setSelectedItem(
                                userInfo.inventory[userInfo.showcase[2]],
                              )
                            }
                            style={{
                              backgroundPosition: checkNewGenImage(
                                userInfo.inventory[userInfo.showcase[2]]
                                  .SubType,
                                userInfo.inventory[userInfo.showcase[2]].Name,
                              )
                                ? "top"
                                : "center",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: `url(/items/${normalizeName(userInfo.inventory[userInfo.showcase[2]].SubType, userInfo.inventory[userInfo.showcase[2]].Name)}`,
                              animationDelay: `${0.3}s`,
                              opacity: 0,
                              backgroundColor:
                                userInfo.theme?.bgSecondary || "#292524",
                            }}
                            className="z-0 overflow-hidden group bg-size-[102%] hover:cursor-pointer animate-fade-in text-stone-200 flex flex-col gap-2 max-w-[205px] h-[70px] md:h-[85px] bg-stone-900 rounded-md"
                          >
                            <ShowcaseItemContent
                              item={userInfo.inventory[userInfo.showcase[2]]}
                              theme={userInfo.theme}
                            />
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          backgroundColor:
                            userInfo.theme?.bgTertiary || "#1c1917",
                        }}
                        className="w-full h-full rounded-md"
                      >
                        {userInfo.showcase && userInfo?.showcase[3] && (
                          <div
                            onClick={() =>
                              setSelectedItem(
                                userInfo.inventory[userInfo.showcase[3]],
                              )
                            }
                            style={{
                              backgroundPosition: checkNewGenImage(
                                userInfo.inventory[userInfo.showcase[3]]
                                  .SubType,
                                userInfo.inventory[userInfo.showcase[3]].Name,
                              )
                                ? "top"
                                : "center",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: `url(/items/${normalizeName(userInfo.inventory[userInfo.showcase[3]].SubType, userInfo.inventory[userInfo.showcase[3]].Name)}`,
                              animationDelay: `${0.4}s`,
                              opacity: 0,
                              backgroundColor:
                                userInfo.theme?.bgSecondary || "#292524",
                            }}
                            className="z-0 overflow-hidden group bg-size-[102%] hover:cursor-pointer animate-fade-in text-stone-200 flex flex-col gap-2 max-w-[205px] h-[85px] bg-stone-900 rounded-md"
                          >
                            <ShowcaseItemContent
                              item={userInfo.inventory[userInfo.showcase[3]]}
                              theme={userInfo.theme}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {currentPage == 2 && (
                  <div
                    style={{
                      backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                      borderColor: userInfo.theme?.borderColor || "#b1b5b8",
                    }}
                    className="rounded-md hidden md:flex w-full h-full p-3 gap-4 mx-auto md:mx-0 select-none opacity-0 animate-fade-in shadow-lg"
                  >
                    <div className="flex flex-col gap-1">
                      <h1
                        className="font-bold text-5xl rounded-md p-1 px-2"
                        style={{
                          backgroundColor:
                            userInfo.theme?.bgTertiary || "#1c1917",
                          color: userInfo.theme?.textPrimary || "#d4d4d8",
                        }}
                      >
                        #00
                      </h1>
                      <h3
                        className="font-semibold"
                        style={{
                          color: userInfo.theme?.textMuted || "#a1a1aa",
                        }}
                      >
                        Weekly <b>Kills Position</b>
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1
                        className="font-bold text-5xl rounded-md p-1 px-2"
                        style={{
                          backgroundColor:
                            userInfo.theme?.bgTertiary || "#1c1917",
                          color: userInfo.theme?.textPrimary || "#d4d4d8",
                        }}
                      >
                        #00
                      </h1>
                      <h3
                        className="font-semibold "
                        style={{
                          color: userInfo.theme?.textMuted || "#a1a1aa",
                        }}
                      >
                        Clan's Weekly <b>Position</b>
                      </h3>
                    </div>
                  </div>
                )}

                {/* <div
                  className="mx-auto md:mx-0 select-none opacity-0 animate-fade-in-second rounded-md shadow-lg p-2 border-1 flex flex-col gap-2 w-full h-fit"
                  style={{
                    backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                    borderColor: userInfo.theme?.borderColor || "#b1b5b8",
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <div
                      className="p-2 text-lg md:text-3xl rounded-md h-fit"
                      style={{
                        backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
                      }}
                    >
                      <FaBookOpen
                        size={16}
                        style={{
                          fill: userInfo.theme?.iconColor || "#78716c",
                        }}
                      />
                    </div>
                    <h1
                      className="text-xl my-auto mb-1 md:mb-0 font-bold mt-1"
                      style={{
                        color: userInfo.theme?.textPrimary || "#a1a1aa",
                      }}
                    >
                      Tasks
                    </h1>
                    <div
                      className="ml-auto my-auto p-1 px-2 h-fit text-xs rounded-sm font-mono opacity-70"
                      style={{
                        backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
                        color: userInfo.theme?.textMuted || "#d4d4d8",
                      }}
                    >
                      {userInfo.tasks?.Tasks && userInfo.tasks?.Tasks.length} tasks
                    </div>
                  </div>
                </div>

                {userInfo.tasks?.Tasks && userInfo?.tasks?.Tasks.length > 0 ? (
                  userInfo.tasks.Tasks.map((task: any, index: any) => (
                    <div
                      key={index}
                      style={{
                        animationDelay: `${index * 0.1 + 3}s`,
                        opacity: 0,
                        backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                      }}
                      className="select-none opacity-0 animate-fade-in rounded-md shadow-lg p-1 px-3 flex-col items-center gap-2 w-full h-fit"
                    >
                      <div className="flex items-center gap-2">
                        <h1
                          className="flex gap-1 items-center font-bold"
                          style={{
                            color: task.Completed
                              ? "#16a34a"
                              : (userInfo.theme?.textPrimary || "#a1a1aa"),
                            textDecoration: task.Completed ? "line-through" : "none",
                            textDecorationThickness: task.Completed ? "2px" : "0",
                          }}
                        >
                          {task.Completed && <FaCheck size={13} />}{" "}
                          {task.Type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
                        </h1>
                        <div className="flex items-center gap-2 ml-auto">
                          <span
                            className="text-sm"
                            style={{
                              color: userInfo.theme?.textSecondary || "#78716c",
                            }}
                          >
                            Reward
                          </span>
                          <span
                            className="font-bold text-sm"
                            style={{
                              color: userInfo.theme?.textMuted || "#a1a1aa",
                            }}
                          >
                            {task.XpReward
                              ? `${task.XpReward} XP`
                              : task.Reward}
                          </span>
                        </div>
                      </div>

                      <div
                        className="transition-all rounded-sm w-full mt-[6px] h-[3px] flex overflow-hidden"
                        style={{
                          backgroundColor: userInfo.theme?.progressTrack || "#78716c",
                        }}
                      >
                        <div
                          className="h-full rounded-xs"
                          style={
                            task.Completed
                              ? {
                                width: "100%",
                                backgroundColor: "oklch(62.7% 0.194 149.214)",
                              }
                              : {
                                width: `${(task.Current / task.Goal) * 100}%`,
                                backgroundColor: userInfo.theme?.progressFill || "#a1a1aa",
                              }
                          }
                        >
                          <span
                            className="shrink-0 px-2 text-xs opacity-0 transition-opacity group-hover:py-1 font-bold group-hover:opacity-80 group-hover:block hidden"
                            style={{
                              color: userInfo.theme?.textOnFill || "#292524",
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="select-none opacity-0 animate-fade-in-third rounded-md shadow-lg p-3 border-1 flex flex-col gap-2 w-full mt-8 md:mt-0 h-fit"
                    style={{
                      backgroundColor: userInfo.theme?.bgSecondary || "#292524",
                      borderColor: userInfo.theme?.borderColor || "#78716c",
                    }}
                  >
                    <h1
                      style={{
                        color: userInfo.theme?.textPrimary || "#a1a1aa",
                      }}
                      className="text-lg"
                    >
                      No tasks available.
                    </h1>
                  </div>
                )} */}
              </div>
            </div>

            <InventoryPanel
              onItemClick={(item) => setSelectedItem(item)}
              userId={initialUserInfo.userId}
              userInfo={userInfo}
            />
          </div>
        </div>
      </>
    );
  }
}
