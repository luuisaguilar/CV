"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";
import AvatarFrame from "@/components/ui/AvatarFrame";

const DotField = dynamic(() => import("@/components/canvas/DotField"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const roles = t.raw("roles") as string[];
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Cycle through roles with fade — pauses for prefers-reduced-motion users
  useEffect(() => {
    const mq = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    if (mq?.matches) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Entrance animation on mount
  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current].filter(Boolean);
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
      className="hero-gradient"
    >
      {/* Interactive dot field background */}
      <DotField />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "7rem 1.5rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "4rem",
        }}
      >
        {/* Left: Text */}
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              color: "#7C3AED",
              letterSpacing: "0.12em",
              marginBottom: "1.25rem",
              opacity: 0,
              animation: "fadeUp 0.8s 0.1s forwards cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {t("greeting")}
          </p>

          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#f0f0ff",
              marginBottom: "1rem",
            }}
          >
            {t("name")}
          </h1>

          {/* Animated role */}
          <div
            style={{
              height: "2.2rem",
              marginBottom: "1.5rem",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                letterSpacing: "-0.02em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                background: "linear-gradient(135deg, #7C3AED 0%, #00D4AA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {roles[roleIdx]}
            </p>
          </div>

          <p
            ref={subtitleRef}
            style={{
              fontSize: "1.05rem",
              color: "#a0a0c0",
              lineHeight: 1.75,
              maxWidth: "480px",
              marginBottom: "2.5rem",
            }}
          >
            {t("tagline")}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <MagneticButton
              href="#projects"
              className=""
              style={{
                padding: "0.9rem 2rem",
                borderRadius: "999px",
                background: "#7C3AED",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "background 0.25s, box-shadow 0.25s",
                boxShadow: "0 0 24px rgba(124,58,237,0.35)",
              }}
            >
              {t("cta_primary")}
            </MagneticButton>

            <MagneticButton
              href="/cv.pdf"
              className=""
              style={{
                padding: "0.9rem 2rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#f0f0ff",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "background 0.25s, border-color 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span aria-hidden="true">↓</span>
              {tCommon("download_cv")}
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className=""
              style={{
                padding: "0.9rem 2rem",
                borderRadius: "999px",
                background: "transparent",
                color: "#a0a0c0",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
            >
              {t("cta_secondary")} →
            </MagneticButton>
          </div>
        </div>

        {/* Right: avatar frame */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AvatarFrame
            // To use a real photo, drop a square image at /public/avatar.jpg
            // and pass it as `src="/avatar.jpg"`. Until then the initials fallback renders.
            alt={t("name")}
            initials="LA"
            size={340}
          />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "#606080",
          fontSize: "0.7rem",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.1em",
          animation: "fadeUp 1s 1.2s both",
        }}
      >
        <span>{t("scroll")}</span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, #7C3AED, transparent)",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
        @media (max-width: 768px) {
          #hero > div:first-of-type + div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
