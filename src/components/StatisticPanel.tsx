import React, { FC } from "react";

type StatisticPanelProps = {
  name: string;
  value: number;
  icon: React.ReactNode;
};

const StatisticPanel: FC<StatisticPanelProps> = ({ icon, name, value }) => {
  const padded = String(value ?? "----").padStart(5, "0");
  const firstNonZero = padded.search(/[1-9]/);

  return (
    <div className="h-fit bg-stone-800 p-4 rounded-lg flex flex-col gap-3 w-fit">
      <div className="flex gap-3">
        <div className="p-2 text-3xl bg-stone-900 rounded-md h-fit">{icon}</div>
        <h1 className="text-4xl font-bold text-stone-400 mt-1">{name}</h1>
      </div>
      <span className="text-8xl font-mono font-bold flex gap-1 select-none pr-12">
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
