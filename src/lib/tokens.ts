export const tokens = {
  // --- Backgrounds ---
  bg: "#080810",
  bgSurface: "#0f0f1a",
  bgCard: "#13131f",
  bgCardHover: "#181828",

  // --- Glass ---
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
  glassBorderHover: "rgba(255,255,255,0.16)",

  // --- Accents ---
  accentViolet: "#7C3AED",
  accentVioletLight: "rgba(124,58,237,0.15)",
  accentTeal: "#00D4AA",
  accentTealLight: "rgba(0,212,170,0.12)",
  accentOrange: "#FF6B35",
  accentOrangeLight: "rgba(255,107,53,0.12)",

  // --- Text ---
  textPrimary: "#F0F0FF",
  textSecondary: "#A0A0C0",
  textMuted: "#606080",

  // --- Borders ---
  border: "rgba(255,255,255,0.06)",
  borderStrong: "rgba(255,255,255,0.12)",

  // --- Gradients ---
  gradientHero:
    "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.3) 0%, transparent 70%)",
  gradientCard:
    "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(0,212,170,0.04) 100%)",

  // --- Fonts ---
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontMono: "'JetBrains Mono', monospace",

  // --- Timing ---
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
} as const;

// Project data — single source of truth
export const TIER1_PROJECTS = [
  {
    id: "lastopp",
    color: "#FF6B35",
    colorDim: "rgba(255,107,53,0.12)",
    tech: ["Node.js", "Next.js 15", "Supabase", "Docker", "Playwright", "Telegram"],
    status: "active" as const,
    featured: true,
    github: null,
    demo: null,
  },
  {
    id: "fixlab",
    color: "#00D4AA",
    colorDim: "rgba(0,212,170,0.12)",
    tech: ["Next.js 14", "Supabase", "PostgreSQL", "Docker"],
    status: "active" as const,
    featured: false,
    github: null,
    demo: null,
  },
  {
    id: "oip",
    color: "#7C3AED",
    colorDim: "rgba(124,58,237,0.15)",
    tech: ["Next.js 15", "Python", "FastAPI", "Supabase", "Docker"],
    status: "active" as const,
    featured: false,
    github: null,
    demo: null,
  },
  {
    id: "designstudio",
    color: "#C9651A",
    colorDim: "rgba(201,101,26,0.12)",
    tech: ["React", "Vite", "Claude API", "Cloudflare Pages"],
    status: "deployed" as const,
    featured: false,
    github: "https://github.com/luuisaguilar/design-studio",
    demo: null,
  },
  {
    id: "lec",
    color: "#003d7c",
    colorDim: "rgba(0,61,124,0.20)",
    tech: ["Next.js", "Supabase", "Playwright", "Docker"],
    status: "active" as const,
    featured: false,
    github: null,
    demo: "https://lec.mx",
  },
] as const;

export const TIER2_PROJECTS = [
  {
    id: "cvos",
    color: "#00D4AA",
    tech: ["n8n", "Supabase", "Python", "Claude API"],
    status: "prototype" as const,
  },
  {
    id: "agents",
    color: "#7C3AED",
    tech: ["Python", "Streamlit", "OpenAI", "Obsidian"],
    status: "active" as const,
  },
  {
    id: "n8n",
    color: "#FF6B35",
    tech: ["n8n", "pgvector", "PostgreSQL", "Docker"],
    status: "active" as const,
  },
  {
    id: "proxmox",
    color: "#E56D1E",
    tech: ["Proxmox VE", "Cloudflare Tunnel", "Docker", "Linux"],
    status: "active" as const,
  },
  {
    id: "csa",
    color: "#C9651A",
    tech: ["WordPress", "WooCommerce", "Next.js"],
    status: "active" as const,
  },
  {
    id: "scraper",
    color: "#00D4AA",
    tech: ["Python", "Playwright", "Docker", "Proxies"],
    status: "active" as const,
  },
] as const;

export const STACK_ITEMS = [
  { label: "Next.js", icon: "▲", color: "#ffffff" },
  { label: "React", icon: "⚛", color: "#61DAFB" },
  { label: "TypeScript", icon: "TS", color: "#3178C6" },
  { label: "Python", icon: "🐍", color: "#F7C948" },
  { label: "Supabase", icon: "⚡", color: "#3ECF8E" },
  { label: "Docker", icon: "🐳", color: "#2496ED" },
  { label: "n8n", icon: "⚙", color: "#EA4B71" },
  { label: "Cloudflare", icon: "☁", color: "#F48120" },
  { label: "Playwright", icon: "🎭", color: "#2EAD33" },
  { label: "Claude AI", icon: "◆", color: "#D97706" },
  { label: "PostgreSQL", icon: "🐘", color: "#4169E1" },
  { label: "Proxmox", icon: "🖥", color: "#E57000" },
] as const;
