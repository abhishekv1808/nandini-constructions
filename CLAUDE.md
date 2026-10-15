# CLAUDE.md — Nandini Constructions Website

> Source of truth for the Nandini Constructions website build. Read this fully before writing any code.
> Built by ITBIZone (Abhishek Venkatesh). Stack: Next.js 15 + Supabase + Vercel.
> Anything marked **[CONFIRM]** must be verified with the client before launch. Never invent business facts (project counts, years, awards, reviews) — use placeholders until real data is supplied.

---

## 1. Project Overview

**Client:** Nandini Constructions (Tumakuru / Tumkur, Karnataka) — Instagram [@nandiniconstructions](https://www.instagram.com/nandiniconstructions/)
**Goal:** A beautiful, professional, **high-converting** lead-generation website for a residential + commercial construction company. Every page exists to move a visitor toward one of three actions:

1. **Get a free quote / consultation** (primary)
2. **Calculate construction cost** (calculator → lead capture)
3. **Call / WhatsApp** (instant contact)

**Positioning:** Turnkey "design-to-handover" construction with **fixed, transparent package pricing**, quality checks at every stage, milestone-linked payments and on-time delivery — the trust model buyers now expect from organised players (see Brick&Bolt), delivered with the warmth and personal attention of a local builder (see Rightcon).

**Primary audience:**
- Plot owners in Tumakuru (and nearby towns — e.g. Kadaba, Nittur) planning an independent house, duplex or villa (G+1 to G+3)
- People working in Bengaluru or abroad building a home in Tumakuru remotely (need trust + transparency + progress visibility)
- Small business owners building rental units, PGs, showrooms, offices, cafés
- Interior-only customers (kitchen, café, office, gym, clinic interiors)

### 1.1 Business details (from the client's own Instagram profile, read 2026-10-15)
Earlier directory data (a Bengaluru "Nandini Construction & Developers" — Vidyaranyapura address, founder, GSTIN) belonged to a **different company** and has been removed. Do not reintroduce it.

| Field | Value | Status |
|---|---|---|
| Brand name | **Nandini Constructions** (logo, Instagram, renders) | Confirmed by ITBIZone |
| Legal name | Nandini Constructions | [CONFIRM] registered name |
| Address | Opposite Makkah Masjid, KR Extension Main Road, Tumakuru 572101 (Instagram bio) | [CONFIRM] |
| Phone | +91 79753 22922 (in every Instagram caption) | [CONFIRM] — also WhatsApp? |
| Sales contacts on Instagram | @sunil_suniii_, @shashank_rc (many reels are collabs with @shashank_rc) | [CONFIRM] roles |
| Instagram | https://www.instagram.com/nandiniconstructions/ (180 posts) | Confirmed |
| YouTube | https://www.youtube.com/@nandini_constructions_tumkur | Confirmed (Instagram bio) |
| Profile tagline | "Architectural Designer · We Build Your Dreams" | — |
| Advertised pricing | Turnkey from ₹1,850/sq.ft; interiors from ₹850–₹1,000/sq.ft (Instagram captions) | Rental package updated to ₹1,850 (§8) |
| Areas seen on posts | Tumakuru (SIT Extension, SIT 12th Cross, KR Extension), Kadaba, Nittur | [CONFIRM] full list |
| Founder, year established, GSTIN, email, office hours | Unknown | [CONFIRM] |
| Google rating + review count | TBD (pull from GBP) | [CONFIRM] |
| Logo | "NC" building mark (Instagram profile picture) | [CONFIRM] — need SVG/PNG file |

All of these live in the `site_settings` table (see §7) — **never hard-code business facts in components.**

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React Server Components, Server Actions) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| Components | shadcn/ui (customised to brand) + Lucide icons |
| Motion | Lib-free primitives (CSS + IntersectionObserver + shared scroll store) for reveals, counters, headings, parallax; **GSAP + ScrollTrigger** for pinned/scrubbed scenes only, always dynamically imported; Framer Motion (`LazyMotion` + `m`) for UI micro-interactions only (modals, tabs). See §3.7 |
| Smooth scroll | Lenis (disabled on `prefers-reduced-motion`), driven by the GSAP ticker once GSAP loads |
| Testing | Vitest (unit tests for pure logic + hooks; `jsdom` env where needed) |
| Tooling | pnpm, ESLint 9 flat config (`eslint-config-next`), Prettier (+ `prettier-plugin-tailwindcss`) |
| Forms | React Hook Form + Zod (shared schemas client + server) |
| Backend | Supabase — Postgres, Auth (admin only), Storage, RLS, Edge Functions |
| Email | Resend (lead notifications + customer auto-reply) |
| Spam protection | Cloudflare Turnstile + server-side rate limiting |
| Images | `next/image`, Supabase Storage, AVIF/WebP, blur placeholders |
| Analytics | GA4 + Google Ads conversion tag + Meta Pixel (via GTM), Vercel Analytics |
| Hosting | Vercel |
| Content editing | Custom admin panel at `/admin` (Supabase-backed) — no external CMS |

---

## 3. Design Direction

### 3.1 Feel
**Premium-trustworthy, warm, conversion-first.** Brick&Bolt's clarity and proof density + Rightcon's warmth and "your dream home" emotion. Balanced motion — animation supports the story, never delays the CTA.

Keywords: solid · transparent · crafted · modern Indian home · calm confidence.

### 3.2 Colour palette
**Derived from the client's logo** (`public/nandini-constructions-logo.png`, sampled 2026-10-15): indigo building mark **#29176E**, red "NC" monogram **#D0302A**, sky-blue underline **#0993D8**, on white.

```css
@theme {
  --color-ink: #17113D;          /* deep indigo-black — body text, headings, hero, footer */
  --color-charcoal: #29176E;     /* logo indigo — dark sections (stats band, final CTA); alias --color-indigo */
  --color-brand: #D0302A;        /* logo red — the ONE CTA colour (white text 5.1:1) */
  --color-brand-dark: #A8231E;   /* CTA hover; red eyebrow text on light */
  --color-brand-soft: #FBEAE9;   /* red tint — highlights, badges, "Upgraded" */
  --color-sky: #0993D8;          /* logo underline — decorative only (lines, progress bar); 3.4:1, never small text */
  --color-sky-light: #8FD3F7;    /* accent text on indigo (8.9:1) — eyebrows, hero accent word */
  --color-sky-soft: #E7F4FC;
  --color-sand: #F5F4FA;         /* cool off-white page sections */
  --color-stone: #8B88A3;        /* decorative muted */
  --color-line: #E3E1EE;         /* borders, dividers */
  --color-success: #1F8A5B;      /* WhatsApp, checkmarks */
}
```
- One accent colour only for CTAs (red) so the eye always finds the action; indigo is the identity colour.
- Alternate `sand` and white sections; indigo sections for rhythm (stats band, final CTA), footer in `ink`.
- Logo assets: `public/brand/nc-mark.png` (header mark), `public/brand/nc-logo.png` (full logo), `app/icon.png` / `app/apple-icon.png` (favicons). On dark backgrounds the mark sits on a white tile.
- Contrast: all text ≥ WCAG AA.

### 3.3 Typography
- **Headings:** `Manrope` (700/800) — sturdy, modern, engineered.
- **Accent (optional, sparingly):** `Instrument Serif` italic for one emotional word per hero headline ("your *home*").
- **Body:** `Inter` (400/500), 16–18px, 1.6 line-height.
- Load via `next/font` with `display: swap`, subset Latin.
- Kannada support: if a Kannada toggle is added later (§13), use `Noto Sans Kannada`.

### 3.4 Imagery
- Real Nandini site photos and completed homes are the #1 trust asset — request a full photo/video dump from the client (in-progress + completed + team on site).
- Until supplied, use clearly temporary licensed stock, tracked in `/docs/placeholder-assets.md` so all are replaced before launch.
- Style: natural daylight, wide elevations, warm interiors, people on site (engineers, not stock models).
- Every project card shows: elevation photo, owner first name, sq.ft, floors (G+2), package, locality.

### 3.5 UI components (design system)
- Buttons: `primary` (brand fill), `secondary` (ink outline), `ghost`, `whatsapp` (green, WhatsApp icon). Height 48px min on mobile.
- Cards: 16px radius, 1px `line` border, subtle shadow on hover, image zoom 1.04.
- Badges: package tier, locality, "Completed" / "Ongoing".
- Stat counters: count-up on enter viewport (once).
- Section header pattern: eyebrow (uppercase, brand, tracked) → H2 → one-line subtext.
- Icons: Lucide, 1.5 stroke.

### 3.6 Motion rules
- Hero: headline word stagger (CSS, starts at first paint) + subtle scale/darken on scroll-out.
- Sections: fade-up 16px, 0.5s, once (`<Reveal>`). Most of the site uses only this — restraint is the point.
- **Pinned storytelling sections are allowed** (signature scenes only, see §3.7). **Hijacking native scroll speed or direction is not**: Lenis only smooths the native scroll position, it never remaps distance or direction, and no section converts vertical wheel input into anything other than the scroll position (horizontal galleries are driven by that position, not by intercepting wheel events).
- No preloader, no animation blocking or delaying any CTA; the hero CTA is tappable without JS and within 1s.
- Respect `prefers-reduced-motion` everywhere (see §3.7 for exact behaviour).

### 3.7 Scroll-Driven Architecture
The home page should feel like watching a Nandini home being built as you scroll, without ever costing speed or conversions.

**Global scroll system (`lib/motion/`)**
- `ScrollProvider` (single client component in the root layout) loads Lenis after first paint (idle callback, dynamic import). Lenis runs on its own rAF loop until a scene loads GSAP; `loadGsap()` (`lib/motion/gsap.ts`) then hands Lenis over to `gsap.ticker` (`lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `lagSmoothing(0)`), so there is exactly **one shared ticker**. Pages without scenes never download GSAP.
- A tiny scroll store (`scroll-store.ts`) publishes scroll position to lib-free primitives (progress bar, parallax) with one listener.
- On route change: jump to top, then `ScrollTrigger.refresh()` (only if GSAP is loaded). Every GSAP effect is created inside `useGsapContext()` and reverted on unmount.
- An inline `<head>` script adds `html.motion-ok` only when JS runs **and** motion isn't reduced. Every hidden initial state is scoped under `.motion-ok`, so without JS all content and CTAs are visible.

**Primitives (`components/motion/`)**
| Component | Behaviour | Engine |
|---|---|---|
| `<Reveal>` | fade/translate on enter, configurable, once | IO + CSS |
| `<SplitHeading>` | word stagger; real text kept in an `sr-only` span, visual words `aria-hidden`; `immediate` mode for hero (CSS animation from first paint) | CSS (+ IO) |
| `<CountUp>` | SSR renders the final value; counts up once on enter | IO + rAF |
| `<ParallaxImage>` | `next/image`, y-offset ≤ 8%, off on mobile + reduced motion | scroll store |
| `<ScrollProgress>` | 2px brand bar under the header | scroll store |
| `<PinnedScene>` | pinned, scrubbed section; `children(progress 0→1)` render prop and/or `timeline(tl)` builder; built-in skip link | CSS sticky + GSAP ScrollTrigger (lazy) |

**Pinning model:** pins use CSS `position: sticky` inside an outer wrapper whose height is set in CSS at SSR (e.g. `300vh` desktop) → space is reserved, zero CLS, and no-JS still shows the content. ScrollTrigger only measures progress (no `pin`, no `pinSpacing`). Progress is written to a CSS variable `--p` every frame without a React render; React state is rAF-batched and quantised for render props. Heavy scenes (house build) scrub a GSAP timeline instead of re-rendering.

**Mobile (< 768px):** pins max `150vh`, lighter effects, no parallax, projects gallery = native swipe carousel. Hero CTA always tappable within 1s.

**Reduced motion:** Lenis off; pinned scenes render as static stacked content (wrapper `height: auto`, not sticky, `progress = 1` or a `staticFallback`); no scrub, no parallax, no count-up, reveals show immediately.

**Signature home scenes (Phase 3):** Hero (scale 1→1.08 + darken on scroll-out, stats band slides over) · "Watch your home rise" isometric SVG build (7 stages, separate `<g>` layers, captions from package data, clickable stage indicator; no Three.js/image sequences) · Package switcher (Rental → Medium → Premium, price counts, highlights cross-fade) · Process timeline (line draws, steps alternate L/R, stacked on mobile) · Projects (pinned horizontal on desktop, swipe on mobile) · Final CTA (form slides in, bg parallax). Everything else: `<Reveal>` only.

**Conversion guardrails**
- Every pinned scene shows a CTA or a skip affordance (e.g. "Skip to packages ↓").
- Sticky header CTA, mobile bottom bar and WhatsApp FAB sit above every animation. z-index plan (CSS vars in `globals.css`; scenes never create stacking contexts above `--z-scene`):

| Layer | Var | Value |
|---|---|---|
| Scene / pinned layers | `--z-scene` | 10 |
| Header | `--z-header` | 50 |
| Scroll progress | `--z-progress` | 51 |
| WhatsApp FAB, mobile CTA bar | `--z-cta` | 60 |
| Mobile nav sheet | `--z-sheet` | 80 |
| Modals (exit intent) | `--z-modal` | 100 |
| Toasts | `--z-toast` | 110 |

**Performance budget (mobile 4G):** LCP < 2.0s · CLS < 0.05 · INP < 200ms · motion JS < 60KB gz (Lenis + GSAP core + ScrollTrigger + primitives). GSAP/ScrollTrigger only via dynamic import in client components that need it. Hero renders meaningful content without JS.

**Dev previews:** `/dev/motion` (every primitive + forced reduced-motion toggle) and `/dev/house` (Phase 3). Both `noindex`, disallowed in robots, and 404 in production unless `ENABLE_DEV_PAGES=1`.

---

## 4. Conversion Architecture (non-negotiable)

1. **Sticky header CTA** — "Get Free Quote" button always visible; phone icon on mobile.
2. **Mobile sticky bottom bar** — `Call` | `WhatsApp` | `Get Quote` (appears after 300px scroll).
3. **Floating WhatsApp button** (desktop) with pre-filled message: *"Hi Nandini Constructions, I'd like a quote for building on my plot."*
4. **Hero lead form** (short: Name, Phone, Plot location, Plot size) — above the fold on desktop, one tap away on mobile.
5. **Cost calculator → lead capture**: show the estimate range freely; detailed package-wise breakdown unlocked by phone number (soft gate — never block the basic number).
6. **Exit-intent modal** (desktop only, once per session): "Get a free cost estimate PDF for your plot."
7. **CTA after every major section** — alternate between "Get Free Quote", "Calculate Cost", "Talk to an Engineer".
8. **Trust next to every form**: Google rating badge, "No spam — we call within 30 minutes [CONFIRM SLA]", privacy line.
9. **Thank-you page** (`/thank-you`) fires conversion events; shows next steps, WhatsApp link and 3 projects to browse.
10. **UTM + click-ID capture**: store `utm_*`, `gclid`, `fbclid`, landing page and referrer on every lead.
11. **Speed**: LCP < 2.0s on 4G mobile, CLS < 0.05 — a slow site kills conversion.

---

## 5. Sitemap & Pages

```
/                                   Home
/packages                           Construction packages (overview + full comparison)
/packages/[slug]                    Single package detail page
/cost-calculator                    Construction cost estimator
/emi-calculator                     Home construction loan EMI calculator
/projects                           Project gallery (filterable)
/projects/[slug]                    Project case study
/services                           Services overview
/services/[slug]                    residential-construction | commercial-construction |
                                    interior-design | renovation-and-extension | architectural-design
/how-it-works                       Process + payment milestones + quality checks
/about                              Story, founder, team, values
/reviews                            Testimonials (video + text + Google reviews)
/blog, /blog/[slug]                 Articles (SEO)
/construction-company-in-[area]     Local SEO landing pages (Tumakuru, SIT Extension, Kadaba, Nittur, …)
/faq                                FAQs
/contact                            Contact + map + office hours
/thank-you                          Post-conversion page
/privacy-policy, /terms             Legal
/admin/*                            Admin dashboard (auth-protected)
```

### 5.1 Navigation
- **Header:** Logo · Packages · Projects · Services ▾ · How It Works · Cost Calculator · About · [Call icon] · **Get Free Quote**
- **Footer:** about blurb + socials · Company (About, Reviews, How It Works, Careers, Contact) · Services · Resources (Cost Calculator, EMI Calculator, Packages, Blog, FAQ) · Areas We Serve (local pages) · Office address + map link + hours · legal · "Website by ITBIZone".

---

## 6. Page Specifications

### 6.1 Home (`/`)
Sections in order:

1. **Hero** — Full-bleed photo/video of a completed Nandini home. H1 e.g. "Build your dream home in Tumakuru — at a fixed price, delivered on time." Subtext on turnkey design-to-handover. Primary CTA "Get Free Quote", secondary "Calculate Cost". Right side (desktop): short lead form card. Below: trust strip — Google rating, homes delivered, years, cities/areas [all CONFIRM].
2. **Stats band** (charcoal) — Projects delivered · Sq.ft built · Quality checks per stage · Years of experience [CONFIRM all numbers].
3. **What we build** — 4 cards: Residential homes · Commercial buildings · Interiors · Renovation & extension → `/services/[slug]`.
3a. **Watch your home rise** (pinned scene, §3.7) — isometric SVG house assembles over 7 stages (Plot & excavation → Foundation & plinth → Columns & slabs → Block walls → Plastering & waterproofing → Windows, doors, paint → Handover); captions pull materials from §8 package data; clickable 1–7 stage indicator; "Skip to packages ↓".
4. **Packages** (pinned package-switcher scene, §3.7) — Rental → Medium → Premium by scroll or tabs; price counts between tiers; the 6 highlights cross-fade with changed items highlighted; "Most Popular" ribbon on one tier; CTAs "Calculate cost for this package" + "Compare All Packages".
5. **Why Nandini** — 4–6 promise cards (tabbed on desktop, accordion on mobile): Fixed transparent pricing (no hidden costs) · Stage-wise quality checks · Milestone-linked payments · On-time delivery commitment · Dedicated site engineer + regular photo updates · Structural warranty [CONFIRM which promises the client can actually honour — never claim escrow, delay penalties or warranties they don't offer].
5b. **Elevation designs** — client-supplied 3D renders (`public/elevation_images`) in an auto-scrolling marquee.
5c. **From our sites (Instagram)** — real bhoomi pooja, gruha pravesha and site-progress reels from @nandiniconstructions (`lib/data/instagram.ts`). Cards link to the post; tapping opens Instagram's official embed in a dialog (no Instagram code loads before the tap). Optional cover images: `public/instagram/<shortcode>.jpg`.
6. **Featured projects** — 6 project cards (filter chips: All / Residential / Commercial / Interiors) → "View All Projects". Pinned horizontal scroll gallery on desktop, native swipe carousel on mobile (§3.7).
7. **How it works** — 5–6 step timeline (line draws with scroll, steps alternate left/right, stacked on mobile): Meet & understand → Design & approvals → Fixed quote & agreement → Construction with quality checks → Finishing → Handover & support.
8. **Cost calculator teaser** — compact inline calculator (location, plot sq.ft, floors, package) → shows range → "See detailed breakdown". *Built:* uses total built-up sq.ft (not plot sq.ft) until FAR coverage per floor is confirmed; breakdown CTA goes to the `#quote` form with the package pre-selected.
4b. **Package details** (added at client request) — full §8.2 comparison table + T&C directly under the package switcher.
10. *Built as an auto-scrolling marquee* (two rows, pause control, static with reduced motion) of brand names from the §8 sheet; swap in logo files when the client supplies them.
9. **Testimonials** — video testimonials carousel + text reviews (owner name, BHK, floors, locality) + Google rating widget.
10. **Material brands we use** — logo strip (cement, steel, tiles, sanitaryware, paints, electricals) [CONFIRM brands per package].
11. **Areas we serve** — chip grid of Tumakuru localities and nearby towns → local SEO pages.
12. **FAQ** — 6–8 top questions (accordion, FAQPage schema).
13. **Final CTA** (charcoal) — "Ready to build on your plot?" + full lead form + Call/WhatsApp buttons.

### 6.2 Packages (`/packages`) — core conversion page
- Hero with short promise: "Every material, brand and finish listed upfront."
- **Package cards** (one per tier): name, ₹/sq.ft, tagline, 6 highlight inclusions, "Get Quote for this Package" CTA.
- **Full comparison table** — sticky header row with package names + prices; spec categories as collapsible groups (see §8). Horizontal scroll on mobile with sticky first column, OR mobile "pick 2 to compare" toggle.
- "Not sure which package?" mini-quiz (3 questions: budget, finish level, timeline) → recommends a tier → lead form.
- Notes: what's excluded (e.g., compound wall, sump, approvals fees) [CONFIRM] — transparency builds trust.
- Downloadable spec sheet PDF per package (generated from DB, gated by phone number).
- All package data comes from Supabase (`packages`, `package_spec_items`) — editable from admin.

### 6.3 Package detail (`/packages/[slug]`)
Hero with price · full spec list by category · projects built in this package · FAQ · lead form pre-selecting this package.

### 6.4 Cost calculator (`/cost-calculator`)
**Inputs:** City/locality · Plot dimensions or total built-up sq.ft · Floors (G, G+1 … G+4) · Package (Rental ₹1,850 / Medium ₹2,100 / Premium ₹2,300) · Add-ons (compound wall, lift provision, solar, interiors) [CONFIRM add-on pricing]. Sump and overhead tank are already in every package (§8).

**Logic** (`lib/estimator.ts`, pure function, unit-tested):
```
builtUp = plotArea × FAR coverage per floor (or user-entered builtUp)
base    = builtUp × package.rate_per_sqft
addons  = Σ selected addon prices (flat or per-unit)
total   = base + addons
show    = range [total × 0.95, total × 1.05]  (rounded to ₹10k)
```
**Output:** estimated range + stage-wise payment split (from `payment_milestones`) + package breakdown by category (gated: name + phone). Clear disclaimer: "Indicative estimate. Final quote after site visit."
Save every completed calculation to `estimates` (linked to lead if submitted).

### 6.5 EMI calculator (`/emi-calculator`)
Loan amount · interest rate · tenure → EMI, total interest, amortisation chart. CTA: "Get a quote to plan your loan". Mention bank-loan assistance only if client offers it [CONFIRM].

### 6.6 Projects (`/projects`, `/projects/[slug]`)
- Filters: Type (Residential / Commercial / Interiors), Status (Completed / Ongoing), Package, Locality, Floors. URL-synced query params.
- Grid of cards; masonry not required.
- **Case study page:** hero gallery (lightbox), key facts box (owner, locality, plot size, built-up, floors, package, duration, status), story (requirement → design → construction → handover), before/during/after photo timeline, optional YouTube walkthrough embed, owner testimonial, "Build a home like this" CTA with package pre-selected.

### 6.7 Services (`/services`, `/services/[slug]`)
Each service page: hero · what's included · process · relevant projects · packages (if residential) · FAQs · lead form with service pre-selected.
- Residential construction (independent houses, duplexes, villas, rental units)
- Commercial construction (offices, showrooms, hotels, factories, PG/co-living)
- Interior design (home, café, office, gym, clinic, spa, modular kitchen)
- Renovation & extension (floor addition, remodel)
- Architectural design & approvals (floor plans, 3D elevation, structural design, plan approval support) [CONFIRM]

### 6.8 How it works (`/how-it-works`)
Detailed process timeline, payment milestone table (e.g., Agreement → Foundation → Plinth → each slab → Brickwork → Plastering → Flooring → Handover), quality checks per stage, communication cadence (weekly photo/video updates on WhatsApp, site visits), downloadable sample agreement/BOQ [CONFIRM].

### 6.9 About (`/about`)
Founder story ([CONFIRM] founder / proprietor) with photo · mission/values · timeline of milestones · team (site engineers, architects) · office/site photos · certifications/registrations · CTA.

### 6.10 Reviews (`/reviews`)
Video testimonials first, then text reviews filterable by service; Google rating summary with "Read on Google" link. Only real reviews — no fabricated testimonials.

### 6.11 Local SEO pages (`/construction-company-in-[area]`)
Template driven by `service_areas` table. Each page: area-specific H1, intro (unique per area, editable in admin), projects in/near that area, packages, plan-approval authority note (Tumakuru City Corporation / TUDA / gram panchayat etc. [CONFIRM], editable), FAQs, lead form with area pre-filled. Start with places Nandini’s Instagram shows active sites in: Tumakuru (SIT Extension, KR Extension), Kadaba, Nittur [CONFIRM full service-area list]. Avoid thin/duplicated content — each page needs genuinely unique copy.

### 6.12 Blog
Categories: Cost & budgeting · Planning & approvals · Vastu & design · Materials · Interiors. MDX-free — stored in Supabase as rich text (Tiptap JSON → HTML). Each post ends with a contextual CTA.

### 6.13 Contact
Lead form (full) · Call / WhatsApp / Email cards · embedded Google Map · office hours · "Visit our office" CTA.

---

## 7. Supabase Backend

### 7.1 Tables
```sql
-- Settings (single row)
site_settings (id, company_name, legal_name, phone, whatsapp, email, address, map_embed_url,
  gbp_url, google_rating, google_review_count, gstin, social_links jsonb, office_hours jsonb,
  stats jsonb, updated_at)

-- Packages
packages (id, slug, name, tagline, rate_per_sqft numeric, is_popular bool, sort_order,
  is_active bool, highlights text[], created_at, updated_at)
package_spec_categories (id, name, icon, sort_order)          -- e.g. Design, Structure, Kitchen…
package_spec_items (id, package_id fk, category_id fk, label, value, sort_order)
addons (id, name, unit 'flat'|'per_sqft'|'per_unit', price numeric, is_active)
payment_milestones (id, stage_name, percentage numeric, sort_order)

-- Projects
projects (id, slug, title, owner_name, type 'residential'|'commercial'|'interior',
  status 'completed'|'ongoing', locality, city, plot_size_sqft, built_up_sqft, floors,
  package_id fk null, duration_months, summary, story jsonb, youtube_url, cover_image,
  is_featured bool, sort_order, published bool, created_at)
project_images (id, project_id fk, url, alt, stage 'before'|'during'|'after', sort_order)

-- Social proof
testimonials (id, name, details, locality, rating, quote, video_url, thumbnail, project_id fk null,
  service, is_featured, published)
brand_partners (id, name, logo_url, category, sort_order)

-- Content
services (id, slug, title, summary, content jsonb, hero_image, sort_order, published)
service_areas (id, slug, area_name, intro, approval_authority, faq jsonb, published)
faqs (id, question, answer, page_scope text[], sort_order)
blog_posts (id, slug, title, excerpt, content jsonb, cover_image, category, author,
  seo_title, seo_description, published_at, published)

-- Leads & CRM
leads (id, name, phone, email, plot_location, plot_size, floors, package_interest,
  service_interest, budget_range, timeline, message, source_page, form_type
  'hero'|'contact'|'calculator'|'package'|'exit_intent'|'whatsapp_click',
  utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid, referrer,
  status 'new'|'contacted'|'site_visit'|'quoted'|'won'|'lost' default 'new',
  assigned_to, notes, created_at, updated_at)
lead_activities (id, lead_id fk, type, note, created_by, created_at)
estimates (id, lead_id fk null, inputs jsonb, result jsonb, created_at)

-- Admin
admin_users (id = auth.users.id, name, role 'owner'|'editor'|'sales')
```

### 7.2 RLS
- Public (`anon`): `SELECT` only on published content tables + active packages/addons/settings.
- `leads`, `estimates`: **no direct anon insert** — inserts go through a Server Action / Route Handler using the service role after Zod validation + Turnstile verification + rate limit (5/IP/hour).
- Admin roles: `owner` full access; `editor` content tables; `sales` leads + activities only. Enforce via `admin_users.role` in policies.

### 7.3 Storage buckets
`projects`, `testimonials`, `blog`, `brand`, `packages-pdf` — public read, admin write. Resize/compress on upload (client-side with `browser-image-compression`, max 2400px).

### 7.4 Lead flow
1. Form submit → Server Action validates (Zod) + Turnstile + rate limit.
2. Insert into `leads` (+ `estimates` if calculator).
3. Edge Function / Resend: notify client team by email (and optionally WhatsApp via a provider later); auto-reply to customer if email provided.
4. Redirect to `/thank-you?type=…` → fire GA4 `generate_lead`, Google Ads conversion, Meta `Lead`.
5. Phone validation: Indian mobile `^[6-9]\d{9}$` with +91 prefix handling; allow international for NRIs.

### 7.5 Data fetching
- RSC with Supabase server client; `revalidateTag` on admin edits (tags: `packages`, `projects`, `settings`, …).
- Static generation for projects, services, areas, blog via `generateStaticParams`; ISR fallback.
- Generate types with `supabase gen types typescript` → `types/supabase.ts`.

---

## 8. Construction Packages (client-supplied sheet)

> Source: Nandini Constructions's official package sheet ("Construction Packages To Fulfill Your Dream Project").
> This section is the seed data for `packages`, `package_spec_categories` and `package_spec_items`. Values are copied exactly from the sheet — do not "improve" brands or prices.

### 8.1 Tiers

| slug | Name | Rate | Positioning (site copy) | `is_popular` |
|---|---|---|---|---|
| `rental` | Rental Package | **₹1,850 / sq.ft** *(sheet said ₹1,800; changed 2026-10-15 to match Instagram "turnkey from ₹1,850")* | Value build for rental units & investment properties | false |
| `medium` | Medium Package | **₹2,100 / sq.ft** | Balanced quality for family homes — ACC/Ramco, Finolex fireproof wiring, teak main door | **true** [CONFIRM] |
| `premium` | Premium Package | **₹2,300 / sq.ft** | Top brands, premium emulsion, SS railing, Fosroc waterproofing | false |

Display prices as "₹1,850/sq.ft" (en-IN grouping). Use the internal name "Rental Package" as on the sheet; a friendlier display name (e.g., "Essential") only if the client approves [CONFIRM].

### 8.2 Full specifications

Rupee values on doors, tiles, granite, windows, basins, accessories and tanks are **allowances** (budgeted rate). Show them in the UI with an "allowance" label; upgrades are paid as the difference (see T&C 3).

#### Structure & Core Materials
| Item | Rental – ₹1,850 | Medium – ₹2,100 | Premium – ₹2,300 |
|---|---|---|---|
| Cement | Maha | ACC, Ramco | Zuari, Ultratech, Birla Super |
| Steel | Meenakshi | Kamdhenu, Meenakshi | SK TMT |
| Wall | 6" & 4" Blocks (32 & 30) | 6" & 4" Blocks (36 & 30) | 6" & 4" Blocks (42 & 34) |
| Sand | M sand | M sand | M sand |
| Plastering sand | P sand | P sand | P sand |
| Aggregate 20mm / 12.5mm | Crushed stone | Crushed stone | Crushed stone |

#### Doors & Windows
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Main door (frame / shutter / hardware) | Wood frame (5'×4'), 32mm shutter with fittings — ₹25,000 | Gaana teak wood frame (5'×4'), 32mm shutter with fittings — ₹30,000 | Teak wood frame (5'×4'), 32mm shutter with fittings — ₹35,000 |
| Puja room door | Wood frame (5'×3'), 32mm shutter with fittings — ₹15,000 | Gaana teak wood frame (5'×3'), 32mm shutter with fittings — ₹22,000 | Teak wood frame (5'×3'), 32mm shutter with fittings — ₹25,000 |
| Bedroom doors & fittings | Mahagani wood frame (5'×3'), skin door shutter with fittings — ₹7,000 | Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹8,000 | Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹10,000 |
| Toilet doors & fittings | Mahagani wood frame (5'×3'), skin door shutter with fittings — ₹6,000 | Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹7,000 | Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹8,000 |
| Windows | UPVC 2.5 track, 5mm glass — ₹380/sq.ft (White) | UPVC 2.5 track, 5mm glass — ₹400/sq.ft (White) | UPVC 2.5 track, 5mm glass — ₹400/sq.ft (White) |
| Window grill | 10mm MS rod | Round/Square 12mm rod | Round/Square 12mm rod |

#### Flooring & Tiling
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Flooring | Flooring tile — ₹60/sq.ft | Flooring tile / Granite — ₹80/sq.ft | Flooring tile / Granite — ₹130/sq.ft |
| Dado tiles | Bathroom 7' ht — ₹40/sq.ft; Kitchen 2' ht — ₹40/sq.ft | Bathroom 10' ht — ₹50/sq.ft; Kitchen 2' ht — ₹45/sq.ft | Bathroom 10' ht — ₹65/sq.ft; Kitchen 2' ht — ₹65/sq.ft |
| Balcony / parking tile | ₹40/sq.ft | ₹50/sq.ft | ₹55/sq.ft |

#### Staircase
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Staircase granite | Sadaralli — ₹80/sq.ft | Sadaralli / Steel Grey — ₹90/sq.ft | Sadaralli / other granite — ₹100/sq.ft |
| Staircase railing | MS railing — ₹140/sq.ft | MS railing — ₹160/sq.ft | SS railing without glass — ₹700/sq.ft |

#### Painting
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Internal paint | Birla / Asian — 2 coat putty + 2 coat Tractor Emulsion | Birla / Asian — 2 coat putty + 2 coat Tractor Emulsion | Birla / Asian — 2 coat putty + 2 coat Premium Emulsion |
| External paint | Asian Ace Exterior Emulsion | Asian Apex Exterior Emulsion | Asian Apex Exterior Emulsion |
| MS & wood paint | MS & internal shutter enamel; Pooja & main door hand polish | MS & internal shutter enamel; Pooja & main door polish | MS & internal shutter enamel; Pooja & main door polish |

#### Kitchen
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Kitchen slab | 30mm granite — ₹160/sq.ft | 30mm granite — ₹200/sq.ft | 32mm granite — ₹220/sq.ft |
| Kitchen basin | SS basin — ₹3,000/no | SS basin — ₹4,000/no | SS basin — ₹6,000/no |

#### Bathroom & Plumbing
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Bathroom accessories | ₹20,000 / bathroom | ₹25,000 / bathroom | ₹35,000 / bathroom |
| Plumbing pipes & fittings | Astral | Astral / Ashirvad / Supreme | Astral / Ashirvad / Supreme |
| Overhead tank (1,000 L) | Ganga / Kaveri double layered — ₹7/ltr | Ganga / Kaveri triple layered — ₹7/ltr | Ganga / Kaveri triple layered — ₹9/ltr |
| Underground sump | 6" block work, 6,000 L capacity | 8" block work, 8,000 L capacity | 8" block work, 8,000 L capacity |

#### Electrical
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Electrical wire | Greatwhite | Finolex fireproof wires | Finolex fireproof wires |
| Switches & sockets | Hi-Fi | GM / Anchor Roma (White) | Anchor Roma Plus / Legrand (White) |

#### Waterproofing & Levels
| Item | Rental | Medium | Premium |
|---|---|---|---|
| Waterproofing | Dr. Fixit | Dr. Fixit | Fosroc Brush Bond |
| Floor-to-floor finish level | 10 ft clear height | 10 ft clear height | 10 ft clear height |
| Plinth height from road level | Car park 1.5 ft; Building 2 ft | Car park 1.5 ft; Building 2 ft | Car park 1.5 ft; Building 2 ft |

### 8.3 Terms & Conditions (show on `/packages`, package detail pages, calculator result and PDF spec sheet)
1. This quotation is valid for 15 days.
2. After building completion, the client pays the final settlement amount within a month.
3. If the client opts for higher-end products, the difference amount is paid before work completion.
4. Rental Package: ₹200/sq.ft is chargeable extra for non-tendering items. [CONFIRM exactly which items this covers so the site can list them clearly]

### 8.4 How the site uses this data
- **Package cards — highlights** (`packages.highlights`, max 6):
  - Rental: Maha cement + Meenakshi steel · UPVC windows · Dr. Fixit waterproofing · Astral plumbing · 6,000 L sump included · 10 ft clear height
  - Medium: ACC / Ramco cement · Gaana teak main door · Finolex fireproof wiring · Anchor Roma / GM switches · 10 ft bathroom dado · 8,000 L sump included
  - Premium: Ultratech / Birla Super / Zuari cement + SK TMT · Teak main & puja doors · Premium emulsion · SS staircase railing · Fosroc waterproofing · Legrand / Anchor Roma Plus switches
- **Comparison table:** categories in the order of §8.2; highlight cells that differ between tiers; an "Only differences" toggle hides identical rows (sand, plastering sand, aggregate, clear height, plinth).
- **Allowance UX:** a ⓘ tooltip on any ₹ value: "Budgeted allowance — choose any product up to this value; pay only the difference for upgrades."
- **Calculator:** base rates ₹1,850 / ₹2,100 / ₹2,300 per sq.ft. Sump and overhead tank are **included** — do not list them as add-ons. For the Rental package, show the ₹200/sq.ft non-tendering note under the result (do not silently add it) [CONFIRM handling].
- **Upgrade upsell:** on each package card, show "₹250/sq.ft more gets you …" (Rental→Medium, computed from the rates) and "₹200/sq.ft more gets you …" (Medium→Premium) with 3 key upgrades each.
- **Seed:** put all rows into `supabase/seed.sql` exactly as above; categories = the 9 headings in §8.2.

The ₹1,600/sq.ft figure from public listings is superseded by this sheet — do not use it anywhere.

---

## 9. Admin Dashboard (`/admin`)

Supabase Auth (email + password, magic link optional), middleware-protected.

- **Overview:** leads today/week/month, conversion funnel by status, leads by source/UTM, top pages, recent leads.
- **Leads CRM:** table with search/filters (status, source, date, package), lead detail drawer with activity log and notes, status pipeline (kanban view), one-click Call / WhatsApp, CSV export.
- **Packages:** edit tiers, rates, highlights, spec items (drag to reorder); changes instantly reflect on site + calculator.
- **Add-ons & payment milestones** editor.
- **Projects:** CRUD, multi-image upload with stage tags, reorder, feature toggle.
- **Testimonials, Brand partners, FAQs, Services, Service areas, Blog** — CRUD with publish toggle.
- **Site settings:** contact info, stats, socials, Google rating (manual update).
- UI: shadcn/ui, dark sidebar, matches brand accent.

---

## 10. SEO

- Metadata API per page; dynamic OG images via `next/og` (project photo + title + logo).
- JSON-LD: `HomeAndConstructionBusiness` (LocalBusiness) with address, geo, hours, aggregateRating (only real data), `Service`, `FAQPage`, `BreadcrumbList`, `Article` (blog), `Offer` per package.
- `sitemap.ts` + `robots.ts`; canonical URLs; clean slugs.
- Target keywords: "construction company in Tumakuru" / "construction company in Tumkur", "house construction in Tumkur", "builders in Tumkur", "construction cost per sq ft Tumkur", "turnkey house construction Tumakuru", "G+2 house construction cost". Use both spellings (Tumakuru / Tumkur) — locals and Google use both.
- Local SEO: NAP identical to GBP everywhere; embed map; link GBP; area pages.
- Image alt text from DB fields; descriptive filenames.

---

## 11. Performance & Accessibility

- Lighthouse ≥ 95 (Performance, A11y, Best Practices, SEO) on mobile.
- Hero image priority-loaded, ≤ 200KB AVIF; hero video (if used) muted, `playsinline`, poster image, lazy on mobile or replaced with image.
- Third-party scripts via GTM loaded `afterInteractive`; YouTube via lite-embed facade.
- Keyboard navigable, visible focus rings, semantic landmarks, form labels + error messages linked with `aria-describedby`, 44px touch targets.

---

## 12. Project Structure

```
app/
  (site)/
    page.tsx
    packages/ [slug]/
    cost-calculator/  emi-calculator/
    projects/ [slug]/
    services/ [slug]/
    how-it-works/  about/  reviews/  faq/  contact/  thank-you/
    blog/ [slug]/
    construction-company-in-[area]/
    privacy-policy/  terms/
    layout.tsx
  admin/
    (auth)/login/
    (dashboard)/ page.tsx  leads/  packages/  projects/  testimonials/
                 services/  areas/  blog/  faqs/  settings/
  api/ (webhooks only if needed)
  (dev)/dev/     motion/  house/   (noindex dev previews, 404 in prod unless ENABLE_DEV_PAGES=1)
  sitemap.ts  robots.ts  opengraph-image.tsx
components/
  ui/            shadcn primitives
  site/          Header, Footer, MobileCtaBar, WhatsAppFab, ExitIntentModal, Placeholder
  motion/        Reveal, PinnedScene, ScrollProgress, CountUp, ParallaxImage, SplitHeading
  scenes/        HouseBuild/ (isometric SVG, stage layers) — PackageSwitcher/ProjectsRail live in sections/
  sections/      Hero, StatsBand, WhatBuild, PackagesPreview, WhyUs, FeaturedProjects,
                 ProcessTimeline, CalculatorTeaser, Testimonials, BrandStrip, AreasGrid,
                 FaqSection, FinalCta
  forms/         LeadForm (variants), CalculatorForm, PackageQuiz
  admin/
lib/
  motion/        ScrollProvider, scroll-store, gsap (lazy loader + ticker handoff),
                 use-reduced-motion, use-gsap-context, breakpoints
  site-config.ts getSiteConfig() — site_settings with typed [CONFIRM] fallback
  data/          packages.ts (§8 verbatim — interim source until Phase 2 seed), home.ts (section copy,
                 FAQs from §8, [SAMPLE] projects)
  supabase/ (server.ts, client.ts, admin.ts)
  estimator.ts  emi.ts  validations.ts  analytics.ts  utm.ts  rate-limit.ts
  queries/  actions/
types/supabase.ts
supabase/migrations/  supabase/seed.sql
tests/
docs/placeholder-assets.md  docs/CHANGELOG.md
```

---

## 13. Build Phases

1. **Foundation** — repo, Tailwind v4 theme tokens, fonts, shadcn, layout, header/footer, mobile CTA bar, WhatsApp FAB.
2. **Supabase** — migrations, RLS, seed (settings, packages placeholders, sample projects), generated types.
3. **Home page** — all sections with seed data.
4. **Packages + calculator** — comparison table, detail pages, estimator logic + tests, lead gating.
5. **Projects + services + local pages.**
6. **Lead pipeline** — Server Actions, Turnstile, rate limit, Resend, thank-you + conversion tracking.
7. **Admin dashboard** — auth, leads CRM, content CRUD.
8. **Content pages** — about, how-it-works, reviews, FAQ, blog, legal.
9. **SEO + performance + a11y pass.**
10. **Launch** — replace all placeholders, verify every [CONFIRM], domain, GBP website link, Search Console, GA4/Ads conversions test.

**Later (phase 2 ideas):** Kannada language toggle · customer project-tracking portal (photos, milestones, payments) · floor-plan library · referral programme · 360°/VR walkthroughs of completed homes.

---

## 14. Rules for Claude Code

- Business facts, prices, stats and reviews come **only** from Supabase / client-supplied data. If missing, render a clearly marked placeholder — never fabricate.
- Do **not** copy text, brand names, trademarks (e.g., proprietary quality-programme names), images or layouts verbatim from the reference sites. Use them for patterns only.
- Every new page must include: metadata, at least one CTA, mobile check, and JSON-LD where relevant.
- Server-side validation for every form; never trust client input.
- Keep components small, typed and server-first; add `"use client"` only where interaction needs it.
- Run `pnpm lint && pnpm typecheck && pnpm test` before considering a task done (plus a production build at the end of each phase).
- **Never run `next build` into `.next` while `pnpm dev` may be running** — it corrupts the dev server (`__webpack_modules__[moduleId] is not a function`). Use `pnpm build:check` / `pnpm start:check` (output in `.next-check`, served on port 3100).
- Motion: follow §3.7 — never import `gsap` statically; use `loadGsap()` + `useGsapContext()`. New animations default to `<Reveal>`.
- Log notable decisions in `docs/CHANGELOG.md` after each phase.
- Ask before adding new dependencies beyond §2.

---

## 15. Open Questions for the Client

1. Confirm legal name, address, phone, WhatsApp, email, GSTIN display.
2. Logo files (SVG) + any brand colours.
3. ~~Package sheet~~ ✅ received (§8). Still open: what "non-tendering items" covers for the Rental package, which tier to mark "Most Popular", whether design/drawings and approvals are included in the package rate, and any exclusions (compound wall, electricity/water connections, approval fees).
4. Add-on prices (compound wall, lift, solar, interiors).
5. Payment milestone percentages.
6. Real numbers: projects delivered, sq.ft built, years, team size.
7. Which promises they can commit to in writing: fixed price, delay compensation, structural warranty (years), quality checks count, progress update cadence.
8. Project photos/videos + owner consent for names in case studies.
9. Testimonials (video preferred) and Google review link.
10. Instagram / YouTube / Facebook handles.
11. Service areas (Tumakuru localities + nearby towns/taluks).
12. Lead notification recipients (email/WhatsApp) and response-time promise.
13. Domain + hosting access, existing website (if any) for redirects.
