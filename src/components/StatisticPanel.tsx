import React, { FC } from "react";

type StatisticPanelProps = {
  name: string;
  value: number;
  icon: React.ReactNode;
};

const StatisticPanel: FC<StatisticPanelProps> = ({ icon, name, value }) => {
  const padded = String(value ?? "----").padStart(6, "0");
  const firstNonZero = padded.search(/[1-9]/);

  return (
    <div className="h-fit bg-stone-800 shadow-lg p-2 rounded-lg flex flex-col gap-3 w-full md:w-fit">
      <div className="flex gap-3 items-center">
        <div className="p-2 text-lg md:text-xl bg-stone-900 rounded-md h-fit">{icon}</div>
        <h1 className="hidden md:block text-2xl font-bold text-stone-400 mt-1">{name}</h1>

        <h1 className="block md:hidden text-xl font-bold text-stone-400 mt-1">{name.split(" ")[1]}</h1>
      </div>
      <span className="text-2xl bg-stone-900 p-1 rounded-md px-3 md:text-5xl font-mono font-bold flex gap-1 select-none ">
        {padded.split("").map((digit, i) => (
          <span
            key={i}
            className={
              firstNonZero === -1 || i < firstNonZero
                ? "text-stone-600"
                : "text-stone-200"
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
