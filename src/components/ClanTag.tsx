"use client";

import { useEffect, useState } from "react";

interface ClanTagProps {
  text: string;
  colorR: number;
  colorG: number;
  colorB: number;
  colorR2: number;
  colorG2: number;
  colorB2: number;
  colorMode: "fade" | "gradiant" | "gradiant2" | "gradiant3" | "static"; // ak6 cant spell lol "gradiant"
}

export default function ClanTag({
  text,
  colorR,
  colorG,
  colorB,
  colorR2,
  colorG2,
  colorB2,
  colorMode,
}: ClanTagProps) {
  // converts the float vals to 255
  function rgbFloatTo255(r: number, g: number, b: number): string {
    const to255 = (v: number) => Math.round(Math.min(Math.max(v, 0), 1) * 255);
    if (r <= 0.01 && g <= 0.01 && b <= 0.01 && colorMode === "fade") {
      // treat black as transparent
      return "transparent";
    }
    return `rgb(${to255(r)}, ${to255(g)}, ${to255(b)})`;
  }

  const color1 = rgbFloatTo255(colorR, colorG, colorB);
  const color2 = rgbFloatTo255(colorR2, colorG2, colorB2);

  const [fadeColor, setFadeColor] = useState(color1);

  useEffect(() => {
    if (colorMode !== "fade") return;

    let toggle = false;
    const interval = setInterval(() => {
      toggle = !toggle;
      setFadeColor(toggle ? color2 : color1);
    }, 1000);

    return () => clearInterval(interval);
  }, [color1, color2, colorMode]);

  if (colorMode === "gradiant" || colorMode === "gradiant2") {
    return (
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
        }}
      >
        {text}
      </span>
    );
  }

  if (colorMode === "gradiant3") {
    return (
      <span
        className="gradiant3"
        style={{ "--c1": color1, "--c2": color2 } as React.CSSProperties}
      >
        {text}
      </span>
    );
  }

  if (colorMode === "fade") {
    return (
      <span style={{ color: fadeColor, transition: "color 1s" }}>{text}</span>
    );
  }

  // static
  return <span style={{ color: color1 }}>{text}</span>;
}
