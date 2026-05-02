"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("about"), href: "#about" },
    { label: t("services"), href: "#services" },
    { label: t("projects"), href: "#projects" },
    { label: t("experience"), href: "#experience" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 1.5rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "rgba(8,8,16,0.8)" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "1.1rem",
          color: "#f0f0ff",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        LA
        <span style={{ color: "#7C3AED" }}>.</span>
      </a>

      {/* Links */}
      <div
        className="navbar-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontSize: "0.875rem",
              color: "#a0a0c0",
              textDecoration: "none",
              transition: "color 0.2s",
              fontWeight: 500,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#f0f0ff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#a0a0c0")
            }
          >
            {link.label}
          </a>
        ))}

        {/* Download CV */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tCommon("download_cv")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.9rem",
            borderRadius: "999px",
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.35)",
            color: "#f0f0ff",
            fontSize: "0.78rem",
            fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.04em",
            textDecoration: "none",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(124,58,237,0.25)";
            el.style.borderColor = "rgba(124,58,237,0.6)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(124,58,237,0.12)";
            el.style.borderColor = "rgba(124,58,237,0.35)";
          }}
        >
          <span aria-hidden="true">↓</span>
          {tCommon("cv_short")}
        </a>

        <LanguageToggle locale={locale} />
      </div>

      <style>{`
        @media (max-width: 720px) {
          .navbar-links a:not([aria-label]) { display: none; }
        }
      `}</style>
    </nav>
  );
}
