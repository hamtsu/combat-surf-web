import React from "react";
import Button from "../Button";
import { SiRoblox } from "react-icons/si";
import { FaDiscord } from "react-icons/fa";

const ButtonGroup = () => {
  return (
    <div className="flex flex-col gap-2 opacity-0 animate-fade-in-third">
      <Button
        onClick={() =>
          window.open(
            "https://www.roblox.com/games/16167223198/HUGE-UPDATE-Combat-Surf",
            "_blank"
          )
        }
        className="px-5 py-3 h-fit flex bg-stone-900 hover:bg-red-500 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
      >
        <SiRoblox size={20} className="group-hover:animate-bounce-left mr-2" />
        <p>
          Open on <b>Roblox</b>
        </p>
      </Button>
      <Button
        onClick={() =>
          window.open(
            "http://discord.com/invite/k4jnnsSt29",
            "_blank"
          )
        }
        className="px-5 py-3 h-fit flex bg-stone-900 hover:bg-indigo-500 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
      >
        <FaDiscord size={23} className="group-hover:animate-wiggle mr-2" />
        <p>
          Join the <b>Discord</b>
        </p>
      </Button>
    </div>
  );
};

export default ButtonGroup;
