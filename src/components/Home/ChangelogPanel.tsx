import React from "react";
import { FaArrowRight, FaPaperclip } from "react-icons/fa";
import Button from "../Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RobloxAvatar from "../RobloxAvatar";

const MOCK_DATA = [
  {
    title: "CS2 Update 1.0",
    description:
      "Custom Controls & Expanded Settings – More ways to personalize your gameplay. 😎 Complete UI revamp. Map Updates – Improved visuals and layout refinements.More Weapons - Ak47, Glock, and Shotgun 😱Animation Overhaul – Smoother and more immersive viewmodel animations. New Secondary Weapons – More variety in combat.Crouching – Added for tactical movement.Backstabs – m2 for knives.Skin System Enhancements – Includes StatTraks, patterns, and trade-ups.Improved Clan Features – Better support for clan owners.",
    imageUrl: "header.png",
    author: "hamtsu",
    authorId: "97752529",
  },
];

const ChangelogPanel = () => {
  const router = useRouter();

  return (
    <div className="rounded-md bg-stone-800 p-4 hidden md:flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="p-4 bg-stone-900 rounded-md">
          <FaPaperclip size={30} className="fill-stone-600" />
        </div>
        <h1 className="text-4xl font-bold text-stone-400 mt-3">Changelog</h1>
      </div>

      <div className="w-[500px] lg:w-96 flex flex-col h-80 bg-[url(/header.png)] bg-cover bg-right rounded-lg">
        <div className="backdrop-blur-[2px] text-slate-100 h-full text-center px-5 pt-4 flex flex-col">
          <div className="flex gap-1 w-full justify-between">
            <h1 className="font-bold text-3xl ml-[-30px] border-r-5 border-stone-600 drop-shadow-2xl bg-stone-900 text-stone-400 h-fit rounded-md relative mb-3 p-3">
              {MOCK_DATA[0].title}
            </h1>

            <div className="flex lg:hidden">
              <div className="flex flex-col mt-3 text-left text-sm mr-1 text-nowrap text-slate-200/60 uppercase font-bold tracking-widest">
                <h2 className="text-[0.7rem]">Written by</h2>
                <h2 className="text-slate-100 text-shadow-[0_0px_5px_rgb(255_255_255_/_1)]">
                  {MOCK_DATA[0].author}
                </h2>
              </div>
              <div className="mt-[-50px] w-26 mr-[-10px]">
                <RobloxAvatar userId={MOCK_DATA[0].authorId} />
              </div>
            </div>
          </div>

          <p className="text-lg lg:text-base text-slate-200/80 mt-3 lg:mt-1">
            {MOCK_DATA[0].description.substring(0, 280)}...
          </p>
        </div>

        <Button
          onClick={() => router.push("/changelog/1")}
          className="ml-auto px-3 py-2 h-fit flex text-stone-200/30 font-medium hover:text-stone-200/70 text-base font-sans transition-colors rounded-lg"
        >
          <p className="">View more</p>
          <FaArrowRight size={15} className=" ml-2" />
        </Button>
      </div>

      <Button
        onClick={() => router.push("/changelog")}
        className="ml-auto px-3 py-2 h-fit flex bg-stone-900 hover:bg-stone-700 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
      >
        <FaArrowRight
          size={15}
          className="fill-stone-200 mr-2 group-hover:animate-bounce-right"
        />
        <p className="text-stone-200">See all updates</p>
      </Button>
    </div>
  );
};

export default ChangelogPanel;
