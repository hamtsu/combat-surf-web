"use client";
import React, { FC, useState } from "react";
import UserProfileRank from "./UserProfileRank";
import UserProfileGroups from "./UserProfileGroups";
import CopyButton from "./CopyButton";
import MinecraftRenderer from "./MinecraftRenderer";
import { FaMagnifyingGlass, FaPerson, FaPersonRunning, FaPersonWalking } from "react-icons/fa6";
import Button from "./Button";

type UserProfileProps = {
  username: string;
  uuid: string;
  rank: "admin" | "moderator" | "user";
  groups: string[];
};

const UserProfile: FC<UserProfileProps> = ({
  username,
  rank,
  uuid,
  groups,
}) => {
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [zoomEnabled, setZoomEnabled] = useState(false);

  return (
    <div className="w-fit flex gap-2 flex-col">
      <div className="flex flex-row pt-10 items-center justify-center bg-neutral-50 border-neutral-200 border-b-4 border-r-4 rounded-lg pl-6 pr-8">

        <MinecraftRenderer
          uuid={uuid}
          username={username}
          rank={rank}
          currentAnimation={currentAnimation}
          zoomEnabled={zoomEnabled}
        />

        <div className="flex flex-col p-3">
          <span className="flex gap-1 items-end"><h1 className="text-4xl font-bold">{username}</h1><CopyButton text={uuid} /></span>
          <p className="text-neutral-500">{uuid}</p>
          <div className="flex gap-1 text-2xl text-stone-800 pt-4">
            <Button
              className="bg-stone-200 hover:bg-black/20 p-2 group"
              onClick={() => setCurrentAnimation("idle")}
            >
              <FaPerson className="group-hover:animate-wiggle" />
            </Button>

            <Button
              className="bg-stone-200 hover:bg-black/20 p-2 group"
              onClick={() => setCurrentAnimation("walk")}
            >
              <FaPersonWalking className="group-hover:animate-wiggle" />
            </Button>

            <Button
              className="bg-stone-200 hover:bg-black/20 p-2 group"
              onClick={() => setCurrentAnimation("run")}
            >
              <FaPersonRunning className="group-hover:animate-wiggle" />
            </Button>

            <Button
              className={`${zoomEnabled? "bg-green-500 hover:bg-green-600" : "bg-stone-200 hover:bg-black/20"} p-2 group`}
              onClick={() => setZoomEnabled(!zoomEnabled)}
            >
              <FaMagnifyingGlass className={`${zoomEnabled ? "animate-pulse" : 'group-hover:animate-wiggle'}`}/>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <UserProfileRank rank={rank} />
        <UserProfileGroups groups={groups} />
      </div>
    </div>
  );
};

export default UserProfile;
