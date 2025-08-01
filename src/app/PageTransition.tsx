"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Wing from "../components/Wing";

import { usePathname, useSearchParams } from "next/navigation";

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setReset(true);
    setIsVisible(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      setReset(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full bg-stone-800 text-white flex items-center justify-center z-100 transition-opacity duration-500",
        {
          "opacity-0 pointer-events-none": !isVisible,
        }
      )}
    >
      <div className="text-2xl font-bold">
        <Wing reset={reset} />
        <Wing reflected reset={reset} />
        <Image
          src={"/falling.gif"}
          alt="feathers"
          width={600}
          height={200}
          draggable={false}
          className="mx-auto w-96 absolute top-5/12 animate-fadeIn"
        />
        <Image
          src={"/logotext.png"}
          alt="Logo"
          width={1000}
          height={1000}
          draggable={false}
          className="mx-auto w-96 z-2 relative top-1/2 animate-fadeIn"
          priority={true}
        />
      </div>
    </div>
  );
}
