"use client";

import { useRef, MouseEvent, CSSProperties, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  href?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  href,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = (e: MouseEvent) => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
    onMouseLeave?.(e);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    onMouseEnter?.(e);
  };

  const baseStyle: CSSProperties = {
    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
    display: "inline-flex",
    cursor: "pointer",
    ...style,
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("mailto") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className={className}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={className}
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
