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
};

const StatisticPanel: FC<StatisticPanelProps> = ({ icon, name, value, theme }) => {
  const padded = String(value ?? "----").padStart(6, "0");
  const firstNonZero = padded.search(/[1-9]/);

  return (
    <div className={`h-fit shadow-lg p-2 rounded-lg flex flex-col gap-3 w-fit`} style={{ backgroundColor: theme?.bgSecondary || "#292524" }}>
      <div className="flex gap-3 items-center">
        <div className={`p-2 text-lg md:text-xl rounded-md h-fit`} style={{ backgroundColor: theme?.bgTertiary || "#1c1917" }}>{icon}</div>
        <h1 className={`hidden md:block text-2xl font-bold mt-1`} style={{ color: theme?.textPrimary || "#a1a1a1" }}>{name}</h1>
        <h1 className={`block md:hidden text-xl font-bold mt-1`} style={{ color: theme?.textPrimary || "#a1a1a1" }}>
          {name.split(" ")[1]}
        </h1>
      </div>
      <span className={`text-xl md:text-2xl p-1 rounded-md px-2 md:px-3 md:text-5xl font-mono font-bold flex gap-1 select-none`} style={{ backgroundColor: theme?.bgTertiary || "#1c1917" }}>
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
  );
};

export default StatisticPanel;
