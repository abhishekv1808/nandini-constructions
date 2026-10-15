import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Brand logo files live in `public/brand_logos/<slug>.<svg|png|webp|jpg|jpeg|avif>`, e.g.
 * "Dr. Fixit" → `dr-fixit.svg`. Reversed (white) artwork is named `<slug>--on-dark.<ext>` and is
 * shown on a dark card. Read at build time (the home page is static); brands without a file fall
 * back to their text wordmark, so logos can be added one at a time.
 */
const DIR = path.join(process.cwd(), 'public', 'brand_logos');
const EXTENSIONS = ['svg', 'png', 'webp', 'avif', 'jpg', 'jpeg'];

export type BrandLogo = {
  src: string;
  isSvg: boolean;
  onDark: boolean;
  /** width / height of the artwork, used to size the logo box (no layout shift in the marquee). */
  aspect: number;
};

export function brandSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Intrinsic aspect ratio from the file header (PNG IHDR, SVG viewBox/width/height). */
function readAspect(file: string, ext: string): number {
  try {
    if (ext === 'png') {
      const b = fs.readFileSync(file);
      const w = b.readUInt32BE(16);
      const h = b.readUInt32BE(20);
      return h ? w / h : 3;
    }
    if (ext === 'svg') {
      const head = fs.readFileSync(file, 'utf8').slice(0, 2000);
      const vb = head.match(/viewBox="[\d.\-]+[ ,]+[\d.\-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"/);
      if (vb?.[1] && vb[2]) return Number(vb[1]) / Number(vb[2]);
      const w = head.match(/\swidth="([\d.]+)/)?.[1];
      const h = head.match(/\sheight="([\d.]+)/)?.[1];
      if (w && h) return Number(w) / Number(h);
    }
  } catch {
    // fall through to default
  }
  return 3;
}

export function getBrandLogos(names: string[]): Record<string, BrandLogo> {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR);
  } catch {
    return {};
  }
  const available = new Map(files.map((f) => [f.toLowerCase(), f] as const));
  const logos: Record<string, BrandLogo> = {};
  for (const name of names) {
    const slug = brandSlug(name);
    search: for (const variant of ['', '--on-dark']) {
      for (const ext of EXTENSIONS) {
        const file = available.get(`${slug}${variant}.${ext}`);
        if (!file) continue;
        logos[name] = {
          src: `/brand_logos/${file}`,
          isSvg: ext === 'svg',
          onDark: variant === '--on-dark',
          aspect: readAspect(path.join(DIR, file), ext),
        };
        break search;
      }
    }
  }
  return logos;
}
