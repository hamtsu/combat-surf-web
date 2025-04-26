import Image from "next/image";
import React, { FC, useEffect } from "react";

type RobloxAvatarProps = {
  userId: string;
};

const RobloxAvatar: FC<RobloxAvatarProps> = ({ userId }) => {
  const [avatarUrl, setAvatarUrl] = React.useState<any>(null);

  useEffect(() => {
    if (!userId) return; 

    fetch(`/api/avatar?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data?.data?.[0]?.imageUrl) {
          setAvatarUrl(data.data[0].imageUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl ?? null}
        alt={`Roblox Avatar of ${userId}`}
        width={105}
        height={60}
        className="rounded-lg"
      />
    );
  } else {
    return (
        <Image
        src={"/null.png"}
        alt={`Roblox Avatar of ${userId}`}
        width={300}
        height={300}
        className="rounded-md"
      />
    )
  }
};

export default RobloxAvatar;
