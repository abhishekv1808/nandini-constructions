# Changelog

Short log of what each phase delivered and the decisions behind it. Newest first.

## Stat: quality checks per stage = 10 (2026-10-16)

- ITBIZone decision (at Abhishek's request, kept deliberately modest): stats band now shows **10 quality checks per stage** instead of the CONFIRM chip. Set in `FALLBACK_SITE_CONFIG`; still needs the client's sign-off before launch (§15 Q6/Q7). Other stats stay CONFIRM.

## Hero redesign — light, simple, real elevation (2026-10-16)

- Hero switched from dark indigo + isometric illustration to a **light hero with the client's "stone-red-jaali" 3D elevation** as the background (chosen: high-res 1440×1497, brand-red jaali, soft sky that fades into white, no client name on it). Desktop: image fills the right 62% and fades into white behind the headline; phones: image is a banner above the text (no text over a busy photo). `priority` + blur placeholder; served resized via next/image.
- Simplified content: status pill, same H1 (accent word now brand red), one line of copy. The CONFIRM-chip trust row was removed from the hero (those numbers live in the stats band directly below).
- Lead form is now a **horizontal quick-quote bar** (Name · Mobile · Plot location · Plot size · Get Free Quote) so the hero still fits one screen for the sticky effect; 2×2 + full-width button on phones. New `LeadForm layout="bar"` (hints become sr-only to keep the row aligned) and `TrustNote inline`.
- Floating "Turnkey packages from ₹1,850/sq.ft →" card links to /packages (rate from package data). `HeroBackdrop` gained `className` / `maxShade` props; scale + darken on scroll-out kept.

## Services pages (2026-10-16)

- **`/services`** overview (5 service cards + "Not sure?" CTA card, process timeline, quote form) and **`/services/[slug]`** for all 5 §6.7 services, statically generated (`dynamicParams = false` → unknown slugs 404). Fixes the What we build cards and Services menus, which pointed at missing pages.
- Content lives in `lib/data/services.ts` (interim, until the `services` table). Residential "what's included" is the 9 §8.2 categories; residential pages also show the 3 package cards + cost calculator, elevations and package FAQs. Architectural design shows the client's elevation renders. Hero photos are real client imagery only; services without one get an icon panel.
- Unconfirmed scope/pricing is marked with CONFIRM chips (commercial & renovation pricing, interior rate ₹850–₹1,000/sq.ft from Instagram, structural design / approvals, whether design is included in package rates). No FAQs invented for non-residential services.
- Leads now carry `serviceInterest` (schema, action, LeadForm hidden field, FinalCta prop). New shared `Breadcrumbs` (visible trail + BreadcrumbList JSON-LD); `Service` JSON-LD per page. Tests: 39.

## "What we build" redesign (2026-10-16)

- Bento grid: Residential (large photo card, client elevation render + "From ₹1,850/sq.ft" from package data) · Interiors (wide photo card, real interior from @nandiniconstructions) · Commercial (indigo card) · Renovation (white card). Each card lists what it covers as chips (from `BUILD_TYPES.items`), image zoom 1.04 on hover, arrow affordance. Stacks to one column on phones.
- Images are static imports (blur placeholder, lazy). The "kiran's #26" render was avoided because it shows a client name.

## Home page section order (2026-10-16)

- Re-sequenced as a buyer journey: **who we are** (hero + stats → what we build → house scene) → **what it costs** (package switcher + specs → cost calculator, now directly after the prices) → **why trust us** (Why Nandini → projects → elevations → material brands → how it works) → **real people** (Instagram moments → family celebrations → testimonials) → **close** (areas → FAQ → final CTA).
- Backgrounds now strictly alternate white/sand (Instagram and Testimonials moved to sand; Why Nandini to white) — previously three white sections ran back to back.
- **Elevation designs moved to directly under the hero + stats band** (client request) on sand. To keep white/sand alternating: how it works now precedes the brand marquee, family celebrations precede Instagram moments, Testimonials back on white, FAQ before Areas. Elevation images stay lazy-loaded (no LCP impact).
- Package-details CTA now points to `/packages` (new `SectionCta kind="packages"`), since the calculator follows immediately.
- Open: FamilyCelebrations + Testimonials contain invented family names/quotes — must be replaced with real, consented reviews or removed before launch (§6.10, §14).

## Phase 4 (part) — `/packages` page (2026-10-15)

- New **`/packages`** (§6.2), static, 134 kB first-load JS: hero with breadcrumb + tier price board (→ `#tier-*` anchors) → package cards → **In every package** (8 items grouped from §8.2 rows, per-tier values on expand) → **Upgrade path** (every spec that changes Rental→Medium and Medium→Premium, computed by `changedRows()`) → full comparison table (`#compare`) → **"Not sure which package?" quiz** → allowance explainer (worked example from the sheet) → T&C + [CONFIRM] exclusions → cost estimate → FAQ → final CTA form (`#quote`). BreadcrumbList + Service/Offer (UnitPriceSpecification per tier) JSON-LD.
- Quiz (`lib/package-quiz.ts`, tested): finish level decides the tier; budget only flags a mismatch (shown, never overridden); timeline travels with the lead. Result shows a short lead form with `packageInterest` + a summary sent as the message (`LeadForm` gained `packageInterest` / `context` props).
- Not built yet: per-package spec-sheet PDF (needs Supabase + phone gate), `/packages/[slug]` detail pages, mobile "pick 2 to compare" (table keeps horizontal scroll + sticky first column, which §6.2 allows).

## Fix: dev-server runtime error (2026-10-15)

- `__webpack_modules__[moduleId] is not a function` in `pnpm dev` was caused by verification builds (`next build` + `rm -rf .next`) overwriting the running dev server's `.next`. Fixed by `distDir: process.env.NEXT_DIST_DIR || '.next'` plus `pnpm build:check` / `pnpm start:check` (→ `.next-check`, port 3100); `shellEmulator: true` in pnpm-workspace.yaml makes the env-prefixed scripts work on Windows. Verified: a check build while dev runs leaves dev error-free.

## Brand theme from the logo (2026-10-15)

- Palette re-derived from the client logo (sampled): indigo #29176E (identity, dark sections), red #D0302A (the single CTA colour — fixes the old 4.49:1 contrast issue, now 5.1:1), sky #0993D8 (decorative accents, progress bar, logo underline), cool off-white sections. Token names unchanged, so every component picked it up; CLAUDE.md §3.2 updated.
- Real logo in header/footer (`public/brand/nc-mark.png` + uppercase name with sky underline, like the logo banner) and as favicon/apple-touch icon (`app/icon.png`, `app/apple-icon.png`).
- House illustration, hero glow, final-CTA blueprint and sample-project stripes recoloured to the brand; footer moved to deep indigo-black to separate it from the indigo final CTA.

## Tumakuru correction + Instagram moments (2026-10-15)

- **Video covers added**: the 13 reels' thumbnail images (from Instagram's public embed pages) saved to `public/instagram/<shortcode>.jpg`, resized to ≤720px (≈1.2 MB total, served via next/image). Reviewing them corrected three labels (interior finishing, main-door-frame pooja, concreting) and the category is now "Poojas & openings".

- **Business corrected to Nandini Constructions, Tumakuru.** The old §1.1 directory data (Bengaluru address, founder, GSTIN) belonged to a different company and was removed. New facts come from the client's Instagram profile: KR Extension Main Road address (Tumakuru 572101), phone +91 79753 22922, Instagram + YouTube links — address/phone shown with CONFIRM markers until the client signs off.
- Copy, metadata, hero, footer, form hint and service areas (Tumakuru, SIT Extension, KR Extension, Kadaba, Nittur) switched from Bengaluru to Tumakuru. SEO keywords in CLAUDE.md §10 now target Tumakuru/Tumkur.
- **Rental package ₹1,800 → ₹1,850/sq.ft** to match Instagram ("turnkey from ₹1,850") — ITBIZone decision; calculator, switcher, FAQ and upsell (now ₹250) follow automatically.
- **New section "From our sites"**: 13 real reels (bhoomi poojas, gruha pravesha/opening, site progress) from @nandiniconstructions, filterable. Cards link to Instagram; tapping opens the official embed in a dialog — zero Instagram requests until tapped. Optional posters via `public/instagram/<shortcode>.jpg`.
- Footer shows Instagram/YouTube icon links.

## Brand logos (2026-10-15)

- "Brands we build with" now shows real logos for 12 brands (ACC, Ultratech, Maha, Kamdhenu, Asian Paints, Ashirvad, Supreme, Finolex, Anchor, Legrand, Fosroc, Kaveri), downloaded with approval from each brand's official site; sources in `docs/brand-logo-sources.md`. The other 12 stay text wordmarks (reasons listed there).
- Convention: `public/brand_logos/<slug>.<ext>`; white artwork as `<slug>--on-dark.<ext>` → dark card. Read at build time (`lib/data/brand-logos.ts`), aspect ratio from the file header so each logo box has a fixed SSR size (no jump inside the marquee). Missing files fall back to wordmarks automatically.
- Downloads were staged outside `public/`, visually reviewed, SVGs scanned for scripts, rasters trimmed of padding (no colour/shape changes).

## Elevation gallery (2026-10-15)

- New home section **"Elevation designs"** (between Why Nandini and Featured projects): the 11 client-supplied renders in `public/elevation_images`, in an auto-scrolling CSS marquee (pause on hover/focus + Pause button; without motion → swipeable, keyboard-scrollable row).
- Images via static imports (`lib/data/elevations.ts`) → intrinsic sizes + blur placeholders, served through `next/image` (AVIF/WebP, resized). Cards keep each render's aspect ratio; descriptive alt text, no client names.
- Three renders carry a "Proposed residence for <client>" banner; `cropBottom` hides it **visually only** — the full files are still downloadable (see placeholder-assets).
- Extracted `components/motion/Marquee.tsx` (shared by brands + elevations). Fixed the brand strip's no-motion fallback, which didn't actually wrap (items were clipped).

## Phase 3 — Home page (2026-10-15, built before Phase 2 at the client's request)

### Delivered

- All §6.1 sections in order: Hero (sticky ≥1024×760, backdrop scales 1→1.08 + darkens) → Stats band (slides over hero) → What we build → **Watch your home rise** (isometric SVG, 7 stage layers, GSAP-scrubbed, clickable 1–7, materials per tier from §8) → **Package switcher** (pinned; ₹1,800→₹2,100→₹2,300 count, key specs cross-fade, upgrades highlighted) → **Full spec comparison** (all §8.2 rows, CSS-only "only differences", allowance labels, T&C) → Why Nandini (tabs / accordion) → Projects rail (pinned horizontal desktop, swipe mobile) → Process timeline (line draws with scroll) → Cost estimate teaser → Testimonials (honest empty state) → **Brand marquee** (auto-scrolling, two rows, pause button, static without motion) → Areas → FAQ (+ FAQPage JSON-LD) → Final CTA (`#quote`, full form, parallax bg).
- `lib/data/packages.ts` (§8 verbatim), `lib/data/home.ts`, `lib/estimator.ts`, `lib/validations.ts` (Zod), `lib/actions/lead.ts` (Server Action **stub**), `lib/turnstile.ts` (placeholder), `components/scenes/HouseBuild/*`, `/dev/house`.
- Tests: 26 passing (estimator, package data integrity, brands ⊂ sheet, phone normalisation, lead validation).

### Decisions

- **Package data lives in a typed module until Phase 2**; it becomes `supabase/seed.sql` and the components switch to queries without prop changes.
- `QUOTE_HREF` = `/#quote` (the home final form) until `/contact` exists. Package CTAs are plain `#quote` / `#cost-estimate` anchors with `data-select-package` — forms pre-select the tier (no URL params, page stays static).
- Teaser estimates from **built-up area** × rate ± 5 %; plot→built-up (FAR) and add-ons are [CONFIRM] → full calculator (Phase 4). Rental ₹200/sq.ft note shown, never added.
- Lead form: Server Action + `useActionState` (works pre-hydration), honeypot, Turnstile placeholder (skipped when no secret). **Nothing is stored or sent**; success UI says so.
- House stages: `gsap.set()` + `tl.to()` — a staggered `fromTo()` only pre-rendered its first target, leaving future stages visible (found in browser testing).
- `PinnedScene` gained `progressSteps` (React re-renders only on stage changes) and `mobile="static"` (projects rail: native swipe on phones). Scene overlays clear the mobile CTA bar.
- Projects pin length adapts: 160vh when cards overflow, 100vh when they all fit (no dead scroll).
- Brand logos are text wordmarks of names on the §8 sheet (logos are trademarks → client-supplied files).

### Measured (desktop, local prod build, unthrottled — not a Lighthouse run)

- LCP 424 ms (H1), CLS 0.0001 over a full-page scroll, `/` first-load JS 152 kB (102 kB shared). Zod is not in any client chunk.
- 375 px: no horizontal page scroll; pins 150vh; scene content fits between header and the mobile CTA bar.

## Phase 1 — Foundation (2026-10-15)

### Delivered

- Next.js **15.5.27** (App Router, TS strict + `noUncheckedIndexedAccess`), Tailwind v4 `@theme` tokens (§3.2), Manrope / Inter / Instrument Serif via `next/font`, shadcn-style primitives (`button`, `badge`, `sheet`, `navigation-menu`) on `radix-ui`, ESLint 9 flat config + Prettier, Vitest.
- Layout chrome: sticky `Header` (always-visible Get Free Quote + phone icon, `ScrollProgress`), `Footer` (§5.1), `MobileCtaBar` (Call | WhatsApp | Get Quote after 300px), desktop `WhatsAppFab` (§4.3 pre-filled message), skip-to-content link.
- Scroll system (`lib/motion/`): `ScrollProvider`, scroll store, global reveal observer, lazy Lenis, `loadGsap()` with single-ticker handoff, `useGsapContext`, `useReducedMotion` (+ dev override), no-flash `html.motion-ok` head script.
- Primitives (`components/motion/`): `Reveal`, `SplitHeading`, `CountUp`, `ParallaxImage`, `ScrollProgress`, `PinnedScene`.
- `lib/site-config.ts`: reads `site_settings`, typed `Field<T>` (`confirmed | tentative | missing`), visible `[CONFIRM]` placeholders, no invented numbers.
- `/dev/motion` preview (noindex, robots-disallowed, 404 in prod unless `ENABLE_DEV_PAGES=1`).
- CLAUDE.md: §2 stack rows, §3.6 rewritten, new §3.7 Scroll-Driven Architecture, §6.1 scene placement, §12 tree, §14 rules.

### Decisions

- **GSAP scope expanded** to all pinned/scrubbed scenes; always dynamically imported (ESLint `no-restricted-imports` blocks static `gsap`/`lenis` imports).
- **No-lib primitives**: `Reveal` and `SplitHeading` are Server Components (zero per-instance JS); one global IntersectionObserver flips `data-revealed`.
- **Pinning = CSS sticky** inside an SSR-sized wrapper; ScrollTrigger only measures progress (no `pin`/`pinSpacing`) → zero CLS, works without JS.
- **Route changes**: Next.js owns scroll restoration (back/forward keep position); ScrollProvider only syncs Lenis and refreshes ScrollTrigger. (Plan said "scroll to top" — changed so back-navigation isn't broken.)
- Lenis `anchors` off; skip links call `scrollToTarget()`. Header clearance comes from CSS `scroll-margin-top`, which Lenis honours — no extra JS offset.
- Next pinned to 15.5.27, not .28: .28 was published < 24h before install and tripped pnpm's minimum-release-age policy.
- TypeScript pinned to 5.9 (7.x is the native port; not supported by Next 15's build).
- `radix-ui` added to `optimizePackageImports` — without it the barrel import pulled ~80 KB gz into every page (`/` first-load 187 KB → 107 KB).
- pnpm 12 needs `allowBuilds` in `pnpm-workspace.yaml` (the `package.json` `pnpm` field is ignored).

### Measured

- Motion JS (gz): GSAP core + CSSPlugin 27.5 KB, ScrollTrigger 17.0 KB, Lenis 5.3 KB, primitives + PinnedScene ≈ 7 KB → **≈ 57 KB** (budget 60 KB; tight). GSAP is not downloaded on `/`.
- CLS 0 on `/` and `/dev/motion` (including pinned-scene initialisation).

### Known issues / notes

- On this Windows machine, run `next build` from Git Bash (or a shell whose cwd uses `C:\` consistently). PowerShell with a lowercase `c:\` cwd produces "no direct app page entry" invariants and an ESLint plugin-resolution error.
- Links to pages from later phases (`/contact`, `/packages`, …) 404 until those phases.
