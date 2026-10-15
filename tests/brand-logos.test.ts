import { describe, expect, it } from 'vitest';
import { brandSlug, getBrandLogos } from '@/lib/data/brand-logos';
import { MATERIAL_BRANDS } from '@/lib/data/home';

describe('brand logos', () => {
  it('slugs brand names to file names', () => {
    expect(brandSlug('Dr. Fixit')).toBe('dr-fixit');
    expect(brandSlug('SK TMT')).toBe('sk-tmt');
    expect(brandSlug('Hi-Fi')).toBe('hi-fi');
  });

  it('finds logo files, flags reversed artwork, and falls back for missing ones', () => {
    const logos = getBrandLogos(['ACC', 'Legrand', 'Hi-Fi']);
    expect(logos.ACC).toMatchObject({ src: '/brand_logos/acc.png', onDark: false });
    expect(logos.Legrand).toMatchObject({ src: '/brand_logos/legrand--on-dark.png', onDark: true });
    expect(logos['Hi-Fi']).toBeUndefined();
    expect(logos.ACC?.aspect).toBeGreaterThan(0.5);
  });

  it('only ships logo files for brands on the package sheet', async () => {
    const fs = await import('node:fs');
    const slugs = new Set(MATERIAL_BRANDS.flatMap((g) => g.brands).map(brandSlug));
    for (const file of fs.readdirSync('public/brand_logos')) {
      expect(slugs, file).toContain(file.replace(/(--on-dark)?\.\w+$/, ''));
    }
  });
});
