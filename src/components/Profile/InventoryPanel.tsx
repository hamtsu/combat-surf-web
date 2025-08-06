"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  FaCaretRight,
  FaExclamationTriangle,
  FaTag,
} from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";

type InventoryPanelProps = {
  userId: string;
  onItemClick: (item: any) => void;
  userInfo: any;
};

const InventoryPanel: FC<InventoryPanelProps> = ({
  userId,
  onItemClick,
  userInfo,
}) => {
  const [inventory, setInventory] = useState<{
    [key: string]: {
      Name: string;
      SubType?: string;
      Base: string;
      Rarity: number;
    };
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const [visibleItems, setVisibleItems] = useState<number>(52);
  const LOAD_INCREMENT = 30;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [ref, inView] = useInView({
    root: scrollRef.current || undefined,
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    fetch(`/api/player-info?userId=${userId}&fields=inventory`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed fetching player inventory");
        return res.json();
      })
      .then((data) => {
        if (data.inventory) {
          setInventory(data.inventory);
        } else {
          setError("User not found or invalid userId");
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message || "Unknown error");
      });
  }, [userId]);

  useEffect(() => {
    const sorted = Object.entries(inventory).sort(
      (a, b) => b[1].Rarity - a[1].Rarity
    );
    setFilteredItems(sorted);
  }, [inventory]);

  useEffect(() => {
    if (inView) {
      setVisibleItems((prev) => prev + LOAD_INCREMENT);
    }
  }, [inView]);

  const ITEM_RARITY: Record<number, string> = {
    100: "Divine",
    55: "Divine",
    54: "Divine",
    53: "Divine",
    52: "Divine",
    51: "Divine",
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

    const sorted = Object.entries(inventory).sort(
      (a, b) => b[1].Rarity - a[1].Rarity
    );

    if (searchTerm.length === 0) {
      setFilteredItems(sorted);
      return;
    }

    setFilteredItems(
      sorted.filter((item) =>
        item[1].Name.toLowerCase().includes(searchTerm)
      )
    );
  };

  const normalizeName = (subType: string, name: string) => {
    const value = subType ?? name;

    if (value === "???") return "QuestionQuestionQuestion";
    if (value === "AWP_#1") return "AWP_Number1";

    return value;
  };

  return (
    <div
      className={`flex flex-col gap-3 ${userInfo.theme?.bgSecondary || "bg-stone-800"
        } md:min-w-[1100px] shadow-lg px-2 overflow-x-hidden md:pl-4 md:py-4 py-2 md:pr-2 rounded-lg max-w-screen md:w-full animate-fade-in-sixth opacity-0`}
    >
      <div className="flex gap-2 md:gap-4">
        <div className={`p-2 ${userInfo.theme?.bgTertiary || "bg-stone-900"} rounded-md h-fit`}>
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
          className={`text-xl ml-1 md:ml-0 md:text-4xl mr-2 md:mr-0 font-bold ${userInfo.theme?.textPrimary || "text-stone-400"} mt-1`}
        >
          Inventory
        </h1>

        <input
          type="text"
          name="item-search"
          className={`${userInfo.theme?.bgTertiary || "bg-stone-900"} md:ml-6 rounded-md p-1 md:p-2 my-auto h-fit px-3 ${userInfo.theme?.textMuted || "text-stone-200"} w-[140px] md:w-[250px]`}
          placeholder="Filter Items..."
          onChange={handleSearch}
          autoComplete="off"
          autoCorrect="off"
        />

        <div
          className={`${userInfo.theme?.bgTertiary || "bg-stone-900"} my-auto p-1 px-2 h-fit text-sm rounded-sm font-mono ${userInfo.theme?.textMuted || "text-stone-300"} opacity-70`}
        >
          {filteredItems.length} <span className="hidden md:inline"> items</span>
        </div>
      </div>

      <div ref={scrollRef} className="grid overflow-x-hidden grid-cols-2 md:grid-cols-4 mx-auto gap-2 md:gap-4 scroll-auto overflow-y-scroll w-full h-full pr-2 max-h-[330px] max-w-[1300px]">
        {filteredItems.length > 0 ? (
          filteredItems.slice(0, visibleItems).map(([id, item], index) => (
            <div
              key={id}
              style={{
                ...(isFirstLoad && index < 52
                  ? {
                    animationDelay: `${index * 0.1 + 1}s`,
                    opacity: 0,
                  }
                  : {}),
                backgroundImage: `url(/items/${normalizeName(item.SubType, item.Name)}.png)`,
              }}
              onClick={() =>
                !item.Name.includes("Case") &&
                !item.Name.includes("Package") &&
                !item.Name.includes("Crate") &&
                !item.Name.includes("Present") &&
                onItemClick(item)
              }
              className={`hover:cursor-pointer hover:shadow-lg group animate-fade-in overflow-hidden ${userInfo.theme?.bgTertiary || "bg-stone-900"} bg-top bg-no-repeat rounded-lg flex flex-col w-[172px] md:w-[250px] h-[85px] md:h-[110px] bg-size-[105%] shadow`}
            >
              <h2 className={`text-sm md:text-lg font-bold p-2 md:p-3 text-stone-100 text-shadow-md`}>
                {item.Name.includes("Kill Counter")
                  ? item.Name.replace("| Kill Counter", "").replaceAll("_", " ")
                  : item.Name.replaceAll("_", " ")}
              </h2>

              <div className={`${userInfo.theme?.bgTertiary || "bg-stone-900"} px-2 select-none py-1 mt-auto`}>
                <div className="group-hover:hidden h-full flex items-center gap-1">
                  <span className={`${userInfo.theme?.textPrimary || "text-stone-400"} text-xs md:text-sm`}>
                    {item.Base ? item.Base.replaceAll("_", " ") : ""}
                  </span>
                  <span className={`${userInfo.theme?.textSecondary || "text-stone-500"} text-[10px] md:text-xs ml-2`}>
                    {ITEM_RARITY[item.Rarity] || "unknown"}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {(item.SubType
                      ? item.Name !== item.SubType
                      : item.Name !== item.Base) &&
                      !item.Name.includes("| Kill Counter") && (
                        <div className={`${userInfo.theme?.bgSecondary || "bg-stone-800"} ml-auto p-1 flex items-center gap-1 text-xs rounded-md`}>
                          <FaTag size={10} className={`${userInfo.theme?.iconColor || "fill-stone-500"}`} />
                        </div>
                      )}
                    {item.StatTrak && (
                      <div className={`${userInfo.theme?.bgSecondary || "bg-stone-800"} ml-auto md:p-[2px] px-1 flex items-center gap-1 text-xs rounded-md`}>
                        <FaExclamationTriangle size={10} className={`${userInfo.theme?.iconColor || "fill-stone-500"}`} />
                        <span className={`${userInfo.theme?.textSecondary || "text-stone-500"}`}>KC</span>
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
                      <FaCaretRight size={20} className={`${userInfo.theme?.iconColor || "fill-stone-500"}`} />
                      <span className={`${userInfo.theme?.textMuted || "text-stone-200"} text-sm lowercase tracking-wider animate-pulse`}>
                        view details
                      </span>
                    </>
                  ) : (
                    <>
                      <FaCaretRight size={20} className={`${userInfo.theme?.iconColor || "fill-stone-500"}`} />
                      <span className={`${userInfo.theme?.textMuted || "text-stone-200"} text-sm lowercase tracking-wider animate-pulse`}>
                        cant view details of cases
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          isFirstLoad ? (
            <div className={`flex flex-col items-center justify-center col-span-4 row-span-3 w-full h-full ${userInfo.theme?.bgTertiary || "bg-stone-900"} rounded-lg p-3`}>
              <FaExclamationTriangle size={35} className={`${userInfo.theme?.iconColor || "fill-stone-600"}`} />
              <h2 className={`text-xl font-bold animate-pulse ${userInfo.theme?.textMuted || "text-stone-300"} text-shadow`}>
                Loading player inventory...
              </h2>
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center col-span-4 row-span-3 w-full h-full ${userInfo.theme?.bgTertiary || "bg-stone-900"} rounded-lg p-3`}>
              <FaExclamationTriangle size={35} className={`${userInfo.theme?.iconColor || "fill-stone-600"}`} />
              <h2 className={`text-xl font-bold ${userInfo.theme?.textMuted || "text-stone-300"} text-shadow`}>
                No items matching search.
              </h2>
            </div>
          )
        )}
        {/* Lazy Load Trigger */}
        {visibleItems < filteredItems.length && (
          <div ref={ref} className="h-10 w-full bg-transparent" />
        )}
      </div>
    </div>
  );
};

export default InventoryPanel;
