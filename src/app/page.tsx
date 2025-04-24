"use client";

import ButtonGroup from "@/components/Header/ButtonGroup";
import GameInfo from "@/components/Header/GameInfo";
import ChangelogPanel from "@/components/Home/ChangelogPanel";
import InfoPanel from "@/components/Home/InfoPanel";
import Image from "next/image";

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
              https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=957413104&size=420x420&format=Png&isCircular=false
            </h1>
          </div>
          <InfoPanel />
        </div>

        <ChangelogPanel />
      </div>
    </main>
  );
}
