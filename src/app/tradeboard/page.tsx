"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { FaCaretRight, FaCheck, FaPeopleArrows } from "react-icons/fa";
import { FaArrowsLeftRight, FaTicket } from "react-icons/fa6";

const Tradeboard = () => {
  const router = useRouter();

  return (
    <div className="flex w-full h-full flex-col gap-4 p-4 md:px-48 bg-stone-900">
      <div className="w-full font-mono text-sm flex justify-center">
        <div className="select-none bg-[url(/header3.png)] md:bg-center bg-center w-full max-w-screen-xl h-fit md:h-42 rounded-2xl overflow-hidden">
          <div className="w-full text-stone-200 h-full backdrop-blur-[2px] border-4 border-white/20 rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6">
            <div>
              <h2 className="text-xl font-semibold italic opacity-70">
                Welcome to the
              </h2>
              <h1 className="text-6xl -mt-2 font-black uppercase tracking-wide opacity-80">
                Tradeboard
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <div className="bg-stone-800 text-stone-400 rounded-md p-3 flex items-center gap-3">
                <FaPeopleArrows size={30} className="fill-stone-600" />
                <h2 className="text-xl font-semibold">Currently serving</h2>
              </div>

              <div className="flex gap-2">
                <div className="bg-stone-800 flex px-3 text-stone-300 text-lg font-semibold items-center gap-2 w-fit p-2 rounded-md">
                  <h1 className="text-lg">0</h1>
                  <p className="text-stone-500">trades</p>
                </div>
                <div className="bg-stone-800 px-3 text-lg text-stone-300 font-semibold flex items-center gap-2 w-fit p-2 rounded-md">
                  <FaCheck size={20} className="fill-stone-500 inline-block " />
                  <h1 className="text-lg">0</h1>
                  <p className="text-stone-500">completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tradeboard;
