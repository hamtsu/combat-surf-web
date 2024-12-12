"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";

type UserButtonProps = {
  uuid: string;
};

const SKIN_REQUEST_URL = "https://skins.mcstats.com/face/<uuid>";

const UserButton: FC<UserButtonProps> = ({ uuid }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="rounded-md overflow-hidden w-10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute z-10 w-10 h-10 flex justify-center items-center opacity-0 rounded-lg
                bg-black ${hover && "opacity-30"} transition-all duration-100`}
      >
        <FaAngleDown className="text-white" size="20px" />
      </div>
      <Image
        width={64}
        height={64}
        src={SKIN_REQUEST_URL.replace("<uuid>", uuid)}
        draggable={false}
        alt="Avatar failed to load"
      />
    </button>
  );
};

export default UserButton;
