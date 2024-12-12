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
    <Tooltip text="Copy UUID" position="bottom">
      <button
        className="p-1 rounded-md hover:bg-black/10 w-fit"
        onClick={copyUsername}
      >
        {copied ? (
          <span className="flex gap-1 items-center text-green-600/70">
            <FaCheck />
            Copied UUID
          </span>
        ) : (
          <span className="flex gap-1 items-center text-gray-500">
            <FaCopy />
            Copy
          </span>
        )}
      </button>
    </Tooltip>
  );
};

export default CopyButton;
