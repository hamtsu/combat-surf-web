import Image from "next/image";
import Button from "./Button";
import { FaArrowLeft, FaFlag } from "react-icons/fa";
import Tooltip from "./Tooltip";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 items-center w-full flex flex-row gap-60 px-24 h-[80px] bg-stone-800 dark:border-t border-stone-900">
      <div className="flex flex-row gap-4 items-center text-stone-200/80 opacity-50 hover:opacity-100 transition-opacity select-none">
        <Image
          src="/logo.svg"
          width={80}
          height={80}
          alt="Logo"
          draggable={false}
          className="w-10"
        />
        <span className="text-sm">
          © {new Date().getFullYear()} Minecraft server
        </span>
      </div>

      <div className="flex flex-grow" />

      <div className="h-fit w-fit flex gap-2">
        <Button className="px-5 py-3 h-fit flex bg-stone-900 hover:bg-red-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group">
          <FaArrowLeft className="group-hover:animate-bounce-left mr-1" /> Back
          to <b>main site</b>
        </Button>

        <Tooltip text="Report an issue" position="top">
          <Button className="px-5 py-3 flex h-full bg-stone-900 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group">
            <FaFlag className="group-hover:animate-wiggle" />
          </Button>
        </Tooltip>
      </div>

      <div className="flex flex-grow" />

      <div className="flex flex-row gap-4 items-center text-stone-200/80 text-sm">
        <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none">
          privacy policy
        </span>
        <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none">
          terms of service
        </span>
      </div>
    </footer>
  );
};

export default Footer;
