"use client";
import React, { FC } from 'react'
import Tooltip from './Tooltip';
import ThemeSwitcher from './ThemeSwitcher';
import Button from './Button';
import { FaLock, FaSignOutAlt } from 'react-icons/fa';

type TitlebarProps = {
    uuid: string;
}

const Titlebar: FC<TitlebarProps> = ({ uuid }) => {
  return (
    <div className="fixed top-0 right-0 p-2 z-10 w-fit flex flex-row items-center gap-2 bg-neutral-50 dark:bg-stone-950 dark:border-transparent border-neutral-200 border-b-2 border-r-2 m-2 rounded-xl">
        <Tooltip text="Toggle theme" position="bottom">
          <ThemeSwitcher />
        </Tooltip>

        <Tooltip text="Lock sidebar" position="bottom">
          <Button className="p-2 px-3 w-10 h-10 hover:bg-black/20 dark:hover:bg-white/10 transition-colors rounded-lg text-stone-800 dark:text-stone-200">
            <FaLock size={22} />
          </Button>
        </Tooltip>

        <Tooltip text="Logout" position="bottom">
          <Button className="group p-2 px-3 w-10 h-10 bg-red-500 hover:bg-red-400 transition-colors rounded-lg text-stone-100">
            <FaSignOutAlt size={22} className="group-hover:animate-bounce-right"/>
          </Button>
        </Tooltip>
      </div>
  )
}

export default Titlebar