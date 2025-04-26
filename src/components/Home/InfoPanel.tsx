"use client";
import React from "react";
import Button from "../Button";
import { FaExternalLinkAlt, FaGavel } from "react-icons/fa";
import { useRouter } from "next/navigation";

const InfoPanel = () => {
  const router = useRouter();

  return (
    <div className="h-full bg-stone-800 p-4 rounded-md flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-stone-300">
        What is <b>Combat Surf</b>?
      </h1>
      <p className="text-stone-200/80">
        Combat Surf is a roblox game based off of the classic community gamemode from the Counter-Strike series! It is a fast paced movement shooter which requires knowledge of
        surfing and strafing.
      </p>

      <Button
        onClick={() => router.push("/")}
        className="px-3 py-2 h-fit flex mt-auto bg-stone-900 hover:bg-red-500 text-stone-500 hover:text-stone-200 text-lg font-sans font-bold transition-colors rounded-lg group"
      >
        <FaGavel size={15} className="mr-2 group-hover:animate-gavel" />
        <p className="">View rules</p>
      </Button>
      <Button
        onClick={() => router.push("/")}
        className="px-3 py-2 h-fit flex bg-stone-900 hover:bg-stone-400 text-stone-500 text-lg font-sans font-bold transition-colors rounded-lg group"
      >
        <FaExternalLinkAlt size={15} className="mr-2" />
        <p className="">View item list</p>
      </Button>
    </div>
  );
};

export default InfoPanel;
