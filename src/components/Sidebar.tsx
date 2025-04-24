"use client";

import Image from "next/image";
import {
  FaAngleRight,
  FaAngleUp,
  FaExclamationCircle,
  FaFile,
  FaFlag,
  FaGavel,
  FaHome,
  FaSearch,
  FaUserShield,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  const [shiftDown, isShiftDown] = useState(false);
  const [locked, setLocked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") isShiftDown(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") isShiftDown(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={`bg-stone-100 dark:bg-stone-900 ${open && "grow flex-1"} p-4 pb-40 pt-20 `}>
      <div className={`bg-stone-800 rounded-md ${open ? "w-full" : 'w-fit'} flex flex-col h-fit pb-2`}>
        <div className="text-stone-200 flex gap-3 h-fit p-3 items-center">
          <Image
            src="/logo.svg"
            width={80}
            height={80}
            alt="Logo"
            draggable={false}
            className="w-10"
          />

          <div className={`${open ? "flex flex-col" : "hidden"}`}>
            <span className="font-bold uppercase text-base leading-4">
              Staff panel
            </span>
            <span className="flex items-center opacity-80 text-sm">
              <FaAngleRight className="opacity-70" /> dashboard
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-2 pt-6">
          <div className="uppercase font-mono italic text-slate-200/50 pl-2">
            MAIN
          </div>

          <SidebarButton
            icon={<FaHome />}
            name="Dashboard"
            path="/dashboard"
            index="1"
            shiftDown={shiftDown}
            open={open}
          />

          <SidebarButton
            icon={<FaFile />}
            name="Files"
            path="/files"
            index="2"
            shiftDown={shiftDown}
            open={open}
          />

          <SidebarButton
            icon={<FaUserShield />}
            name="My Info"
            path="/stats"
            index="3"
            shiftDown={shiftDown}
            open={open}
          />

          <div className="uppercase font-mono italic text-slate-200/50 pl-2 pt-5">
            Admin
          </div>

          <SidebarButton
            icon={<FaGavel />}
            name="Punishments"
            path="/punishments"
            index="4"
            shiftDown={shiftDown}
            open={open}
          />

          <SidebarButton
            icon={<FaSearch />}
            name="Player Lookup"
            path="/lookup"
            index="5"
            shiftDown={shiftDown}
            open={open}
          />

          <div className="uppercase font-mono italic text-slate-200/50 pl-2 pt-5">
            {open ? "Staff management" : "S-Mgmt"}
          </div>

          <SidebarButton
            icon={<FaExclamationCircle />}
            name="Staff Edit"
            path="/staff-edit"
            index="6"
            shiftDown={shiftDown}
            open={open}
          />

          <div className={`${!open && "hidden"} bg-stone-900 rounded-md w-full text-stone-400 p-2 mt-4 text-sm`}>
            <p>
              version {process.env.APP_VERSION} ({process.env.GIT_COMMIT}/main)
            </p>
            <p className="text-stone-300">
              This is a <b>beta</b> version, please report issues with the{" "}
              <FaFlag className="inline align-middle text-stone-200" /> below.
            </p>
          </div>
        </div>
      </div>
      <div className={` ${!open && "hidden"} bg-stone-300 rounded-xs p-1 mt-2 text-xs flex items-center font-mono`}>
        <FaAngleUp /> <b className="mr-1">[SHIFT]</b> +{" "}
        <b className="mx-1">[NUMBER]</b> to switch pages{" "}
      </div>
    </div>
  );
};

export default Sidebar;
