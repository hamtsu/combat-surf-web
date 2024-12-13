import type { Metadata } from "next";
import mockUserInfo from "./mockUserInfo.json";
import Titlebar from "@/components/Titlebar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard home",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <Titlebar uuid={mockUserInfo.uuid} />
      <section className="flex flex-row h-full">
        {children}
        <Sidebar />
      </section>
    </div>
  );
}
