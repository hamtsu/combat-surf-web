import React, { FC } from "react";
import { FaClock } from "react-icons/fa";

type LeaderboardUpdateProps = {
    update: () => void,
    cooldown: number,
}

const LeaderboardUpdate: FC<LeaderboardUpdateProps> = ({ update, cooldown }) => {


  return (
    <div className="sticky top-0 text-stone-400 bg-stone-800 flex gap-1 flex-col text-center items-center justify-center rounded-md p-2 opacity-0 animate-fade-in-third h-fit">
      <FaClock size={50} className="fill-stone-600 animate-pulse" />
      <p className="text-sm font-bold">Update in:</p>
      <div className="bg-stone-900 p-1 rounded-md">{cooldown? cooldown : "Loaded!"}</div>
    </div>
  );
};

export default LeaderboardUpdate;
