import { FC } from "react";
import { FaGavel, FaShieldAlt } from "react-icons/fa";

type UserProfileRankProps = {
  rank: "admin" | "moderator" | "user";
};

const UserProfileRank: FC<UserProfileRankProps> = ({ rank }) => {
  if (rank == "admin") {
    return (
      <div className="flex flex-col items-center justify-center w-fit p-1 px-7 bg-red-400 border-red-300 border-2 rounded-lg">
        <h1 className="text-lg font-bold text-neutral-100 flex gap-3 items-center">
          {" "}
          <FaGavel /> Administrator
        </h1>
      </div>
    );
  } else if (rank == "moderator") {
    return (
      <div className="flex flex-col items-center justify-center w-fit p-1 px-7 bg-indigo-400 border-indigo-300 border-2 rounded-lg">
        <h1 className="text-lg font-bold text-neutral-100 flex gap-3 items-center">
          {" "}
          <FaShieldAlt /> Moderator
        </h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center w-fit p-1 px-7 bg-gray-400 border-gray-300 border-2 rounded-lg">
        <h1 className="text-lg font-bold text-neutral-100">User</h1>
      </div>
    );
  }
};

export default UserProfileRank;
