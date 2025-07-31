"use client";

import React, { FC } from "react";

type NumberDisplayProps = {
  number: number;
  theme?: {
    digitActive?: string;
    digitInactive?: string;
  };
};

const NumberDisplay: FC<NumberDisplayProps> = ({ number, theme }) => {
  const killCount = String(number ?? "----").padStart(3, "0");
  const firstNonZero = killCount.search(/[1-9]/);
  const digits = killCount.split("");

  return (
    <>
      {digits.map((digit, i) => (
        <p
          key={i}
          className={
            firstNonZero === -1 || i < firstNonZero
              ? theme?.digitInactive || "text-stone-600"
              : theme?.digitActive || "text-stone-200"
          }
        >
          {digit}
        </p>
      ))}
    </>
  );
};

export default NumberDisplay;