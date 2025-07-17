"use client";
import { useRef } from "react";
import Button from "./Button";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { FaExclamationTriangle, FaInfoCircle, FaPaintBrush, FaStar, FaTag } from "react-icons/fa";
import Tooltip from "./Tooltip";

export default function ItemModal({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    const ITEM_RARITY = {
    100: "divine",
    55: "divine", // not sure
    54: "divine", // not sure
    53: "divine", // not sure
    52: "divine", // not sure
    51: "divine", // not sure
    50: "unreal",
    12: "ultra rare collectable",
    10: "mythic",
    9: "godly",
    8: "N/A (Case)",
    6: "gold",
    5: "legendary",
    4: "epic",
    3: "rare",
    2: "uncommon",
    1: "common",
    0: "default",
  };

  return (
    <div
      className="fixed opacity-0 animate-fade-in-fast top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-stone-800 border border-stone-800 overflow-hidden rounded-md shadow-2xl w-fit text-stone-200 relative"
      >
        <div className="bg-stone-900 p-1 flex w-full shadow-md">
          <h1 className="text-lg font-bold text-stone-200 ml-2">
            {item.Name.replaceAll("_", " ")}
          </h1>
          <Button
            onClick={onClose}
            className="ml-auto p-1 hover:bg-red-500 hover:border-red-400 border border-transparent "
          >
            <FaXmark size={18} />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex gap-4">
            <div
              style={{
                backgroundImage: `url(/items/${item.SubType ?? item.Name}.png)`,
              }}
              className="min-w-[370px] h-[160px] bg-cover bg-center flex gap-1 items-end justify-end rounded-md p-2"
            >
              {(item.SubType
                ? item.Name !== item.SubType
                : item.Name !== item.Base) &&
                !item.Name.includes("| Kill Counter") && (
                  <Tooltip
                    text="A nametag has been applied to this item"
                    position="bottom"
                  >
                    <div className="bg-stone-800 ml-auto p-2 flex items-center gap-1 text-xs rounded-md">
                      <FaTag size={16} className="fill-stone-500" />
                    </div>
                  </Tooltip>
                )}
              {item.StatTrak && (
                <Tooltip text="This item has a kill counter" position="bottom">
                  <div className="bg-stone-800 ml-auto p-2 flex items-center gap-1 rounded-md ">
                    <FaExclamationTriangle
                      size={16}
                      className="fill-stone-500"
                    />
                  </div>
                </Tooltip>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-2 bg-stone-900 w-full h-fit rounded-md flex gap-2 items-center">
                <FaStar size={16} className="fill-stone-400 " />
                <span className="text-stone-400 font-bold">Rarity</span>
                <span className="text-lg text-stone-300 font-bold font-mono px-2 bg-stone-800 rounded-md h-fit ml-auto">
                  {ITEM_RARITY[item.Rarity]}
                </span>
              </div>
              <div className="p-2 bg-stone-900 w-full h-fit rounded-md flex gap-2 items-center">
                <FaPaintBrush size={16} className="fill-stone-400 " />
                <span className="text-stone-400 font-bold">Pattern</span>
                <span className="text-lg text-stone-300 font-bold font-mono px-2 bg-stone-800 rounded-md h-fit ml-auto">
                  {item.Pattern}
                </span>
              </div>
              <div className="p-2 bg-stone-900 w-full h-fit rounded-md flex gap-2 items-center">
                <FaInfoCircle size={16} className="fill-stone-400 " />
                <span className="text-stone-400 font-bold">Float</span>
                <span className="text-lg text-stone-300 font-bold font-mono px-2 bg-stone-800 rounded-md h-fit ml-auto">
                  {item.Float.toFixed(6)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-2 px-3 mt-3 bg-stone-900 w-full h-fit rounded-md">{item.StatTrak ? (<>A total of <b>{item.Kills}</b> kills have been collected with this weapon!</>) : (<i>Kills cannot be counted on a <b>non-kill counter</b> weapon.</i>)}</div>
        </div>
      </div>
    </div>
  );
}
