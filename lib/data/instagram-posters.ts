import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Optional cover images for Instagram cards: `public/instagram/<shortcode>.(jpg|jpeg|png|webp)`.
 * Read at build time; cards without a file use a designed text poster instead.
 */
const DIR = path.join(process.cwd(), 'public', 'instagram');
const EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png'];

export function getInstagramPosters(codes: string[]): Record<string, string> {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR);
  } catch {
    return {};
  }
  const available = new Set(files);
  const posters: Record<string, string> = {};
  for (const code of codes) {
    const ext = EXTENSIONS.find((e) => available.has(`${code}.${e}`));
    if (ext) posters[code] = `/instagram/${code}.${ext}`;
  }
  return posters;
}
