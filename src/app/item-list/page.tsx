import path from "path";
import fs from "fs";
import React from "react";
import ItemsListHeader from "@/components/ItemList/ItemListHeader";
import AwpsList from "@/components/ItemList/AwpsList";
import KnivesList from "@/components/ItemList/KnivesList";
import AksList from "@/components/ItemList/AksList";
import DeagleList from "@/components/ItemList/DeagleList";
import GlockList from "@/components/ItemList/GlockList";
import CaseList from "@/components/ItemList/CaseList";

const Page = () => {
  const imagesDir = path.join(process.cwd(), "public/items");
  const filenames = fs.readdirSync(imagesDir);

  const filesWithDates = filenames.map((name) => {
    const filePath = path.join(imagesDir, name);
    const stats = fs.statSync(filePath);
    return {
      name,
      modified: stats.mtimeMs,
    };
  });

  const sortedFiles = filesWithDates.sort((a, b) => a.modified - b.modified);
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
    "Equotixx",
  ];

  const CASE_NAMES = [
    "SuspiciousPresent",
    "CargoCrate",
    "GiftOfThanks",
    "PalmPackage",
  ];

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center pb-24">
      <div className="w-full px-4 sm:px-3 lg:px-16 flex flex-col gap-8 mt-28 md:mb-40">
        <ItemsListHeader />

        <AwpsList
          items={imagePaths.filter(
            (src) =>
              path.parse(src).name.startsWith("AWP_") ||
              AWP_NAMES.includes(path.parse(src).name)
          )}
        />

        <KnivesList
          items={imagePaths.filter((src) => {
            const name = path.parse(src).name.toLowerCase();
            return (
              !name.startsWith("awp_") &&
              !name.includes("ak-47") &&
              !name.startsWith("glock") &&
              !name.startsWith("deagle") &&
              !AWP_NAMES.map((n) => n.toLowerCase()).includes(name) &&
              !name.includes("case") &&
              !CASE_NAMES.map((n) => n.toLowerCase()).includes(name) &&
              !name.includes("double_barrel") &&
              !name.includes("classic_knife") &&
              !name.includes("shotgun") &&
              !name.includes("uzi")
            );
          })}
        />

        <div className="w-full flex flex-col md:flex-row gap-4">
          <AksList
            items={imagePaths.filter((src) =>
              path.parse(src).name.startsWith("AK-47_")
            )}
          />
          <DeagleList
            items={imagePaths.filter((src) =>
              path.parse(src).name.startsWith("Deagle_")
            )}
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <GlockList
            items={imagePaths.filter((src) =>
              path.parse(src).name.startsWith("Glock_")
            )}
          />
          <CaseList
            items={imagePaths.filter((src) => {
              const name = path.parse(src).name;
              return (
                (name.includes("Case") && !name.includes("_")) ||
                CASE_NAMES.includes(name)
              );
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
