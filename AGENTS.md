# AGENTS PROTOCOL & REPOSITORY STANDARDS
## STAYS.AANANDHAM.GO (Aanandham Stays — Himachal & Munnar Sub-Brand)

---

### STRICT RULES (NON-NEGOTIABLE, APPLY TO EVERY AGENT AND EVERY STEP)

#### AGENT PROTOCOL
1. **Read this entire brief before starting any task. Re-read it before finishing.**
2. **Every requirement in this brief is mandatory.** Do not skip, shorten, or defer any item.
3. **Do not add features, libraries, or content not asked for.** If something is missing or conflicts with another rule, ask before proceeding.
4. **A step is not done until every item in the checklist below passes.** End each step with a PASS/FAIL list for each checklist item, with fixes for any FAIL.
5. **Never mark something as done without verifying it** (build, lint, Lighthouse, axe, link check).
6. **Do not weaken or remove an earlier rule to make a later task easier.**

---

### SEO CHECKLIST (Verify on Every Page)
- **Meta title:** Unique per page, 50-60 characters, primary topic first, brand last (e.g. `Luxury Stays in Munnar & Himachal | Aanandham Stays`).
- **Meta description:** Unique per page, 140-160 characters.
- **Headings:** Exactly one H1 per page. Headings follow strict hierarchy (H1 > H2 > H3) with no skipped levels. Never use headings solely for styling.
- **Alt text on every image:** Descriptive and concise. Decorative images use `alt=""`. No "image of" phrasing. Keep filenames descriptive and kebab-case.
- **OG tags on every page:** `og:title`, `og:description`, `og:image` (1200x630, under 300 KB), `og:url`, `og:type`, `og:site_name`. Twitter card tags (`summary_large_image`) included.
- **Canonical tag on every page:** Absolute HTTPS URL, one version of each URL (enforce non-www or www consistently, no trailing slash).
- **HTTPS & redirects:** Redirect all HTTP to HTTPS. HSTS header enabled.
- **Clean URL slugs:** Lowercase, hyphenated, short, readable, no IDs, no underscores, no query strings for content pages.
- **Internal linking:** Every page is reachable within 3 clicks, uses descriptive anchor text (never "click here"), and includes breadcrumbs on inner pages. No orphan pages.
- **Broken links:** Zero broken links (internal or external). Run link check before every handoff. External links use `rel="noopener noreferrer"`.
- **Sitemap:** Auto-generated `sitemap.xml` with every indexable page and `lastmod`. No `noindex` or redirected URLs in it.
- **robots.txt:** Allows crawling of public pages, blocks private/utility routes, and links to the sitemap.
- **llms.txt at site root:** Short site summary plus a list of key pages with one-line descriptions. Updated whenever a page is added.
- **Schema markup (JSON-LD):** Organization and WebSite on home page, BreadcrumbList on inner pages, plus page-specific types (`LodgingBusiness`, `Campground`, `Hotel`, `FAQPage`, `ContactPage`). Validated with Rich Results schema rules.
- **HTTP status codes:** Real 404 for missing pages (with a helpful custom 404), 500 for errors. Thank-you and utility pages are `noindex`.
- **Language & Favicon:** `<html lang="en">` set correctly. Favicon set (16x16, 32x32, apple-touch-icon, web manifest), and theme-color meta.

---

### PERFORMANCE AND CORE WEB VITALS
- **Targets:** LCP under 2.5s, INP under 200ms, CLS under 0.1 (aim near 0), Lighthouse 90+ in all categories, mobile and desktop.
- **Image optimization:** Compress every image (AVIF/WebP via `next/image`), with explicit width and height, correct sizes, lazy loading, and priority only for the LCP image. No image larger than needed. Source images under 200 KB where possible.
- **Fonts:** Self-hosted via `next/font`, subset, display swap, max 2 families and minimal weights.
- **CSS / JS:** No render-blocking CSS or JS. Third-party scripts load via `next/script` after interaction or consent.
- **JS Budget:** Target under 150 KB gzipped for the initial route. Remove unused dependencies and CSS.
- **Caching & Delivery:** Long cache headers on static assets, compression enabled, static generation (SSG) by default.

---

### MOBILE & RESPONSIVENESS
- **Mobile-first:** Test at 320px, 375px, 768px, 1024px, and 1440px.
- **Layout:** Zero horizontal scroll, tap targets at least 44x44 px, readable text without zoom, correct viewport meta.
- **Animations:** Respect `prefers-reduced-motion`. Simplify parallax and sticky stacking on small or low-power devices.

---

### ACCESSIBILITY AND COMPLIANCE (WCAG 2.2 AA)
- **Accessibility:** Skip-to-content link, distinct focus states, full keyboard navigation, minimum 4.5:1 contrast ratio, ARIA landmarks and explicit form labels.
- **Compliance:** Cookie consent, Privacy Policy, Terms, and Cancellation policies compliant with DPDP & GDPR. Non-essential scripts never load before consent.
- **Security Headers:** CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy enabled.

---

### CODE QUALITY & ARCHITECTURE
- **Component Design:** Small single-purpose components with strictly typed TypeScript props.
- **Separation of Concerns:** All text content in `/content`, all colors, spacing, and typography in design tokens (`styles/tokens.css` or CSS variables).
- **TypeScript & Linting:** TypeScript strict mode, ESLint, and Prettier must pass with zero errors and zero warnings.
- **Server/Client Boundary:** React Server Components (RSC) by default. Client components only as small isolated interactive islands (`"use client"`). Header and footer must not re-render between navigation.

---

### AUTOMATED CHECKS & SCRIPTS
The following automated scripts must be run and pass before every handoff:
1. `npm run type-check`: TypeScript compiler verification (`tsc --noEmit`).
2. `npm run lint`: ESLint check with zero errors/warnings.
3. `npm run build`: Production Next.js build validation.
4. `npm run meta-audit`: Custom meta audit verifying title, description, canonical, OG tags, single H1, and image alt text.
5. `npm run link-check`: Broken link audit script.

---

### DEFINITION OF DONE (Per Page / Step)
1. Design matches the approved Aanandham design language (luxury highland palette, typography, micro-interactions).
2. All page copy and metadata are loaded from `/content`.
3. Every checklist item above passes.
4. All automated check scripts pass with zero errors.
5. A comprehensive **PASS/FAIL** report is delivered at the end of each step.
6. Await user confirmation before beginning subsequent pages.
