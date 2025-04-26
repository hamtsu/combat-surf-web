"use client";

import React from "react";
import Button from "./Button";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Searchbar = () => {
  return (
    <div className="flex gap-1">
      <input
        type="text"
        name="player-search"
        className="bg-stone-900 rounded-md p-2 px-3 text-stone-200 w-[250px]"
        placeholder="Enter player username or ID"
      />
      <Button className="p-3 bg-stone-900 hover:bg-neutral-800 text-stone-300">
        <FaMagnifyingGlass />
      </Button>
    </div>
  );
};

export default Searchbar;
