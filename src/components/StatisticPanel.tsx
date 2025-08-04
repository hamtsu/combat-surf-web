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
    <div className={`h-fit ${theme?.bgSecondary || "bg-stone-800"} shadow-lg p-2 rounded-lg flex flex-col gap-3 w-fit`}>
      <div className="flex gap-3 items-center">
        <div className={`p-2 text-lg md:text-xl ${theme?.bgTertiary || "bg-stone-900"} rounded-md h-fit`}>{icon}</div>
        <h1 className={`hidden md:block text-2xl font-bold ${theme?.textPrimary || "text-stone-400"} mt-1`}>{name}</h1>
        <h1 className={`block md:hidden text-xl font-bold ${theme?.textPrimary || "text-stone-400"} mt-1`}>
          {name.split(" ")[1]}
        </h1>
      </div>
      <span className={`text-xl md:text-2xl ${theme?.bgTertiary || "bg-stone-900"} p-1 rounded-md px-2 md:px-3 md:text-5xl font-mono font-bold flex gap-1 select-none`}>
        {padded.split("").map((digit, i) => (
          <span
            key={i}
            className={
              firstNonZero === -1 || i < firstNonZero
                ? theme?.digitInactive || "text-stone-600"
                : theme?.digitActive || "text-stone-200"
            }
          >
            {digit}
          </span>
        ))}
      </span>
    </div>
  );
};

export default StatisticPanel;
