"use client";

import React, { FC, useEffect, useRef } from "react";
import * as skinView3D from "skinview3d";

type MinecraftRendererProps = {
  uuid: string,
  username: string,
};

const MinecraftRenderer: FC<MinecraftRendererProps> = ({ uuid, username }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const skinViewer = new skinView3D.SkinViewer({
      canvas: canvasRef.current,
      width: 350,
      height: 450,
      skin: "https://skins.mcstats.com/raw/" + uuid,
      animation: new skinView3D.IdleAnimation()
    });

    skinViewer.loadCape("https://skins.mcstats.com/raw/" + uuid);

    skinViewer.zoom = 1.5;
    skinViewer.camera.position.x = -10
    skinViewer.camera.position.y = 8.5;
    skinViewer.controls.target.y = 8.5;
    skinViewer.controls.enableRotate =true;
    skinViewer.controls.enableZoom = false;  
    skinViewer.controls.enableDamping = true

    const horizontalOnlyOffset = Math.PI / 12;
    skinViewer.controls.minPolarAngle = Math.PI / 2 - horizontalOnlyOffset; // lock horizontal rotation only
    skinViewer.controls.maxPolarAngle = Math.PI / 2 + horizontalOnlyOffset; // lock horizontal rotation only

    skinViewer.nameTag = new skinView3D.NameTagObject(username, {
      textStyle: "rgb(255, 85, 85)",
      font: "italic 48px Minecraft",
      backgroundStyle: "rgba(0, 0, 0, 0.2)",
    });

    return () => {
      skinViewer.dispose();
    };
  }, []);

  return (
    // ml-[-100px] mt-[-80px] mb-[-400px]
    <div className="overflow-hidden mt-[-130px]">
        <canvas ref={canvasRef}></canvas>
    </div>
  ) ;
};

export default MinecraftRenderer;
