"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface LanguageToggleProps {
  locale: string;
}

export default function LanguageToggle({ locale }: LanguageToggleProps) {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "en" ? "es" : "en";
    // Replace the locale prefix in the pathname
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "999px",
        padding: "0.3rem 0.9rem",
        fontSize: "0.75rem",
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 500,
        color: "#a0a0c0",
        letterSpacing: "0.06em",
        cursor: "pointer",
        transition: "all 0.25s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(124,58,237,0.15)";
        (e.currentTarget as HTMLButtonElement).style.color = "#f0f0ff";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(124,58,237,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLButtonElement).style.color = "#a0a0c0";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(255,255,255,0.1)";
      }}
    >
      {t("lang")}
    </button>
  );
}
