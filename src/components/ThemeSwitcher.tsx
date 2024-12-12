"use client";

import React from "react";
import { FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  return (
    <button className="rounded-md w-10 h-10 flex items-center overflow-hidden hover:bg-black/20">
      <FaMoon className="text-stone-800 w-full mx-auto" size="20px" />
    </button>
  );
};

export default ThemeSwitcher;
