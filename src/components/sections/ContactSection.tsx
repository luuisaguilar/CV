"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import MagneticButton from "@/components/ui/MagneticButton";

const LINKS = [
  {
    key: "email" as const,
    href: "mailto:luisaguilaraguila@gmail.com",
    icon: "✉",
    label: "Email",
  },
  {
    key: "github" as const,
    href: "https://github.com/luuisaguilar",
    icon: "⌥",
    label: "GitHub",
  },
  {
    key: "linkedin" as const,
    href: "https://linkedin.com/in/luisaguilaraguila",
    icon: "◈",
    label: "LinkedIn",
  },
];

export default function ContactSection() {
  const t = useTranslations("contact");
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-pad"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* Decorative divider */}
      <div
        className="reveal"
        style={{
          width: "1px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.4))",
          margin: "0 auto 3rem",
        }}
      />

      <div className="reveal">
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#7C3AED",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
          }}
        >
          05 / CONTACT
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            letterSpacing: "-0.04em",
            color: "#f0f0ff",
            marginBottom: "1rem",
            lineHeight: 1.05,
          }}
        >
          {t("title")}
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#606080",
            marginBottom: "3rem",
          }}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* CTA buttons */}
      <div
        className="reveal"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.25rem",
          flexWrap: "wrap",
          marginBottom: "4rem",
        }}
      >
        {LINKS.map((link) => (
          <MagneticButton
            key={link.key}
            href={link.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "1rem 2rem",
              borderRadius: "999px",
              background:
                link.key === "email"
                  ? "#7C3AED"
                  : "rgba(255,255,255,0.04)",
              border:
                link.key === "email"
                  ? "1px solid #7C3AED"
                  : "1px solid rgba(255,255,255,0.1)",
              color: "#f0f0ff",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "all 0.25s",
              boxShadow:
                link.key === "email"
                  ? "0 0 24px rgba(124,58,237,0.3)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              if (link.key !== "email") {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(124,58,237,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(124,58,237,0.35)";
              }
            }}
            onMouseLeave={(e) => {
              if (link.key !== "email") {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.1)";
              }
            }}
          >
            <span style={{ fontSize: "1rem" }}>{link.icon}</span>
            {t(link.key)}
          </MagneticButton>
        ))}
      </div>

      {/* Footer */}
      <div
        className="reveal"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "2rem",
          color: "#606080",
          fontSize: "0.8rem",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.04em",
        }}
      >
        <p>Luis Aguilar © {new Date().getFullYear()} · luisaguilaraguila.com</p>
      </div>
    </section>
  );
}
