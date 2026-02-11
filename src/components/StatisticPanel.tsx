import Image from "next/image";
import React, { FC } from "react";

type StatisticPanelProps = {
  name: string;
  value: number;
  icon: React.ReactNode;
  theme?: {
    bgSecondary?: string;
    bgTertiary?: string;
    textPrimary?: string;
    textSecondary?: string;
    digitInactive?: string;
    digitActive?: string;
  };
  buddy?: string;
};

const StatisticPanel: FC<StatisticPanelProps> = ({
  icon,
  name,
  value,
  theme,
  buddy,
}) => {
  const padded = String(value ?? "----").padStart(6, "0");
  const firstNonZero = padded.search(/[1-9]/);

  return (
    <div
      className={`h-fit shadow-lg p-2 rounded-lg relative w-fit`}
      style={{ backgroundColor: theme?.bgSecondary || "#292524" }}
    >
      {buddy && (
        <Image
          src={buddy === "default" ? "/DivinityGirl.gif" : buddy}
          alt="Frame"
          width={128 * 2.5}
          height={128 * 2.5}
          unoptimized
          style={{ imageRendering: "pixelated" }}
          className="absolute z-20 scale-200 md:scale-130 md:-translate-x-15 md:-translate-y-35 -translate-y-22 translate-x-37"
        />
      )}

      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <div
            className={`p-2 text-lg md:text-xl rounded-md h-fit`}
            style={{ backgroundColor: theme?.bgTertiary || "#1c1917" }}
          >
            {icon}
          </div>
          <h1
            className={`hidden md:block text-2xl font-bold mt-1`}
            style={{ color: theme?.textPrimary || "#a1a1a1" }}
          >
            {name}
          </h1>
          <h1
            className={`block md:hidden text-xl font-bold mt-1`}
            style={{ color: theme?.textPrimary || "#a1a1a1" }}
          >
            {name.split(" ")[1]}
          </h1>
        </div>
        <span
          className={`text-xl md:text-2xl p-1 rounded-md px-2 md:px-3 md:text-5xl font-mono font-bold flex gap-1 select-none`}
          style={{ backgroundColor: theme?.bgTertiary || "#1c1917" }}
        >
          {padded.split("").map((digit, i) => (
            <span
              key={i}
              style={{
                color:
                  firstNonZero === -1 || i < firstNonZero
                    ? theme?.digitInactive || "#78716c"
                    : theme?.digitActive || "#d4d4d8",
              }}
            >
              {digit}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default StatisticPanel;
