import React, { FC } from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
};

const Tooltip: FC<TooltipProps> = ({ text, position, children }) => {
  if (position === "bottom") {
    return (
      <div className="relative flex items-center group w-fit">
        {children}
        <div className="absolute top-full mb-2 mt-2 hidden group-hover:flex items-center justify-center p-2 bg-stone-800 text-stone-100 w-max text-sm rounded-md shadow-lg -translate-x-1/2 left-1/2">
          {text}
          <div className="absolute top-0 -mt-1 h-2 w-2 bg-stone-800 rotate-45" />
        </div>
      </div>
    );
  } else if (position === "top") {
    return (
        <div className="relative flex items-center group w-fit">
          {children}
          <div className="absolute bottom-full mb-4 hidden group-hover:flex items-center justify-center p-2 bg-stone-800 text-stone-100 w-max text-sm rounded-md shadow-lg -translate-x-1/2 left-1/2">
            {text}
            <div className="absolute -mt-1 top-full h-2 w-2 bg-stone-800 rotate-45" />
          </div>
        </div>
      );
  }
};

export default Tooltip;
