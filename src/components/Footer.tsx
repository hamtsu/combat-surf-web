"use client";

import Image from "next/image";
import Button from "./Button";
import { FaDiscord } from "react-icons/fa";
import Tooltip from "./Tooltip";
import { SiRoblox } from "react-icons/si";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="absolute bottom-0 items-center w-full flex flex-row gap-60 px-24 h-fit bg-stone-800 dark:border-t border-stone-900">
      <div className="flex flex-row gap-4 items-center text-stone-200/80 opacity-50 hover:opacity-100 transition-opacity select-none">
        <Image
          src="/combatsurflogo.png"
          width={200}
          height={200}
          alt="Logo"
          draggable={false}
          className="w-24 my-4 p-1 bg-stone-900 rounded-md"
          onClick={() => router.push("/")}
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm">
            © {new Date().getFullYear()} Combat Surf
          </span>
          <span className="text-xs text-stone-200/30">
            {process.env.APP_VERSION} [{process.env.GIT_COMMIT}/master]
          </span>
        </div>
      </div>

      <div className="flex grow" />

      <div className="h-fit w-fit flex gap-2">
        <Button
          onClick={() =>
            window.open(
              "https://www.roblox.com/games/16167223198/HUGE-UPDATE-Combat-Surf",
              "_blank"
            )
          }
          className="px-5 py-3 h-fit flex bg-stone-900 hover:bg-red-500 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
        >
          <SiRoblox className="group-hover:animate-bounce-left mr-1" /> Open on
          <b>Roblox</b>
        </Button>

        <Tooltip text="Join Discord" position="top">
          <Button
            onClick={() =>
              window.open("http://discord.com/invite/k4jnnsSt29", "_blank")
            }
            className="px-5 py-3 flex h-full bg-stone-900 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <FaDiscord size={20} className="group-hover:animate-wiggle" />
          </Button>
        </Tooltip>
      </div>

      <div className="flex grow" />

      <div className="flex flex-row gap-4 items-center text-stone-200/80 text-sm">
        <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none">
          privacy policy
        </span>
        <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none">
          terms of service
        </span>
      </div>
    </footer>
  );
};

export default Footer;
