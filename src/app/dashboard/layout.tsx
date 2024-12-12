import UserButton from "@/components/UserButton";
import type { Metadata } from "next";
import mockUserInfo from "./mockUserInfo.json";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { FaLock, FaSignOutAlt } from "react-icons/fa";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Home of the dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className="fixed top-0 right-0 p-2 z-10 w-fit flex flex-row items-center gap-2 bg-neutral-50 border-neutral-200 border-b-2 border-r-2 m-2 rounded-xl">
        <UserButton uuid={mockUserInfo.uuid} />
        <Tooltip text="Toggle theme" position="bottom">
          <ThemeSwitcher />
        </Tooltip>

        <Tooltip text="Lock sidebar" position="bottom">
          <Button className="p-2 px-3 w-10 h-10 hover:bg-black/20 transition-colors rounded-lg text-stone-800">
            <FaLock />
          </Button>
        </Tooltip>

        <Tooltip text="Logout" position="bottom">
          <Button className="group p-2 px-3 w-10 h-10 bg-red-500 hover:bg-red-400 transition-colors rounded-lg text-stone-100">
            <FaSignOutAlt className="group-hover:animate-bounce-right"/>
          </Button>
        </Tooltip>
      </div>

      {children}
    </div>
  );
}
