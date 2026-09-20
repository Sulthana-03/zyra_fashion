"use client";

import { useState } from "react";

// A palette of friendly, on-brand background colors for the generated fallback.
const PALETTE = ["#FFC72C", "#FFE8A3", "#FFD9E0", "#E85D75", "#111111", "#FFF3CE"];

function hashStr(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function fallbackDataUri(label = "ZYRA") {
  const h = hashStr(label);
  const bg = PALETTE[h % PALETTE.length];
  const textColor = bg === "#111111" ? "#FFC72C" : "#171412";
  const words = label.trim().split(/\s+/).slice(0, 3).join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750">
    <rect width="100%" height="100%" fill="${bg}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="600" fill="${textColor}">
      ${words.replace(/&/g, "&amp;").replace(/</g, "").replace(/>/g, "")}
    </text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/**
 * Drop-in replacement for <img> (and next/image's fill usage) that always
 * renders *something* meaningful — if the remote photo 404s or the network
 * blocks it, it swaps to a generated on-brand placeholder instead of a
 * broken-image icon.
 */
export default function SafeImage({ src, alt = "ZYRA", className = "", fill = false, style, ...rest }) {
  const [errored, setErrored] = useState(false);
  const finalSrc = errored || !src ? fallbackDataUri(alt) : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
      // backgroundColor here matters more than it looks: without an explicit
      // background, some mobile browsers paint the <img> box solid BLACK for
      // a frame or two while a photo is still decoding (especially while
      // swiping fast through a horizontal carousel, where several images
      // start decoding at once). Giving the element itself an on-brand cream
      // background means that brief undecoded moment shows cream, never black.
      style={
        fill
          ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", backgroundColor: "#F7F1E6", ...style }
          : { backgroundColor: "#F7F1E6", ...style }
      }
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
