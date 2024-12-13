import UserProfile from "@/components/UserProfile";
import mockUserInfo from "./mockUserInfo.json";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import PunishmentOverview from "@/components/PunishmentOverview";

export default function DashboardHome() {
  return (
    <main className="h-full">
      <header className="px-12 pt-24 min-h-[400px] pb-8 flex gap-3 bg-stone-100 dark:bg-stone-900 w-full">
        <UserProfile
          username={mockUserInfo.username}
          uuid={mockUserInfo.uuid}
          rank={mockUserInfo.rank}
          groups={mockUserInfo.groups}
          online={mockUserInfo.online}
          lastSeen={mockUserInfo.lastSeen}
          currentServer={mockUserInfo.currentServer}
        />

        <div className="bg-stone-200 dark:bg-stone-800 rounded-md h-fit flex-grow">
          <PunishmentOverview punishments={mockUserInfo.punishments} />
        </div>
      </header>

      <section className="bg-stone-200 dark:bg-stone-800 px-24 py-4">
        <ActivityHeatmap />
      </section>
    </main>
  );
}
