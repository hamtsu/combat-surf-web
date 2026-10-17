"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaToolbox } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import Custom404 from "../not-found";

const Maintenance = () => {

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4 p-4 md:px-48 bg-stone-900">
      <div className="rounded-md bg-stone-800 p-4 h-fit">
        <div className="flex justify-center gap-5">
          <FaToolbox className="text-8xl text-stone-600" />
          <h1 className="text-8xl font-bold text-stone-300 ">
            Maintenance
          </h1>
        </div>
        <div className="h-2 bg-construction-yellow w-full mb-5" />
        <p className="text-stone-400 text-lg">
          We are currently under maintenance. Please check back soon!
        </p>
        <p className="text-stone-600 italic">See you in game surfers!</p>
      </div>

      <Button
        className="bg-stone-800 py-3 px-4 flex gap-2 text-stone-300 hover:bg-stone-700 group"
        onClick={() =>
              window.open("http://discord.com/invite/k4jnnsSt29", "_blank")
            }
      >
        <FaDiscord size={20} className="text-stone-300 group-hover:animate-wiggle" />
        Join our Discord for updates
      </Button>
    </div>
  );
};

export default Maintenance;
