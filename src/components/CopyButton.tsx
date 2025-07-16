"use client";

import React, { FC, useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import Tooltip from "./Tooltip";

type CopyButtonProps = {
  text: string;
};

const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyUsername = () => {
    navigator.clipboard.writeText(text);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Tooltip text="Copy ID" position="top">
      <button
        className="p-1 px-2 rounded-md hover:bg-black/10 w-fit text-base"
        onClick={copyUsername}
      >
        {copied ? (
          <span className="flex gap-1 items-center text-green-500/90">
            <FaCheck size={15}  />
            Copied ID
          </span>
        ) : (
          <span className="flex gap-1 items-center text-stone-400 mr-4">
            <FaCopy size={15} />
            Copy ID
          </span>
        )}
      </button>
    </Tooltip>
  );
};

export default CopyButton;
