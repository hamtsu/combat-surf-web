import ClanClient from "@/components/Profile/ClanClient";
import { getClan } from "@/lib/getClan";

interface Props {
  params: Promise<{ slug?: string }>;
}

export default async function Page({ params }: Props) {
  const Param = await params

  if (!Param?.slug) {
    return <div>Clan ID not provided</div>;
  }
  
  const clan = await getClan(Param?.slug);

  return <ClanClient initialClanInfo={clan} />;
}
