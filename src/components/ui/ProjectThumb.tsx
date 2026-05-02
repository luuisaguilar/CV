"use client";

import { useState } from "react";

interface ProjectThumbProps {
  src?: string | null;
  alt: string;
  monogram?: string;
  color: string;
  colorDim: string;
  aspect?: string;
  variant?: "browser" | "card";
}

export default function ProjectThumb({
  src,
  alt,
  monogram = "LA",
  color,
  colorDim,
  aspect = "16 / 9",
  variant = "browser",
}: ProjectThumbProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!src && !imgFailed;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: "14px",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${colorDim} 0%, rgba(8,8,16,0.6) 100%)`,
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: `0 12px 36px rgba(0,0,0,0.35), 0 0 0 1px ${colorDim} inset`,
      }}
    >
      {/* Browser chrome (mock) */}
      {variant === "browser" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "22px",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "0 10px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            zIndex: 2,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "rgba(255,107,53,0.6)",
            }}
          />
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "rgba(247,201,72,0.6)",
            }}
          />
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "rgba(0,212,170,0.6)",
            }}
          />
        </div>
      )}

      {/* Image or procedural fallback */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: variant === "browser" ? "22px" : 0,
        }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src as string}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div
            aria-label={alt}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                `radial-gradient(circle at 30% 20%, ${color}22 0%, transparent 60%),` +
                `radial-gradient(circle at 80% 90%, ${colorDim} 0%, transparent 70%),` +
                `linear-gradient(135deg, #0f0f1a 0%, #13131f 100%)`,
              position: "relative",
            }}
          >
            {/* Grid pattern overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  `linear-gradient(${color}10 1px, transparent 1px),` +
                  `linear-gradient(90deg, ${color}10 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
                opacity: 0.5,
              }}
            />
            <span
              style={{
                position: "relative",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                letterSpacing: "-0.04em",
                color,
                opacity: 0.85,
                textShadow: `0 0 40px ${color}66`,
                userSelect: "none",
              }}
            >
              {monogram}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
