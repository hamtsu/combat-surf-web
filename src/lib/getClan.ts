import { cache } from "react";

export const getClan = cache(async (clanId: string) => {
  if (!clanId) throw new Error("User ID is required to fetch player info");
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/clan-info?clanId=${clanId}`,
    { cache: "no-store" },
  );

  if (!res.ok)
    throw new Error("Failed fetching clan info: " + res.statusText);
  return res.json();
});
