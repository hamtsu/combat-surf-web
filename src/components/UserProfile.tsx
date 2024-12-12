import Image from "next/image";
import React, { FC } from "react";
import UserProfileRank from "./UserProfileRank";
import UserProfileGroups from "./UserProfileGroups";
import CopyButton from "./CopyButton";
import MinecraftRenderer from "./MinecraftRenderer";

type UserProfileProps = {
  username: string;
  uuid: string;
  rank: "admin" | "moderator" | "user";
  groups: string[];
};

const SKIN_REQUEST_URL =
  "https://skins.mcstats.com/body/front/<uuid>?scale=2&fov=50&shadow=true&disableCosmeticType=all&fallbackTexture=steve&overlay=true&cropMeasurement=pixels&expandMeasurement=pixels&cropLeft=0&cropRight=0&cropTop=0&cropBottom=350&expandLeft=0&expandRight=0&expandTop=0&expandBottom=0&alwaysSquare=false&grayscale=false";

const UserProfile: FC<UserProfileProps> = ({
  username,
  rank,
  uuid,
  groups,
}) => {

  return (
    <div className="w-fit flex gap-2 flex-col">
      <div className="flex flex-row items-center justify-center bg-neutral-50 border-neutral-200 border-b-4 border-r-4 rounded-lg pl-6 pr-8">
        {/* <Image
          width={448}
          height={724}
          src={SKIN_REQUEST_URL.replace("<uuid>", uuid)}
          className="w-[300px] overflow-hidden mt-[-80px]"
          draggable={false}
          alt="Avatar failed to load"
        /> */}

        <MinecraftRenderer uuid={uuid} username={username} />

        <div className="flex flex-col p-3">
          <h1 className="text-4xl font-bold">{username}</h1>
          <p className="text-neutral-500">{uuid}</p>
          <CopyButton text={uuid} />
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
