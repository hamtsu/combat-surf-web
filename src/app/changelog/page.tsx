"use client";

import Button from "@/components/Button";
import ChangelogItem from "@/components/ChangelogItem";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaPaperclip } from "react-icons/fa";

const Page = () => {
  const [changelogs, setChangelogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/changelogs")
      .then((res) => res.json())
      .then(setChangelogs);
  }, []);

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center pb-24">
      <div className="flex gap-2 my-4">
        <div className="flex items-center justify-between text-4xl p-4 gap-4 bg-stone-800 rounded-md">
          <div className="rounded-md bg-stone-900 p-3">
            <FaPaperclip size={35} className="fill-stone-600 " />
          </div>
          <h1 className="text-stone-400 font-bold">Changelogs</h1>
        </div>

        <div className="flex flex-col gap-1">
        <Tooltip text="Back to Home" position="bottom">
          <Button
            onClick={() => router.push("/")}
            className="px-5 py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
          >
            <FaArrowRight
              size={35}
              className="group-hover:animate-bounce-right"
            />
          </Button>
        </Tooltip>
        <div className="h-full text-stone-200/40 font-bold text-sm text-center p-1 bg-stone-800 rounded-sm">
          {changelogs.length} item(s)
        </div>
        </div>
      </div>

      {changelogs.map(
        (log: {
          name: string;
          content: string;
          metadata: { version: string; title: string; date: string };
        }) => (
          <ChangelogItem
            key={log.name}
            title={log.metadata.title}
            version={log.metadata.version}
            date={log.metadata.date}
            content={log.content}
          />
        )
      )}
    </div>
  );
};

export default Page;
