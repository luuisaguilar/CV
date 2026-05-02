"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { SERVICES } from "@/lib/tokens";

export default function ServicesSection() {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 60);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-pad"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header — split layout: subtitle | title */}
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 200px) 1fr",
          gap: "2rem",
          alignItems: "start",
          marginBottom: "4rem",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#7C3AED",
            letterSpacing: "0.12em",
            paddingTop: "0.6rem",
          }}
        >
          02 / SERVICES
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-0.03em",
            color: "#f0f0ff",
            lineHeight: 1.1,
            maxWidth: "880px",
          }}
        >
          {t("title")}
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {SERVICES.map((svc) => {
          const title = t(`${svc.id}_title` as Parameters<typeof t>[0]);
          const desc = t(`${svc.id}_desc` as Parameters<typeof t>[0]);

          return (
            <div
              key={svc.id}
              className="reveal"
              data-cursor
              style={{
                background: "#0f0f1a",
                padding: "2rem 1.75rem",
                cursor: "default",
                transition: "background 0.3s, transform 0.3s",
                position: "relative",
                minHeight: "240px",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = `linear-gradient(135deg, ${svc.color}10 0%, #0f0f1a 60%)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "#0f0f1a";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: "1.6rem",
                  color: svc.color,
                  marginBottom: "1.25rem",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  background: `${svc.color}15`,
                  border: `1px solid ${svc.color}30`,
                }}
              >
                {svc.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.01em",
                  color: "#f0f0ff",
                  marginBottom: "0.6rem",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#a0a0c0",
                  lineHeight: 1.65,
                  flexGrow: 1,
                }}
              >
                {desc}
              </p>

              {/* Subtle bottom indicator */}
              <div
                style={{
                  marginTop: "1.5rem",
                  height: "1px",
                  background: `linear-gradient(90deg, ${svc.color}40 0%, transparent 80%)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
