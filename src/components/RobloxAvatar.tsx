"use client";
import useSWR from "swr";
import Image from "next/image";
import React, { FC } from "react";

type RobloxAvatarProps = {
  userId?: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const RobloxAvatar: FC<RobloxAvatarProps> = ({ userId }) => {
  const { data, error } = useSWR(
    userId ? `/api/avatar?userId=${userId}` : null,
    fetcher
  );

  const avatarUrl = data?.data?.[0]?.imageUrl;

  return (
    <Image
      src={avatarUrl || "/null.png"}
      alt={`Roblox Avatar of ${userId}`}
      width={210}
      height={210}
      className="rounded-lg"
      draggable={false}
    />
  );
};

export default RobloxAvatar;
