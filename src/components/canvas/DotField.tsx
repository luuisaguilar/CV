"use client";

import { useEffect, useRef } from "react";

interface DotFieldProps {
  spacing?: number;     // px between dots
  radius?: number;      // base dot radius
  influence?: number;   // px — mouse cursor reach
  push?: number;        // px — max displacement under cursor
  color?: string;       // baseline rgba
  hotColor?: string;    // hover rgba
}

interface Dot {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DotField({
  spacing = 38,
  radius = 1.6,
  influence = 150,
  push = 28,
  color = "rgba(124,58,237,0.22)",
  hotColor = "rgba(0,212,170,0.95)",
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;

    const buildGrid = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offX = (width - (cols - 1) * spacing) / 2;
      const offY = (height - (rows - 1) * spacing) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offX + c * spacing;
          const by = offY + r * spacing;
          dots.push({ bx, by, x: bx, y: by, vx: 0, vy: 0 });
        }
      }
    };

    const parseRgba = (rgba: string): [number, number, number, number] => {
      const m = rgba.match(/rgba?\(([^)]+)\)/);
      if (!m) return [124, 58, 237, 0.22];
      const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
      return [
        parts[0] || 0,
        parts[1] || 0,
        parts[2] || 0,
        parts[3] === undefined ? 1 : parts[3],
      ];
    };

    const cBase = parseRgba(color);
    const cHot = parseRgba(hotColor);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const inf2 = influence * influence;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        if (mouse.active && !reducedMotion) {
          const dx = d.bx - mouse.x;
          const dy = d.by - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < inf2) {
            const dist = Math.sqrt(dist2) || 0.001;
            const fall = 1 - dist / influence; // 0..1
            const force = fall * fall * push;
            // Target = base + outward push
            const targetX = d.bx + (dx / dist) * force;
            const targetY = d.by + (dy / dist) * force;
            d.vx += (targetX - d.x) * 0.18;
            d.vy += (targetY - d.y) * 0.18;
          } else {
            d.vx += (d.bx - d.x) * 0.08;
            d.vy += (d.by - d.y) * 0.08;
          }
        } else {
          d.vx += (d.bx - d.x) * 0.12;
          d.vy += (d.by - d.y) * 0.12;
        }

        d.vx *= 0.78;
        d.vy *= 0.78;
        d.x += d.vx;
        d.y += d.vy;

        // Color blend based on proximity
        let alpha = cBase[3];
        let cr = cBase[0];
        let cg = cBase[1];
        let cb = cBase[2];
        let r = radius;

        if (mouse.active && !reducedMotion) {
          const dx = d.bx - mouse.x;
          const dy = d.by - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < inf2) {
            const dist = Math.sqrt(dist2) || 0.001;
            const t = 1 - dist / influence;
            cr = cBase[0] + (cHot[0] - cBase[0]) * t;
            cg = cBase[1] + (cHot[1] - cBase[1]) * t;
            cb = cBase[2] + (cHot[2] - cBase[2]) * t;
            alpha = cBase[3] + (cHot[3] - cBase[3]) * t;
            r = radius + t * 1.6;
          }
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onResize = () => {
      buildGrid();
    };

    buildGrid();

    if (!coarsePointer && !reducedMotion) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("resize", onResize);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [spacing, radius, influence, push, color, hotColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
