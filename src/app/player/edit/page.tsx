"use client";

import Button from "@/components/Button";
import { ColourPicker } from "@/components/ColourPicker";
import Dropzone from "@/components/Dropzone";
import RobloxAvatar from "@/components/RobloxAvatar";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebaseClient";
import { updateTheme } from "@/lib/updateProfile";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDiscord, FaStar, FaTiktok, FaTwitter, FaUserCog, FaYoutube } from "react-icons/fa";
import { FaRotateRight, FaX } from "react-icons/fa6";
import { ScaleLoader } from "react-spinners";

const ProfileEdit = () => {
  const router = useRouter();
  const { user, claims, loading } = useAuth();

  const [bannerError, setBannerError] = useState<string | null>(null);
  const [backgroundError, setBackgroundError] = useState<string | null>(null);
  const [bannerSuccess, setBannerSuccess] = useState<boolean>(false);
  const [backgroundSuccess, setBackgroundSuccess] = useState<boolean>(false);
  const [bannerLoading, setBannerLoading] = useState<boolean>(false);
  const [backgroundLoading, setBackgroundLoading] = useState<boolean>(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`/api/player-info?userId=${claims.userId}&fields=theme`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed fetching player info");
        return res.json();
      })
      .then((data) => {
        if (data.theme) {
          setUserInfo(data);
          handleColours(data.theme);
          setDescription(data.description || "");
          setSocials(data.socials || {});
        } else {
          setError(true);
          console.error("User not found or invalid userId");
        }
      });
  }, [user, claims?.userId]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  const convertToHexAlpha = (number: number) => {
    return Math.round((number / 100) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
  };

  const convertFromHexAlpha = (hex: string) => {
    return Math.round(((parseInt(hex, 16) / 255) * 100) / 10) * 10;
  };

  const handleColours = (theme: any) => {
    setBgPrimary(theme.bgPrimary || "#1c1917");
    setBgSecondary(theme.bgSecondary.slice(0, -2) || "#292524");
    setBgTertiary(theme.bgTertiary.slice(0, -2) || "#1c1917");
    setTextPrimary(theme.textPrimary.slice(0, -2) || "#d6d3d1");
    setTextSecondary(theme.textSecondary.slice(0, -2) || "#78716c");
    setTextMuted(theme.textMuted.slice(0, -2) || "#a8a29e");
    setBorderColor(theme.borderColor.slice(0, -2) || "#44403c");
    setIconColor(theme.iconColor.slice(0, -2) || "#57534e");
    setProgressTrack(theme.progressTrack.slice(0, -2) || "#57534e");
    setProgressFill(theme.progressFill.slice(0, -2) || "#e7e5e4");
    setTextOnFill(theme.textOnFill.slice(0, -2) || "#292524");
    setDigitInactive(theme.digitInactive.slice(0, -2) || "#57534e");
    setDigitActive(theme.digitActive.slice(0, -2) || "#e7e5e4");
    setTextBanner(theme.textBanner || "#e7e5e4");
    setTransparency(
      Number(convertFromHexAlpha(theme.bgSecondary.slice(-2))) || 100,
    );
  };

  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  const [bgPrimary, setBgPrimary] = useState<string>(
    userInfo?.theme?.bgPrimary || "#1c1917",
  );
  const [bgSecondary, setBgSecondary] = useState<string>(
    userInfo?.theme?.bgSecondary.slice(0, -2) || "#292524",
  );
  const [bgTertiary, setBgTertiary] = useState<string>(
    userInfo?.theme?.bgTertiary.slice(0, -2) || "#1c1917",
  );
  const [textPrimary, setTextPrimary] = useState<string>(
    userInfo?.theme?.textPrimary.slice(0, -2) || "#d6d3d1",
  );
  const [textSecondary, setTextSecondary] = useState<string>(
    userInfo?.theme?.textSecondary.slice(0, -2) || "#78716c",
  );
  const [textMuted, setTextMuted] = useState<string>(
    userInfo?.theme?.textMuted.slice(0, -2) || "#a8a29e",
  );
  const [borderColor, setBorderColor] = useState<string>(
    userInfo?.theme?.borderColor.slice(0, -2) || "#44403c",
  );
  const [iconColor, setIconColor] = useState<string>(
    userInfo?.theme?.iconColor.slice(0, -2) || "#57534e",
  );
  const [progressTrack, setProgressTrack] = useState<string>(
    userInfo?.theme?.progressTrack.slice(0, -2) || "#57534e",
  );
  const [progressFill, setProgressFill] = useState<string>(
    userInfo?.theme?.progressFill.slice(0, -2) || "#e7e5e4",
  );
  const [textOnFill, setTextOnFill] = useState<string>(
    userInfo?.theme?.textOnFill.slice(0, -2) || "#292524",
  );
  const [digitInactive, setDigitInactive] = useState<string>(
    userInfo?.theme?.digitInactive.slice(0, -2) || "#57534e",
  );
  const [digitActive, setDigitActive] = useState<string>(
    userInfo?.theme?.digitActive.slice(0, -2) || "#e7e5e4",
  );
  const [textBanner, setTextBanner] = useState<string>(
    userInfo?.theme?.textBanner || "#e7e5e4",
  );
  const [transparency, setTransparency] = useState<number>(
    Number(convertFromHexAlpha(userInfo?.theme.bgSecondary.slice(-2))) || 100,
  );

  const [description, setDescription] = useState<string>(userInfo?.description || "");
  const [socials, setSocials] = useState<any>(userInfo?.socials || {});

  const [editing, setEditing] = useState<boolean>(false);

  const MAX_SIZE = 5 * 1024 * 1024; //5mb

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (e.target.id == "dropzone-file-banner") {
      setBannerError(null);
      setBannerSuccess(false);
      setBannerLoading(true);
      setBannerPreview(URL.createObjectURL(file));


      if (file.size > MAX_SIZE) {
        setBannerError("File too large (max 5MB)");
        setBannerLoading(false);
        return;
      }

      try {
        await uploadProfileImage(file, "banner");

        setBannerSuccess(true);
      } catch (err: any) {
        setBannerError(err.message);
      }
      setBannerLoading(false);
    } else if (e.target.id == "dropzone-file-background") {
      setBackgroundError(null);
      setBackgroundSuccess(false);
      setBackgroundLoading(true);
      setBackgroundPreview(URL.createObjectURL(file));

      if (file.size > MAX_SIZE) {
        setBackgroundError("File too large (max 5MB)");
        setBannerLoading(false);
        return;
      }
      try {
        await uploadProfileImage(file, "background");
        setBackgroundSuccess(true);
      } catch (err: any) {
        setBackgroundError(err.message);
      }
      setBackgroundLoading(false);
    }
  };

  const uploadProfileImage = async (file: File, type: "banner" | "background") => {
    if (!user) throw new Error("Not authenticated");

    const token = await user.getIdToken();

    const res = await fetch("/api/upload-asset", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assetType: type, mime: file.type, fileSize: file.size }),
    })

    if (!res.ok) {
      throw new Error("Failed to get upload URL:" + res.statusText);
    }

    const { uploadUrl, publicUrl } = await res.json();

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        // "Content-Length": file.size.toString(),
      },
      body: file,
    })

    if (!uploadRes.ok) {
      throw new Error("Failed to upload file:" + uploadRes.statusText);
    }

    console.log("Uploaded file to R2:", publicUrl);

    await updateDoc(doc(db, "users", user.uid), {
      [type + "Path"]: publicUrl,
      updatedAt: serverTimestamp(),
    });
  }

  const handleReset = () => {
    setBgPrimary("#1c1917");
    setBgSecondary("#292524");
    setBgTertiary("#1c1917");
    setTextPrimary("#d6d3d1");
    setTextSecondary("#78716c");
    setTextMuted("#a8a29e");
    setBorderColor("#44403c");
    setIconColor("#57534e");
    setProgressTrack("#57534e");
    setProgressFill("#e7e5e4");
    setTextOnFill("#292524");
    setDigitInactive("#57534e");
    setDigitActive("#e7e5e4");
    setTextBanner("#e7e5e4");
    setTransparency(100);
    setEditing(true);
  };

  const handleColourChange = (id: string, value: string) => {
    setEditing(true);

    switch (id) {
      case "bgPrimary":
        setBgPrimary(value);
        break;
      case "bgSecondary":
        setBgSecondary(value);
        break;
      case "bgTertiary":
        setBgTertiary(value);
        break;
      case "textPrimary":
        setTextPrimary(value);
        break;
      case "textSecondary":
        setTextSecondary(value);
        break;
      case "textMuted":
        setTextMuted(value);
        break;
      case "borderColor":
        setBorderColor(value);
        break;
      case "iconColor":
        setIconColor(value);
        break;
      case "progressTrack":
        setProgressTrack(value);
        break;
      case "progressFill":
        setProgressFill(value);
        break;
      case "textOnFill":
        setTextOnFill(value);
        break;
      case "digitInactive":
        setDigitInactive(value);
        break;
      case "digitActive":
        setDigitActive(value);
        break;
      case "textBanner":
        setTextBanner(value);
    }
  };

  const handleDiscard = () => {
    handleColours(userInfo.theme);
    setEditing(false);
  };

  const handleTransparency = (value: any) => {
    setEditing(true);
    setTransparency(Number(value));
  };

  const handleSocialsChange = (id: string, value: string) => {
    setEditing(true);
    setSocials((prev: any) => ({ ...prev, [id]: value }));
  }

  const handleDescriptionChange = (value: string) => {
    if (value == description) {
      setEditing(false);
      return;
    }

    setEditing(true);
    setDescription(value);
  };

  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSaving(true);

    try {
      await updateTheme({
        bgPrimary: bgPrimary,
        bgSecondary: bgSecondary + convertToHexAlpha(transparency),
        bgTertiary: bgTertiary + convertToHexAlpha(transparency),
        textPrimary:
          textPrimary + convertToHexAlpha(Math.min(transparency * 2, 100)),
        textSecondary:
          textSecondary + convertToHexAlpha(Math.min(transparency * 2, 100)),
        textMuted:
          textMuted + convertToHexAlpha(Math.min(transparency * 2, 100)),
        borderColor: borderColor + convertToHexAlpha(transparency),
        iconColor:
          iconColor + convertToHexAlpha(Math.min(transparency * 2, 100)),
        progressTrack: progressTrack + convertToHexAlpha(transparency),
        progressFill: progressFill + convertToHexAlpha(transparency),
        textOnFill: textOnFill + convertToHexAlpha(transparency),
        digitInactive:
          digitInactive + convertToHexAlpha(Math.min(transparency * 2, 100)),
        digitActive:
          digitActive + convertToHexAlpha(Math.min(transparency * 2, 100)),
        textBanner: textBanner,
      },
        description, socials);
      setEditing(false);
      setSaving(false);
    } catch (err: any) {
      setSaveError(err.message);
    }
  };

  if (userInfo == null) {
    return (
      <div className="flex w-full h-full flex-col items-center justify-center gap-4 p-4 md:px-36 bg-stone-900 overflow-y-scroll">
        <div className="bg-stone-800 rounded-md p-4 text-center">
          <FaUserCog size={40} className="text-stone-400 mx-auto mt-2" />
          {error ? (
            <>
              <h1 className="text-2xl font-bold text-stone-200 p-4">
                The editor could not be loaded!
              </h1>
              <p className="text-5xl font-bold text-red-400">(ᗒᗣᗕ)</p>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-stone-200 p-4">
              Loading editor...
            </h1>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full h-full flex-col gap-4 p-4 md:px-36 bg-stone-900 overflow-y-scroll">
        {editing && (
          <div className="animate-slide-out fixed bottom-20 left-0 right-0 mx-auto w-fit z-100 bg-stone-800 border border-stone-700 text-lg rounded-md p-2 px-4 text-stone-200 font-bold shadow-lg shadow-black/50">
            <div className="w-full h-full flex items-center gap-2">
              <FaRotateRight className="animate-spin text-stone-500" />
              <h1 className="hidden md:block text-lg">{saveError ? saveError : "You have unsaved changes..."}</h1>
              <h1 className="md:hidden text-sm">{saveError ? saveError : "Unsaved Changes..."}</h1>
              <Button
                onClick={!saving ? handleSubmit : undefined}
                className={`${saving ? "bg-green-700 hover:bg-green-800 py-2" : "bg-stone-200"}  text-stone-800 hover:text-stone-200 px-3 py-1 rounded-md ml-5 font-normal text-sm md:text-base hover:bg-green-600`}
              >
                {saving ? <ScaleLoader color="#d6d3d1" height={10} /> : "Save"}
              </Button>
              <Button
                onClick={!saving ? handleDiscard : undefined}
                className="bg-stone-900 px-3 py-1.5 md:py-1 rounded-md font-normal text-sm md:text-base hover:bg-red-500"
              >
                Discard
              </Button>
            </div>
          </div>
        )}

        <div className="mx-auto ">
          <h1 className="text-white text-xl font-bold mb-2">Preview</h1>
          <div
            className={`select-none rounded-md min-w-[640px] h-[190px] border border-white/10 shadow-md justify-center flex gap-4 aspect-[640/365] $rounded-md overflow-hidden`}
            style={
              backgroundPreview
                ? {
                  backgroundImage: `url(${backgroundPreview})`,
                  backgroundSize: "100% auto",
                  backgroundPosition: "top",
                  backgroundColor: bgPrimary || "#1c1917",
                }
                : {
                  backgroundImage: `url(${userInfo?.backgroundUrl || ""})`,
                  backgroundSize: "100% auto",
                  backgroundPosition: "top",
                  backgroundColor: bgPrimary || "#1c1917",
                }
            }
          >
            <div
              className={`flex mt-8 w-[400px] h-fit aspect-[600/150] rounded-md`}
              style={
                bannerPreview
                  ? {
                    backgroundImage: `url(${bannerPreview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor:
                      bgSecondary + convertToHexAlpha(transparency) ||
                      "#292524",
                  }
                  : {
                    backgroundImage: `url(${userInfo?.bannerUrl || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor:
                      bgSecondary + convertToHexAlpha(transparency) ||
                      "#292524",
                  }
              }
            >
              <div className="ml-2 flex gap-2">
                <div className="-mt-12 w-[140px]">
                  <RobloxAvatar userId={claims?.userId || ""} />
                </div>

                <div className="flex flex-col py-5 px-5">
                  <h1
                    className="text-stone-200 text-4xl font-bold"
                    style={{
                      color: textBanner || undefined,
                    }}
                  >
                    user
                  </h1>
                  <h2
                    className="text-stone-400 -mt-1 text-xl"
                    style={{
                      color: textBanner || "#e7e5e4",
                    }}
                  >
                    @username
                  </h2>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor:
                  bgSecondary + convertToHexAlpha(transparency) || "#292524",
                borderColor:
                  borderColor + convertToHexAlpha(transparency) || "#44403c",
              }}
              className={`border rounded-md p-2 h-fit mt-8`}
            >
              <div className="flex gap-2 items-end mb-3 pr-2">
                <div
                  style={{
                    backgroundColor:
                      bgTertiary + convertToHexAlpha(transparency) || "#1c1917",
                  }}
                  className={`rounded-md p-2`}
                >
                  <FaStar
                    style={{
                      fill:
                        iconColor +
                        convertToHexAlpha(Math.min(transparency * 2, 100)) ||
                        "#57534e",
                    }}
                    size={20}
                  />
                </div>
                <h1
                  style={{
                    color:
                      textPrimary +
                      convertToHexAlpha(Math.min(transparency * 2, 100)) ||
                      "#d6d3d1",
                  }}
                  className={`text-3xl font-bold`}
                >
                  Text
                </h1>
                <h1
                  style={{
                    color:
                      textMuted +
                      convertToHexAlpha(Math.min(transparency * 2, 100)) ||
                      "#a8a29e",
                  }}
                  className={`text-xl font-bold`}
                >
                  Text
                </h1>
              </div>
              <div
                style={{
                  backgroundColor:
                    bgTertiary + convertToHexAlpha(transparency) || "#1c1917",
                }}
                className={`rounded-md px-2 py-1 flex text-3xl font-mono font-bold`}
              >
                <p
                  style={{
                    color:
                      digitInactive +
                      convertToHexAlpha(Math.min(transparency * 2, 100)) ||
                      "#57534e",
                  }}
                >
                  00
                </p>
                <p
                  style={{
                    color:
                      digitActive +
                      convertToHexAlpha(Math.min(transparency * 2, 100)) ||
                      "#e7e5e4",
                  }}
                >
                  10
                </p>
              </div>
            </div>
          </div>
          <p className="text-stone-400 text-[10px] md:text-sm font-mono mt-2">
            * Not accurate sizing, only displaying top half of profile.
          </p>
        </div>

        <div>
          <div className="flex flex-col md:flex-row gap-2 md:px-36">
            {/* Banner Dropzone */}
            <div className="w-full">
              <h1 className="text-white text-xl font-bold mb-1">Banner</h1>
              <p className="text-stone-400 mb-4">
                Upload a banner image for your profile.
              </p>
              <Dropzone
                onUpload={handleUpload}
                type="banner"
                success={bannerSuccess}
                loading={bannerLoading}
                errorMessage={bannerError || undefined}
                background={bannerPreview || userInfo?.bannerUrl || ""}
              />
            </div>

            {/* Background Dropzone */}
            <div className="w-full">
              <h1 className="text-white text-xl font-bold mb-1">Background</h1>
              <p className="text-stone-400 mb-4">
                Upload a background image for your profile.
              </p>
              <div className="flex gap-2">
                <Dropzone
                  onUpload={handleUpload}
                  type="background"
                  success={backgroundSuccess}
                  loading={backgroundLoading}
                  errorMessage={backgroundError || undefined}
                  background={
                    backgroundPreview || userInfo?.backgroundUrl || ""
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <div className="bg-[#292524] rounded-md p-4 mt-3 w-fit">
              <h1 className="text-white text-xl font-bold mb-1">
                Colour Scheme
              </h1>
              <p className="text-stone-400 mb-4">
                Customize the theme and colours of your profile
              </p>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col gap-2 bg-stone-900 p-4 rounded-md">
                  <h1 className="text-stone-200 text-lg font-bold">
                    Background
                  </h1>
                  <div className="grid grid-cols-3 gap-2">
                    <ColourPicker
                      id="bgSecondary"
                      label="Primary"
                      value={bgSecondary}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="bgTertiary"
                      label="Secondary"
                      value={bgTertiary}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="borderColor"
                      label="Border"
                      value={borderColor}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="iconColor"
                      label="Icon"
                      value={iconColor}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="bgPrimary"
                      label="Back"
                      value={bgPrimary}
                      onChange={handleColourChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 bg-stone-900 p-4 rounded-md">
                  <h1 className="text-stone-200 text-lg font-bold">Text</h1>
                  <div className="grid grid-cols-4 gap-2">
                    <ColourPicker
                      id="textPrimary"
                      label="Primary"
                      value={textPrimary}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="textSecondary"
                      label="Secondary"
                      value={textSecondary}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="textMuted"
                      label="Muted"
                      value={textMuted}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="textBanner"
                      label="Banner"
                      value={textBanner}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="digitActive"
                      label="Digit Active"
                      value={digitActive}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="digitInactive"
                      label="Digit Inactive"
                      value={digitInactive}
                      onChange={handleColourChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 bg-stone-900 p-4 rounded-md">
                  <h1 className="text-stone-200 text-lg font-bold">Other</h1>
                  <div className="grid grid-cols-2 gap-2">
                    <ColourPicker
                      id="progressTrack"
                      label="Progress Track"
                      value={progressTrack}
                      onChange={handleColourChange}
                    />
                    <ColourPicker
                      id="progressFill"
                      label="Progress Fill"
                      value={progressFill}
                      onChange={handleColourChange}
                    />
                  </div>

                  <label
                    htmlFor="transparency"
                    className="mb-2 text-sm font-bold text-stone-300"
                  >
                    Transparency
                  </label>
                  <input
                    id="transparency"
                    type="range"
                    value={transparency}
                    step={10}
                    min={30}
                    onChange={(e) => handleTransparency(e.target.value)}
                    className="w-full accent-stone-200 h-2 bg-stone-700 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
              <Button
                className="bg-stone-900 py-2 px-3 flex gap-3 mt-3 text-stone-300 hover:text-red-100 hover:bg-red-500 group"
                onClick={() => {
                  handleReset();
                }}
              >
                <FaRotateRight /> Reset to Defaults
              </Button>
            </div>

            <div className="bg-stone-800 rounded-md p-4 mt-3">
              <h1 className="text-white text-xl font-bold mb-1">
                Description
              </h1>
              <p className="text-stone-400 mb-4">
                Edit your profile&apos;s description and socials
              </p>
              <div className="flex flex-col gap-2">
                <textarea
                  maxLength={130}
                  rows={5}
                  className="w-full md:w-96 p-2 rounded-md bg-stone-900 text-stone-200 border border-stone-700 focus:outline-none focus:border-stone-500 resize-none"
                  placeholder="Write something about yourself..."
                  value={description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                />

                <div className="bg-stone-900 text-stone-200 rounded-md grid grid-cols-2 gap-1 p-3 ">
                  <div className="flex items-center gap-3 w-fit">
                    <FaDiscord size={28} className="text-stone-400" />
                    <input
                      type="text"
                      id="discord"
                      className="bg-stone-800 rounded-md p-0.5 px-2 w-[120px] text-stone-200 border border-stone-700 focus:outline-none focus:border-stone-500"
                      placeholder="Username"
                      value={socials.discord || ''}
                      onChange={(e) => handleSocialsChange('discord', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3 w-fit">
                    <FaYoutube size={28} className="text-stone-400" />
                    <input
                      type="text"
                      id="youtube"
                      className="bg-stone-800 rounded-md p-0.5 px-2 w-[120px] text-stone-200 border border-stone-700 focus:outline-none focus:border-stone-500"
                      placeholder="Username"
                      value={socials.youtube || ''}
                      onChange={(e) => handleSocialsChange('youtube', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mt-2 gap-3 w-fit">
                    <FaTwitter size={28} className="text-stone-400" />
                    <input
                      type="text"
                      id="twitter"
                      className="bg-stone-800 rounded-md p-0.5 px-2 w-[120px] text-stone-200 border border-stone-700 focus:outline-none focus:border-stone-500"
                      placeholder="Username"
                      value={socials.twitter || ''}
                      onChange={(e) => handleSocialsChange('twitter', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mt-2 gap-3 w-fit">
                    <FaTiktok size={28} className="text-stone-400" />
                    <input
                      type="text"
                      id="tiktok"
                      className="bg-stone-800 rounded-md p-0.5 px-2 w-[120px] text-stone-200 border border-stone-700 focus:outline-none focus:border-stone-500"
                      placeholder="Username"
                      value={socials.tiktok || ''}
                      onChange={(e) => handleSocialsChange('tiktok', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileEdit;
