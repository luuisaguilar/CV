"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { STACK_ITEMS } from "@/lib/tokens";

const STATS = [
  { key: "stat_projects", value: 30, suffix: "+" },
  { key: "stat_years", value: 5, suffix: "+" },
  { key: "stat_businesses", value: 2, suffix: "" },
  { key: "stat_automations", value: 40, suffix: "+" },
] as const;

const HIGHLIGHTS = [
  { id: "strategic", color: "#7C3AED", icon: "◆" },
  { id: "ai", color: "#00D4AA", icon: "◇" },
  { id: "systems", color: "#FF6B35", icon: "▣" },
  { id: "ops", color: "#a78bfa", icon: "✦" },
] as const;

function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = String(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}

function StatItem({
  statKey,
  value,
  suffix,
}: {
  statKey: string;
  value: number;
  suffix: string;
}) {
  const t = useTranslations("about");
  const numRef = useCountUp(value);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "1.5rem",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "2.5rem",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: "0.5rem",
          background: "linear-gradient(135deg, #7C3AED, #00D4AA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <span ref={numRef}>0</span>
        {suffix}
      </div>
      <p
        style={{
          fontSize: "0.78rem",
          color: "#606080",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.04em",
        }}
      >
        {t(statKey as Parameters<typeof t>[0])}
      </p>
    </div>
  );
}

export default function AboutSection() {
  const t = useTranslations("about");
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="reveal" style={{ marginBottom: "4rem" }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#7C3AED",
            letterSpacing: "0.12em",
            marginBottom: "0.75rem",
          }}
        >
          01 / ABOUT
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* Bio */}
        <div className="reveal">
          <p
            style={{
              fontSize: "1.1rem",
              color: "#a0a0c0",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            {t("bio")}
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {STATS.map((s) => (
              <StatItem
                key={s.key}
                statKey={s.key}
                value={s.value}
                suffix={s.suffix}
              />
            ))}
          </div>
        </div>

        {/* Stack grid */}
        <div className="reveal">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#606080",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            {t("stack_title")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
            }}
          >
            {STACK_ITEMS.map((item) => (
              <div
                key={item.label}
                data-cursor
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px",
                  cursor: "default",
                  transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(124,58,237,0.08)";
                  el.style.borderColor = "rgba(124,58,237,0.25)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "1rem", color: item.color }}>
                  {item.icon}
                </span>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#a0a0c0",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlight cards — how I think */}
      <div className="reveal" style={{ marginTop: "5rem" }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#606080",
            letterSpacing: "0.1em",
            marginBottom: "1.5rem",
          }}
        >
          {t("highlights_title")}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {HIGHLIGHTS.map((h) => {
            const title = t(`highlights.${h.id}_title` as Parameters<typeof t>[0]);
            const desc = t(`highlights.${h.id}_desc` as Parameters<typeof t>[0]);
            return (
              <div
                key={h.id}
                data-cursor
                style={{
                  padding: "1.5rem 1.5rem 1.75rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "16px",
                  transition: "background 0.25s, border-color 0.25s, transform 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = `linear-gradient(135deg, ${h.color}10 0%, rgba(255,255,255,0.02) 80%)`;
                  el.style.borderColor = `${h.color}40`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `${h.color}18`,
                    border: `1px solid ${h.color}38`,
                    color: h.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                  aria-hidden="true"
                >
                  {h.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                    color: "#f0f0ff",
                    marginBottom: "0.4rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#a0a0c0",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Also experienced with */}
      <div className="reveal" style={{ marginTop: "3.5rem" }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "#606080",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          {t("other_skills_title")}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {(t.raw("other_skills") as string[]).map((skill) => (
            <span
              key={skill}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "999px",
                fontSize: "0.78rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(124,58,237,0.18)",
                color: "#a0a0c0",
                fontWeight: 500,
                transition: "all 0.2s",
                cursor: "default",
              }}
              data-cursor
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLSpanElement;
                el.style.background = "rgba(124,58,237,0.12)";
                el.style.borderColor = "rgba(124,58,237,0.45)";
                el.style.color = "#d8c8ff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLSpanElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(124,58,237,0.18)";
                el.style.color = "#a0a0c0";
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
