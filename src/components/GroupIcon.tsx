import Image from "next/image";
import React, { FC, useEffect } from "react";

type GroupIconProps = {
  clanId?: string;
};

const GroupIcon: FC<GroupIconProps> = ({ clanId }) => {
  const [iconUrl, setIconUrl] = React.useState<any>(null);

  useEffect(() => {
    if (!clanId) return;

    fetch(`/api/group-icon?clanId=${clanId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data?.data[0]?.imageUrl) {
          setIconUrl(data.data[0].imageUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clanId]);

  if (iconUrl) {
    return (
      <Image
        src={iconUrl ?? null}
        alt={`Roblox Group Icon of ${clanId}`}
        width={300}
        height={300}
        draggable={false}
        className="rounded-lg max-h-[270px] max-w-[270px] object-cover"
      />
    );
  } else {
    return (
        <Image
        src={"/null.png"}
        alt={`Roblox Group Icon of ${clanId}`}
        width={300}
        height={300}
        className="rounded-md"
      />
    )
  }
};

export default GroupIcon;
