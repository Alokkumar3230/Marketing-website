# Clausify — AI Contract Intelligence

Production marketing site for **Clausify**, a fictional B2B SaaS company selling AI-powered contract intelligence to legal and procurement teams.

Built for [Digital Heroes Training Task](https://digitalheroesco.com).

---

## Architecture

**Stack:** React 19 · Vite 8 · TypeScript 5.7 · Tailwind CSS v4 · react-router-dom v7

Client-side SPA with file-based page components and shared layout components. No CMS, no page builder — all hand-written.

```
src/
├── main.tsx              # React entrypoint, mounts App into #root
├── index.css             # Global styles, Tailwind v4 import, CSS tokens, font imports
├── App.tsx               # BrowserRouter + Routes + shared Layout wrapper
├── components/
│   ├── Header.tsx        # Sticky nav, mobile hamburger, aria-current on active page
│   ├── Footer.tsx        # 3-column nav + legal + credit line
│   └── SEOHead.tsx       # Per-page title, meta, Open Graph, and JSON-LD via useEffect
└── pages/
    ├── Home.tsx           # Hero, stats, feature grid, CTA — Organization JSON-LD
    ├── Product.tsx        # How it works, feature detail, integrations — SoftwareApplication JSON-LD
    ├── Pricing.tsx        # 3-tier plans, monthly/annual toggle, FAQ accordion — Service + FAQPage JSON-LD
    ├── Contact.tsx        # Contact form with validation, address — Organization + ContactPoint JSON-LD
    └── SlowSiteDemo.tsx   # Task B: HuffPost diagnosis, rebuilt hero, client summary
```

### Design tokens

All colours, radius, and surface values live as CSS custom properties in `src/index.css` under `:root`. The palette uses Tailwind v4's `@theme inline` block to map them to utility classes (`bg-background`, `text-foreground`, etc.).

To change the brand colour sitewide, update `--primary` in `:root`.

### Fonts

Loaded via Google Fonts `@import` at the top of `src/index.css`:

- **Fraunces** — display headings (`.font-display`)
- **DM Sans** — body copy (default)
- **DM Mono** — labels, tags, section numbers (`.font-mono`)

---

## Pages

| Route | Title | JSON-LD schemas |
|---|---|---|
| `/` | Clausify — AI Contract Intelligence | `Organization` |
| `/product` | Product — Clausify | `Organization`, `SoftwareApplication` |
| `/pricing` | Pricing — Clausify | `Organization`, `Service`, `FAQPage` |
| `/contact` | Contact — Clausify | `Organization` with `ContactPoint` + `PostalAddress` |
| `/slow-site-demo` | Task B: Slow Site Diagnosis — Clausify | — |

Every page has a unique `<title>`, `<meta name="description">`, and full Open Graph tag set, all managed by `SEOHead.tsx`.

---

## How to add a new page (for non-developers)

1. **Copy an existing page file** — e.g. duplicate `src/pages/Contact.tsx` and rename it `src/pages/About.tsx`.

2. **Edit the copy:**
   - Change the `<h1>` text and the body content.
   - Update the `SEOHead` props at the top — `title`, `description`, and `canonicalPath` (e.g. `"/about"`).
   - Delete any sections you don't need.

3. **Register the route** — open `src/App.tsx` and add one line inside `<Routes>`:
   ```tsx
   <Route path="/about" element={<About />} />
   ```
   Also add the import at the top:
   ```tsx
   import About from './pages/About'
   ```

4. **Add it to the nav** — open `src/components/Header.tsx` and add an entry to the `navLinks` array:
   ```tsx
   { to: '/about', label: 'About' },
   ```

5. **Save** — the dev server hot-reloads instantly. No build step needed during development.

---

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (already running in Figma Make)
pnpm dev

# Production build
pnpm build
```

A Vite dev server runs on `$PORT` (default 8443) with hot module replacement.

---

## Accessibility

- Skip-to-content link on every page
- Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`, `<address>`
- Single logical `h1` → `h6` hierarchy per page, no heading skips
- All interactive elements keyboard-reachable with visible `:focus-visible` states
- `aria-current="page"` on active nav link
- `aria-expanded` on mobile menu toggle and FAQ accordion buttons
- `aria-invalid` + `aria-describedby` on form fields with validation errors
- All images have descriptive `alt` text

## Core Web Vitals

- Hero image: explicit `width`/`height` attributes prevent CLS; `fetchpriority="high"` signals LCP element
- Below-fold images: `loading="lazy"` + `decoding="async"`
- Responsive images: `srcset` with 400w/800w/1200w variants + `sizes` attribute on key images
- WebP format via CDN URL parameters
- `preconnect` hints to Google Fonts and Unsplash CDN
- No render-blocking scripts; Tailwind CSS is bundled at build time (zero runtime overhead)

---

## Task B — Slow Site Diagnosis

See `/slow-site-demo` for the full HuffPost.com performance diagnosis, including:

- Field data (CrUX) and lab data (Lighthouse) for mobile
- Prioritised fix list with impact vs. cost and explicit "won't fix" items
- Rebuilt hero section with before/after metrics (LCP: 9.2s → 1.8s, score: 14 → 92)
- Plain-English client summary

---

Built for [Digital Heroes Training Task](https://digitalheroesco.com)
