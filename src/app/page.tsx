"use client";

import ButtonGroup from "@/components/Header/ButtonGroup";
import GameInfo from "@/components/Header/GameInfo";
import ChangelogPanel from "@/components/Home/ChangelogPanel";
import InfoPanel from "@/components/Home/InfoPanel";
import LeaderboardPanel from "@/components/Home/LeaderboardPanel";
import PlayerLookupPanel from "@/components/Home/PlayerLookupPanel";
import Image from "next/image";
import { FaTicket } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full h-full overflow-y-scroll gap-4 px-4 pb-52 pt-5 md:px-8 md:pb-0 bg-stone-900">
      {/* HEADER */}
      <div className="w-full font-mono text-sm flex justify-center">
        <div className="bg-[url(/header.png)] bg-bottom w-full max-w-screen-xl h-fit md:h-64 rounded-2xl overflow-hidden">
          <div className="w-full h-full backdrop-blur-xs border-4 border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6">
            <GameInfo />
            <Image
              src="/combatsurflogo.png"
              alt="Logo"
              width={1000}
              height={1000}
              draggable={false}
              className="opacity-0 w-64 md:w-96 select-none animate-fade-in-first drop-shadow-[0_0px_50px_rgba(255,255,255,0.8)]"
            />
            <ButtonGroup />
          </div>
        </div>
      </div>

      {/* MAIN PANELS */}
      <div className="w-full max-w-screen-xl flex flex-col md:flex-row gap-4 items-center md:items-start justify-center">
        {/* Left Panel */}
        <div className="flex flex-col gap-4 w-full">
          <div className="w-[21rem] hidden md:block rounded-md bg-stone-800 p-4 opacity-0 animate-fade-in-first">
            <h1 className="text-2xl font-bold text-stone-300">
              Hello! Welcome to the <b>Combat Surf</b> Website 👋
            </h1>
          </div>
          <InfoPanel />
        </div>

        {/* Center Panel */}
        <ChangelogPanel />

        {/* Right Panel */}
        <div className="flex flex-col gap-4 w-full md:flex-1">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <PlayerLookupPanel />

            {/* Support & Appeals Box */}
            <div className="bg-stone-800 p-4 rounded-md opacity-0 animate-fade-in-fifth hidden md:flex flex-col gap-3 w-full md:max-w-xs">
              <div className="flex gap-3 items-center">
                <div className="p-2 bg-stone-900 rounded-md">
                  <FaTicket size={20} className="fill-stone-600" />
                </div>
                <h1 className="text-xl font-bold text-stone-400">Support & Appeals</h1>
              </div>
              <p className="text-stone-200 text-xs">
                Head to the{" "}
                <span className="bg-stone-900 mr-1 rounded-md p-1 font-mono text-stone-400">
                  #tickets
                </span>
                channel in the{" "}
                <a
                  href="https://discord.com/invite/k4jnnsSt29"
                  className="hover:text-amber-300 font-bold"
                >
                  Discord
                </a>{" "}
                to open a ticket for support or appeal a ban.
              </p>
            </div>
          </div>

          <LeaderboardPanel />
        </div>
      </div>
    </main>

  );
}
