import UserProfile from "@/components/UserProfile";
import mockUserInfo from "./mockUserInfo.json";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import MinecraftCharacter from "@/components/MinecraftRenderer";

export default function DashboardHome() {
  return (
    <main className="h-full">
      <header className="px-12 pt-24 pb-8 bg-stone-100 w-full h-full">
        <UserProfile
          username={mockUserInfo.username}
          uuid={mockUserInfo.uuid}
          rank={mockUserInfo.rank}
          groups={mockUserInfo.groups}
        />
      </header>

      <section className="bg-stone-200 px-10 py-4 h-full">
        <ActivityHeatmap />
      </section>
    </main>
  );
}
