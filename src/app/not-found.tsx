"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4 p-4 md:px-48 bg-stone-900">

      <div className="rounded-md bg-stone-800 p-4 h-fit">
        <h1 className="text-8xl font-bold text-stone-300 ">404</h1>
        <p className="text-stone-400 text-lg">
          Sorry, the page you are looking for does not exist on the server.
        </p>
        <p className="text-stone-600 italic">Did you mistype the URL?</p>
      </div>

      <Button
        className="bg-stone-800 py-2 px-3 flex gap-2 text-stone-300 hover:bg-stone-700 group"
        onClick={() => {
          router.back();
        }}
      >
        <FaArrowLeft className="text-stone-300 group-hover:animate-bounce-left" />
        Back to previous page
      </Button>
    </div>
  );
};

export default Custom404;
