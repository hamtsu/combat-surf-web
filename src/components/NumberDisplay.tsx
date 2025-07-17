"use client";

import React, { FC, useState } from "react";

type NumberDisplayProps = {
  number: number;
};

const NumberDisplay: FC<NumberDisplayProps> = ({ number }) => {
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
              ? "text-stone-600"
              : "text-stone-200"
          }
        >
          {digit}
        </p>
      ))}
    </>
  )
}

export default NumberDisplay;
