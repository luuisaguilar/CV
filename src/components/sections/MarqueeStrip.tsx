"use client";

import { STACK_ITEMS } from "@/lib/tokens";

const ITEMS = STACK_ITEMS.map((s) => s.label);
const DOUBLED = [...ITEMS, ...ITEMS, ...ITEMS];

export default function MarqueeStrip() {
  return (
    <section
      aria-hidden="true"
      style={{
        position: "relative",
        padding: "3rem 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(15,15,26,0.5)",
        overflow: "hidden",
      }}
    >
      {/* Edge gradients */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, #080810 0%, transparent 12%, transparent 88%, #080810 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div className="marquee-track">
        {DOUBLED.map((label, i) => (
          <div key={`${label}-${i}`} className="marquee-item">
            <span style={{ fontFamily: "'Syne', sans-serif" }}>{label}</span>
            <span
              aria-hidden="true"
              style={{
                color: "#7C3AED",
                opacity: 0.4,
                margin: "0 2rem",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ◆
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #a0a0c0;
          white-space: nowrap;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
