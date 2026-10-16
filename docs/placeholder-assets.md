# Placeholder assets & facts

Everything here must be replaced or confirmed before launch (CLAUDE.md §13 Phase 10).
In the UI, unconfirmed facts render with an amber dashed **⚠ CONFIRM** chip (`components/site/Placeholder.tsx`).

## Assets

| Asset                                           | Where                            | Replace with                                                                                  |
| ----------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| Logo (PNG from client)                          | `public/brand/*`, `app/icon.png` | Vector (SVG/AI) version for print + crisp scaling — optional                                  |
| `public/dev/parallax-demo.svg`                  | `/dev/motion` only               | — (dev only, never on public pages)                                                           |
| Hero background = client 3D elevation render (stone-red-jaali) | `components/sections/Hero.tsx`   | Real completed-home photo/video (§3.4, ≤200 KB AVIF)                                          |
| `public/placeholders/blueprint.svg`             | Final CTA parallax background    | Real site/home photo                                                                          |
| Striped "Project photo — awaiting client" tiles | `ProjectsRail` cards             | Real project photos                                                                           |
| Brand logos (12 real, 12 wordmarks)             | `BrandMarquee`                   | See docs/brand-logo-sources.md — CONFIRM client is OK displaying them; supply remaining files |
| Empty testimonial slots                         | `Testimonials`                   | Real video + text reviews with owner consent                                                  |

## Client-supplied assets — open items

| Item                                     | Issue                                                                                                                                                                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/elevation_images/*` (11 renders) | Renders, not photos of finished homes — section copy says "designs". Client names are baked into 3 files ("Dr. Kumarsawmy @ Tumkur" ×2, "Mr. Nagraj") and a "kiran's" nameplate in 1; banners are cropped on screen only. **CONFIRM owner consent** or get clean exports. |

## Content

| Item                                       | Where                                  | State                                                                  |
| ------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------- |
| 4 `[SAMPLE]` projects                      | `lib/data/home.ts` → `SAMPLE_PROJECTS` | Fake, labelled on screen; replaced by `projects` table + real projects |
| "Why Nandini" promises 2–6                 | `lib/data/home.ts` → `PROMISES`        | Marked CONFIRM until the client commits in writing (§15 Q7)            |
| "Most popular" = Medium                    | `lib/data/packages.ts`                 | CONFIRM (§8.1)                                                         |
| Response-time promise next to forms        | `TrustNote`                            | CONFIRM SLA                                                            |
| Package exclusions / "non-tendering items" | Package details                        | CONFIRM                                                                |

## Facts (served by `lib/site-config.ts` until `site_settings` is filled)

| Field                                             | Current state                                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Brand name                                        | Nandini Constructions (from logo/Instagram)                                                                   |
| Address, phone                                    | tentative — from the client's Instagram bio/captions, shown with CONFIRM                                      |
| Legal name                                        | tentative — CONFIRM registered name                                                                           |
| Instagram, YouTube                                | confirmed (Instagram profile)                                                                                 |
| WhatsApp, email, office hours, map link, GBP link | missing → WhatsApp CTAs fall back to the lead form                                                            |
| Founder, year established, GSTIN                  | missing (old values were another company's)                                                                   |
| Google rating / review count                      | missing                                                                                                       |
| Stats (projects, sq.ft, quality checks, years)    | missing — never estimated                                                                                     |
| Service areas                                     | tentative — Tumakuru, SIT Extension, KR Extension, Kadaba, Nittur (seen on Instagram posts)                   |
| Instagram video titles                            | inferred from on-screen text/locations — CONFIRM wording (`lib/data/instagram.ts`)                            |
| Instagram cover images                            | 13 covers in `public/instagram/` (Instagram video thumbnails, resized) — confirm client is happy showing them |
