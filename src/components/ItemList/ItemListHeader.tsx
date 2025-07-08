"use client"

import { FaArrowLeft, FaBox } from "react-icons/fa"
import Button from "../Button"
import Tooltip from "../Tooltip"
import { useRouter } from "next/navigation";
import AWPIcon from "../Icons/AWP";
import { GiAk47, GiDesertEagle, GiPunch } from "react-icons/gi";
import { FaGun } from "react-icons/fa6";

const ItemsListHeader = () => {
  const router = useRouter();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <div className="z-2 shadow-lg absolute flex gap-2 left-5 top-5">
        <Tooltip text="Go back" position="bottom">
          <Button
            onClick={() => router.back()}
            className="px-5 h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <FaArrowLeft
              size={35}
              className="group-hover:animate-bounce-right"
            />
          </Button>
        </Tooltip>

        <div className="flex gap-4 bg-stone-800 rounded-md">
          <div className="flex items-center justify-between text-2xl p-4 gap-4 bg-stone-800 rounded-md">
            <div className="rounded-md bg-stone-900 p-3">
              <FaBox size={25} className="fill-stone-600 " />
            </div>
            <h1 className="text-stone-400 font-bold">
              <b>Item List</b>
            </h1>
          </div>
        </div>
      </div>

      <div className="z-2 absolute flex  items-center gap-2 right-10 top-5">
        <Tooltip text="AWPs" position="bottom">
          <Button
            onClick={() => handleScroll("awps-list")}
            className="px-5 shadow-xl  h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <AWPIcon color="#57534e" />
          </Button>
        </Tooltip>

        <Tooltip text="Melee" position="bottom">
          <Button
            onClick={() => handleScroll("knives-list")}
            className="px-5 shadow-xl  h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <GiPunch size={50} className="fill-stone-600 " />
          </Button>
        </Tooltip>

        <Tooltip text="AK-47" position="bottom">
          <Button
            onClick={() => handleScroll("aks-list")}
            className="px-5 shadow-xl  h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <GiAk47 size={50} className="fill-stone-600 " />
          </Button>
        </Tooltip>

        <Tooltip text="Deagles" position="bottom">
          <Button
            onClick={() => handleScroll("deagles-list")}
            className="px-5 shadow-xl  h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <GiDesertEagle size={50} className="fill-stone-600 " />
          </Button>
        </Tooltip>

        <Tooltip text="Glocks" position="bottom">
          <Button
            onClick={() => handleScroll("glocks-list")}
            className="px-5 shadow-xl  h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <FaGun size={50} className="fill-stone-600 " />
          </Button>
        </Tooltip>

        <Tooltip text="Cases" position="bottom">
          <Button
            onClick={() => handleScroll("case-list")}
            className="px-5 shadow-xl  h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <FaBox size={50} className="fill-stone-600 " />
          </Button>
        </Tooltip>
      </div>
    </>)
}

export default ItemsListHeader