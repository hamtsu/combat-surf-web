"use client";

import Button from "@/components/Button";
import ItemModal from "@/components/ItemModal";
import InventoryPanel from "@/components/Profile/InventoryPanel";
import PlayerHeader from "@/components/Profile/PlayerHeader";
import StatisticPanel from "@/components/StatisticPanel";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheck,
  FaSkull,
  FaTrophy,
  FaUser,
} from "react-icons/fa";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    if (!slug) return;
    let userInfoRes: any;

    fetch(
      `/api/player-info?userId=${slug}&fields=username,displayName,level,clanId,inventory,xp,weaponKills,wins,tasks,globalKills,tradeBanned`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed fetching player info");
        return res.json();
      })
      .then((data) => {
        if (data.level) {
          setUserInfo(data);
          userInfoRes = data;
        } else {
          setError("User not found or invalid userId");
          console.error("User not found or invalid userId");
        }
      })
      .then(() => {
        if (userInfoRes.clanId && userInfoRes.clanId !== "-1")
          fetch(`/api/clan-info?clanId=${userInfoRes.clanId}`)
            .then((res) => {
              if (!res.ok) throw new Error("Failed fetching clan info");
              return res.json();
            })
            .then((data) => {
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
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [slug]);

  if (userInfo === null || userInfo.level === undefined) {
    return (
      <div className="flex bg-stone-900 text-slate-200 flex-col items-center justify-center w-full h-full p-4">
        <div className="absolute flex gap-2 left-5 top-5">
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
            <div className="flex items-center justify-between text-2xl p-4 gap-4 bg-stone-800 rounded-md">
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
        <div style={ userInfo.backgroundImage ? { backgroundImage: `url(${userInfo.backgroundImage})` } : {}} className={`overflow-y-scroll flex ${userInfo.backgroundImage ? `bg-center backdrop-blur-md` : "bg-stone-900"} text-slate-200 flex-col items-center justify-center w-full h-full p-4 gap-3`}>
          { userInfo.blurBackgroundImage && <div className="absolute z--1 w-full h-full backdrop-blur-[2px]"/> }
          <div className="absolute flex gap-2 left-5 top-5">
            <Tooltip text="Go back" position="bottom">
              <Button
                onClick={() => router.back()}
                className="px-5 h-full py-3 flex shadow-lg bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
              >
                <FaArrowLeft
                  size={35}
                  className="group-hover:animate-bounce-right"
                />
              </Button>
            </Tooltip>

            <div className="flex gap-4 bg-stone-800 shadow-lg rounded-md">
              <div className="flex items-center justify-between text-2xl p-4 gap-4 bg-stone-800 rounded-md">
                <div className="rounded-md bg-stone-900 p-3">
                  <FaUser size={25} className="fill-stone-600 " />
                </div>
                <h1 className="text-stone-400 font-bold">
                  Viewing <b>{userInfo.username}</b>
                </h1>
              </div>
            </div>
          </div>

          <PlayerHeader userInfo={userInfo} />

          <div className="flex md:flex-row flex-col gap-5 items-bottom md:mt-4 lg:mt-1">
            <div className="flex md:flex-col flex-row gap-4 animate-fade-in-fifth opacity-0 ">
              <div className="flex gap-2">
                <StatisticPanel
                  name="Career Kills"
                  value={userInfo.globalKills}
                  icon={<FaSkull size={18} className="fill-stone-600" />}
                />
                <StatisticPanel
                  name="Career Wins"
                  value={userInfo.wins}
                  icon={<FaTrophy size={18} className="fill-stone-600" />}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="select-none opacity-0 animate-fade-in-second rounded-md bg-stone-800 shadow-lg p-2 border-1 border-stone-700 flex flex-col gap-2 w-full h-fit">
                  <div className="flex gap-3 items-center">
                    <div className="p-2 text-lg md:text-3xl bg-stone-900 rounded-md h-fit">
                      <FaBookOpen size={16} className="fill-stone-600" />
                    </div>
                    <h1 className="hidden md:block text-xl font-bold text-stone-400 mt-1">
                      Tasks
                    </h1>

                    <div className="bg-stone-900 ml-auto my-auto p-1 px-2 h-fit text-xs rounded-sm font-mono text-stone-300 opacity-70">
                      {userInfo.tasks && userInfo.tasks.Tasks.length} tasks
                    </div>
                  </div>
                </div>
                {userInfo?.tasks?.Tasks.length > 0 ? (
                  userInfo.tasks.Tasks.map((task: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        animationDelay: `${index * 0.1 + 3}s`,
                        opacity: 0,
                      }}
                      className="select-none opacity-0 animate-fade-in rounded-md bg-stone-800 shadow-lg p-1 px-3 flex-col items-center gap-2 w-full h-fit"
                    >
                      <div className="flex items-center gap-2">
                        <h1
                          className={`${
                            task.Completed
                              ? "text-green-600 line-through decoration-2"
                              : "text-stone-400"
                          } flex gap-1 items-center font-bold`}
                        >
                          {task.Completed && <FaCheck size={13} />}{" "}
                          {task.Type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
                        </h1>
                        <div className="flex items-center gap-2 ml-auto">
                          <span className="text-stone-500 text-sm">Reward</span>
                          <span className="text-stone-300 font-bold text-sm">
                            {task.XpReward ? (
                              <>{task.XpReward} XP</>
                            ) : (
                              <>{task.Reward}</>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="bg-stone-600 transition-all rounded-sm w-full mt-[6px] h-[3px] flex overflow-hidden">
                        <div
                          className="bg-stone-200 h-full rounded-xs "
                          style={
                            task.Completed
                              ? {
                                  width: "100%",
                                  backgroundColor: "oklch(62.7% 0.194 149.214)",
                                }
                              : {
                                  width: `${(task.Current / task.Goal) * 100}%`,
                                }
                          }
                        >
                          <span className="text-stone-800 shrink-0 px-2 text-xs opacity-0 transition-opacity group-hover:py-1 font-bold group-hover:opacity-80 group-hover:block hidden"></span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="select-none opacity-0 animate-fade-in-third rounded-md bg-stone-800 shadow-lg p-3 border-1 border-stone-700 flex flex-col gap-2 w-full mt-8 md:mt-0 h-fit">
                    <h1 className="text-stone-400 text-lg">
                      No tasks available.
                    </h1>
                  </div>
                )}
              </div>
            </div>

            <InventoryPanel
              inventory={userInfo.inventory}
              onItemClick={(item) => setSelectedItem(item)}
            />
          </div>
        </div>
      </>
    );
  }
}
