"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaDoorOpen, FaSpinner, FaStar, FaUser } from "react-icons/fa";
import Tooltip from "../Tooltip";
import { BarLoader } from "react-spinners";
import { FaCircleXmark } from "react-icons/fa6";

const GameInfo = () => {
  const [data, setData] = useState<any>(null);
  const [activePlayers, setActivePlayers] = useState<Number | null>(null);
  const [favourites, setFavourites] = useState<Number | null>(null);
  const [visits, setVisits] = useState<Number | null>(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const padded = String(activePlayers ?? "----").padStart(4, "0");
  const firstNonZero = padded.search(/[1-9]/);

  useEffect(() => {
    const fetchPlayerCount = async () => {
      setFetching(true);
      setError(false);

      fetch("/api/game-info")
        .then(async (res) => {
          if (!res.ok) throw new Error("Fetch failed");
          return res.json();
        })
        .then((data) => {
          if (data?.activePlayers !== undefined) {
            setActivePlayers(data.activePlayers);
          }
          if (data?.favourites !== undefined) {
            setFavourites(data.favourites);
          }
          if (data?.visits !== undefined) {
            setVisits(data.visits);
          }
          setFetching(false);
        })
        .catch((err) => {
          setError(true);
          console.error("Client fetch error:", err);
        });
    };

    fetchPlayerCount();
    const interval = setInterval(() => {
      fetchPlayerCount();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 opacity-0 animate-fade-in-second">
      <div className="bg-stone-900 backdrop-blur-lg rounded-md w-fit h-fit p-3 flex gap-2 font-bold font-sans">
        <FaUser size={50} className="fill-stone-700" />
        <div className="flex flex-col text-stone-200">
          <span className="text-6xl font-mono flex gap-1 select-none">
            {padded.split("").map((digit, i) => (
              <span
                key={i}
                className={
                  firstNonZero === -1 || i < firstNonZero
                    ? "text-stone-600"
                    : "text-stone-200"
                }
              >
                {digit}
              </span>
            ))}
          </span>
          <p className="select-none">
            players currently{" "}
            <span className="text-green-500 animate-pulse">online</span>
          </p>
        </div>
      </div>
      <div className="flex gap-1 h-fit w-fit">
        <div className="bg-stone-800 select-none text-stone-200  items-center rounded-md w-fit h-fit p-2 flex gap-2 font-bold font-sans">
          <Tooltip text="Game Favourites" position="bottom">
            <FaStar size={20} className="fill-stone-700 mr-2" />
            {String(favourites)}
          </Tooltip>

          <Tooltip text="Game Visits" position="bottom">
            <FaDoorOpen size={20} className="fill-stone-700 mx-2" />
            {String(visits)}
          </Tooltip>
        </div>

        <div className={`${fetching ? '' : 'animate-fade-out'} bg-stone-800 select-none text-stone-200  items-center rounded-md w-fit h-fit p-2 flex gap-2 font-bold font-sans`}>
            {fetching ? <BarLoader width={30} color="white" /> : error ? <FaCircleXmark size={20} className="fill-red-400" /> : <FaCheckCircle className="fill-green-500" size={15} />}
          </div>
      </div>
    </div>
  );
};

export default GameInfo;
