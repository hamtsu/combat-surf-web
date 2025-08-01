"use client";

import Button from "@/components/Button";
import ClanTag from "@/components/ClanTag";
import GroupIcon from "@/components/GroupIcon";
import ItemModal from "@/components/ItemModal";
import RobloxAvatar from "@/components/RobloxAvatar";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FaArrowLeft, FaTrophy, FaUser } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const router = useRouter();

    const [clanInfo, setclanInfo] = useState<any>(null);
    const [clanOwnerInfo, setClanOwnerInfo] = useState<any>(null);
    const [clanMembers, setClanMembers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    useEffect(() => {
        if (!slug) return;
        let clanInfoRes: any;

        fetch(`/api/clan-info?clanId=${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed fetching clan info");
                return res.json();
            })
            .then((data) => {
                if (data.name) {
                    setclanInfo(data);
                    clanInfoRes = data;

                    fetch(
                        `/api/player-info?userId=${data.owner}&fields=username,displayName`
                    )
                        .then((res) => {
                            if (!res.ok) throw new Error("Failed fetching owner info");
                            return res.json();
                        })
                        .then((data) => {
                            if (data.username) {
                                setClanOwnerInfo(data);
                                clanInfoRes = data;
                            } else {
                                setError("Clan owner not found or invalid userId");
                            }
                        });
                } else {
                    setError("Clan not found or invalid clanId");
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, [slug]);

    useEffect(() => {
        if (!clanInfo) return;

        const members = [];
        for (let i = 1; i <= 9; i++) {
            const memberId = clanInfo[`member${i}`];
            if (memberId) {
                members.push(memberId);
            }
        }

        Promise.all(
            members.map((id) =>
                fetch(`/api/player-info?userId=${id}&fields=username,displayName`)
                    .then((res) => res.json())
                    .then((data) => ({
                        id,
                        username: data.username || "Unknown User",
                        displayName: data.displayName || "Unknown User",
                    }))
                    .catch(() => ({
                        id,
                        username: "Unknown User",
                        displayName: "Unknown User",
                    }))
            )
        ).then(setClanMembers);
    }, [clanInfo]);

    if (clanInfo === null) {
        return (
            <div className="flex bg-stone-900 text-slate-200 flex-col items-center justify-center w-full h-full p-4">
                <div className="absolute flex gap-2 left-5 top-5">
                    <Tooltip text="Go back" position="bottom">
                        <Button
                            onClick={() => router.back()}
                            className="px-5 h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
                        >
                            <FaArrowLeft
                                size={35}
                                className="group-hover:animate-bounce-right"
                            />
                        </Button>
                    </Tooltip>

                    <div className="flex gap-4 bg-stone-800 rounded-md">
                        <div className="flex items-center justify-between text-2xl p-4 gap-4 bg-stone-800 rounded-md">
                            <div className="rounded-md bg-stone-900 p-3">
                                <FaShield size={25} className="fill-stone-600 " />
                            </div>
                            <h1 className="text-stone-400 font-bold">Viewing clan</h1>
                        </div>
                    </div>
                </div>

                <div className="bg-stone-800 rounded-md p-4 text-center">
                    <FaUser size={40} className="text-stone-400 mx-auto mt-2" />
                    {error ? (
                        <>
                            <h1 className="text-2xl font-bold text-stone-200 p-4">
                                This clan could not be loaded!
                            </h1>
                            <p className="text-5xl font-bold text-red-400">(ᗒᗣᗕ)</p>
                        </>
                    ) : (
                        <h1 className="text-2xl font-bold text-stone-200 p-4">
                            Loading clan information...
                        </h1>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <>
                {selectedItem && (
                    <ItemModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
                <div className="overflow-y-scroll flex bg-stone-900 text-slate-200 flex-col items-center justify-start w-full h-full pb-48 p-4 gap-6">
                    <div className="flex  md:flex-row gap-4 w-full max-w-screen-xl px-4">
                        <Tooltip text="Go back" position="bottom">
                            <Button
                                onClick={() => router.back()}
                                className="px-5 h-full py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors rounded-lg text-stone-200/50 group"
                            >
                                <FaArrowLeft
                                    size={35}
                                    className="group-hover:animate-bounce-right"
                                />
                            </Button>
                        </Tooltip>

                        <div className="flex items-center  w-fit text-2xl p-4 gap-4 bg-stone-800 rounded-md ">
                            <div className="rounded-md bg-stone-900 p-3">
                                <FaShield size={25} className="fill-stone-600 " />
                            </div>
                            <h1 className="text-stone-400 font-bold">
                                Viewing <b>{clanInfo.name}</b>
                            </h1>
                        </div>
                    </div>

                    <div className="md:mt-24 flex flex-col lg:flex-row gap-6 w-full max-w-screen-xl px-4">
                        <div className="bg-stone-800 select-none opacity-0 w-full lg:w-2/3 border border-stone-700 rounded-md p-4 flex flex-col sm:flex-row gap-6 animate-fade-in-first">
                            <div className="md:mt-[-120px] bg-stone-800 overflow-hidden p-3 rounded-md w-fit">
                                <GroupIcon clanId={slug} />
                            </div>
                            <div className="flex flex-col gap-2 justify-between">
                                <h1 className="text-stone-200 font-bold text-3xl lg:text-5xl">
                                    {clanInfo.name}
                                </h1>
                                <h1 className="text-3xl lg:text-5xl font-bold">
                                    <ClanTag
                                        text={clanInfo.tag}
                                        colorR={clanInfo.colorR}
                                        colorG={clanInfo.colorG}
                                        colorB={clanInfo.colorB}
                                        colorR2={clanInfo.colorR2}
                                        colorG2={clanInfo.colorG2}
                                        colorB2={clanInfo.colorB2}
                                        colorMode={clanInfo.colorMode}
                                    />
                                </h1>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <h1 className="text-lg lg:text-2xl flex gap-2 text-stone-300 bg-stone-900 rounded-md p-2 px-4 items-center font-bold">
                                        <FaTrophy size={20} className="fill-stone-300" />
                                        {clanInfo.wins}
                                        <span className="text-base text-stone-500">wins</span>
                                    </h1>
                                    <h1 className="text-lg lg:text-2xl flex gap-2 text-stone-300 bg-stone-900 rounded-md p-2 px-4 items-center font-bold">
                                        #--
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="opacity-0 select-none bg-stone-800 w-full lg:w-1/3 border border-stone-700 rounded-md p-4 flex gap-4 animate-fade-in-second">
                            <div className="bg-stone-900 p-3 rounded-md w-24 sm:w-[170px]">
                                <RobloxAvatar userId={clanInfo.owner} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="font-bold text-lg text-stone-400 flex items-center gap-1">
                                    <FaUser /> Clan owner
                                </div>
                                <a
                                    className="text-stone-200 font-bold text-3xl hover:text-amber-400"
                                    href={`/player/${clanInfo.owner}`}
                                >
                                    {clanOwnerInfo?.displayName}
                                </a>
                                <h1 className="text-base text-stone-400">
                                    @{clanOwnerInfo?.username || "No display name"}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="opacity-0 select-none flex flex-col flex-wrap gap-2 w-fit md:max-h-[300px] px-4 animate-fade-in-third">
                        {clanMembers.length > 0 ? (
                            clanMembers.map((member, index: number) => (
                                <div
                                    key={member.id}
                                    style={{ animationDelay: `${index * 0.1 + 1.3}s` }}
                                    className="flex text-base sm:text-lg gap-2 items-center bg-stone-800 p-2 rounded-md opacity-0 animate-fade-in w-[350px] md:w-[600px]"
                                >
                                    <h1 className="font-bold text-stone-400">#{index + 2}</h1>
                                    <div className="w-8 bg-stone-500 rounded-md">
                                        <RobloxAvatar userId={member.id} />
                                    </div>
                                    <a
                                        href={`/player/${member.id}`}
                                        className="text-stone-200 hover:text-amber-300 font-bold"
                                    >
                                        {member.displayName}
                                    </a>
                                    <h3 className="text-stone-400 text-sm sm:text-base">
                                        @{member.username}
                                    </h3>
                                </div>
                            ))
                        ) : (
                            <div className="bg-stone-800 p-4 rounded-md">
                                <p className="text-stone-200">No members found in this clan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
