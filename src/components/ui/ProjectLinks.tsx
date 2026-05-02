"use client";

import { useTranslations } from "next-intl";
import type { LinkPolicy } from "@/lib/tokens";

interface ProjectLinksProps {
  github: string | null;
  githubPolicy: LinkPolicy;
  demo: string | null;
  demoPolicy: LinkPolicy;
  color: string;
  compact?: boolean;
}

export default function ProjectLinks({
  github,
  githubPolicy,
  demo,
  demoPolicy,
  color,
  compact = false,
}: ProjectLinksProps) {
  const t = useTranslations("projects");

  const hasAny =
    github || demo || githubPolicy || demoPolicy ? true : false;
  if (!hasAny) return null;

  const fontSize = compact ? "0.7rem" : "0.78rem";
  const gap = compact ? "0.6rem" : "1rem";

  const linkStyle = {
    fontSize,
    color,
    textDecoration: "none",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
  } as const;

  const badgeStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: compact ? "0.6rem" : "0.65rem",
    color: "#a0a0c0",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "4px",
    padding: "0.15rem 0.5rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    cursor: "default",
    whiteSpace: "nowrap" as const,
  };

  const policyLabel = (policy: LinkPolicy): string => {
    if (policy === "private") return t("policy_private");
    if (policy === "on_request") return t("policy_on_request");
    if (policy === "nda") return t("policy_nda");
    return "";
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap,
        marginTop: compact ? "1rem" : "1.5rem",
        alignItems: "center",
      }}
    >
      {/* GitHub slot */}
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          style={linkStyle}
        >
          <span aria-hidden="true">⌥</span> GitHub →
        </a>
      ) : githubPolicy ? (
        <span
          title={t("policy_tooltip_code")}
          style={badgeStyle}
        >
          {t("source_label")} · {policyLabel(githubPolicy)}
        </span>
      ) : null}

      {/* Demo slot */}
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Live demo"
          style={linkStyle}
        >
          <span aria-hidden="true">↗</span> {t("live_label")} →
        </a>
      ) : demoPolicy ? (
        <span
          title={t("policy_tooltip_demo")}
          style={badgeStyle}
        >
          {t("demo_label")} · {policyLabel(demoPolicy)}
        </span>
      ) : null}
    </div>
  );
}
