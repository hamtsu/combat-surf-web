import React, { FC } from "react";

type UserProfileGroupsProps = {
  groups: string[];
};

const UserProfileGroups: FC<UserProfileGroupsProps> = ({ groups }) => {
  return (
    <div className="flex gap-1 flex-grow-0">
      {groups.map((group, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-1 px-3 bg-neutral-50 dark:bg-stone-800 border-neutral-200 dark:border-transparent border-2 rounded-lg"
        >
          <h1 className="text-sm font-bold text-stone-900 dark:text-stone-200 capitalize">{group.replaceAll("-", " ")}</h1>
        </div>
      ))}
    </div>
  );
};

export default UserProfileGroups;
