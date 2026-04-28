# Stellar Consulting — Next.js

Migration of the Stellar Consulting healthcare website to **Next.js 15** with App Router, TypeScript, Tailwind CSS, dark mode, and full English/Arabic (RTL) support.

> **Status:** Phase 1 (scaffolding) and Phase 2 (homepage) are complete. Other pages render placeholder content and will be migrated in Phase 3+.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Drop the original /imgs folder into /public/images
#    (See "Images" section below for details.)

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` based on your browser language.

---

## ⚠️ Images

The original ZIP did **not** include the `/imgs` folder. Image references in the code use the original paths (just renamed `/imgs` → `/public/images`).

**To make the site display correctly:**

```bash
# Copy the original imgs folder into /public/images
cp -r /path/to/original/imgs/* public/images/
```

The site will run without images (alt text shows in their place), but obviously looks much better with them in place.

---

## Tech stack

| Concern         | Choice                                          |
|-----------------|-------------------------------------------------|
| Framework       | Next.js 15 (App Router)                         |
| Language        | TypeScript (strict)                             |
| Styling         | Tailwind CSS + CSS variables for theming        |
| Dark mode       | `next-themes` (system / manual)                 |
| i18n            | Custom (no library) — see `lib/i18n/`           |
| Carousels       | `embla-carousel-react` + autoplay plugin        |
| Fonts           | `next/font` (Poppins + Cairo for Arabic)        |
| Structured data | JSON-LD via `<Script>` — Org, WebSite, LocalBusiness, Breadcrumbs |
| Sitemap/robots  | Native Next.js metadata routes                  |

---

## Project structure

```
app/
  [locale]/
    layout.tsx           ← root layout (renders <html lang dir>)
    page.tsx             ← homepage
    not-found.tsx        ← 404 inside a locale segment
    about/page.tsx       ← stub (Phase 3)
    contact/page.tsx     ← stub (Phase 3)
    services/
      page.tsx           ← stub
      [slug]/page.tsx    ← all 9 services (stub)
    partners/page.tsx    ← stub
    gallery/page.tsx     ← stub
    blogs/page.tsx       ← stub
  globals.css
  robots.ts              ← AI crawlers explicitly allowed
  sitemap.ts             ← hreflang alternates included

components/
  layout/                ← Navbar, Footer, ThemeToggle, LanguageSwitcher, MeetingModal
  home/                  ← all 7 homepage sections
  shared/                ← SectionHeader, AnimatedCounter, GalleryGrid, GalleryLightbox, ServiceCard, PlaceholderPage
  providers/             ← ThemeProvider

lib/
  i18n/
    config.ts            ← locales, RTL detection
    get-dictionary.ts    ← server-only dictionary loader
  seo/
    site-config.ts       ← brand info, social, offices
    metadata.ts          ← buildMetadata() helper used by every page
    jsonld.ts            ← Organization / WebSite / LocalBusiness / Breadcrumb schemas
  content/
    partners.ts          ← 31 partner logos, categorized
    gallery.ts / .json   ← 17 gallery items
  utils.ts               ← cn() helper

messages/
  en.json                ← English strings
  ar.json                ← Arabic strings (currently placeholder with [AR] prefix)

middleware.ts            ← Locale detection (cookie → Accept-Language → default)
```

---

## i18n & RTL

- Locales: `en`, `ar` (defined in `lib/i18n/config.ts`)
- Routing: `/en/...` and `/ar/...` via the `[locale]` segment
- Locale detection: cookie (`NEXT_LOCALE`) → `Accept-Language` header → `defaultLocale`
- Direction: `<html dir="rtl">` set per-locale in the layout. RTL handled in components via Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) and `rtl:` variants.

### Translating Arabic

Edit `messages/ar.json` — every value currently starts with `[AR]` as a placeholder. Replace each value with its proper translation. Names, brand names, and a few neutral strings (logo URLs, phone numbers) are already correct as-is.

---

## Dark mode

Three states: **light**, **dark**, **system** (default). Toggle in the navbar.

Theme tokens are defined as RGB triplets in `app/globals.css` (`:root` + `.dark`) so Tailwind alpha syntax (`bg-surface/80`) works.

---

## SEO & AI-readiness

- Per-page `<title>`, description, canonical, hreflang
- Open Graph + Twitter Card tags via `lib/seo/metadata.ts`
- JSON-LD: Organization, WebSite, LocalBusiness, BreadcrumbList
- Sitemap with hreflang alternates for every (locale, route) pair
- `robots.ts` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, etc.

---

## What's done

✅ Project scaffolding (TS, Tailwind, fonts, dark mode, providers)
✅ i18n core (config, dictionary loader, middleware, locale routing)
✅ EN + AR dictionaries (AR is placeholder)
✅ SEO helpers (metadata builder, JSON-LD schemas, robots, sitemap)
✅ Layout (Navbar with dropdowns + mobile menu, Footer, ThemeToggle, LanguageSwitcher, MeetingModal)
✅ Homepage with all 7 sections:
- Hero (5-slide carousel with autoplay, RTL-aware)
- About (with animated stat counters)
- Services (5 service cards)
- Testimonials (8 quotes, carousel)
- Partners (31 logos, category filter, carousel)
- Gallery (17 items, lightbox, category filter)
- Contact (form with mock submit)
✅ Stub pages for `/about`, `/contact`, `/services`, `/services/[slug]`, `/partners`, `/gallery`, `/blogs`
✅ Locale-aware 404

---

## What's pending (Phase 3+)

- [ ] About page (`about.html` → `/[locale]/about`)
- [ ] Contact page (full form + map)
- [ ] Services hub + 9 individual service pages (`Medico-Marketing.html`, `Scientific-Research.html`, `healthcare-advertising.html`, `medical-affairs.html`, `market-access.html`, `health-system-partnerships.html`, `technology-services.html`, `workshop.html`, `our-services.html`)
- [ ] Partners full page (`our-partners.html`)
- [ ] Gallery full page (`Gallery.html`)
- [ ] Blog system: parse 17 HTML posts in `/blogs/` into Markdown frontmatter, build `/blogs` listing + `/blogs/[slug]` SSG
- [ ] Wire `/api/contact/route.ts` to a real email/CRM
- [ ] Activate commented routes in `app/sitemap.ts` as each lands
- [ ] Replace placeholder Arabic content

---

## Scripts

```bash
npm run dev          # dev server with hot reload
npm run build        # production build
npm run start        # run production build
npm run type-check   # TypeScript check without emitting
npm run lint         # ESLint
```

---

## Environment variables

Copy `.env.example` to `.env.local` and adjust as needed:

```
NEXT_PUBLIC_SITE_URL=https://stellarconsulting.com
```

This URL is used in canonical tags, the sitemap, and JSON-LD, so make sure it matches the production domain.
