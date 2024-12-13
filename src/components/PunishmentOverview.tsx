import React, { FC } from "react";
import {
  FaAngleRight,
  FaFlag,
  FaGavel,
  FaShieldAlt,
  FaTools,
} from "react-icons/fa";
import Button from "./Button";

type PunishmentOverviewProps = {
  punishments: {
    type: string;
    reason: string;
    date: string;
    server: string;
  }[];
};

const PunishmentOverview: FC<PunishmentOverviewProps> = ({ punishments }) => {
  return (
    <>
      <div className="bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-md -mt-12 w-fit p-2 pr-3 flex items-center gap-1">
        <FaAngleRight className="mr-1" /> <b>Punishments</b> this reset
      </div>
      <div className="flex flex-row gap-2 p-2 pt-4">
        {/* Bans */}
        <div className="rounded-md flex flex-col gap-2 bg-red-500 p-3 text-stone-100">
          <div className="text-xl flex gap-3 items-center">
            <div className="bg-red-400 p-2 rounded-md text-3xl">
              <FaGavel />
            </div>
            <h1>
              <b>Bans</b> issued
            </h1>
          </div>

          <div className="text-7xl flex font-mono">
            <span className="opacity-70">00</span>1
            <span className="opacity-90 ml-3 text-4xl flex flex-col">
              bans<span className="text-xl">server-wide</span>
            </span>
          </div>
        </div>

        {/* Mutes */}
        <div className="rounded-md flex flex-col gap-2 bg-indigo-500 p-3 text-stone-100">
          <div className="text-xl flex gap-3 items-center">
            <div className="bg-indigo-400 p-2 rounded-md text-3xl">
              <FaShieldAlt />
            </div>
            <h1>
              <b>Mutes</b> issued
            </h1>
          </div>

          <div className="text-7xl flex font-mono">
            <span className="opacity-70">00</span>1
            <span className="opacity-90 ml-3 text-4xl flex flex-col">
              mutes<span className="text-xl">server-wide</span>
            </span>
          </div>
        </div>

        {/* Kicks */}
        <div className="rounded-md flex flex-col gap-2 bg-green-500 p-3 text-stone-100">
          <div className="text-xl flex gap-3 items-center">
            <div className="bg-green-400 p-2 rounded-md text-3xl">
              <FaFlag />
            </div>
            <h1>
              <b>Kicks</b> issued
            </h1>
          </div>

          <div className="text-7xl flex font-mono">
            <span className="opacity-70">00</span>1
            <span className="opacity-90 ml-3 text-4xl flex flex-col">
              kicks<span className="text-xl">server-wide</span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-fit px-2 pb-2">
        <div className="p-3 bg-stone-300 dark:bg-stone-900 h-full rounded-md flex gap-2 items-center">
          <div className="bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 p-2 rounded-md text-3xl w-fit">
            <FaTools />
          </div>

          <Button className="px-4 bg-stone-200 hover:bg-black/10 dark:bg-stone-800 dark:hover:bg-white/10 dark:text-stone-200 transition-colors p-3 font-bold">
            View all punishments
          </Button>
          <Button className="px-4 bg-stone-200 hover:bg-black/10 dark:bg-stone-800 dark:hover:bg-white/10 dark:text-stone-200  transition-colors p-3 font-bold">
            Edit a punishment
          </Button>
          <Button className="px-4 bg-stone-200 hover:bg-black/10 dark:bg-stone-800 dark:hover:bg-white/10 dark:text-stone-200  transition-colors p-3 font-bold">
            View all staff punishments
          </Button>
        </div>
      </div>
    </>
  );
};

export default PunishmentOverview;
