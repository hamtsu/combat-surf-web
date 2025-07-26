import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Searchbar from "../Searchbar";

const PlayerLookupPanel = () => {
  return (
    <div className="h-fit opacity-0 animate-fade-in-fourth bg-stone-800 p-4 rounded-md flex flex-col gap-3 w-full md:w-fit">
      <div className="flex gap-3">
        <div className="p-2 bg-stone-900 rounded-md h-fit">
          <FaMagnifyingGlass size={20} className="fill-stone-600" />
        </div>
        <h1 className="text-xl font-bold text-stone-400 mt-1">Player lookup</h1>
      </div>

      <Searchbar />
    </div>
  );
};

export default PlayerLookupPanel;
