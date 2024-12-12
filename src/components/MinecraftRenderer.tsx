"use client";

import Image from "next/image";
import React, { FC, useEffect, useRef } from "react";
import * as skinView3D from "skinview3d";

type MinecraftRendererProps = {
  uuid: string;
  username: string;
  rank: string;
  currentAnimation: string;
  zoomEnabled?: boolean;
};

const MinecraftRenderer: FC<MinecraftRendererProps> = ({
  uuid,
  username,
  rank,
  currentAnimation,
  zoomEnabled,
}) => {
  const canvasRef = useRef(null);
  const skinViewerRef = useRef<skinView3D.SkinViewer | null>(null);

  useEffect(() => {
    const skinViewer = new skinView3D.SkinViewer({
      canvas: canvasRef.current
        ? (canvasRef.current as HTMLCanvasElement)
        : undefined,
      width: 300,
      height: 400,
      skin: "https://skins.mcstats.com/raw/" + uuid,
    });

    skinViewerRef.current = skinViewer;

    if (currentAnimation === "idle") {
      skinViewer.animation = new skinView3D.IdleAnimation();
    } else if (currentAnimation === "walk") {
      skinViewer.animation = new skinView3D.WalkingAnimation();
    } else if (currentAnimation === "run") {
      skinViewer.animation = new skinView3D.RunningAnimation();
    }

    skinViewer.zoom = 1.5;
    skinViewer.camera.position.x = -10;
    skinViewer.camera.position.y = 10;
    skinViewer.controls.target.y = 10;
    skinViewer.controls.enableRotate = true;
    skinViewer.controls.enableZoom = zoomEnabled ? zoomEnabled : false;
    skinViewer.controls.enableDamping = true;

    const horizontalOnlyOffset = Math.PI / 12;
    skinViewer.controls.minPolarAngle = Math.PI / 2 - horizontalOnlyOffset; // lock horizontal rotation only
    skinViewer.controls.maxPolarAngle = Math.PI / 2 + horizontalOnlyOffset; // lock horizontal rotation only

    skinViewer.nameTag = new skinView3D.NameTagObject(username, {
      textStyle:
        rank === "admin"
          ? "rgb(255, 85, 85)"
          : rank === "moderator"
          ? "rgb(85, 85, 255)"
          : "rgb(155,155, 155)",
      font: "italic 48px Minecraft",
      backgroundStyle: "rgba(0, 0, 0, 0.2)",
    });

    return () => {
      if (skinViewerRef.current) {
        skinViewerRef.current.dispose();
        skinViewerRef.current = null;
      }
    };
  }, [rank, uuid, username, currentAnimation, zoomEnabled]);

  return (
    <div className="h-[340px] overflow-hidden mt-[-160px] ml-[-30px]">
      {canvasRef ? (
        <canvas className="hover:cursor-pointer" ref={canvasRef}></canvas>
      ) : (
        <Image
          width={448}
          height={724}
          src={"https://skins.mcstats.com/body/front/<uuid>?scale=2&fov=50&shadow=true&disableCosmeticType=all&fallbackTexture=steve&overlay=true&cropMeasurement=pixels&expandMeasurement=pixels&cropLeft=0&cropRight=0&cropTop=0&cropBottom=350&expandLeft=0&expandRight=0&expandTop=0&expandBottom=0&alwaysSquare=false&grayscale=false".replace(
            "<uuid>",
            uuid
          )}
          className="w-[300px] overflow-hidden mt-[-80px]"
          draggable={false}
          alt="Avatar failed to load"
        />
      )}
    </div>
  );
};

export default MinecraftRenderer;
