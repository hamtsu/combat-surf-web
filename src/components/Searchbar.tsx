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
          className={`rounded-md p-2 px-3 w-[250px]`}
          style={{
            backgroundColor: theme.bgTertiary || "#1c1917",
            color: theme.textMuted || "#d4d4d8",
          }}
          placeholder="Enter player username or ID"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
        />
        <Button
          onClick={handleSelectUser}
          className={`p-3`}
          style={{
            backgroundColor: theme.bgTertiary || "#1c1917",
            color: theme.textMuted || "#a1a1a1",
          }}
        >
          <FaMagnifyingGlass />
        </Button>
      </div>

      <ul
        className={`absolute z-10 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-auto`}
        style={{ backgroundColor: theme.bgSecondary || "#292524" }}
      >
        {loading ? (
          <div className="flex flex-col">
            <FaUserCog
              size={30}
              style={{ color: theme.textPrimary || "#d4d4d8" }}
              className="mx-auto mt-2"
            />
            <p style={{ color: theme.textPrimary || "#d4d4d8" }} className="text-center">
              Searching...
            </p>
          </div>
        ) : notFound ? (
          <div className="flex flex-col">
            <FaUserSlash
              size={30}
              style={{ color: theme.textPrimary || "#d4d4d8" }}
              className="mx-auto mt-2"
            />
            <p style={{ color: theme.textPrimary || "#d4d4d8" }} className="text-center">
              User not found
            </p>
          </div>
        ) : showInfo ? (
          <div className="p-2">
            <FaExclamationTriangle
              size={30}
              style={{ color: theme.textPrimary || "#d4d4d8" }}
              className="mx-auto mt-2"
            />
            <p style={{ color: theme.textPrimary || "#d4d4d8" }} className="text-center">
              Enter 3 or more characters
            </p>
          </div>
        ) : user ? (
          <li
            onClick={handleSelectUser}
            className={`px-3 flex gap-2 items-center py-2 cursor-pointer`}
            style={{ color: theme.textMuted || "#d4d4d8" }}
          >
            <div className="w-5 mr-1">
              <RobloxAvatar userId={user.userId} />
            </div>
            <span>{user.username}</span>
            <span style={{ color: theme.textPrimary || "rgba(209, 213, 219, 0.4)" }}>
              ({user.userId})
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default Searchbar;
