"use client";
import React, { FC, useEffect } from "react";
import { FaGavel, FaMedal, FaShieldAlt, FaUser } from "react-icons/fa";
import Tooltip from "../Tooltip";

type PlayerRankProps = {
  userId: string;
};

const PlayerRank: FC<PlayerRankProps> = ({ userId }) => {
  const [rank, setRank] = React.useState<any>(null);

  useEffect(() => {
    if (!userId) return;

    if (userId == "1") {
      setRank("Head Admins");
      return;
    } // TESTIng

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
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-indigo-500 border-2 border-indigo-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaShieldAlt className="text-indigo-200 text-xl animate-pulse" />
          <h1 className="text-xl font-semibold text-indigo-200">Moderators</h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "Admins") {
    return (
      <Tooltip text="This player is an Admin!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-purple-500 border-2 border-purple-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaGavel className="text-purple-200 text-xl animate-gavel" />
          <h1 className="text-xl font-semibold text-purple-200">Admins</h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "Head Admins") {
    return (
      <Tooltip text="This player is a Head Admin!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-red-500 border-2 border-red-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaGavel className="text-red-200 text-xl animate-gavel" />
          <h1 className="text-xl font-semibold text-red-200 ">Head Admins</h1>
        </div>
      </Tooltip>
    );
  } else if (rank == "Honorary Member") {
    return (
      <Tooltip text="This player is a Honorary Member!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-blue-500 border-2 border-blue-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaMedal className="text-blue-200 text-xl" />
          <h1 className="text-xl font-semibold text-blue-200">
            Honorary Member
          </h1>
        </div>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip text="This player is a Member!" position="bottom">
        <div className="opacity-0 select-none animate-fade-in-third flex gap-2 items-center bg-green-500 border-2 border-green-400 w-fit h-fit rounded-lg m p-2 px-4">
          <FaUser className="text-green-200 text-xl" />
          <h1 className="text-xl font-semibold text-green-200">Member</h1>
        </div>
      </Tooltip>
    );
  }
};

export default PlayerRank;
