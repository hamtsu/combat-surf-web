"use client";

import useDarkMode from "@/hooks/UseDarkMode";
import { FaMoon, FaSun } from "react-icons/fa";
import Button from "./Button";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button className="rounded-md w-10 h-10 flex items-center overflow-hidden hover:bg-black/20 dark:hover:bg-white/10" onClick={toggleTheme}>
      {theme === "light" ? <FaMoon className="text-stone-800  mx-auto" size={22} /> : <FaSun className="text-stone-200 mx-auto" size={22} />}
    </Button>
  );
};

export default ThemeSwitcher;
