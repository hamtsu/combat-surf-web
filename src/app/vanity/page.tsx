"use client";

import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { useAuth } from "@/context/AuthContext";
import {
  checkVanityAvailability,
  checkVanityClaimedByUser,
} from "@/lib/claimVanity";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck, FaHeart } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";

const Page = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [inputValue, setInputValue] = useState("name");
  const [error, setError] = useState<string | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [alreadyHasVanity, setAlreadyHasVanity] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      console.log("No user, redirecting to login");
      router.replace("/auth/login");
      return;
    }

    if (user?.uid) {
      checkVanityClaimedByUser(user?.uid).then((claimed) => {
        setAlreadyHasVanity(claimed ? true : false);
        setInputValue(claimed == false ? inputValue : claimed);
      });
    }
  }, [loading, user, router]);

  const claimVanityUrl = async () => {
    if (inputValue.length < 3) {
      setError("Vanity URL must be at least 3 characters long.");
      return;
    }
    if (inputValue.length > 12) {
      setError("Vanity URL cannot be longer than 12 characters.");
      return;
    }

    setLoadingSubmit(true);
    checkVanityAvailability(inputValue).then((available) => {
      if (!available) {
        setError("Vanity URL is already taken.");
        setLoadingSubmit(false);
        return;
      }
    });

    // claimVanity(user.uid, inputValue).then((res) => {
    //     if (!res.success) {
    //         setError(res.message || "An unknown error occurred.");
    //         setLoadingSubmit(false);
    //         return;
    //     }

    //     setSuccessMessage("Vanity URL claimed successfully!");
    //     setError(null);
    //     setLoadingSubmit(false);
    // })

    const token = await user.getIdToken();

    const vanityRes = await fetch("/api/claim-vanity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vanity: inputValue }),
    });

    if (!vanityRes.ok) {
      const errText = await vanityRes.text();
      setError(errText || "An unknown error occurred.");
      setLoadingSubmit(false);
      return;
    }
    setSuccessMessage("Vanity URL claimed successfully!");
    setError(null);
    setLoadingSubmit(false);
  };

  return (
    <div className="overflow-y-scroll h-full flex flex-col items-center md:justify-center pb-48 pt-2 px-4 sm:px-6 md:px-8">
      <div className="flex flex-row gap-2 my-4 w-full max-w-5xl justify-start mb-10">
        <Tooltip text="Back to Home" position="bottom">
          <Button
            onClick={() => router.push("/")}
            className="px-5 py-3 flex bg-stone-800 hover:bg-teal-500-600 hover:text-stone-200 transition-colors h-full rounded-lg text-stone-200/50 group"
          >
            <FaArrowLeft
              size={35}
              className="group-hover:animate-bounce-left"
            />
          </Button>
        </Tooltip>

        <div className="flex items-center text-3xl sm:text-4xl p-4 gap-4 bg-stone-800 rounded-md">
          <div className="rounded-md bg-stone-900 p-3">
            <FaHeart size={35} className="fill-stone-600" />
          </div>
          <h1 className="text-stone-400 font-bold">Vanity</h1>
        </div>
      </div>

      <div className="w-full max-w-3xl flex flex-row gap-4 items-start justify-start">
        <div className="bg-stone-800 rounded-lg opacity-0 animate-fade-in-first text-stone-200 flex-1 overflow-hidden">
          <div
            style={{
              backgroundImage: `url(/vanitybanner.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full bg-stone-900 h-[200px]"
          />
          <div className="p-4">
            <h1 className="text-2xl font-bold text-stone-400 mt-1 flex items-center gap-2">
              <FaHeart className="fill-stone-600" />
              Claim Vanity URL
            </h1>
            <p className="mt-2 text-stone-200 text-lg">
              You may claim one vanity URL for your profile. This will allow you
              to have a custom URL like{" "}
              <i className="underline text-stone-400">
                combat.surf/<span>{inputValue}</span>
              </i>{" "}
              that redirects to your profile.
            </p>
            <br />
            <p className="text-stone-300 text-base">
              Vanity URLs are granted on a first-come, first-served basis. There
              cannot be multiple users with the same vanity URL. You may{" "}
              <b>change your vanity url later</b> by returning to this page.
            </p>
            <br />
            <div className=" bg-stone-900 p-2 px-5 rounded-md">
              <div className="flex items-center gap-1">
                <span className="text-stone-400 font-bold">combat.surf/</span>
                <input
                  type="text"
                  name="vanity-url"
                  className={`rounded-md bg-stone-800 p-2 px-3 w-[100px] md:w-[140px]`}
                  maxLength={12}
                  placeholder="name"
                  onChange={(e) =>
                    setInputValue(e.target.value.toLocaleLowerCase())
                  }
                  value={inputValue}
                  autoComplete="off"
                  autoCorrect="off"
                />
                <Button
                  onClick={() => !loadingSubmit && claimVanityUrl()}
                  className={`px-3 py-2 ml-3 ${loadingSubmit ? "opacity-50 cursor-not-allowed" : "hover:bg-stone-200"} bg-stone-600 hover:text-stone-800 transition-colors flex items-center gap-2 h-full rounded-lg text-stone-400 font-bold`}
                >
                  {loadingSubmit ? (
                    <ScaleLoader color="#d6d3d1" height={16} />
                  ) : (
                    <>
                      <FaCheck />
                      Claim
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
              {!successMessage && alreadyHasVanity && (
                <div className="text-stone-300 text-sm mt-1">
                  You already have a vanity URL claimed.{" "}
                  <b>Claiming another will overwrite!</b>
                </div>
              )}
              {successMessage && (
                <div className="text-green-500 text-sm mt-1">
                  Successfully claimed <b>combat.surf/{inputValue}!</b>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
