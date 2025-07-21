import path from "path";
import fs from "fs";
import React from "react"; import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaDiscord, FaGamepad, FaGavel } from "react-icons/fa";
import Item from "@/components/ItemList/Item";
import KnivesList from "@/components/ItemList/KnivesList";
import AwpsList from "@/components/ItemList/AwpsList";
import ItemsListHeader from "@/components/ItemList/ItemListHeader";
import AksList from "@/components/ItemList/AksList";
import DeagleList from "@/components/ItemList/DeagleList";
import CaseList from "@/components/ItemList/CaseList";
import GlockList from "@/components/ItemList/GlockList";

const Page = () => {
  const imagesDir = path.join(process.cwd(), 'public/items');
  const filenames = fs.readdirSync(imagesDir);
  const filesWithDates = filenames.map((name) => {
    const filePath = path.join(imagesDir, name);
    const stats = fs.statSync(filePath);
    return {
      name,
      modified: stats.mtimeMs // get modified date for sorting 
    };
  });
  const sortedFiles = filesWithDates.sort((a, b) => a.modified - b.modified); // oldest first
  const imagePaths = sortedFiles.map((file) => `/items/${file.name}`);

  const AWP_NAMES = [
    "Mr.P",
    "Divinity.",
    "Esoteria",
    "tier777",
    "The_Prince",
    "Ascendance.",
    "666",
    "The_Dark_Arts",
    "SSG_Check",
    "Zertware",
    "Losty.",
    "Moltas",
    "Hellfire",
    "QuestionQuestionQuestion",
    "Fens_Fade",
    "idk",
    "AWP",
    "M1_Garand",
    "BFG",
    "Equotixx"
  ]

  const CASE_NAMES = [
    "SuspiciousPresent",
    "CargoCrate",
    "GiftOfThanks",
    "PalmPackage",
  ]

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center pb-24">
      <div className="flex flex-col gap-4 my-4 h-full mt-[120px] mb-[400px] px-16">

        <ItemsListHeader />

        <AwpsList items={imagePaths
          .filter((src) => path.parse(src).name.startsWith("AWP_") || AWP_NAMES.includes(path.parse(src).name))}
        />

        <KnivesList items={imagePaths.filter((src) =>
          !path.parse(src).name.startsWith("AWP_")
          && !path.parse(src).name.includes("AK-47")
          && !path.parse(src).name.startsWith("Glock")
          && !path.parse(src).name.startsWith("Deagle")
          && !AWP_NAMES.includes(path.parse(src).name)
          && !path.parse(src).name.includes("Case")
          && !CASE_NAMES.includes(path.parse(src).name)
          && !path.parse(src).name.includes("Double_Barrel")
          && !path.parse(src).name.includes("Classic_Knife")
          && !path.parse(src).name.toLowerCase().includes("shotgun".toLowerCase())
          && !path.parse(src).name.toLowerCase().includes("Uzi".toLowerCase()))}
        />

        <div className="w-full gap-3 flex">
          <AksList items={imagePaths
            .filter((src) => path.parse(src).name.startsWith("AK-47_"))}
          />
          <DeagleList items={imagePaths
            .filter((src) => path.parse(src).name.startsWith("Deagle_"))}
          />

        </div>

        <div className="w-full gap-3 flex">
          <GlockList items={imagePaths
            .filter((src) => path.parse(src).name.startsWith("Glock_"))}
          />
          <CaseList items={imagePaths
            .filter((src) => path.parse(src).name.includes("Case") && !path.parse(src).name.includes("_") || CASE_NAMES.includes(path.parse(src).name))}
          />
        </div>
      </div>
    </div >
  );
};

export default Page;
