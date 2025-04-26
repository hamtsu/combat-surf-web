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
    <main className="flex w-full h-full flex-col gap-3 p-4 px-48 bg-stone-900">
      {/* HEADER*/}
      <div className="w-full items-center justify-between font-mono text-sm ">
        <div className="bg-[url(/header.png)] bg-bottom w-5/6 h-64 rounded-2xl overflow-hidden mx-auto">
          <div className="w-full h-full backdrop-blur-xs border-4 border-white/10 rounded-2xl flex items-center p-10">
            <GameInfo />

            <Image
              src={"/combatsurflogo.png"}
              alt="Logo"
              width={1000}
              height={1000}
              draggable={false}
              className="mx-auto opacity-0 w-96 select-none animate-fade-in-first drop-shadow-[0_0px_50px_rgba(255,255,255,0.8)]"
            />
            <ButtonGroup />
          </div>
        </div>
      </div>

      <div className="p-4 w-fit flex gap-4 opacity-0 animate-fade-in-fourth">
        <div className="flex flex-col gap-4 w-80 ">
          <div className="rounded-md bg-stone-800 p-4 h-fit">
            <h1 className="text-2xl font-bold text-stone-300 ">
              Hello! Welcome to the <b>Combat Surf</b> Website👋
            </h1>
          </div>
          <InfoPanel />
        </div>

        <ChangelogPanel />

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <PlayerLookupPanel />

            <div className="h-full bg-stone-800 p-4 rounded-md flex flex-col gap-3 w-full grow-0">
              <div className="flex gap-3">
                <div className="p-2 bg-stone-900 rounded-md h-fit">
                  <FaTicket size={20} className="fill-stone-600" />
                </div>
                <h1 className="text-xl font-bold text-stone-400 mt-1">
                  Support & Appeals
                </h1>
              </div>

              <p className="text-stone-200 text-xs w-[270px] ">
                Head to the{" "}
                <span className="bg-stone-900 mr-1 rounded-md p-1 font-mono text-stone-400">
                  #tickets
                </span>
                channel in the <a href="https://discord.com/invite/k4jnnsSt29" className="hover:text-amber-300 font-bold">Discord</a> to open a ticket for support or appeal a
                ban.
              </p>
            </div>
          </div>
          <LeaderboardPanel />
        </div>
      </div>
    </main>
  );
}
