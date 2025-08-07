"use client";

import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle, FaUserCog, FaUserSlash } from "react-icons/fa";
import RobloxAvatar from "./RobloxAvatar";

function Searchbar({ theme }: { theme: any }) {
  const [inputValue, setInputValue] = useState("");
    const [user, setUser] = useState<{
    userId: string;
    username: string;
    level: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (inputValue.length === 0) {
      setShowInfo(false);
      setUser(null);
      setNotFound(false);
      return;
    }

    if (inputValue.length < 3) {
      setShowInfo(true);
      setUser(null);
      setNotFound(false);
      return;
    }

    const delay = setTimeout(() => {
      setLoading(true);
      setShowInfo(false);
      setUser(null);
      setNotFound(false);

      fetch(`/api/player-search?query=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (!data || data.error) {
            setUser(null);
            setNotFound(true);
          } else {
            setUser({
              userId: data.userId,
              username: data.username,
              level: data.level,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setNotFound(true);
        });
    }, 400);

    return () => clearTimeout(delay);
  }, [inputValue]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && user) {
      e.preventDefault();
      router.push("/player/" + user.userId);
    }
  }

  function handleSelectUser() {
    if (!user) return;
    router.push("/player/" + user.userId);
  }

  return (
    <div className="relative w-fit">
      <div className="flex gap-1">
        <input
          type="text"
          name="player-search"
          className={`${theme.bgTertiary || "bg-stone-900"} ${theme.textMuted || "text-stone-200"} rounded-md p-2 px-3 w-[250px]`}
          placeholder="Enter player username or ID"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
        />
        <Button
          onClick={handleSelectUser}
          className={`active:${theme.bgPrimary || "bg-stone-700"} p-3 ${theme.bgTertiary || "bg-stone-900"} hover:${theme.bgSecondary || "bg-stone-600"} ${theme.textMuted || "text-stone-300"}`}
        >
          <FaMagnifyingGlass />
        </Button>
      </div>

      <ul className={`absolute z-10 mt-1 w-full ${theme.bgSecondary || "bg-stone-800"} rounded-md shadow-lg max-h-60 overflow-auto`}>
        {loading ? (
          <div className="flex flex-col">
            <FaUserCog size={30} className={`${theme.textPrimary || "text-stone-200"} mx-auto mt-2`} />
            <p className={`${theme.textPrimary || "text-stone-200"} text-center`}>Searching...</p>
          </div>
        ) : notFound ? (
          <div className="flex flex-col">
            <FaUserSlash size={30} className={`${theme.textPrimary || "text-stone-200"} mx-auto mt-2`} />
            <p className={`${theme.textPrimary || "text-stone-200"} text-center`}>User not found</p>
          </div>
        ) : showInfo ? (
          <div className="p-2">
            <FaExclamationTriangle size={30} className={`${theme.textPrimary || "text-stone-200"} mx-auto mt-2`} />
            <p className={`${theme.textPrimary || "text-stone-200"} text-center`}>
              Enter 3 or more characters
            </p>
          </div>
        ) : user ? (
          <li
            onClick={handleSelectUser}
            className={`px-3 flex gap-2 items-center py-2 hover:${theme.bgPrimary || "bg-stone-700"} cursor-pointer ${theme.textMuted || "text-stone-200"}`}
          >
            <div className="w-5 mr-1">
              <RobloxAvatar userId={user.userId} />
            </div>
            <span>{user.username}</span>
            <span className={`${theme.textPrimary || "text-stone-200/40"}`}>({user.userId})</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default Searchbar;
