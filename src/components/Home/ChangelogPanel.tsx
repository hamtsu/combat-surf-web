import React from "react";
import { FaArrowRight, FaPaperclip } from "react-icons/fa";
import Button from "../Button";
import { useRouter } from "next/navigation";

const MOCK_DATA = [
  {
    title: "CS2 Update 1.0",
    description:
      "Custom Controls & Expanded Settings – More ways to personalize your gameplay. 😎 Complete UI revamp. Map Updates – Improved visuals and layout refinements.More Weapons - Ak47, Glock, and Shotgun 😱Animation Overhaul – Smoother and more immersive viewmodel animations. New Secondary Weapons – More variety in combat.Crouching – Added for tactical movement.Backstabs – m2 for knives.Skin System Enhancements – Includes StatTraks, patterns, and trade-ups.Improved Clan Features – Better support for clan owners.",
    imageUrl: "header.png",
  },
];

const ChangelogPanel = () => {
  const router = useRouter();

  return (
    <div className="rounded-md bg-stone-800 p-4 flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="p-4 bg-stone-900 rounded-md">
          <FaPaperclip size={30} className="fill-stone-600" />
        </div>
        <h1 className="text-4xl font-bold text-stone-400 mt-3">Changelog</h1>
      </div>

      <div className="w-[500px] flex flex-col h-80 bg-[url(/header.png)] bg-cover bg-right rounded-lg">
        <div className="backdrop-blur-[2px] text-slate-100 h-full text-center p-5 flex items-center justify-center flex-col">
          <h1 className="font-bold text-3xl bg-neutral-900 rounded-md relative ml-[-300px] shadow mb-3 mt-[-30px] p-3">
            {MOCK_DATA[0].title}
          </h1>
          <p className="text-lg text-slate-200/80">
            {MOCK_DATA[0].description.substring(0, 200)}...
          </p>
        </div>

        <Button
          onClick={() => router.push("/changelog/1")}
          className="ml-auto px-3 py-2 h-fit flex text-stone-200/30 font-medium hover:text-stone-200/70 text-base font-sans transition-colors rounded-lg"
        >
          <p className="">View more</p>
          <FaArrowRight
            size={15}
            className=" ml-2"
          />
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
