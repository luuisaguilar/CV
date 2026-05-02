"use client";

import { useEffect, useRef, MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { TIER1_PROJECTS } from "@/lib/tokens";
import ProjectLinks from "@/components/ui/ProjectLinks";
import ProjectThumb from "@/components/ui/ProjectThumb";

// 3D Tilt card
function TiltCard({
  children,
  color,
  colorDim,
  featured,
}: {
  children: React.ReactNode;
  color: string;
  colorDim: string;
  featured: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    // Spotlight + glare
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    card.style.setProperty("--glare-x", `${glareX}%`);
    card.style.setProperty("--glare-y", `${glareY}%`);
    card.style.setProperty("--glare-opacity", "0.14");
    card.style.setProperty("--spot-opacity", "0.55");
  };

  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(900px) rotateX(0) rotateY(0) scale(1)";
      cardRef.current.style.setProperty("--glare-opacity", "0");
      cardRef.current.style.setProperty("--spot-opacity", "0");
    }
  };

  return (
    <div
      ref={cardRef}
      data-cursor
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        background: "#13131f",
        border: `1px solid ${colorDim}`,
        borderRadius: "20px",
        padding: featured ? "2.5rem" : "2rem",
        cursor: "default",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s",
        boxShadow: `0 0 0 rgba(0,0,0,0)`,
        gridColumn: featured ? "span 2" : "span 1",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${colorDim}`;
      }}
    >
      {/* Spotlight (color-tinted) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "20px",
          background: `radial-gradient(circle 320px at var(--glare-x, 50%) var(--glare-y, 50%), ${color}26 0%, ${color}10 25%, transparent 70%)`,
          opacity: "var(--spot-opacity, 0)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "opacity 0.25s",
          mixBlendMode: "screen",
        }}
      />
      {/* Specular glare (white highlight) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "20px",
          background:
            "radial-gradient(circle 220px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,var(--glare-opacity,0)) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "opacity 0.2s",
        }}
      />
      {/* Color accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          borderRadius: "20px 20px 0 0",
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  active: "#00D4AA",
  deployed: "#7C3AED",
  prototype: "#FF6B35",
  legacy: "#606080",
};

export default function ProjectsTier1() {
  const t = useTranslations("projects");
  const t1 = useTranslations("tier1");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
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
      id="projects"
      ref={sectionRef}
      className="section-pad"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#7C3AED",
            letterSpacing: "0.12em",
            marginBottom: "0.75rem",
          }}
        >
          03 / WORK
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
          {t("featured_title")}
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
        }}
      >
        {TIER1_PROJECTS.map((project) => {
          const name = t1(`${project.id}_name` as Parameters<typeof t1>[0]);
          const tag = t1(`${project.id}_tag` as Parameters<typeof t1>[0]);
          const desc = t1(`${project.id}_desc` as Parameters<typeof t1>[0]);
          const statusLabel = t(`status_${project.status}` as Parameters<typeof t>[0]);
          const dotColor = STATUS_COLORS[project.status] ?? "#606080";

          return (
            <div
              key={project.id}
              className="reveal"
              style={{ gridColumn: project.featured ? "span 2" : "span 1" }}
            >
              <TiltCard
                color={project.color}
                colorDim={project.colorDim}
                featured={project.featured}
              >
                {/* Thumbnail */}
                <div style={{ marginBottom: project.featured ? "1.75rem" : "1.25rem" }}>
                  <ProjectThumb
                    src={project.image}
                    alt={name}
                    monogram={project.monogram}
                    color={project.color}
                    colorDim={project.colorDim}
                    aspect={project.featured ? "21 / 9" : "16 / 10"}
                    variant="browser"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1.25rem",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        color: project.color,
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: "0.35rem",
                        opacity: 0.8,
                      }}
                    >
                      {tag}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: project.featured ? "1.75rem" : "1.25rem",
                        letterSpacing: "-0.02em",
                        color: "#f0f0ff",
                      }}
                    >
                      {name}
                    </h3>
                  </div>

                  {/* Status badge */}
                  <span
                    className="badge"
                    style={{
                      background: `${dotColor}18`,
                      color: dotColor,
                      border: `1px solid ${dotColor}30`,
                    }}
                  >
                    <span className="status-dot" style={{ background: dotColor }} />
                    {statusLabel}
                  </span>
                </div>

                <p
                  style={{
                    color: "#a0a0c0",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    marginBottom: "1.5rem",
                    maxWidth: project.featured ? "640px" : "100%",
                  }}
                >
                  {desc}
                </p>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        color: "#606080",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "6px",
                        padding: "0.2rem 0.6rem",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links / Policy badges */}
                <ProjectLinks
                  github={project.github}
                  githubPolicy={project.githubPolicy}
                  demo={project.demo}
                  demoPolicy={project.demoPolicy}
                  color={project.color}
                />
              </TiltCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
