import Image from "next/image";
import React, { FC } from "react";
import UserProfileRank from "./UserProfileRank";
import UserProfileGroups from "./UserProfileGroups";

type UserProfileProps = {
  username: string;
  uuid: string;
  rank: "admin" | "moderator" | "user";
  groups: string[];
};

const UserProfile: FC<UserProfileProps> = ({ username, rank, uuid, groups }) => {
  return (
    <div className="w-fit flex gap-2 flex-col">
      <div className="flex flex-col items-center justify-center p-3 px-4 bg-neutral-50 border-neutral-200 border-b-4 border-r-4 rounded-lg">
        <h1 className="text-2xl text-neutral-900">
          <b>{username}</b>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center p-6 px-14 bg-neutral-50 border-neutral-200 border-b-4 border-r-4 rounded-lg">
        <Image
          width={150}
          height={400}
        //   src={`https://api.mineatar.io/body/full/${uuid}?scale=40`}
          alt="Avatar failed to load"
        />
      </div>

      <UserProfileRank rank={rank} />

      {/* <UserProfileGroups groups={groups} /> */}

      <div className="p-3 bg-neutral-200 rounded-md text-neutral-500 flex flex-col">
        <div className="flex flex-col bg-neutral-100 p-1 px-2 pt-2 rounded-md">
            <h3 className="text-green-500 text-lg animate-pulse font-bold leading-3 ">Online » as-practice</h3>
            <p className="leading-1 opacity-70">last seen 2 hours ago</p>
        </div>

        <div className="flex flex-col bg-neutral-100 p-1 px-2 pt-2 rounded-md">
            f
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
