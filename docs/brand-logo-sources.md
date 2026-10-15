# Brand logo sources

Logos in `public/brand_logos/` are trademarks of their owners, used to show which material brands appear in Nandini's package specifications (CLAUDE.md §8). Each file was downloaded on **2026-10-15** from the brand's own website (approved by ITBIZone), then trimmed of empty padding and converted to PNG. Logo colours and shapes are unchanged. **[CONFIRM]** the client is comfortable displaying them, and replace any file if the brand or dealer supplies an official one.

| File                   | Brand (sheet name) | Source                                                                                  |
| ---------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `acc.png`              | ACC                | acclimited.com — `/-/media/Project/ACC-Limited/Common/icons/ACC-Footer-1.ashx`          |
| `ultratech.png`        | Ultratech          | ultratechcement.com — header `ultratech-cement-logo.png`                                |
| `maha.png`             | Maha               | mahacement.com — `/wp-content/uploads/2024/03/maha-cement-logo-white2021-1.png`         |
| `kamdhenu.png`         | Kamdhenu           | kamdhenulimited.com — `/front/images/footer-logo.webp` (Kamdhenu Group logo)            |
| `asian.png`            | Asian (paints)     | asianpaints.com — site logo (`media_1c9588…avif`)                                       |
| `ashirvad.png`         | Ashirvad           | ashirvad.com — `/wp-content/uploads/2026/03/ashirvad-logo-new.webp`                     |
| `supreme.png`          | Supreme            | supreme.co.in — `/dist/img/logo.png`                                                    |
| `finolex.svg`          | Finolex            | finolex.com — `/images/Finolex_logo_header.svg`                                         |
| `anchor--on-dark.png`  | Anchor             | lsin.panasonic.com (Anchor by Panasonic) — CDN `anchor-by-panasonic.png`, white artwork |
| `legrand--on-dark.png` | Legrand            | legrand.co.in — `/public/images/navigation/logo.png`, white artwork                     |
| `fosroc.svg`           | Fosroc             | fosroc.com — `/_resources/themes/fosroc/assets/img/header-logo.svg`                     |
| `kaveri.png`           | Kaveri             | kaveritanks.com (Kaveri Plasto Containers) — header logo                                |

## Still text wordmarks

| Brand                     | Why                                                                             |
| ------------------------- | ------------------------------------------------------------------------------- |
| Ramco                     | Official file is only the plain corporate name (22:1), unreadable at strip size |
| Astral                    | Logo URLs returned HTML (blocked for non-browser requests)                      |
| Zuari                     | Site returned 403                                                               |
| Greatwhite                | Site unreachable                                                                |
| Dr. Fixit                 | Site shows only a "Color View" visualiser logo and the Pidilite parent logo     |
| Ganga                     | Only the parent Vectus logo is published                                        |
| Meenakshi, SK TMT         | No official manufacturer website found                                          |
| Birla Super               | Brand owner unconfirmed (Birla Corporation vs Aditya Birla/UltraTech)           |
| Birla (paints), GM, Hi-Fi | Exact brand to be confirmed by the client                                       |

To add or replace a logo: drop `<slug>.(svg|png|webp)` (or `<slug>--on-dark.*` for white artwork) into `public/brand_logos/` — no code change needed.
