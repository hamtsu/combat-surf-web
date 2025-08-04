"use client";

import React, { useEffect } from "react";
import { FaArrowRight, FaPaperclip } from "react-icons/fa";
import Button from "../Button";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

const ChangelogPanel = () => {
  const router = useRouter();
  const [changelogs, setChangelogs] = React.useState<any[]>([]);

  useEffect(() => {
    fetch("/api/changelogs")
      .then((res) => res.json())
      .then(setChangelogs);
  }, []);

  return (
    <div className="rounded-md opacity-0 animate-fade-in-third bg-stone-800 p-4 flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="p-4 bg-stone-900 rounded-md">
          <FaPaperclip size={30} className="fill-stone-600" />
        </div>
        <h1 className="text-4xl font-bold text-stone-400 mt-3">Changelog</h1>
      </div>
      {changelogs[0] ? (
        <div className="md:w-[500px] lg:w-96 flex flex-col h-80 bg-[url(/header2.png)] bg-cover bg-center rounded-lg">
          <div className="backdrop-blur-[2px] text-slate-100 h-full text-center px-5 pt-4 flex flex-col">
            <div className="flex gap-1 w-full justify-between">
              <h1 className="font-bold text-3xl ml-[-30px] border-r-5 border-stone-600 drop-shadow-2xl bg-stone-900 text-stone-400 h-fit rounded-md relative mb-3 p-3">
                {changelogs[0].metadata.title}
              </h1>
            </div>

            <div className="hidden md:block prose prose-sm prose-stone prose-invert prose-headings:m-0 prose-p:m-0 text-lg text-start lg:text-base text-slate-200/80 mt-3 lg:mt-1">
              <ReactMarkdown>
                {changelogs[0].content.substring(0, 120) + "..."}
              </ReactMarkdown>
            </div>

            <div className="md:hidden prose prose-sm prose-stone prose-invert prose-headings:m-0 prose-p:m-0 text-lg text-start lg:text-base text-slate-200/80 mt-3 lg:mt-1">
              <ReactMarkdown>
                {changelogs[0].content.substring(0, 80) + "..."}
              </ReactMarkdown>
            </div>
          </div>

          <Button
            onClick={() =>
              router.push("/changelog#" + changelogs[0].metadata.date)
            }
            className="ml-auto px-3 py-2 h-fit flex text-stone-200/30 font-medium hover:text-stone-200/70 text-base font-sans transition-colors rounded-lg"
          >
            <p className="">View more</p>
            <FaArrowRight size={15} className=" ml-2" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-stone-400 mt-3">
            No changelogs available
          </h1>
          <p className="text-lg lg:text-base text-slate-200/80 mt-3 lg:mt-1">
            Check back later for updates!
          </p>
        </div>
      )}
      <Button
        onClick={() => router.push("/changelog")}
        className="ml-auto px-3 py-2 h-fit flex bg-stone-900 hover:bg-stone-700 text-stone-200/50 font-medium hover:text-stone-200 text-base font-sans transition-colors rounded-lg group"
      >
        <FaArrowRight
          size={15}
          className="fill-stone-200 mr-2 group-hover:animate-bounce-right"
        />
        <p className="text-stone-200">See all updates</p>
      </Button>
    </div>
  );
};

export default ChangelogPanel;
