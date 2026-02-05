"use client";

import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaDiscord, FaGamepad, FaGavel } from "react-icons/fa";

const Page = () => {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center md:justify-center pb-48 pt-2 px-4 sm:px-6 md:px-8">

      <div className="flex flex-row gap-2 my-4 w-full max-w-5xl justify-start">
        <Tooltip text="Back to Home" position="bottom">
          <Button
            onClick={() => router.push("/")}
            className="px-5 py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors h-full rounded-lg text-stone-200/50 group"
          >
            <FaArrowLeft
              size={35}
              className="group-hover:animate-bounce-left"
            />
          </Button>
        </Tooltip>

        <div className="flex items-center text-3xl sm:text-4xl p-4 gap-4 bg-stone-800 rounded-md">
          <div className="rounded-md bg-stone-900 p-3">
            <FaGavel size={35} className="fill-stone-600" />
          </div>
          <h1 className="text-stone-400 font-bold">Rules</h1>
        </div>
      </div>


      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 items-start justify-start">
 
        <div className="bg-stone-800 rounded-md opacity-0 animate-fade-in-first p-4 text-stone-200 flex-1">
          <div className="flex gap-2 items-center">
            <div className="p-2 rounded-md bg-stone-900">
              <FaGamepad size={30} className="fill-stone-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-400 mt-1">
              Game rules
            </h1>
          </div>
          <ul className="text-lg mt-3 list-disc pl-5">
            <li className="text-stone-200 mb-2">No cheating or exploiting.</li>
            <li className="text-stone-200 mb-2">
              No selling/cross-trading skins, cases, or other in-game items.
            </li>
            <li className="text-red-400 underline mb-2">
              No Alt Farming - Alt accounts for farming cases is not allowed!
            </li>
            <li className="text-stone-200 mb-2">
              We <b>do not</b> reimburse for scams. Make smart trades!
            </li>
          </ul>
        </div>

 
        <div className="bg-stone-800 rounded-md p-4 opacity-0 animate-fade-in-second text-stone-200 w-full md:max-w-xs">
          <div className="flex gap-2 items-center">
            <div className="p-2 rounded-md bg-stone-900">
              <FaDiscord size={20} className="fill-stone-600" />
            </div>
            <h1 className="text-xl font-bold text-stone-400 mt-1">
              Discord rules
            </h1>
          </div>
          <div className="mt-3 text-sm gap-2">
            The server rules can be found in the{" "}
            <span className="bg-stone-900 p-1 rounded-md">#rules</span> channel.
            <p className="mt-3 italic opacity-80">
              You can join the server by clicking the button below.
            </p>
          </div>

          <Button
            onClick={() =>
              window.open("http://discord.com/invite/k4jnnsSt29", "_blank")
            }
            className="px-5 mt-3 py-3 flex bg-stone-900 hover:bg-indigo-500 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
          >
            <FaDiscord size={23} className="group-hover:animate-wiggle mr-2" />
            <p>
              Join the <b>Discord</b>
            </p>
          </Button>
        </div>
      </div>


      <div className="w-full max-w-4xl mx-auto opacity-0 animate-fade-in-third bg-red-500 border mt-5 p-4 rounded-md border-red-400 flex flex-col sm:flex-row gap-4 text-red-200">
        <div className="p-2 rounded-md bg-red-500">
          <FaGavel size={40} className="animate-gavel" />
        </div>
        <h1 className="text-base sm:text-lg font-bold">
          Ensure you are <b className="underline">fully familiar</b> with the
          rules before participating in the game or community. Appropriate
          punishments will be issued for rule violations.
        </h1>
      </div>
    </div>
  );
};

export default Page;
