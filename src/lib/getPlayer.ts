import { cache } from "react";

export const getPlayer = cache(async (userId: string) => {
  if (!userId) throw new Error("User ID is required to fetch player info");
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/player-info?userId=${userId}&fields=username,displayName,level,clanId,xp,weaponKills,wins,tasks,globalKills,tradeBanned,theme,inventory`,
    { cache: "no-store" }, // or force-cache if safe
  );

  if (!res.ok)
    throw new Error("Failed fetching player info: " + res.statusText);
  return res.json();
});
