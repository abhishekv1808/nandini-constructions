/**
 * Nandini Constructions package sheet — CLAUDE.md §8, copied exactly ("do not improve brands or
 * prices"). This module is the interim source until Phase 2 seeds `packages`,
 * `package_spec_categories` and `package_spec_items` from the same rows.
 */

export type TierSlug = 'rental' | 'medium' | 'premium';

export type Tier = {
  slug: TierSlug;
  name: string;
  shortName: string;
  ratePerSqft: number;
  tagline: string;
  /** §8.1 — Medium is_popular is [CONFIRM]. */
  isPopular: boolean;
  popularConfirmed: boolean;
  highlights: string[];
};

export const TIERS: Tier[] = [
  {
    slug: 'rental',
    name: 'Rental Package',
    shortName: 'Rental',
    ratePerSqft: 1850, // was ₹1,800 on the sheet; updated 2026-10-15 to match Nandini's Instagram ("Turnkey project starts @ ₹1,850/sq.ft")
    tagline: 'Value build for rental units & investment properties',
    isPopular: false,
    popularConfirmed: false,
    highlights: [
      'Maha cement + Meenakshi steel',
      'UPVC windows',
      'Dr. Fixit waterproofing',
      'Astral plumbing',
      '6,000 L sump included',
      '10 ft clear height',
    ],
  },
  {
    slug: 'medium',
    name: 'Medium Package',
    shortName: 'Medium',
    ratePerSqft: 2100,
    tagline: 'Balanced quality for family homes — ACC/Ramco, Finolex fireproof wiring, teak main door',
    isPopular: true,
    popularConfirmed: false,
    highlights: [
      'ACC / Ramco cement',
      'Gaana teak main door',
      'Finolex fireproof wiring',
      'Anchor Roma / GM switches',
      '10 ft bathroom dado',
      '8,000 L sump included',
    ],
  },
  {
    slug: 'premium',
    name: 'Premium Package',
    shortName: 'Premium',
    ratePerSqft: 2300,
    tagline: 'Top brands, premium emulsion, SS railing, Fosroc waterproofing',
    isPopular: false,
    popularConfirmed: false,
    highlights: [
      'Ultratech / Birla Super / Zuari cement + SK TMT',
      'Teak main & puja doors',
      'Premium emulsion',
      'SS staircase railing',
      'Fosroc waterproofing',
      'Legrand / Anchor Roma Plus switches',
    ],
  },
];

export type SpecRow = {
  key: string;
  label: string;
  values: Record<TierSlug, string>;
};

export type SpecCategory = {
  key: string;
  name: string;
  rows: SpecRow[];
};

const row = (key: string, label: string, rental: string, medium: string, premium: string): SpecRow => ({
  key,
  label,
  values: { rental, medium, premium },
});

/** §8.2 — the 9 categories, in order. */
export const SPEC_CATEGORIES: SpecCategory[] = [
  {
    key: 'structure',
    name: 'Structure & Core Materials',
    rows: [
      row('cement', 'Cement', 'Maha', 'ACC, Ramco', 'Zuari, Ultratech, Birla Super'),
      row('steel', 'Steel', 'Meenakshi', 'Kamdhenu, Meenakshi', 'SK TMT'),
      row('wall', 'Wall', '6" & 4" Blocks (32 & 30)', '6" & 4" Blocks (36 & 30)', '6" & 4" Blocks (42 & 34)'),
      row('sand', 'Sand', 'M sand', 'M sand', 'M sand'),
      row('plasteringSand', 'Plastering sand', 'P sand', 'P sand', 'P sand'),
      row('aggregate', 'Aggregate 20mm / 12.5mm', 'Crushed stone', 'Crushed stone', 'Crushed stone'),
    ],
  },
  {
    key: 'doors',
    name: 'Doors & Windows',
    rows: [
      row(
        'mainDoor',
        'Main door (frame / shutter / hardware)',
        "Wood frame (5'×4'), 32mm shutter with fittings — ₹25,000",
        "Gaana teak wood frame (5'×4'), 32mm shutter with fittings — ₹30,000",
        "Teak wood frame (5'×4'), 32mm shutter with fittings — ₹35,000",
      ),
      row(
        'poojaDoor',
        'Puja room door',
        "Wood frame (5'×3'), 32mm shutter with fittings — ₹15,000",
        "Gaana teak wood frame (5'×3'), 32mm shutter with fittings — ₹22,000",
        "Teak wood frame (5'×3'), 32mm shutter with fittings — ₹25,000",
      ),
      row(
        'bedroomDoors',
        'Bedroom doors & fittings',
        "Mahagani wood frame (5'×3'), skin door shutter with fittings — ₹7,000",
        "Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹8,000",
        "Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹10,000",
      ),
      row(
        'toiletDoors',
        'Toilet doors & fittings',
        "Mahagani wood frame (5'×3'), skin door shutter with fittings — ₹6,000",
        "Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹7,000",
        "Red Saal wood frame (4'×3'), skin door shutter with fittings — ₹8,000",
      ),
      row(
        'windows',
        'Windows',
        'UPVC 2.5 track, 5mm glass — ₹380/sq.ft (White)',
        'UPVC 2.5 track, 5mm glass — ₹400/sq.ft (White)',
        'UPVC 2.5 track, 5mm glass — ₹400/sq.ft (White)',
      ),
      row('windowGrill', 'Window grill', '10mm MS rod', 'Round/Square 12mm rod', 'Round/Square 12mm rod'),
    ],
  },
  {
    key: 'flooring',
    name: 'Flooring & Tiling',
    rows: [
      row(
        'flooring',
        'Flooring',
        'Flooring tile — ₹60/sq.ft',
        'Flooring tile / Granite — ₹80/sq.ft',
        'Flooring tile / Granite — ₹130/sq.ft',
      ),
      row(
        'dado',
        'Dado tiles',
        "Bathroom 7' ht — ₹40/sq.ft; Kitchen 2' ht — ₹40/sq.ft",
        "Bathroom 10' ht — ₹50/sq.ft; Kitchen 2' ht — ₹45/sq.ft",
        "Bathroom 10' ht — ₹65/sq.ft; Kitchen 2' ht — ₹65/sq.ft",
      ),
      row('balconyTile', 'Balcony / parking tile', '₹40/sq.ft', '₹50/sq.ft', '₹55/sq.ft'),
    ],
  },
  {
    key: 'staircase',
    name: 'Staircase',
    rows: [
      row(
        'stairGranite',
        'Staircase granite',
        'Sadaralli — ₹80/sq.ft',
        'Sadaralli / Steel Grey — ₹90/sq.ft',
        'Sadaralli / other granite — ₹100/sq.ft',
      ),
      row(
        'stairRailing',
        'Staircase railing',
        'MS railing — ₹140/sq.ft',
        'MS railing — ₹160/sq.ft',
        'SS railing without glass — ₹700/sq.ft',
      ),
    ],
  },
  {
    key: 'painting',
    name: 'Painting',
    rows: [
      row(
        'internalPaint',
        'Internal paint',
        'Birla / Asian — 2 coat putty + 2 coat Tractor Emulsion',
        'Birla / Asian — 2 coat putty + 2 coat Tractor Emulsion',
        'Birla / Asian — 2 coat putty + 2 coat Premium Emulsion',
      ),
      row(
        'externalPaint',
        'External paint',
        'Asian Ace Exterior Emulsion',
        'Asian Apex Exterior Emulsion',
        'Asian Apex Exterior Emulsion',
      ),
      row(
        'msWoodPaint',
        'MS & wood paint',
        'MS & internal shutter enamel; Pooja & main door hand polish',
        'MS & internal shutter enamel; Pooja & main door polish',
        'MS & internal shutter enamel; Pooja & main door polish',
      ),
    ],
  },
  {
    key: 'kitchen',
    name: 'Kitchen',
    rows: [
      row(
        'kitchenSlab',
        'Kitchen slab',
        '30mm granite — ₹160/sq.ft',
        '30mm granite — ₹200/sq.ft',
        '32mm granite — ₹220/sq.ft',
      ),
      row(
        'kitchenBasin',
        'Kitchen basin',
        'SS basin — ₹3,000/no',
        'SS basin — ₹4,000/no',
        'SS basin — ₹6,000/no',
      ),
    ],
  },
  {
    key: 'bathroom',
    name: 'Bathroom & Plumbing',
    rows: [
      row(
        'bathAccessories',
        'Bathroom accessories',
        '₹20,000 / bathroom',
        '₹25,000 / bathroom',
        '₹35,000 / bathroom',
      ),
      row(
        'plumbing',
        'Plumbing pipes & fittings',
        'Astral',
        'Astral / Ashirvad / Supreme',
        'Astral / Ashirvad / Supreme',
      ),
      row(
        'overheadTank',
        'Overhead tank (1,000 L)',
        'Ganga / Kaveri double layered — ₹7/ltr',
        'Ganga / Kaveri triple layered — ₹7/ltr',
        'Ganga / Kaveri triple layered — ₹9/ltr',
      ),
      row(
        'sump',
        'Underground sump',
        '6" block work, 6,000 L capacity',
        '8" block work, 8,000 L capacity',
        '8" block work, 8,000 L capacity',
      ),
    ],
  },
  {
    key: 'electrical',
    name: 'Electrical',
    rows: [
      row('wire', 'Electrical wire', 'Greatwhite', 'Finolex fireproof wires', 'Finolex fireproof wires'),
      row(
        'switches',
        'Switches & sockets',
        'Hi-Fi',
        'GM / Anchor Roma (White)',
        'Anchor Roma Plus / Legrand (White)',
      ),
    ],
  },
  {
    key: 'waterproofing',
    name: 'Waterproofing & Levels',
    rows: [
      row('waterproofing', 'Waterproofing', 'Dr. Fixit', 'Dr. Fixit', 'Fosroc Brush Bond'),
      row(
        'clearHeight',
        'Floor-to-floor finish level',
        '10 ft clear height',
        '10 ft clear height',
        '10 ft clear height',
      ),
      row(
        'plinthHeight',
        'Plinth height from road level',
        'Car park 1.5 ft; Building 2 ft',
        'Car park 1.5 ft; Building 2 ft',
        'Car park 1.5 ft; Building 2 ft',
      ),
    ],
  },
];

/** §8.3 */
export const PACKAGE_TERMS: string[] = [
  'This quotation is valid for 15 days.',
  'After building completion, the client pays the final settlement amount within a month.',
  'If the client opts for higher-end products, the difference amount is paid before work completion.',
  'Rental Package: ₹200/sq.ft is chargeable extra for non-tendering items.',
];

/** §8.4 — Rental only; shown under estimates, never silently added. Items covered are [CONFIRM]. */
export const RENTAL_NON_TENDERING_EXTRA_PER_SQFT = 200;

export const ALLOWANCE_NOTE =
  'Budgeted allowance — choose any product up to this value; pay only the difference for upgrades.';

/** §8.4 upgrade upsell: price gap + 3 key upgrades. */
export const UPGRADES: Partial<Record<TierSlug, { to: TierSlug; items: string[] }>> = {
  rental: { to: 'medium', items: ['ACC / Ramco cement', 'Finolex fireproof wiring', 'Gaana teak main door'] },
  medium: {
    to: 'premium',
    items: ['Teak main & puja doors', 'SS staircase railing', 'Fosroc waterproofing'],
  },
};

/** Six rows the home-page package switcher compares (all §8.2 values). */
export const KEY_SPEC_KEYS = ['cement', 'steel', 'mainDoor', 'wire', 'switches', 'waterproofing'] as const;

const ROW_INDEX = new Map(SPEC_CATEGORIES.flatMap((c) => c.rows.map((r) => [r.key, r] as const)));

export function getSpecRow(key: string): SpecRow {
  const found = ROW_INDEX.get(key);
  if (!found) throw new Error(`Unknown spec key: ${key}`);
  return found;
}

export function getTier(slug: TierSlug): Tier {
  const tier = TIERS.find((t) => t.slug === slug);
  if (!tier) throw new Error(`Unknown tier: ${slug}`);
  return tier;
}

export function rowDiffers(row: SpecRow): boolean {
  return new Set(Object.values(row.values)).size > 1;
}

export function isAllowance(value: string): boolean {
  return value.includes('₹');
}

export function formatRate(rate: number): string {
  return `₹${rate.toLocaleString('en-IN')}/sq.ft`;
}
