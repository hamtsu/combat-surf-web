"use client";

import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle, FaUserCog, FaUserSlash } from "react-icons/fa";
import RobloxAvatar from "./RobloxAvatar";

function Searchbar() {
  const [filteredUsers, setFilteredUsers] = useState<
    { id: string; username: string }[] | []
  >([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value.length >= 3) {
      setFilteredUsers([]);
      setShowInfo(false);
      setLoading(true);
      setNotFound(false);

      fetch(`/api/player-info?query=${value}`)
        .then((res) => {
          if (!res.ok) {
            setNotFound(true);
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setLoading(false);
            setFilteredUsers(data);
          } else {
            setLoading(false);
            setFilteredUsers([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (value.length != 0) {
      setShowInfo(true);
      setLoading(false);
      setFilteredUsers([]);
    } else {
      setShowInfo(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && filteredUsers.length > 0) {
      e.preventDefault();
      router.push("/player/" + filteredUsers[0]?.id);
    }
  }

  function handleSelectUser(user: any) {
    if (!user) return;

    setFilteredUsers([]);
    router.push("/player/" + user.id);
  }

  return (
    <div className="relative w-fit">
      <div className="flex gap-1">
        <input
          type="text"
          name="player-search"
          className="bg-stone-900 rounded-md p-2 px-3 text-stone-200 w-[250px]"
          placeholder="Enter player username or ID"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
        />
        <Button
          onClick={() => handleSelectUser(filteredUsers[0])}
          className="active:bg-stone-700 p-3 bg-stone-900 hover:bg-stone-600 text-stone-300"
        >
          <FaMagnifyingGlass />
        </Button>
      </div>

      {/* dropdown */}

      <ul className="absolute z-10 mt-1 w-full bg-stone-800 rounded-md shadow-lg max-h-60 overflow-auto">
        {loading ? (
          notFound ? (
            <div className="flex flex-col">
              <FaUserSlash size={30} className="text-stone-200 mx-auto mt-2" />
              <p className="text-stone-200 text-center">User not found</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <FaUserCog size={30} className="text-stone-200 mx-auto mt-2" />
              <p className="text-stone-200 text-center">Searching...</p>
            </div>
          )
        ) : showInfo ? (
          <div className="p-2">
            <FaExclamationTriangle
              size={30}
              className="text-stone-200 mx-auto mt-2"
            />
            <p className="text-stone-200 text-center">
              Enter 3 or more characters
            </p>
          </div>
        ) : (
          filteredUsers.length > 0 &&
          filteredUsers.map((user, index) => {
            if (index <= 10)
              return (
                <li
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="px-3 flex gap-1 items-center py-2 hover:bg-stone-700 cursor-pointer text-stone-200"
                >
                  <div className="w-5 mr-1">
                    <RobloxAvatar userId={user.id} />
                  </div>
                  {user.username}
                  <span className="text-stone-200/40">({user.id})</span>
                </li>
              );
          })
        )}
      </ul>
    </div>
  );
}

export default Searchbar;
