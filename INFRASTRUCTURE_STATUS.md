```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   L U I S A G U I L A R A G U I L A - P O R T F O L I O     ║
║                                                               ║
║              [◠‿◠] Scan · Progress Dashboard                 ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

> Last sync: 2026-05-15 22:55 · `6735b5a` · Launch: 70%
>
> `/track` = full scan (build, audit, velocity, all metrics)
> Auto-updates after each significant change (timestamp, %, activity)

---

## Launch Readiness

```
OVERALL        [██████████████░░░░░░]  70%  →  Production
```

```
Core / Sections  [███████████████████░]  95%  ✅ proxy.ts (Next.js 16 i18n)
Content / i18n   [███████████████████░]  95%  ✅ EN+ES complete
Legal            [████████████████████] 100%  ✅ MIT license
Docs             [████████████████████] 100%  ✅ README + CLAUDE
Deploy / CI      [██████████████████░░]  90%  ✅ Vercel live + GHA green; CF Pages off
SEO              [████████████░░░░░░░░]  60%  🟡 meta+JSON-LD ok, no sitemap/robots
Security         [████████████░░░░░░░░]  60%  ⚠️ 36 vulns in dev deps (24 high)
Assets           [███░░░░░░░░░░░░░░░░░]  15%  🔴 no avatar.jpg / cv.pdf          ← BLOCKER
Testing          [█░░░░░░░░░░░░░░░░░░░]   5%  🔴 0 test files (not critical)
```

> Weighted: Assets is 2x (portfolio without a face/CV is broken for recruiters).

**Blockers**
▸ `public/avatar.jpg` missing — avatar rendered as monogram fallback, not a real photo
▸ `public/cv.pdf` missing — "Download CV" button 404s for recruiters
**Next Actions**
1. Drop `avatar.jpg` into `/public/` and `cv.pdf` — unblocks Assets → +15%
2. Disconnect Cloudflare Pages; point Cloudflare DNS to Vercel — see README Deploy
3. Add `src/app/sitemap.ts` + `src/app/robots.ts` — unblocks SEO → +8%

---

## Strategic Roadmap

```
CURRENT PHASE ▶ Content & Launch Assets

  Phase 1 · Foundation                             ✅ Complete
  ──────────────────────────────────────────────────────────────
  Includes:  Next.js 16 + React 19 + Tailwind v4, next-intl EN/ES,
             all 8 sections, Canvas2D DotField, Framer Motion/GSAP,
             Vercel config, GitHub Actions CI, JSON-LD + OG metadata
  Metric:    All sections render with real copy in both locales
  Result:    26 source files, 3,287 lines, clean build pipeline

  Phase 2 · Content & Launch Assets           ◀ YOU ARE HERE
  ──────────────────────────────────────────────────────────────
  Includes:  avatar.jpg + cv.pdf drop-in, Cloudflare DNS → Vercel,
             sitemap.ts + robots.ts, project screenshots (optional),
             domain verification on luisaguilaraguila.com
  Metric:    Site loads at prod URL, CV downloads, locale switches
  Progress:  0/5 items done

  Phase 3 · SEO & Polish                           ○ Upcoming
  ──────────────────────────────────────────────────────────────
  Includes:  Full SEO audit at prod URL, project screenshots (.webp),
             performance pass (Lighthouse ≥ 90), npm audit fix,
             remove obsolete transpilePackages:["three"] from config
  Metric:    Lighthouse Performance ≥ 90, SEO ≥ 95, 0 console errors
  Blocked by: Phase 2 completion (needs live URL)

  Phase 4 · Growth & Engagement                    ○ Future
  ──────────────────────────────────────────────────────────────
  Includes:  Contact form backend (Resend / Formspree), blog/case studies,
             Google Analytics, project deep-dive pages, testimonials
  Metric:    First inbound recruiter/client contact via portfolio
```

---

## Recent Activity

| When | What | Impact |
|------|------|--------|
| 2026-05-02 | Migrated best-of-remote + enriched portfolio content | Content 85% → 95% |
| 2026-05-02 | Sprint 1+2 audit — interactive backgrounds, Canvas2D DotField | Core sections complete |
| 2026-04-11 | Portfolio inicial — Next.js 16 + i18n EN/ES scaffolding | Foundation |
| 2026-04-10 | Initial commit from Create Next App | Project created |

> `/track` refreshes all metrics.

---

## Quick Start

```
  Local:       npm run dev
               → http://localhost:3000  (redirects to /en)

  Production:  https://luisaguilaraguila-portfolio.vercel.app
               Custom: https://luisaguilaraguila.com (DNS in Cloudflare → Vercel)

  Deploy:      npm run deploy  (= vercel --prod)
               GitHub → Vercel auto-deploy on push to main
```

---

## Env Health

No `process.env` variables referenced anywhere in source code. This portfolio is fully static — no backend, no secrets needed.

```
                            Local     Vercel
  (no env vars required)   ✅ N/A    ✅ N/A
```

> Clean: zero secrets in code, zero env vars to misconfigure.

---

## Architecture

```
  Browser
    │
    ▼
  ┌──────────────────────────────────────────────────────────────┐
  │  Next.js 16 App Router  (src/app/)                          │
  │                                                              │
  │  src/proxy.ts  (Next.js 16 proxy / next-intl)                │
  │  └── locale detection / routing                              │
  │                                                              │
  │  /                src/app/page.tsx         redirect → /en    │
  │  /[locale]/       src/app/[locale]/page.tsx  composes sections│
  │  /[locale]/       layout.tsx               meta + JSON-LD    │
  │  /[locale]/       opengraph-image.tsx      dynamic OG image  │
  └──────────────────────────────────────────────────────────────┘
           │                          │
           ▼                          ▼
  ┌─────────────────┐       ┌─────────────────────────┐
  │  Components     │       │  Data layer (static)    │
  │  sections/      │◄──────│  src/lib/tokens.ts       │
  │  ui/            │       │  src/messages/{en,es}.json│
  │  canvas/        │       └─────────────────────────┘
  └─────────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────────┐
  │  External fonts: Syne · Inter · JetBrains Mono      │
  │  (Google Fonts via Next.js font optimization)       │
  └─────────────────────────────────────────────────────┘

  Deploy: Vercel (regions: iad1) ← GitHub push → GHA CI → Vercel
```

### Entry Points

| File | Purpose |
|------|---------|
| `src/app/[locale]/page.tsx` | Main page — composes all 8 sections |
| `src/app/[locale]/layout.tsx` | i18n provider, metadata, JSON-LD schema |
| `src/app/[locale]/opengraph-image.tsx` | Dynamic OG image per locale |
| `src/app/page.tsx` | Root redirect `/` → `/en` |
| `src/proxy.ts` | next-intl proxy (Next.js 16 convention) |
| `src/lib/tokens.ts` | Design tokens + all project/experience/service data |
| `src/messages/en.json` | English copy (all sections) |
| `src/messages/es.json` | Spanish copy (all sections) |
| `src/i18n/routing.ts` | Locale config: `["en","es"]`, default `"en"` |

### External Services

| Service | Purpose | Config | Status |
|---------|---------|--------|--------|
| Vercel | Hosting + deploy | `vercel.json`, `npm run deploy` | ✅ Configured |
| GitHub Actions | CI — lint + build on push | `.github/workflows/ci.yml` | ✅ Active |
| Google Fonts | Syne, Inter, JetBrains Mono | Next.js font optimization | ✅ In code |
| GitHub | Source + portfolio links | `github.com/luuisaguilar` | ✅ Linked |
| LinkedIn | Contact + social proof | `linkedin.com/in/luisaguilaraguila` | ✅ Linked |

---

## Metrics

### Build

| Metric | Value |
|--------|-------|
| Framework | Next.js 16.2.3 (App Router, Turbopack) |
| Build command | `npm run build` |
| Last CI run | Not checked locally — CI runs on push |
| Routes | `/` redirect, `/[locale]` (en + es), `/[locale]/opengraph-image` |
| Source files | 26 TS/TSX files |

### Dependencies

| Metric | Value |
|--------|-------|
| Production deps | 7 (next, react, react-dom, next-intl, framer-motion, gsap, @gsap/react) |
| Dev deps | 11 |
| Outdated packages | 12 |
| Vulnerabilities total | 36 (24 high, 10 moderate, 2 low) |
| Vuln source | Mostly `vercel` CLI dev dep — NOT runtime |

> Notable outdated: `next` 16.2.3 → 16.2.6, `next-intl` 4.9.1 → 4.12.0, `gsap` 3.14.2 → 3.15.0

### Codebase

```
 TypeScript/TSX  ████████████████████  3,287 lines
 CSS             ██░░░░░░░░░░░░░░░░░░    210 lines
 JSON (messages) █░░░░░░░░░░░░░░░░░░░    ~300 lines (est.)
                 ─────────────────────────────────
 Total                                 ~3,800 lines
```

Top files by size:

| File | Size (bytes) |
|------|-------------|
| `src/lib/tokens.ts` | ~8 KB (242 lines — all data) |
| `src/messages/en.json` | ~5 KB (151 lines) |
| `src/app/[locale]/layout.tsx` | ~4 KB (129 lines) |
| `src/components/sections/*.tsx` | ~3–5 KB each |
| `src/app/globals.css` | ~5 KB (210 lines) |

### Velocity

```
                    Daily Commits (all history)
  2026-04-10  ██████████   1   Initial scaffold
  2026-04-11  ██████████   1   Portfolio inicial
  2026-05-02  ████████████████████   2   Audit + content migration
```

```
                    Weekly Trend (last 4 weeks)
  Apr 07–13  ██████████   2  Foundation sprints
  Apr 14–20  ░░░░░░░░░░   0
  Apr 21–27  ░░░░░░░░░░   0
  Apr 28–May 4  ████████████████████  2  Content enrichment
  May 5–15   ░░░░░░░░░░   0  ← you are here
```

```
                    Peak Hours (when you code)
  03:00  ██████████   1
  11:00  ██████████   1
  17:00  ██████████   1
  19:00  ██████████   1
```

```
                    Commit Types
  feat   ████████████████████  75%  (3/4)
  other  █████░░░░░░░░░░░░░░░  25%  (1/4 — initial scaffold)
```

```
                    Launch % Over Time
  2026-04-10  ░░░░░░░░░░░░░░░░░░░░   0%   Project created
  2026-04-11  ██████████░░░░░░░░░░  30%   Portfolio inicial
  2026-05-02  █████████████░░░░░░░  65%   Audit sprints + content

                    Milestone Map
  ◉────◉────○────○────○────○────○────○
  0    30   50   65   75   85   90  100
            ↑
        you are here
```

| Metric | Value |
|--------|-------|
| Total commits | 4 |
| Last 7 days | 0 |
| Last 30 days | 2 |
| Contributors | 1 (Luis Aguilar) |
| Branches | 1 (main) |
| Uncommitted | 1 untracked dir (.claude/) |

### Code Health

| Metric | Count |
|--------|-------|
| TODOs | 0 |
| FIXMEs | 0 |
| HACKs | 0 |
| BLOCKERs | 0 |

> Clean codebase. No technical debt markers.

**Obsolete config (minor):**
| Location | Note |
|----------|------|
| `next.config.ts:6` | `transpilePackages: ["three"]` — Three.js removed, entry is obsolete |

---

## Stack

```
  ┌─ Frontend ─────────────────────────────────────────────────┐
  │  Next.js 16.2.3 (App Router, Turbopack)                   │
  │  React 19.2.4 · TypeScript 5.9.3                          │
  │  Tailwind CSS v4 · CSS custom properties                   │
  │  Framer Motion 12.38 · GSAP 3.14.2 · Canvas2D             │
  │  next-intl 4.9.1 (EN / ES)                                │
  ├─ Fonts ────────────────────────────────────────────────────┤
  │  Syne (display) · Inter (body) · JetBrains Mono (eyebrows)│
  ├─ Build & Deploy ───────────────────────────────────────────┤
  │  Vercel (regions: iad1) · GitHub Actions CI               │
  │  ESLint 9 · TypeScript strict                             │
  ├─ Testing ──────────────────────────────────────────────────┤
  │  None configured                                           │
  └────────────────────────────────────────────────────────────┘
```

---

## Infrastructure

```
  Hosting ·············· Vercel                ✅  vercel.json configured
  CI/CD ················ GitHub Actions        ✅  lint + build on push/PR
  Domain ··············· luisaguilaraguila.com ⚠️  hardcoded in code, not verified live
  CDN ·················· Vercel Edge           ✅  auto via platform
  SSL/HTTPS ············ Vercel auto            ✅  auto via platform
  Source control ······· GitHub                ✅  github.com/luuisaguilar/CV
  Asset storage ········ /public dir           🔴  avatar.jpg + cv.pdf MISSING
```

---

## Security — 4/6 · Score: 8/10

### Checklist

```
  ✅ .env* in .gitignore ········· All env files excluded
  ✅ .env never committed ········ git log shows no .env commits
  ✅ No hardcoded secrets ········ Zero process.env references in code
  ✅ No API keys in source ······· Static portfolio, no external APIs
  ⚠️ npm vulnerabilities ········ 36 vulns in vercel CLI dev dep (not runtime)
  🔴 Security headers unknown ··· Can't check — no confirmed live URL
```

### Security Audit · Score: 8/10

```
  .env.local in .gitignore ·········· ✅  10/10
  .env never committed ·············· ✅  10/10
  No hardcoded secrets in code ······ ✅  10/10
  No env vars at all (static site) ·· ✅  10/10
  HTTPS in production ··············· ✅  10/10  (Vercel auto-SSL)
  npm audit (dev deps only) ·········· ⚠️   5/10  (36 vulns, vercel CLI)
  Security headers ··················· ❓   N/A   (no confirmed live URL)
  ──────────────────────────────────────────────
  Overall Score                        8/10
```

> Vulns are in `vercel` CLI (dev dep) — they don't affect the deployed static site.
> Run `npm audit fix` or `npm update vercel` to reduce the count.

---

## Testing — Score: 1/10

### Test Infrastructure

| Metric | Value |
|--------|-------|
| Framework | None installed |
| Test files | 0 |
| Config | None |
| Last run | Never |

### Testing Readiness — Score: 1/10

```
  Framework ················ None
  Test files ··············· 0 unit · 0 E2E · 0 total
  Config ··················· 🔴 missing

  Critical Flow Coverage:
  ──────────────────────────────────────────────────
  Flow                   Unit    E2E     Status
  ──────────────────────────────────────────────────
  Page renders (EN)      🔴      🔴      No coverage
  Page renders (ES)      🔴      🔴      No coverage
  CV download link       🔴      🔴      No coverage
  Language toggle        🔴      🔴      No coverage
  ──────────────────────────────────────────────────

  Recommended (post-launch, low priority):
  → E2E smoke: page loads + section visibility   ← auto · S
  → E2E: language toggle EN↔ES                   ← auto · S
```

> For a portfolio, testing is P4. Add post-launch if needed.

---

## Legal — 1/1

```
  ✅ LICENSE ·············· MIT — present at root
```

---

## Docs — 3/3

```
  ✅ README.md ············ Detailed setup, structure, deploy docs
  ✅ CLAUDE.md ············ Agent conventions (points to AGENTS.md)
  ✅ AGENTS.md ············ Next.js agent rules
  🔴 CONTRIBUTING.md ······ Not present (optional for portfolio)
  🔴 CHANGELOG.md ········· Not present (optional)
```

---

## SEO — Activates at 90% (currently 65%)

> Full SEO audit deferred until production URL is confirmed live.

### On-Page SEO (code analysis)

```
  Meta title (EN) ········· ✅  "Luis Aguilar — Project Manager · Business Systems · AI Automation Builder"
  Meta title (ES) ········· ✅  (via i18n translations)
  Meta description ········ ✅  Both locales, ~200 chars
  Open Graph tags ········· ✅  og:title, og:description, og:type, og:url, og:siteName
  Twitter cards ··········· ✅  summary_large_image, @luuisaguilar
  JSON-LD Person schema ··· ✅  Full schema.org/Person with sameAs + knowsAbout
  Canonical tags ·········· ✅  Per-locale canonical + hreflang alternates
  Dynamic OG image ········ ✅  opengraph-image.tsx per locale
  robots meta ············· ✅  index:true, follow:true
  Sitemap.ts ·············· 🔴  Missing — no /sitemap.xml
  robots.txt ·············· 🔴  Missing — no /robots.txt route
  H1 count ················ ⚠️  Not verified without live URL
```

### PWA Readiness

```
  Manifest ················· 🔴  No manifest.json
  Service Worker ··········· 🔴  Not configured
  App Icons ················ 🔴  Missing
  theme-color ·············· ⚠️  Not in layout (dark bg is #080810)
  Viewport ················· ✅  Next.js default viewport meta
  PWA Score               1/8   (Not needed for portfolio)
```

---

## Business

| Metric | Value |
|--------|-------|
| Type | Personal portfolio — not commercial |
| Audience | Recruiters, potential clients, collaborators |
| Differentiation | Bilingue EN/ES, real project depth, dark glassmorphism design |
| Monetization | Inbound leads → freelance / job offers |
| CTA | Download CV · Email · GitHub · LinkedIn |

### Product Risks & Mitigations

```
  Risk                              Severity   Mitigation
  ──────────────────────────────────────────────────────────────
  No avatar photo visible           🔴 High    Drop avatar.jpg into /public/
  CV download 404                   🔴 High    Drop cv.pdf into /public/
  Custom domain DNS pending         ⚠️ Med     Cloudflare DNS → Vercel (see README)
  Domain not configured in Vercel   ⚠️ Med     Verify luisaguilaraguila.com in Vercel dashboard
  No contact form backend           ⚠️ Med     Links to email/GitHub work; form is future Phase 4
  Private projects with no images   ⚠️ Med     Procedural fallbacks render, but less impactful
```

---

## App Blueprint

### What it does

A recruiter-optimized personal portfolio for Luis Aguilar (Business Management Engineer · AI Builder · Project Manager) built with Next.js 16. Bilingue EN/ES, dark glassmorphism design, interactive Canvas2D hero, 8 sections covering bio, stack marquee, services, 11 projects, 4 experience entries, and contact. The entire data model lives in `tokens.ts` + `messages/*.json` — drop a new entry and the card renders automatically.

### User Flow Journeys

```
👤 Recruiter / HR — evaluates Luis for a role
  1. Lands on luisaguilaraguila.com → redirected to /en (or /es via browser locale)
  2. Hero: sees name + rotating roles + "Download CV" CTA
  3. Clicks Download CV → cv.pdf download (⚠️ currently 404)
  4. Scrolls: About (bio + stats) → Stack marquee → Services → Projects
  5. Projects: sees 5 Tier 1 cards with tech stack + source policy badges
  6. Experience timeline → Contact section → clicks LinkedIn / Email
  7. Value: understands Luis's depth quickly, has CV, can reach out

👤 Potential Client — evaluating Luis for freelance/contract work
  1. Lands on portfolio (LinkedIn referral or Google)
  2. Hero → About → Services section (6 service cards)
  3. Featured Work → sees LastOpp, FixLab, OIP → understands scope
  4. Clicks "On Request" badge → reads tooltip to reach out
  5. Contact section → Email or LinkedIn
  6. Value: validates technical range + domain expertise before reaching out

👤 Developer / Peer — exploring the portfolio itself
  1. Lands → notices interactive DotField background, custom cursor
  2. Toggles EN↔ES via LanguageToggle (⚠️ auto-detection may not work)
  3. Inspects project badges (Private / On Request / NDA / Live)
  4. Footer or README → finds GitHub repo
```

### Roles & Permissions

| Role | Can do | How detected |
|------|--------|-------------|
| Visitor (public) | View all pages, download CV, toggle locale | No auth — all public |

### Data Model

| Entity | Storage | Key fields |
|--------|---------|-----------|
| TIER1_PROJECTS (5) | `src/lib/tokens.ts` | id, monogram, color, tech[], status, github, demo, linkPolicy |
| TIER2_PROJECTS (6) | `src/lib/tokens.ts` | id, color, tech[], status, github, demo |
| EXPERIENCES (4) | `src/lib/tokens.ts` | id, period, color, type (founder/freelance/education) |
| SERVICES (6) | `src/lib/tokens.ts` | id, icon, color |
| STACK_ITEMS (12) | `src/lib/tokens.ts` | label, icon, color |
| Copy (EN) | `src/messages/en.json` | All UI strings, project names/tags/descriptions |
| Copy (ES) | `src/messages/es.json` | All UI strings in Spanish |

### API Surface

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| No API routes | — | — | Static portfolio — no backend |

---

## Goals

> No active goals set. Say "quiero lanzar" or "avancemos" to define a launch goal and get an auto-prioritized action plan.

---

## Active Tasks

> No active tasks. When you say "nos falta X" or "agrega X", tasks appear here with `← auto` / `← user` subtasks.

---

## Features

### Shipped
- Next.js 16 App Router + React 19 + TypeScript 5
- Tailwind CSS v4 with custom dark design system (`tokens.ts`)
- Bilingual EN/ES with `next-intl` — locale-aware routing, hreflang, per-locale OG images
- Interactive Canvas2D DotField hero (cursor-reactive, reduced-motion aware)
- Global blueprint dot grid + gradient section dividers
- 8 sections: Hero · About · MarqueeStrip · Services · ProjectsTier1 · ProjectsTier2 · Experience · Contact
- 11 project cards with tech badges, source/demo link policies (private/on_request/nda)
- 4 experience timeline entries
- 6 service cards
- 12-item stack marquee
- Custom cursor (`CustomCursor.tsx`) disabled on touch/coarse pointers
- Magnetic button component
- JSON-LD `Person` schema, OpenGraph, Twitter cards, canonical + hreflang
- Dynamic OG image per locale (`opengraph-image.tsx`)
- GitHub Actions CI (lint + build on push/PR to main)
- Vercel deployment config (`vercel.json`)
- MIT LICENSE

### Pending
- [ ] Drop `public/avatar.jpg` (real photo) ← user · S
- [ ] Drop `public/cv.pdf` ← user · S
- [ ] Cloudflare DNS → Vercel (CNAME www + A @) ← user · S
- [ ] Add `src/app/sitemap.ts` ← auto · S
- [ ] Add `src/app/robots.ts` ← auto · S
- [ ] Remove obsolete `transpilePackages: ["three"]` from `next.config.ts` ← auto · S
- [ ] Add project screenshots `/public/projects/<id>.webp` ← user · M
- [ ] Verify `luisaguilaraguila.com` domain in Vercel dashboard ← user · S
- [ ] Run `npm update vercel` to reduce audit vulns ← auto · S

### Roadmap
- [ ] Contact form with backend (Resend API)
- [ ] Blog / case studies section
- [ ] Google Analytics / Plausible
- [ ] Project deep-dive pages (`/[locale]/projects/[id]`)
- [ ] Testimonials section
- [ ] Dark/light mode toggle

---

## Logs

### Changes — append only

| Date | Action | Impact |
|------|--------|--------|
| 2026-05-15 | Vercel linked + production deploy Ready | Deploy 80% → 90% |
| 2026-05-15 | CI green after DotField ESLint fix | CI passing |
| 2026-05-15 | First /track scan — INFRASTRUCTURE_STATUS.md created | Dashboard baseline at 65% |
| 2026-05-02 | feat: migrate best-of-remote + enrich portfolio content | Content 85% → 95% |
| 2026-05-02 | feat: portfolio audit — sprints 1+2 + interactive backgrounds | Core sections complete |
| 2026-04-11 | feat: portfolio inicial — Next.js 16 + Three.js + i18n EN/ES | Foundation |
| 2026-04-10 | Initial commit from Create Next App | Project scaffolded |

### Decisions — append only

| Date | Decision | Alternative Rejected | Rationale |
|------|----------|---------------------|-----------|
| 2026-04-11 | Canvas2D DotField instead of Three.js | Three.js R3F | Zero dependency, better performance, no WebGL required for a dot field |
| 2026-04-11 | next-intl for i18n | i18next, built-in Next.js i18n | First-class App Router support, type-safe messages, simpler routing |
| 2026-04-11 | Data in tokens.ts + messages/*.json | CMS (Contentful, Sanity) | Zero complexity, zero cost, git-versioned, sufficient for a portfolio |
| 2026-04-11 | Tailwind v4 | Tailwind v3 | Newer API, CSS-native variables, compatible with Next.js 16 |
| 2026-05-02 | Vercel regions: iad1 | Auto | Default US-East for low latency to typical recruiter markets |

### Learnings — append only

| Date | Learning | Context |
|------|----------|---------|
| 2026-05-15 | Next.js 16 uses `src/proxy.ts` not `middleware.ts` for next-intl | Vercel build warning clarified naming |
| 2026-05-15 | Portfolio with missing avatar + CV creates broken recruiter experience | Assets are the most critical deliverable for a portfolio site |

---

<!-- scan:6735b5a -->
