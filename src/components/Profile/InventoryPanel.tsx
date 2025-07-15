import React, { FC } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

type InventoryPanelProps = {
  inventory:
    | [
        {
          id: number;
          name: string;
          type: string;
          skin: string;
          rarity: string;
          value: number;
          imageUrl: string;
        }
      ]
    | [];
};

const InventoryPanel: FC<InventoryPanelProps> = ({ inventory }) => {
  const sortedItems = Object.entries(inventory.inventory).sort(
    (a, b) => b[1].Rarity - a[1].Rarity
  );
  
  return (
    <div className="flex flex-col gap-3 bg-stone-800 pl-4 py-4 pr-2 rounded-lg w-full animate-fade-in-sixth opacity-0">
      <div className="flex gap-4">
        <div className="p-2 bg-stone-900 rounded-md h-fit">
          <FaBoxArchive size={35} className="fill-stone-600" />
        </div>
        <h1 className="text-4xl font-bold text-stone-400 mt-1">
          Player Inventory
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-4 scroll-auto overflow-y-scroll w-fit pr-2 max-h-[330px]">
        {inventory ? (
          sortedItems.map(([id, item]) => (
            <div
              key={id}
              style={{ backgroundImage: `url(/items/${item.SubType ?? item.Name}.png)` }}
              className={`bg-stone-900 bg-top bg-no-repeat bg-cover p-3 rounded-lg flex flex-col w-full h-[92px] shadow-2xl`}
            >
              <h2 className="text-lg font-bold text-stone-300 text-shadow">
                {item.Name.replaceAll("_", " ")}
              </h2>
              <p className="font-normal text-stone-400 text-shadow">
                {item.Base}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-[100px] bg-stone-900 rounded-lg p-3 shadow-2xl">
            <FaExclamationTriangle size={35} className="fill-stone-600" />
            <h2 className="text-xl font-bold text-stone-300 text-shadow">
              Failed to load inventory!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPanel;
