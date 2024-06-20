import UserProfile from "@/components/UserProfile";
import mockUserInfo from "./mockUserInfo.json";

export default function DashboardHome() {
  return (
    <main className="min-h-screen p-12 bg-neutral-100">
      <UserProfile username={mockUserInfo.username} uuid={mockUserInfo.uuid} rank={mockUserInfo.rank} groups={mockUserInfo.groups} />
    </main>
  );
}
