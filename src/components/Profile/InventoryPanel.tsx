"use client";
import React, { FC, useState } from "react";
import { FaCaretRight, FaExclamationTriangle, FaInfoCircle, FaTag } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

type InventoryPanelProps = {
  inventory: {
    inventory: {
      [key: string]: {
        Name: string;
        SubType?: string;
        Base: string;
        Rarity: number;
      };
    };
  };
  onItemClick: (item: any) => void;
};

const InventoryPanel: FC<InventoryPanelProps> = ({
  inventory,
  onItemClick,
}) => {
  const sortedItems = Object.entries(inventory.inventory).sort(
    (a, b) => b[1].Rarity - a[1].Rarity
  );

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [filteredItems, setFilteredItems] = useState<any[]>(sortedItems);

  const ITEM_RARITY: Record<number, string> = {
    100: "Divine",
    55: "Divine", // not sure
    54: "Divine", // not sure
    53: "Divine", // not sure
    52: "Divine", // not sure
    51: "Divine", // not sure
    50: "Unreal",
    12: "Ultra Rare Collectable",
    10: "Mythic",
    9: "Godly",
    8: "N/A (Case)",
    6: "Gold",
    5: "Legendary",
    4: "Epic",
    3: "Rare",
    2: "Uncommon",
    1: "Common",
    0: "Default",
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFirstLoad(false);

    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.length === 0) {
      setFilteredItems(sortedItems);
      return;
    }

    setFilteredItems(
      sortedItems.filter((item) =>
        item[1].Name.toLowerCase().includes(searchTerm)
      )
    );
  };

  return (
    <div className="flex flex-col gap-3 bg-stone-800 shadow-lg pl-4 py-4 pr-2 rounded-lg w-full animate-fade-in-sixth opacity-0">
      <div className="flex gap-4">
        <div className="p-2 bg-stone-900 rounded-md h-fit">
          <FaBoxArchive size={35} className="fill-stone-600" />
        </div>
        <h1 className="text-4xl font-bold text-stone-400 mt-1">Inventory</h1>

        <input
          type="text"
          name="item-search"
          className="bg-stone-900 ml-6 rounded-md p-2 my-auto h-fit px-3 text-stone-200 w-[250px]"
          placeholder="Filter Items..."
          onChange={handleSearch}
          autoComplete="off"
          autoCorrect="off"
        />

        <div className="bg-stone-900 my-auto p-1 px-2 h-fit text-sm rounded-sm font-mono text-stone-300 opacity-70">
          {filteredItems.length} items
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 scroll-auto overflow-y-scroll w-fit pr-2 max-h-[330px] max-w-[1300px]">
        {inventory && filteredItems.length > 0 ? (
          filteredItems.map(([id, item], index) => (
            <div
              key={id}
              style={
                isFirstLoad && index < 52
                  ? {
                      animationDelay: `${index * 0.1 + 3}s`,
                      opacity: 0,
                      backgroundImage: `url(/items/${
                        item.SubType ?? item.Name
                      }.png)`,
                    }
                  : {
                      backgroundImage: `url(/items/${
                        item.SubType ?? item.Name
                      }.png)`,
                    }
              }
              onClick={() =>
                !item.Name.includes("Case") &&
                !item.Name.includes("Package") &&
                !item.Name.includes("Crate") &&
                !item.Name.includes("Present") &&
                onItemClick(item)
              }
              className={`hover:cursor-pointer hover:shadow-2xl group animate-fade-in overflow-hidden bg-stone-900 bg-top bg-no-repeat bg-cover rounded-lg flex flex-col w-[250px] h-[110px] shadow`}
            >
              <h2 className="text-lg font-bold p-3 text-stone-300 text-shadow-md">
                {item.Name.includes("Kill Counter")
                  ? item.Name.replace("| Kill Counter", "").replaceAll("_", " ")
                  : item.Name.replaceAll("_", " ")}
              </h2>

              <div className="px-2 bg-stone-900 select-none py-1 mt-auto">
                <div className="group-hover:hidden h-full flex items-center gap-1">
                  <span className="text-stone-400 text-sm">
                    {item.Base ? item.Base.replaceAll("_", " ") : ""}
                  </span>
                  <span className="text-stone-500 text-xs ml-2">
                    {ITEM_RARITY[item.Rarity] || "unknown"}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {(item.SubType
                      ? item.Name !== item.SubType
                      : item.Name !== item.Base) &&
                      !item.Name.includes("| Kill Counter") && (
                        <div className="bg-stone-800 ml-auto p-1 flex items-center gap-1 text-xs rounded-md">
                          <FaTag size={10} className="fill-stone-500" />
                        </div>
                      )}
                    {item.StatTrak && (
                      <div className="bg-stone-800 ml-auto p-[2px] px-1 flex items-center gap-1 text-xs rounded-md ">
                        <FaExclamationTriangle
                          size={10}
                          className="fill-stone-500"
                        />
                        <span className="text-stone-500">KC</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="group-hover:flex hidden gap-1 items-center">
                  {!item.Name.includes("Case") &&
                  !item.Name.includes("Package") &&
                  !item.Name.includes("Crate") &&
                  !item.Name.includes("Present") ? (
                    <>
                      <FaCaretRight size={20} className="fill-stone-500" />
                      <span className="text-stone-200 text-sm lowercase tracking-wider animate-pulse">
                        view details
                      </span>
                    </>
                  ) : (
                    <>
                      <FaCaretRight size={20} className="fill-stone-500" />
                      <span className="text-stone-200 text-sm lowercase tracking-wider animate-pulse">
                        cant view details of cases
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-full bg-stone-900 rounded-lg p-3 shadow-2xl">
            <FaExclamationTriangle size={35} className="fill-stone-600" />
            <h2 className="text-xl font-bold text-stone-300 text-shadow ">
              No items found!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPanel;
