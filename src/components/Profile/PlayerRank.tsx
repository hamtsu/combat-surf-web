"use client";
import React, { FC, useEffect } from "react";
import { FaCrown, FaGavel, FaMedal, FaShieldAlt, FaUser } from "react-icons/fa";
import Tooltip from "../Tooltip";

type PlayerRankProps = {
  userId: string;
};

const PlayerRank: FC<PlayerRankProps> = ({ userId }) => {
  const [rank, setRank] = React.useState<any>(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/player-rank?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        data?.data?.forEach((group: any) => {
          if (group.group.id == "5479316") {
            setRank(group.role.name);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  if (rank == "Mods") {
    return (
      <Tooltip text="This player is a Moderator!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center shadow-lg shadow-indigo-500 bg-indigo-500 border-2 border-indigo-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaShieldAlt className="text-indigo-200 text-xl animate-pulse" />
          <h1 className="text-xl font-semibold text-indigo-200">Moderators</h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "Admins") {
    return (
      <Tooltip text="This player is an Admin!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center shadow-lg shadow-purple-500 bg-purple-500 border-2 border-purple-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaGavel className="text-purple-200 text-xl animate-gavel" />
          <h1 className="text-xl font-semibold text-purple-200">Admins</h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "Head Admins") {
    return (
      <Tooltip text="This player is a Head Admin!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center shadow-lg shadow-red-500 bg-red-500 border-2 border-red-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaGavel className="text-red-200 text-xl animate-gavel" />
          <h1 className="md:text-xl text-base font-semibold text-red-200 ">Head Admins</h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "Honorary Member") {
    return (
      <Tooltip text="This player is a Honorary Member!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-blue-500 shadow-lg shadow-blue-500 border-2 border-blue-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaMedal className="text-blue-200 text-xl" />
          <h1 className="md:text-xl text-xs font-semibold text-blue-200">
            Honorary Member
          </h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "𝓣𝓱𝓮 𝓑𝓸𝔂𝓼❤️") { // ts is co owner hamtsu
    return (
      <Tooltip text="This player is a Co-owner!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-cyan-500 shadow-lg shadow-cyan-500 border-2 border-cyan-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaCrown className="text-cyan-100 text-xl" />
          <h1 className="text-xl font-semibold text-cyan-100">
            Co-owner
          </h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "⭐God") { // owner im pre sure
    return (
      <Tooltip text="This player is an owner!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-yellow-500 shadow-lg shadow-yellow-500 border-2 border-yellow-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaCrown className="text-yellow-100 text-xl" />
          <h1 className="text-xl font-semibold text-yellow-100">
            Owner
          </h1>
        </div>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip text="This player has no rank." position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-green-700 border-2 border-green-600 w-fit h-fit rounded-lg m p-2 px-4">
          <FaUser className="text-green-200 text-xl" />
          <h1 className="text-xl font-semibold text-green-200">Player</h1>
        </div>
      </Tooltip>
    );
  }
};

export default PlayerRank;
