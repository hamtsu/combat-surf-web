"use client";

import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight, FaDiscord, FaGamepad, FaGavel } from "react-icons/fa";

const Page = () => {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center pb-24">
      <div className="flex gap-2 my-4">
        <div className="flex items-center justify-between text-4xl p-4 gap-4 bg-stone-800 rounded-md">
          <div className="rounded-md bg-stone-900 p-3">
            <FaGavel size={35} className="fill-stone-600 " />
          </div>
          <h1 className="text-stone-400 font-bold">Rules</h1>
        </div>

        <Tooltip text="Back to Home" position="bottom">
          <Button
            onClick={() => router.push("/")}
            className="px-5 py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors h-full rounded-lg text-stone-200/50 group"
          >
            <FaArrowRight
              size={35}
              className="group-hover:animate-bounce-right"
            />
          </Button>
        </Tooltip>
      </div>

      <div className="my-auto">
        <div className="flex flex-row gap-4">
          <div className="bg-stone-800 rounded-md opacity-0 animate-fade-in-first p-4 text-stone-200">
            <div className="flex gap-2 items-center">
              <div className="p-2 rounded-md bg-stone-900">
                <FaGamepad size={30} className="fill-stone-600" />
              </div>
              <h1 className="text-2xl font-bold text-stone-400 mt-1">
                Game rules
              </h1>
            </div>

            <div className="text-lg mt-3">
              <ul className="list-disc pl-5">
                <li className="text-stone-200 mb-2">
                  No cheating or exploiting.
                </li>
                <li className="text-stone-200 mb-2">
                  No selling/cross-trading skins, cases, or other in-game items.
                </li>
                <li className="text-red-400 underline mb-2">
                  No Alt Farming - Alt accounts for farming cases is not
                  allowed!
                </li>
                <li className="text-stone-200 mb-2">
                  We <b>do not</b> reimburse for scams. Make smart trades!
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-stone-800 w-[260px] rounded-md p-4 opacity-0 animate-fade-in-second text-stone-200">
            <div className="flex gap-2">
              <div className="p-2 rounded-md bg-stone-900">
                <FaDiscord size={20} className="fill-stone-600" />
              </div>
              <h1 className="text-xl font-bold text-stone-400 mt-1">
                Discord rules
              </h1>
            </div>

            <div className="mt-3 gap-2">
              The server rules can be found in the{" "}
              <span className="bg-stone-900 p-1 rounded-md">#rules</span>{" "}
              channel.
              <p className="mt-3 italic opacity-80 text-sm">
                You can join the server by clicking the button below.
              </p>
            </div>

            <Button
              onClick={() =>
                window.open("http://discord.com/invite/k4jnnsSt29", "_blank")
              }
              className="px-5 mt-3 py-3 h-fit flex bg-stone-900 hover:bg-indigo-500 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
            >
              <FaDiscord
                size={23}
                className="group-hover:animate-wiggle mr-2"
              />
              <p>
                Join the <b>Discord</b>
              </p>
            </Button>
          </div>
        </div>

        <div className="mx-auto opacity-0 animate-fade-in-third bg-red-500 w-[800px] border mt-5 p-4 rounded-md border-red-400 flex gap-2 text-red-200">
          <div className="p-2 rounded-md bg-red-500">
            <FaGavel size={40} className="animate-gavel" />
          </div>
          <h1 className="text-lg font-bold mt-1">
            Ensure you are <b className="underline">fully familiar</b> with the
            rules before participating in the game or community. Appropriate
            punishments will be issued for rule violations.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
