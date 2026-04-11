"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("about"), href: "#about" },
    { label: t("projects"), href: "#projects" },
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
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
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
        <LanguageToggle locale={locale} />
      </div>
    </nav>
  );
}
