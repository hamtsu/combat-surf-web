"use client";

import React, { FC, useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import Tooltip from "./Tooltip";

type CopyButtonProps = {
  text: string;
  inverted?: boolean;
  textBanner?: any;
};

const CopyButton: FC<CopyButtonProps> = ({ text, inverted, textBanner }) => {
  const [copied, setCopied] = useState(false);

  const copyUsername = () => {
    navigator.clipboard.writeText(text);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Tooltip text="Copy ID" position="top">
      <button
        className="p-1 px-2 hidden md:block hover:cursor-pointer opacity-70 rounded-md hover:bg-black/10 w-fit text-base"
        onClick={copyUsername}
        style={{
          color: textBanner || (inverted ? "#1c1917" : "#e7e5e4"),
        }}
      >
        {copied ? (
          <span className="flex gap-1 text-sm md:text-base text-nowrap items-center text-green-500/90">
            <FaCheck size={15} />
            Copied ID
          </span>
        ) : (
          <span
            className={`flex gap-1 text-sm md:text-base text-nowrap items-center text-shadow-lg font-bold 
            } md:mr-4`}
          >
            <FaCopy size={15} />
            Copy ID
          </span>
        )}
      </button>
    </Tooltip>
  );
};

export default CopyButton;
