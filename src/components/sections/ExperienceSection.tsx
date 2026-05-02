"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { EXPERIENCES } from "@/lib/tokens";

export default function ExperienceSection() {
  const t = useTranslations("experience");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 90);
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
      id="experience"
      ref={sectionRef}
      className="section-pad"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#7C3AED",
            letterSpacing: "0.12em",
            marginBottom: "0.75rem",
          }}
        >
          04 / EXPERIENCE
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.03em",
            color: "#f0f0ff",
          }}
        >
          {t("title")}
        </h2>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          paddingLeft: "2rem",
        }}
      >
        {/* Vertical rail */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "7px",
            top: "8px",
            bottom: "8px",
            width: "1px",
            background:
              "linear-gradient(to bottom, rgba(124,58,237,0.45), rgba(0,212,170,0.18) 60%, transparent)",
          }}
        />

        {EXPERIENCES.map((exp) => {
          const role = t(`${exp.id}_role` as Parameters<typeof t>[0]);
          const company = t(`${exp.id}_company` as Parameters<typeof t>[0]);
          const desc = t(`${exp.id}_desc` as Parameters<typeof t>[0]);

          return (
            <div
              key={exp.id}
              className="reveal"
              style={{
                position: "relative",
                paddingBottom: "2.5rem",
              }}
            >
              {/* Node dot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-2rem",
                  top: "6px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#080810",
                  border: `2px solid ${exp.color}`,
                  boxShadow: `0 0 16px ${exp.color}80`,
                }}
              />
              {/* Inner pulse */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "calc(-2rem + 4px)",
                  top: "10px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: exp.color,
                  opacity: 0.7,
                }}
              />

              {/* Card content */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  marginBottom: "0.4rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: exp.color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: `${exp.color}18`,
                    border: `1px solid ${exp.color}33`,
                    borderRadius: "4px",
                    padding: "0.15rem 0.55rem",
                  }}
                >
                  {exp.period}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#606080",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {t(`type_${exp.type}` as Parameters<typeof t>[0])}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  letterSpacing: "-0.02em",
                  color: "#f0f0ff",
                  marginBottom: "0.25rem",
                }}
              >
                {role}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: exp.color,
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                {company}
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#a0a0c0",
                  lineHeight: 1.7,
                  maxWidth: "640px",
                }}
              >
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
