"use client";
import React from "react";
import Button from "../Button";
import { FaExternalLinkAlt, FaGavel } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaBoxArchive } from "react-icons/fa6";

const InfoPanel = () => {
  const router = useRouter();

  return (
    <div className="bg-stone-800 opacity-0 animate-fade-in-second p-4 rounded-md h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-stone-300">
        What is <b>Combat Surf</b>?
      </h1>
      <p className="text-stone-200/80 mb-2">
        A roblox game based off of the classic community gamemode! <br /><br/> <b>New to the game?</b> <br/>The tutorial <i>(!tutorial in game)</i> can be helpful in grasping the basics, also check out the <a href="https://www.youtube.com/watch?v=k3NZMxsc1yQ" className="text-stone-200 hover:text-yellow-400 font-bold">video tutorial</a>.
      </p>

      <Button
        onClick={() => router.push("/rules")}
        className="px-3 py-2 h-fit flex mt-auto bg-stone-900 hover:bg-red-500 text-stone-500 hover:text-stone-200 text-lg font-sans font-bold transition-colors rounded-lg group"
      >
        <FaGavel size={15} className="mr-2 group-hover:animate-gavel" />
        <p className="">View rules</p>
      </Button>
      <Button
        onClick={() =>
            window.open(
              "https://discord.gg/cqEsxTdRN2",
              "_blank"
            )
          }
        className="px-3 py-2 h-fit flex bg-stone-900 hover:bg-stone-400 text-stone-500 hover:text-stone-800 text-lg font-sans font-bold transition-colors rounded-lg group"
      >
        <FaExternalLinkAlt size={15} className="mr-2" />
        <p className="">Community Value Discord</p>
      </Button>
    </div>
  );
};

export default InfoPanel;
