"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft, FaArrowRight, FaDiscord, FaGamepad, FaGavel } from "react-icons/fa";

const Page = () => {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center pb-24">
      <div className="flex gap-2 my-4 content-center justify-center h-full">
        <div className="py-5 flex flex-col gap-6 text-5xl h-fit my-auto font-black text-amber-300">
            <div className="h-[30px] w-full bg-construction"/>
            <h1>Under construction!</h1>
            <p className="text-3xl">(ᗒᗣᗕ)՞</p>
            <div className="text-xl flex gap-3 items-center opacity-50 hover:opacity-100 w-fit font-normal text-stone-200 cursor-pointer" onClick={() => router.push("/")}><FaArrowLeft /> Go back to site</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
