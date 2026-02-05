import ProfileClient from "@/components/Profile/ProfileClient";
import { getPlayer } from "@/lib/getPlayer";

interface Props {
  params: Promise<{ slug?: string }>;
}

export default async function Page({ params }: Props) {
  const Param = await params

  if (!Param?.slug) {
    return <div>User ID not provided</div>;
  }
  
  const player = await getPlayer(Param?.slug);

  return <ProfileClient initialUserInfo={player} />;
}
