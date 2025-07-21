"use client";
import { useRef } from "react";
import Button from "./Button";
import { FaXmark } from "react-icons/fa6";

export default function WIPModal() {
    const modalRef = useRef<HTMLDivElement>(null);

    const onClose = () => {
        if (modalRef.current) {
            modalRef.current.classList.add("hidden");
            modalRef.current.parentElement?.classList.add("hidden");
            setTimeout(() => {
                modalRef.current?.remove();
            }, 300);
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed opacity-0 animate-fade-in-fast top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className="bg-stone-800 border border-stone-800 overflow-hidden rounded-md shadow-2xl text-stone-200 relative w-[600px]"
            >
                <div className="bg-stone-900 p-1 flex w-full shadow-md">
                    <h1 className="text-lg font-bold text-stone-200 ml-2">
                        WIP NOTICE
                    </h1>
                    <Button
                        onClick={onClose}
                        className="ml-auto p-1 hover:bg-red-500 hover:border-red-400 border border-transparent "
                    >
                        <FaXmark size={18} />
                    </Button>
                </div>

                <div className="p-4">
                    <div className="pb-4 text-5xl h-fit my-auto font-black text-amber-300">
                        <div className="h-[20px] w-full bg-construction-yellow" />
                        <h1>Under construction!</h1>
                        <p className="text-3xl">(ᗒᗣᗕ)՞</p>
                    </div>

                    <p>Please note that currently this page is using <b>MOCK</b> data as I currently don't have access to a live leaderboard API. This will be updated in the future.</p>

                    <Button onClick={onClose} className="mt-4 text-lg bg-green-600 border border-green-500 p-1 px-3 hover:border-green-700 text-stone-200">
                        Okay, I understand
                    </Button>
                </div>
            </div>
        </div>
    );
}
