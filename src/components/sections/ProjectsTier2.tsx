"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { TIER2_PROJECTS } from "@/lib/tokens";

const STATUS_COLORS: Record<string, string> = {
  active: "#00D4AA",
  deployed: "#7C3AED",
  prototype: "#FF6B35",
  legacy: "#606080",
};

export default function ProjectsTier2() {
  const t = useTranslations("projects");
  const t2 = useTranslations("tier2");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
      ref={sectionRef}
      className="section-pad"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "2rem",
      }}
    >
      <div className="reveal" style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#a0a0c0",
            letterSpacing: "-0.01em",
          }}
        >
          {t("other_title")}
        </h3>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {TIER2_PROJECTS.map((project) => {
          const name = t2(`${project.id}_name` as Parameters<typeof t2>[0]);
          const desc = t2(`${project.id}_desc` as Parameters<typeof t2>[0]);
          const statusLabel = t(`status_${project.status}` as Parameters<typeof t>[0]);
          const dotColor = STATUS_COLORS[project.status] ?? "#606080";

          return (
            <div
              key={project.id}
              className="reveal"
              data-cursor
              style={{
                padding: "1.5rem",
                background: "#13131f",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                cursor: "default",
                transition: "background 0.25s, border-color 0.25s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "#181828";
                el.style.borderColor = `${project.color}30`;
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "#13131f";
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Accent dot */}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: project.color,
                  marginBottom: "1rem",
                  boxShadow: `0 0 8px ${project.color}60`,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.6rem",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#f0f0ff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {name}
                </h4>
                <span
                  className="badge"
                  style={{
                    background: `${dotColor}18`,
                    color: dotColor,
                    fontSize: "0.65rem",
                  }}
                >
                  <span
                    className="status-dot"
                    style={{ background: dotColor }}
                  />
                  {statusLabel}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#606080",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                {desc}
              </p>

              {/* Tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#606080",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "4px",
                      padding: "0.15rem 0.5rem",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
