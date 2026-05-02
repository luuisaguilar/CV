"use client";

import { useState } from "react";

interface AvatarFrameProps {
  src?: string;
  alt: string;
  initials?: string;
  size?: number;
}

export default function AvatarFrame({
  src,
  alt,
  initials = "LA",
  size = 320,
}: AvatarFrameProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!src && !imgFailed;

  const ringSize = size;
  const photoSize = Math.round(size * 0.78);

  return (
    <div
      style={{
        position: "relative",
        width: ringSize,
        height: ringSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden={showImage ? undefined : true}
    >
      {/* Outer rotating ring with orbit dot */}
      <div
        className="orbit-ring"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid rgba(124,58,237,0.18)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#7C3AED",
            boxShadow: "0 0 12px #7C3AED",
          }}
        />
      </div>

      {/* Inner glow halo */}
      <div
        style={{
          position: "absolute",
          width: photoSize + 28,
          height: photoSize + 28,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(0,212,170,0.12) 50%, transparent 75%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      {/* Photo / initials */}
      <div
        style={{
          position: "relative",
          width: photoSize,
          height: photoSize,
          borderRadius: "50%",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
          boxShadow:
            "0 12px 48px rgba(124,58,237,0.25), inset 0 0 0 1px rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            width={photoSize}
            height={photoSize}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            aria-label={alt}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: `${Math.round(photoSize * 0.34)}px`,
              letterSpacing: "-0.04em",
              background:
                "linear-gradient(135deg, #7C3AED 0%, #00D4AA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              userSelect: "none",
            }}
          >
            {initials}
          </span>
        )}

        {/* Subtle inner ring on top of photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow: "inset 0 0 80px rgba(8,8,16,0.4)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Status badge (available for work) */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "8%",
          background: "rgba(8,8,16,0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0,212,170,0.35)",
          borderRadius: "999px",
          padding: "0.35rem 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#00D4AA",
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}
      >
        <span
          className="status-dot"
          style={{ background: "#00D4AA", width: 6, height: 6 }}
        />
        AVAILABLE
      </div>

      <style>{`
        .orbit-ring {
          animation: orbit-spin 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring { animation: none; }
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
