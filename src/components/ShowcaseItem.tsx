import { FaTag, FaCaretRight, FaStar } from "react-icons/fa";

interface ShowcaseItemContentProps {
  item: any;
  theme?: any;
}

export default function ShowcaseItemContent({ item, theme }: ShowcaseItemContentProps) {
  return (
    <>
      <h1 className="font-bold text-stone-200 text-sm md:text-lg p-2">
        {item.CustomName || item.Name}
      </h1>

      <div
        className={`px-2 select-none py-1 mt-auto`}
        style={{ backgroundColor: theme?.bgTertiary.length > 6 ? theme?.bgTertiary.slice(0, -2) : theme?.bgTertiary || "#1c1917"  }}
      >
        <div className="group-hover:hidden h-full flex items-center gap-1">
          <span
            className={`text-xs md:text-sm`}
            style={{ color: theme?.textPrimary || "#a1a1a1" }}
          >
            {item.Base ? item.Base.replaceAll("_", " ") : ""}
          </span>
          <div className="flex gap-1 ml-auto">
            {(item.SubType
              ? item.Name !== item.SubType
              : item.Name !== item.Base) &&
              !item.Name.includes("| Kill Counter") && (
                <div
                  className={`ml-auto p-1 flex items-center gap-1 text-xs rounded-md`}
                  style={{ backgroundColor: theme?.bgSecondary || "#292524" }}
                >
                  <FaTag
                    size={10}
                    style={{ fill: theme?.iconColor || "#78716c" }}
                  />
                </div>
              )}
            {item.StatTrak && (
              <div
                className={`ml-auto md:p-[2px] px-1 flex items-center gap-1 text-xs rounded-md`}
                style={{ backgroundColor: theme?.bgSecondary || "#292524" }}
              >
                <FaStar
                  size={10}
                  style={{ fill: theme?.iconColor || "#78716c" }}
                />
                <span
                  style={{ color: theme?.textSecondary || "#78716c" }}
                >
                  KC
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="group-hover:flex hidden gap-1 items-center">
          <>
            <FaCaretRight
              size={20}
              style={{ fill: theme?.iconColor || "#78716c" }}
            />
            <span
              className={`text-sm lowercase tracking-wider animate-pulse`}
              style={{ color: theme?.textMuted || "#d4d4d8" }}
            >
              view details
            </span>
          </>
        </div>
      </div>
    </>
  );
}