"use client";

import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { FaUserCog } from "react-icons/fa";
import RobloxAvatar from "./RobloxAvatar";

function Searchbar() {
  const [filteredUsers, setFilteredUsers] = useState<
    { id: string; username: string }[] | []
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value.length > 0) {
      setFilteredUsers([]);

      setLoading(true);

      fetch(`/api/player-info?query=${value}`)
        .then((res) => {
          if (!res.ok) throw new Error("Fetch failed");
          return res.json();
        })
        .then((data) => {
          if (data.length > 0) {
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
    } else {
      setLoading(false);
      setFilteredUsers([]);
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
        <Button onClick={() => handleSelectUser(filteredUsers[0])} className="active:bg-stone-700 p-3 bg-stone-900 hover:bg-stone-600 text-stone-300">
          <FaMagnifyingGlass />
        </Button>
      </div>

      {/* dropdown */}
      {filteredUsers.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-stone-800 rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="flex flex-col">
              <FaUserCog
                size={30}
                className="animate-spin text-stone-200 mx-auto mt-2"
              />
              <p className="text-stone-200 text-center">Loading...</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="px-3 flex gap-1 items-center py-2 hover:bg-stone-700 cursor-pointer text-stone-200"
              >
                <div className="w-5 mr-1">
                  <RobloxAvatar userId={user.id} />
                </div>
                {user.username}<span className="text-stone-200/40">({user.id})</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Searchbar;
