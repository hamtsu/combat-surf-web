"use client";
import React, { FC, useState } from "react";
import UserProfileRank from "./UserProfileRank";
import UserProfileGroups from "./UserProfileGroups";
import CopyButton from "./CopyButton";
import MinecraftRenderer from "./MinecraftRenderer";
import {
  FaMagnifyingGlass,
  FaPerson,
  FaPersonRunning,
  FaPersonWalking,
} from "react-icons/fa6";
import Button from "./Button";
import Tooltip from "./Tooltip";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type UserProfileProps = {
  username: string;
  uuid: string;
  rank: "admin" | "moderator" | "user";
  groups: string[];
  online: boolean;
  lastSeen: string;
  currentServer: string;
};

const UserProfile: FC<UserProfileProps> = ({
  username,
  rank,
  uuid,
  groups,
  online,
  lastSeen,
  currentServer
}) => {
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [zoomEnabled, setZoomEnabled] = useState(false);

  dayjs.extend(relativeTime);

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

        <div className="flex flex-col p-3 -mt-8">
          <span className="flex flex-row gap-1 items-center mb-3">
            {online ? (
              <>
                <div className="h-3 w-3 rounded-full bg-green-500 animate-ping" />
                <div className="h-3 w-3 rounded-full bg-green-500 -ml-4" />
                <h1 className="text-lg ml-1 font-bold text-green-500">
                  online on <b>{currentServer}</b>
                </h1>
              </>
            ) : (
              <h1 className="text-lg text-stone-500">
                last seen about <b>{dayjs(lastSeen).fromNow()}</b>
              </h1>
            )}
          </span>
          <span className="flex gap-1 items-end">
            <h1 className="text-4xl font-bold">{username}</h1>
            <CopyButton text={uuid} />
          </span>
          <p className="text-neutral-500">{uuid}</p>
          <div className="flex gap-1 text-2xl text-stone-800 pt-4">
            <Button
              className={`${
                currentAnimation === "idle"
                  ? "bg-stone-400 cursor-not-allowed"
                  : "bg-stone-200 hover:bg-black/20"
              }  p-2 group`}
              onClick={() => setCurrentAnimation("idle")}
            >
              <FaPerson
                className={`${
                  currentAnimation !== "idle" && "group-hover:animate-wiggle"
                }`}
              />
            </Button>

            <Button
              className={`${
                currentAnimation === "walk"
                  ? "bg-stone-400 cursor-not-allowed"
                  : "bg-stone-200 hover:bg-black/20"
              } p-2 group`}
              onClick={() => setCurrentAnimation("walk")}
            >
              <FaPersonWalking
                className={`${
                  currentAnimation !== "walk" && "group-hover:animate-wiggle"
                }`}
              />
            </Button>

            <Button
              className={`${
                currentAnimation === "run"
                  ? "bg-stone-400 cursor-not-allowed"
                  : "bg-stone-200 hover:bg-black/20"
              } p-2 group`}
              onClick={() => setCurrentAnimation("run")}
            >
              <FaPersonRunning
                className={`${
                  currentAnimation !== "run" && "group-hover:animate-wiggle"
                }`}
              />
            </Button>

            <Tooltip text="Toggle zooming" position="bottom">
              <Button
                className={`${
                  zoomEnabled
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-stone-200 hover:bg-black/20"
                } p-2 group`}
                onClick={() => setZoomEnabled(!zoomEnabled)}
              >
                <FaMagnifyingGlass
                  className={`${
                    zoomEnabled ? "animate-pulse" : "group-hover:animate-wiggle"
                  }`}
                />
              </Button>
            </Tooltip>
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
