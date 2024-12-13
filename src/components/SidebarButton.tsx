import React, { FC } from 'react'
import { usePathname } from "next/navigation";
import Button from './Button';
import { FaAngleUp } from 'react-icons/fa';

type SidebarButtonProps = {
    name: string,
    path: string,
    index: string,
    icon: React.ReactNode,
    shiftDown: boolean,
    open: boolean,
}

const SidebarButton: FC<SidebarButtonProps> = ({ name, path, index, icon, shiftDown, open }) => {
    const pathname = usePathname();

  return (
    <Button
            className={`${
              pathname.includes(path)
                ? "bg-stone-900 cursor-not-allowed"
                : "hover:bg-stone-900 bg-stone-800"
            } text-stone-300 p-3 px-4 flex gap-2 items-center`}
          >
            {icon}
            <span className={`${!open && "hidden"}`}>{name}</span>
            <div className="flex-grow" />
            <div
              className={`${
                shiftDown && !pathname.includes(path)
                  ? "text-stone-200 border-stone-200 animate-pulse"
                  : "border-stone-700 text-stone-400"
              }  border rounded-md p-1 py-0 ${!open && "hidden"}`}
            >
              <span className="flex items-center gap-1 font-mono">
                <FaAngleUp />{index}
              </span>
            </div>
          </Button>
  )
}

export default SidebarButton