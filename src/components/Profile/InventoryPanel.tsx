"use client";
import React, { FC, useState } from "react";
import {
  FaCaretRight,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTag,
} from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

type InventoryPanelProps = {
  userInfo: any;
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
  userInfo,
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
    <div
      className={`flex flex-col gap-3 ${userInfo.theme?.bgSecondary || "bg-stone-800"
        } shadow-lg pl-2 overflow-x-hidden md:pl-4 md:py-4 py-2 md:pr-2 rounded-lg max-w-screen md:w-full animate-fade-in-sixth opacity-0`}
    >
      <div className="flex gap-2 md:gap-4">
        <div
          className={`p-2 ${userInfo.theme?.bgTertiary || "bg-stone-900"
            } rounded-md h-fit`}
        >
          <FaBoxArchive
            size={35}
            className={`${userInfo.theme?.iconColor || "fill-stone-600"} hidden md:block`}
          />
          <FaBoxArchive
            size={22}
            className={`${userInfo.theme?.iconColor || "fill-stone-600"} md:hidden`}
          />
        </div>
        <h1
          className={`text-xl ml-1 md:ml-0 md:text-4xl mr-2 md:mr-0 font-bold ${userInfo.theme?.textPrimary || "text-stone-400"
            } mt-1`}
        >
          Inventory
        </h1>

        <input
          type="text"
          name="item-search"
          className={`${userInfo.theme?.bgTertiary || "bg-stone-900"
            } md:ml-6 rounded-md p-1 md:p-2 my-auto h-fit px-3 ${userInfo.theme?.textMuted || "text-stone-200"
            } w-[140px] md:w-[250px]`}
          placeholder="Filter Items..."
          onChange={handleSearch}
          autoComplete="off"
          autoCorrect="off"
        />

        <div
          className={`${userInfo.theme?.bgTertiary || "bg-stone-900"
            } my-auto p-1 px-2 h-fit text-sm rounded-sm font-mono ${userInfo.theme?.textMuted || "text-stone-300"
            } opacity-70`}>
          {filteredItems.length} <span className="hidden md:inline"> items</span>
        </div>
      </div>
      <div className="grid overflow-x-hidden grid-cols-2 md:grid-cols-4 mx-auto gap-2 md:gap-4 scroll-auto overflow-y-scroll w-fit pr-2 max-h-[330px] max-w-[1300px]">
        {inventory && filteredItems.length > 0 ? (
          filteredItems.map(([id, item], index) => (
            <div
              key={id}
              style={{
                ...(isFirstLoad && index < 52
                  ? {
                    animationDelay: `${index * 0.1 + 3}s`,
                    opacity: 0,
                  }
                  : {}),
                backgroundImage: `url(/items/${item.SubType ?? item.Name}.png)`,
              }}
              onClick={() =>
                !item.Name.includes("Case") &&
                !item.Name.includes("Package") &&
                !item.Name.includes("Crate") &&
                !item.Name.includes("Present") &&
                onItemClick(item)
              }
              className={`hover:cursor-pointer hover:shadow-lg group animate-fade-in overflow-hidden ${userInfo.theme?.bgTertiary || "bg-stone-900"
                } bg-top bg-no-repeat rounded-lg flex flex-col w-[180px] md:w-[250px] h-[85px] md:h-[110px] bg-size-[105%] shadow`}
            >
              <h2
                className={`text-base md:text-lg font-bold p-3 text-stone-100 text-shadow-md`}
              >
                {item.Name.includes("Kill Counter")
                  ? item.Name.replace("| Kill Counter", "").replaceAll("_", " ")
                  : item.Name.replaceAll("_", " ")}
              </h2>

              <div
                className={`${userInfo.theme?.bgTertiary || "bg-stone-900"
                  } px-2 select-none py-1 mt-auto`}
              >
                <div className="group-hover:hidden h-full flex items-center gap-1">
                  <span
                    className={`${userInfo.theme?.textPrimary || "text-stone-400"
                      } text-xs md:text-sm`}
                  >
                    {item.Base ? item.Base.replaceAll("_", " ") : ""}
                  </span>
                  <span
                    className={`${userInfo.theme?.textSecondary || "text-stone-500"
                      } text-[10px] md:text-xs ml-2`}
                  >
                    {ITEM_RARITY[item.Rarity] || "unknown"}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {(item.SubType
                      ? item.Name !== item.SubType
                      : item.Name !== item.Base) &&
                      !item.Name.includes("| Kill Counter") && (
                        <div
                          className={`${userInfo.theme?.bgSecondary || "bg-stone-800"
                            } ml-auto p-1 flex items-center gap-1 text-xs rounded-md`}
                        >
                          <FaTag
                            size={10}
                            className={`${userInfo.theme?.iconColor || "fill-stone-500"
                              }`}
                          />
                        </div>
                      )}
                    {item.StatTrak && (
                      <div
                        className={`${userInfo.theme?.bgSecondary || "bg-stone-800"
                          } ml-auto md:p-[2px] px-1 flex items-center gap-1 text-xs rounded-md`}
                      >
                        <FaExclamationTriangle
                          size={10}
                          className={`${userInfo.theme?.iconColor || "fill-stone-500"
                            }`}
                        />
                        <span
                          className={`${userInfo.theme?.textSecondary || "text-stone-500"
                            }`}
                        >
                          KC
                        </span>
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
                      <FaCaretRight
                        size={20}
                        className={`${userInfo.theme?.iconColor || "fill-stone-500"
                          }`}
                      />
                      <span
                        className={`${userInfo.theme?.textMuted || "text-stone-200"
                          } text-sm lowercase tracking-wider animate-pulse`}
                      >
                        view details
                      </span>
                    </>
                  ) : (
                    <>
                      <FaCaretRight
                        size={20}
                        className={`${userInfo.theme?.iconColor || "fill-stone-500"
                          }`}
                      />
                      <span
                        className={`${userInfo.theme?.textMuted || "text-stone-200"
                          } text-sm lowercase tracking-wider animate-pulse`}
                      >
                        cant view details of cases
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`flex flex-col items-center justify-center gap-2 w-full h-full ${userInfo.theme?.bgTertiary || "bg-stone-900"
              } rounded-lg p-3 shadow-2xl`}
          >
            <FaExclamationTriangle
              size={35}
              className={`${userInfo.theme?.iconColor || "fill-stone-600"}`}
            />
            <h2
              className={`text-xl font-bold ${userInfo.theme?.textMuted || "text-stone-300"
                } text-shadow`}
            >
              No items found!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPanel;
