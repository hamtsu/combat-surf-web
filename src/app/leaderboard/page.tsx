"use client";
import Button from "@/components/Button";
import ClanTag from "@/components/ClanTag";
import RobloxAvatar from "@/components/RobloxAvatar";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaStar, FaTrophy, FaUserClock } from "react-icons/fa";
import { FaClockRotateLeft, FaShield, FaUsers } from "react-icons/fa6";

const Page = () => {
  const router = useRouter();
  const [players, setPlayers] = useState<any[]>([]);
  const [clans, setClans] = useState<any[]>([]);

  const [nextUpdate, setNextUpdate] = useState<number>(0);
  const [error, setError] = useState<any>(null);
  const updateLeaderboard = () => {
    fetch("/api/leaderboard")
      .then((res) => {
        if (!res.ok) {
          setError(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setPlayers(data.players || []);
          setClans(data.clans || []);
          setNextUpdate(data.nextUpdate || 0);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  };

  useEffect(() => {
    updateLeaderboard();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nextUpdate > 0) {
        setNextUpdate((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setNextUpdate(0);
        updateLeaderboard();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [nextUpdate]);

  if (players.length < 3) {
    return (
      <div className="text-stone-300 rounded-md w-full h-full flex items-center justify-center text-2xl">
        <div className="bg-stone-800 p-6 rounded-md flex flex-col items-center justify-center">
          <FaUserClock size={50} className="text-stone-400 mb-2" />
          Loading leaderboard data...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center md:justify-center pb-46 pt-5 md:pt-0 md:pb-20">
      <div className="md:absolute flex gap-2 left-5 top-5">
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

      <div
        className="absolute w-[90%] md:w-6/8 -z-50 bg-size-[200%] md:bg-size-[105%] top-20 md:top-5 h-[150px] md:h-[250px] rounded-lg border-4 border-white/20"
        style={{
          backgroundImage: `url(/header2.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute top-85 left-55 bg-stone-800 text-stone-300 rounded-md shadow-lg p-2 px-3 flex items-center gap-2">
        <FaClockRotateLeft className="text-stone-600" />
        Updating in{" "}
        {nextUpdate > 60
          ? Math.floor(nextUpdate / 60) + "m " + (nextUpdate % 60) + "s"
          : nextUpdate + "s"}
      </div>

      <div className="flex gap-2 my-4">
        <Tooltip text="Click to view profile" position="bottom">
          <div
            onClick={() => router.push("/player/" + players[1].id)}
            className="bg-stone-800 mb-auto pb-3 rounded-md h-fit opacity-0 hover:translate-y-2 transition-transform animate-fade-in-second select-none hover:cursor-pointer"
          >
            <div
              style={{
                backgroundImage: players[1].bannerPath
                  ? `url(${players[1].bannerPath})`
                  : undefined,
              }}
              className="flex flex-col items-center p-2 rounded-md bg-[#CD7F32] h-fit"
            >
              <h1
                style={{
                  color: players[1]?.textBanner
                    ? players[1].textBanner
                    : undefined,
                }}
                className="justify-self-end flex w-full justify-between ml-auto font-bold font-mono text-[#E8C4A1] text-xl"
              >
                <FaStar
                  style={{
                    fill: players[1]?.textBanner
                      ? players[1].textBanner
                      : undefined,
                  }}
                  size={20}
                  className="text-[#E8C4A1] animate-pulse"
                />
                2nd
              </h1>
              <div className="w-16 md:w-36 rounded-md">
                <RobloxAvatar userId={players[1].id} />
              </div>

              <h2
                style={{
                  color: players[1]?.textBanner
                    ? players[1].textBanner
                    : undefined,
                }}
                className="text-[#E8C4A1] font-bold text-xl mt-3"
              >
                {players[1].name.length > 8
                  ? players[1].name.slice(0, 8) + "…"
                  : players[1].name}
              </h2>
            </div>
            <h3 className="text-stone-400 text-lg mt-3 text-center">
              clan:{" "}
              <span className="font-bold">
                <ClanTag
                  text={players[1].clan}
                  colorR={players[1].clanStyle.colorR}
                  colorG={players[1].clanStyle.colorG}
                  colorB={players[1].clanStyle.colorB}
                  colorR2={players[1].clanStyle.colorR2}
                  colorG2={players[1].clanStyle.colorG2}
                  colorB2={players[1].clanStyle.colorB2}
                  colorMode={players[1].clanStyle.colorMode}
                />
              </span>
            </h3>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              Level <b>{players[1].level}</b>
            </h2>
          </div>
        </Tooltip>

        <Tooltip text="Click to view profile" position="bottom">
          <div
            onClick={() => router.push("/player/" + players[0].id)}
            className="bg-stone-800 pb-3 rounded-md h-full hover:translate-y-2 transition-transform animate-fade-in-first opacity-0 select-none hover:cursor-pointer"
          >
            <div
              style={{
                backgroundImage: players[0].bannerPath
                  ? `url(${players[0].bannerPath})`
                  : undefined,
              }}
              className={`flex flex-col items-center p-2 rounded-md bg-yellow-400 h-fit shadow-[0_0px_50px_rgba(255,192,0,0.8)]`}
            >
              <h1
                style={{
                  color: players[0]?.textBanner
                    ? players[0].textBanner
                    : undefined,
                }}
                className="justify-self-end w-full flex justify-between ml-auto font-bold font-mono text-yellow-600 text-xl"
              >
                <FaTrophy
                  size={20}
                  style={{
                    fill: players[0]?.textBanner
                      ? players[0].textBanner
                      : undefined,
                  }}
                  className="fill-yellow-600 mt-1 animate-pulse"
                />
                1st
              </h1>
              <div className="w-16 md:w-36 rounded-md">
                <RobloxAvatar userId={players[0].id} />
              </div>

              <h2
                style={{
                  color: players[0]?.textBanner
                    ? players[0].textBanner
                    : undefined,
                }}
                className="text-yellow-600 font-bold text-xl mt-3"
              >
                {players[0].name.length > 8
                  ? players[0].name.slice(0, 8) + "…"
                  : players[0].name}
              </h2>
              <FaTrophy
                size={50}
                style={{
                  fill: players[0]?.textBanner
                    ? players[0].textBanner
                    : undefined,
                }}
                className="fill-yellow-600 mt-1 animate-wiggle"
              />
            </div>
            <h3 className="text-stone-400 text-lg mt-3 text-center">
              clan:{" "}
              <span className="font-bold">
                <ClanTag
                  text={players[0].clan}
                  colorR={players[0].clanStyle.colorR}
                  colorG={players[0].clanStyle.colorG}
                  colorB={players[0].clanStyle.colorB}
                  colorR2={players[0].clanStyle.colorR2}
                  colorG2={players[0].clanStyle.colorG2}
                  colorB2={players[0].clanStyle.colorB2}
                  colorMode={players[0].clanStyle.colorMode}
                />
              </span>
            </h3>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              Level <b>{players[0].level}</b>
            </h2>
          </div>
        </Tooltip>

        <Tooltip text="Click to view profile" position="bottom">
          <div
            onClick={() => router.push("/player/" + players[2].id)}
            style={{
              backgroundImage: players[2].bannerPath
                ? `url(${players[2].bannerPath})`
                : undefined,
            }}
            className="bg-stone-800 mb-auto pb-3 rounded-md hover:translate-y-2 transition-transform h-fit animate-fade-in-third opacity-0 select-none hover:cursor-pointer"
          >
            <div className="flex flex-col items-center p-2 rounded-md bg-stone-700 h-fit">
              <h1
                style={{
                  color: players[2]?.textBanner
                    ? players[2].textBanner
                    : undefined,
                }}
                className="justify-self-end ml-auto font-bold font-mono text-stone-400 text-xl"
              >
                3rd
              </h1>
              <div className="w-16 md:w-36 rounded-md">
                <RobloxAvatar userId={players[2].id} />
              </div>

              <h2
                style={{
                  color: players[2]?.textBanner
                    ? players[2].textBanner
                    : undefined,
                }}
                className="text-stone-400 font-bold text-xl mt-3"
              >
                {players[2].name.length > 8
                  ? players[2].name.slice(0, 8) + "…"
                  : players[2].name}
              </h2>
            </div>
            <h3 className="text-stone-400 text-lg mt-3 text-center">
              clan:{" "}
              <span className="font-bold">
                <ClanTag
                  text={players[2].clan}
                  colorR={players[2].clanStyle.colorR}
                  colorG={players[2].clanStyle.colorG}
                  colorB={players[2].clanStyle.colorB}
                  colorR2={players[2].clanStyle.colorR2}
                  colorG2={players[2].clanStyle.colorG2}
                  colorB2={players[2].clanStyle.colorB2}
                  colorMode={players[2].clanStyle.colorMode}
                />
              </span>
            </h3>
            <h2 className="text-stone-300 font-bold text-xl mt-1 text-center">
              Level <b>{players[2].level}</b>
            </h2>
          </div>
        </Tooltip>
      </div>

      <div className="md:w-6/8 px-2 md:px-0 w-full flex md:flex-row flex-col gap-4 justify-center md:overflow-y-scroll rounded-md">
        <div className="flex flex-col gap-2 bg-stone-800 rounded-md p-4 w-full opacity-0 animate-fade-in-fourth h-fit">
          <div className="p-2 px-3 font-bold rounded-md bg-stone-900 text-stone-400 flex items-center gap-2 text-lg">
            <FaUsers /> Top players
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
                    style={{
                      animationDelay: `${index * 0.1 + 3}s`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: players[index].bannerPath
                        ? `url(${players[index].bannerPath})`
                        : undefined,
                    }}
                    className="flex text-base md:text-lg gap-2 items-center bg-stone-900 p-2 rounded-md opacity-0 animate-fade-in"
                  >
                    <div className="w-8 bg-stone-500 rounded-md">
                      <RobloxAvatar userId={player.id} />
                    </div>

                    <p className="text-stone-200 font-bold">{index + 1}.</p>

                    <a
                      href={`/player/${player.id}`}
                      style={{
                        color: players[index]?.theme?.textBanner
                          ? players[index].theme.textBanner
                          : undefined,
                      }}
                      className={`${players[index]?.textBanner ? "font-bold" : ""} text-stone-200 md:hidden hover:text-amber-300 font-bold`}
                    >
                      {player.name.length > 12
                        ? player.name.slice(0, 12) + "…"
                        : player.name}
                    </a>

                    <a
                      href={`/player/${player.id}`}
                      style={{
                        color: players[index]?.theme?.textBanner
                          ? players[index].theme.textBanner
                          : undefined,
                      }}
                      className={`${players[index]?.textBanner ? "font-bold" : ""}text-stone-200 hidden md:block hover:text-amber-300 font-bold`}
                    >
                      {player.name}
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
                    <span
                      style={{
                        color: players[index]?.theme?.textBanner
                          ? players[index].theme.textBanner
                          : undefined,
                      }}
                      className={`${players[index]?.textBanner ? "font-bold" : ""}text-stone-500 text-base ml-[-5px]`}
                    >
                      level
                    </span>
                    <p
                      style={{
                        color: players[index]?.theme?.textBanner
                          ? players[index].theme.textBanner
                          : undefined,
                      }}
                      className={`${players[index]?.textBanner ? "font-bold" : ""}text-stone-400 hidden md:block`}
                    >
                      {player.wins}
                    </p>
                    <span
                      style={{
                        color: players[index]?.theme?.textBanner
                          ? players[index].theme.textBanner
                          : undefined,
                      }}
                      className={`${players[index]?.textBanner ? "font-bold" : ""}text-stone-500 text-base hidden md:block ml-[-5px]`}
                    >
                      wins
                    </span>
                    <p
                      style={{
                        color: players[index]?.theme?.textBanner
                          ? players[index].theme.textBanner
                          : undefined,
                      }}
                      className={`${players[index]?.textBanner ? "font-bold" : ""}text-stone-400 hidden md:block`}
                    >
                      {player.career}
                    </p>
                    <span
                      style={{
                        color: players[index]?.theme?.textBanner
                          ? players[index].theme.textBanner
                          : undefined,
                      }}
                      className={`${players[index]?.textBanner ? "font-bold" : ""}text-stone-500 text-base hidden md:block ml-[-5px]`}
                    >
                      kills
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
                className="flex h-[48px] gap-2 text-base md:text-lg items-center bg-stone-900 p-[0.6rem] rounded-md opacity-0 animate-fade-in"
              >
                <p className="text-stone-200 font-bold">{index + 1}.</p>
                <a
                  href={`/clan/${clan.id}`}
                  className="text-stone-200 hover:text-amber-300 font-bold"
                >
                  {clan.name}
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
      </div>
    </div>
  );
};

export default Page;
