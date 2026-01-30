"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { FaCaretRight, FaExclamationTriangle, FaTag } from "react-icons/fa";
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
      sorted.filter((item) => item[1].Name.toLowerCase().includes(searchTerm))
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
      className={`flex flex-col gap-3 md:min-w-[1100px] shadow-lg px-2 overflow-x-hidden md:pl-4 md:py-4 py-2 md:pr-2 rounded-lg max-w-screen md:w-full animate-fade-in-sixth opacity-0`}
      style={{ backgroundColor: userInfo.theme?.bgSecondary || "#292524" }}
    >
      <div className="flex gap-2 md:gap-4">
        <div
          className={`p-2 rounded-md h-fit`}
          style={{ backgroundColor: userInfo.theme?.bgTertiary || "#1c1917" }}
        >
          <FaBoxArchive
            size={35}
            style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
            className="hidden md:block"
          />
          <FaBoxArchive
            size={22}
            style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
            className="md:hidden"
          />
        </div>
        <h1
          className={`text-xl ml-1 md:ml-0 md:text-4xl mr-2 md:mr-0 font-bold mt-1`}
          style={{ color: userInfo.theme?.textPrimary || "#a1a1a1" }}
        >
          Inventory
        </h1>

        <input
          type="text"
          name="item-search"
          className={`md:ml-6 rounded-md p-1 md:p-2 my-auto h-fit px-3 w-[140px] md:w-[250px]`}
          style={{
            backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
            color: userInfo.theme?.textMuted || "#d4d4d8",
          }}
          placeholder="Filter Items..."
          onChange={handleSearch}
          autoComplete="off"
          autoCorrect="off"
        />

        <div
          className={`my-auto p-1 px-2 h-fit text-sm rounded-sm font-mono opacity-70`}
          style={{ 
            backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
            color: userInfo.theme?.textMuted || "#a1a1a1"
          }}
        >
          {filteredItems.length}{" "}
          <span className="hidden md:inline"> items</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="grid overflow-x-hidden grid-cols-2 md:grid-cols-4 mx-auto gap-2 md:gap-4 scroll-auto overflow-y-scroll w-full h-full pr-2 max-h-[330px] max-w-[1300px]"
      >
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
                backgroundImage: `url(/items/${normalizeName(
                  item.SubType,
                  item.Name
                )}.png)`,
                backgroundColor: userInfo.theme?.bgTertiary || "#1c1917",
              }}
              onClick={() =>
                (!(
                  item.Name.includes("Case") ||
                  item.Name.includes("Package") ||
                  item.Name.includes("Crate") ||
                  item.Name.includes("Present")
                ) ||
                  item.Name.includes("Hardened")) &&
                onItemClick(item)
              }
              className={`hover:cursor-pointer hover:shadow-lg group animate-fade-in overflow-hidden bg-top bg-no-repeat rounded-lg flex flex-col w-[172px] md:w-[250px] h-[85px] md:h-[110px] bg-size-[105%] shadow`}
            >
              <h2
                className={`text-sm md:text-lg font-bold p-2 md:p-3 text-stone-100 text-shadow-md`}
              >
                {item.Name.includes("Kill Counter")
                  ? item.Name.replace("| Kill Counter", "").replaceAll("_", " ")
                  : item.Name.replaceAll("_", " ")}
              </h2>

              <div
                className={`px-2 select-none py-1 mt-auto`}
                style={{ backgroundColor: userInfo.theme?.bgTertiary || "#1c1917" }}
              >
                <div className="group-hover:hidden h-full flex items-center gap-1">
                  <span
                    className={`text-xs md:text-sm`}
                    style={{ color: userInfo.theme?.textPrimary || "#a1a1a1" }}
                  >
                    {item.Base ? item.Base.replaceAll("_", " ") : ""}
                  </span>
                  <span
                    className={`text-[10px] md:text-xs ml-2`}
                    style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
                  >
                    {ITEM_RARITY[item.Rarity] || "unknown"}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {(item.SubType
                      ? item.Name !== item.SubType
                      : item.Name !== item.Base) &&
                      !item.Name.includes("| Kill Counter") && (
                        <div
                          className={`ml-auto p-1 flex items-center gap-1 text-xs rounded-md`}
                          style={{ backgroundColor: userInfo.theme?.bgSecondary || "#292524" }}
                        >
                          <FaTag
                            size={10}
                            style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
                          />
                        </div>
                      )}
                    {item.StatTrak && (
                      <div
                        className={`ml-auto md:p-[2px] px-1 flex items-center gap-1 text-xs rounded-md`}
                        style={{ backgroundColor: userInfo.theme?.bgSecondary || "#292524" }}
                      >
                        <FaExclamationTriangle
                          size={10}
                          style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
                        />
                        <span
                          style={{ color: userInfo.theme?.textSecondary || "#78716c" }}
                        >
                          KC
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="group-hover:flex hidden gap-1 items-center">
                  {!(
                    item.Name.includes("Case") ||
                    item.Name.includes("Package") ||
                    item.Name.includes("Crate") ||
                    item.Name.includes("Present")
                  ) || item.Name.includes("Hardened") ? (
                    <>
                      <FaCaretRight
                        size={20}
                        style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
                      />
                      <span
                        className={`text-sm lowercase tracking-wider animate-pulse`}
                        style={{ color: userInfo.theme?.textMuted || "#d4d4d8" }}
                      >
                        view details
                      </span>
                    </>
                  ) : (
                    <>
                      <FaCaretRight
                        size={20}
                        style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
                      />
                      <span
                        className={`text-sm lowercase tracking-wider animate-pulse`}
                        style={{ color: userInfo.theme?.textMuted || "#d4d4d8" }}
                      >
                        cant view details of cases
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : isFirstLoad ? (
          <div
            className={`flex flex-col items-center justify-center col-span-4 row-span-3 w-full h-full rounded-lg p-3`}
            style={{ backgroundColor: userInfo.theme?.bgTertiary || "#1c1917" }}
          >
            <FaExclamationTriangle
              size={35}
              style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
            />
            <h2
              className={`text-xl font-bold animate-pulse text-shadow`}
              style={{ color: userInfo.theme?.textMuted || "#a1a1a1" }}
            >
              Loading player inventory...
            </h2>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center col-span-4 row-span-3 w-full h-full rounded-lg p-3`}
            style={{ backgroundColor: userInfo.theme?.bgTertiary || "#1c1917" }}
          >
            <FaExclamationTriangle
              size={35}
              style={{ fill: userInfo.theme?.iconColor || "#78716c" }}
            />
            <h2
              className={`text-xl font-bold text-shadow`}
              style={{ color: userInfo.theme?.textMuted || "#a1a1a1" }}
            >
              No items matching search.
            </h2>
          </div>
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
