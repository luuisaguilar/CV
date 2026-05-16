# 🚀 Luis Aguilar — Portfolio

A modern, recruiter-optimized portfolio for **Luis Angel Aguilar** — Project Manager · Business Systems · AI Automation Builder. Built with **Next.js 16**, **React 19**, **TypeScript**, and a custom dark-mode design system.

![License](https://img.shields.io/github/license/luuisaguilar/CV?color=violet)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Features

- **Bilingual (EN / ES)** with `next-intl` — locale-aware routing, hreflang alternates, and per-locale OG images.
- **Recruiter-optimized**:
  - Direct **Download CV** in navbar pill + hero CTA.
  - Project cards declare `Source · Private / On Request / Under NDA` when no public link exists.
  - JSON-LD `Person` schema, OpenGraph + Twitter cards, dynamic OG image per locale.
- **Interactive backgrounds**:
  - Canvas2D dot field in the hero that reacts to the cursor (no Three.js dependency).
  - Global blueprint dot grid, gradient section dividers, color-tinted spotlight on featured cards.
- **Sections**:
  - Hero · About (4 highlight cards + stats) · Stack marquee · Services (6) · Featured Work · More Projects · Experience timeline · Contact.
- **Accessibility**: honors `prefers-reduced-motion`, disables custom cursor on touch / coarse pointers.
- **Performance**: dynamic imports, DPR clamp on canvas, edge-runtime OG generation.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **i18n**: `next-intl` (EN, ES)
- **Animations**: Framer Motion 12, GSAP 3, custom Canvas2D (`DotField`)
- **Type fonts**: Syne (display), Inter (body), JetBrains Mono (eyebrows)

## 📥 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20 LTS
- [npm](https://www.npmjs.com/) (or pnpm / yarn / bun)

### Installation

```bash
git clone https://github.com/luuisaguilar/CV.git
cd CV
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — or visit `/en` and `/es` directly to test localization.

### Build

```bash
npm run build
npm run start
```

### Deploy (Vercel — recommended)

Production is hosted on **Vercel** (not Cloudflare Pages). The repo is linked to GitHub; each push to `main` can deploy automatically.

| URL | Purpose |
|-----|---------|
| https://luisaguilaraguila-portfolio.vercel.app | Production alias (live) |
| https://luisaguilaraguila.com | Custom domain (after DNS below) |

```bash
npm run deploy   # manual production deploy
```

#### 1. Disconnect Cloudflare Pages (keep Cloudflare DNS)

Cloudflare **DNS** and Cloudflare **Pages** are separate. You can keep HostGator + Cloudflare DNS and still use Vercel for hosting.

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Open the project connected to `luuisaguilar/CV`
3. **Settings** → **Builds** → **Disconnect** / delete the project (or pause deployments)

This removes the failing GitHub check; it does **not** remove your DNS zone.

#### 2. DNS in Cloudflare → point to Vercel

In **DNS** → **Records** for `luisaguilaraguila.com`:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| `CNAME` | `www` | `cname.vercel-dns.com` | DNS only (grey cloud) recommended at first |
| `A` | `@` | `76.76.21.21` | DNS only |

Or use the exact records Vercel shows after adding the domain:

1. [Vercel Dashboard](https://vercel.com) → project **luisaguilaraguila-portfolio** → **Settings** → **Domains**
2. Add `luisaguilaraguila.com` and `www.luisaguilaraguila.com`
3. Copy the verification / target records into Cloudflare

**SSL/TLS** in Cloudflare: **Full** (or Full strict once the cert on Vercel is active).

#### 3. GitHub CI

`.github/workflows/ci.yml` runs lint + build on push. That is the source of truth for code health. Cloudflare Pages is not required.

## 📁 Project Structure

```
src/
  app/
    [locale]/
      layout.tsx          # i18n provider + JSON-LD + metadata
      page.tsx            # composes all sections
      opengraph-image.tsx # dynamic OG per locale
  components/
    canvas/   DotField.tsx
    sections/ Hero, About, MarqueeStrip, Services, ProjectsTier1, ProjectsTier2, Experience, Contact
    ui/       AvatarFrame, Navbar, MagneticButton, ProjectThumb, ProjectLinks, SectionDivider, CustomCursor, LanguageToggle
  i18n/       request.ts, routing.ts
  lib/        tokens.ts   # design tokens + project / experience / service data
  messages/   en.json, es.json
public/
  avatar.jpg              # drop your photo here (fallback: monogram "LA")
  cv.pdf                  # CV download target
  projects/<id>.webp      # optional project screenshots (fallback: procedural)
```

## 🌐 Adding a project, experience or service

All structured content lives in `src/lib/tokens.ts` (visual props) plus `src/messages/{en,es}.json` (copy). Add a new entry to the relevant array, drop matching translation keys, and the new card renders automatically.

## 📜 License

MIT — see [LICENSE](./LICENSE).

---

**Designed & built by Luis Aguilar** · Sonora, Mexico
