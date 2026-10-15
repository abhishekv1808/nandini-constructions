import { describe, expect, it } from 'vitest';
import { HOUSE_STAGES, MATERIAL_BRANDS } from '@/lib/data/home';
import { KEY_SPEC_KEYS, SPEC_CATEGORIES, TIERS, getSpecRow, rowDiffers } from '@/lib/data/packages';
import { leadSchema, normalisePhone } from '@/lib/validations';

describe('package data (CLAUDE.md §8)', () => {
  it('has the three tiers at the sheet rates', () => {
    expect(TIERS.map((t) => [t.slug, t.ratePerSqft])).toEqual([
      ['rental', 1850],
      ['medium', 2100],
      ['premium', 2300],
    ]);
    expect(TIERS.every((t) => t.highlights.length === 6)).toBe(true);
  });

  it('has the 9 spec categories in sheet order', () => {
    expect(SPEC_CATEGORIES.map((c) => c.name)).toEqual([
      'Structure & Core Materials',
      'Doors & Windows',
      'Flooring & Tiling',
      'Staircase',
      'Painting',
      'Kitchen',
      'Bathroom & Plumbing',
      'Electrical',
      'Waterproofing & Levels',
    ]);
  });

  it('flags identical rows for the "only differences" toggle', () => {
    expect(rowDiffers(getSpecRow('sand'))).toBe(false);
    expect(rowDiffers(getSpecRow('clearHeight'))).toBe(false);
    expect(rowDiffers(getSpecRow('cement'))).toBe(true);
  });

  it('only references spec keys that exist (house stages, key specs)', () => {
    for (const key of [...KEY_SPEC_KEYS, ...HOUSE_STAGES.flatMap((s) => s.materials)]) {
      expect(() => getSpecRow(key)).not.toThrow();
    }
  });

  it('only lists brands that appear in the package sheet', () => {
    const sheet = JSON.stringify(SPEC_CATEGORIES);
    for (const brand of MATERIAL_BRANDS.flatMap((g) => g.brands)) {
      expect(sheet, brand).toContain(brand);
    }
  });
});

describe('lead validation (§7.4)', () => {
  it('normalises Indian mobiles and accepts international numbers', () => {
    expect(normalisePhone('98450 12345')).toBe('+919845012345');
    expect(normalisePhone('+91-98450-12345')).toBe('+919845012345');
    expect(normalisePhone('09845012345')).toBe('+919845012345');
    expect(normalisePhone('+1 415 555 0100')).toBe('+14155550100');
    expect(normalisePhone('12345')).toBeNull();
    expect(normalisePhone('5845012345')).toBeNull(); // Indian mobiles start 6–9
  });

  it('validates the hero form and reports field errors', () => {
    const ok = leadSchema.safeParse({
      name: 'Asha',
      phone: '9845012345',
      plotLocation: 'Yelahanka',
      formType: 'hero',
    });
    expect(ok.success).toBe(true);
    const bad = leadSchema.safeParse({ name: 'A', phone: '123', plotLocation: '', formType: 'hero' });
    expect(bad.success).toBe(false);
    const fields = bad.success ? [] : bad.error.issues.map((i) => i.path[0]);
    expect(fields).toEqual(expect.arrayContaining(['name', 'phone', 'plotLocation']));
  });

  it('gives friendly messages for blank required fields', () => {
    const blank = leadSchema.safeParse({ name: '', phone: '', plotLocation: '', formType: 'hero' });
    const messages = blank.success ? [] : blank.error.issues.map((i) => i.message);
    expect(messages).toEqual(expect.arrayContaining(['Please enter your name', 'Where is your plot?']));
    expect(messages.some((m) => m.startsWith('Invalid input'))).toBe(false);
  });
});
