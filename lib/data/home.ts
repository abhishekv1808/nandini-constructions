import { PACKAGE_TERMS, TIERS, formatRate } from './packages';

/**
 * Home-page copy that isn't a business fact (process descriptions, section text), plus content
 * derived strictly from the §8 package sheet. Anything the client must still commit to carries
 * `confirmed: false` and renders with a [CONFIRM] chip.
 */

export const BUILD_TYPES = [
  {
    key: 'residential',
    title: 'Residential homes',
    href: '/services/residential-construction',
    text: 'Independent houses, duplexes, villas and rental units, G+1 to G+3.',
    items: ['Independent houses', 'Duplexes', 'Villas', 'Rental units'],
  },
  {
    key: 'commercial',
    title: 'Commercial buildings',
    href: '/services/commercial-construction',
    text: 'Offices, showrooms, PGs and small hotels.',
    items: ['Offices', 'Showrooms', 'PG / co-living', 'Small hotels'],
  },
  {
    key: 'interiors',
    title: 'Interiors',
    href: '/services/interior-design',
    text: 'Homes, modular kitchens, cafés, clinics, gyms and offices.',
    items: ['Homes', 'Modular kitchens', 'Cafés', 'Clinics & gyms', 'Offices'],
  },
  {
    key: 'renovation',
    title: 'Renovation & extension',
    href: '/services/renovation-and-extension',
    text: 'Floor additions and remodels on your existing building.',
    items: ['Floor additions', 'Remodels'],
  },
] as const;

/** "Watch your home rise" — 7 stages; `materials` are §8.2 spec keys shown for the chosen tier. */
export const HOUSE_STAGES = [
  {
    title: 'Plot & excavation',
    text: 'We mark the building outline on your plot and excavate for the footings.',
    materials: ['plinthHeight'],
  },
  {
    title: 'Foundation & plinth',
    text: 'Reinforced footings and the plinth beam lift the building above road level.',
    materials: ['cement', 'steel', 'aggregate', 'sand'],
  },
  {
    title: 'Columns & slabs',
    text: 'Columns rise floor by floor and each roof slab is cast in reinforced concrete.',
    materials: ['cement', 'steel', 'clearHeight'],
  },
  {
    title: 'Block walls',
    text: 'Solid concrete block walls go up between the columns, with openings for doors and windows.',
    materials: ['wall', 'sand'],
  },
  {
    title: 'Plastering & waterproofing',
    text: 'Concealed plumbing and wiring go in, walls are plastered and the roof is waterproofed.',
    materials: ['plasteringSand', 'waterproofing', 'plumbing', 'wire'],
  },
  {
    title: 'Windows, doors, paint',
    text: 'Windows and doors are fixed, floors are laid and the house gets its paint.',
    materials: ['windows', 'mainDoor', 'flooring', 'externalPaint'],
  },
  {
    title: 'Handover',
    text: 'Fittings, kitchen and bathrooms are finished — and you get the keys.',
    materials: ['switches', 'kitchenSlab', 'bathAccessories', 'sump'],
  },
] as const;

export type BrandPromise = { title: string; text: string; confirmed: boolean };

/** §6.1 #5. Only the first is backed by supplied material (the package sheet); the rest need the client's written commitment (§15 Q7). */
export const PROMISES: BrandPromise[] = [
  {
    title: 'Every material listed upfront',
    text: 'Cement, steel, doors, tiles, paint, wiring and fittings — brand and allowance for each, in writing, before you sign.',
    confirmed: true,
  },
  {
    title: 'Fixed package pricing',
    text: 'One per-sq.ft rate for your package, so your budget doesn’t move once the agreement is signed.',
    confirmed: false,
  },
  {
    title: 'Stage-wise quality checks',
    text: 'Each stage is checked before the next begins — from footings and slab reinforcement to plaster and finishing.',
    confirmed: false,
  },
  {
    title: 'Milestone-linked payments',
    text: 'You pay as work is completed on site, stage by stage — never far ahead of progress.',
    confirmed: false,
  },
  {
    title: 'On-time delivery commitment',
    text: 'An agreed schedule for every stage, tracked from foundation to handover.',
    confirmed: false,
  },
  {
    title: 'Site engineer + photo updates',
    text: 'A dedicated engineer for your site and regular photo/video updates on WhatsApp — ideal if you’re building from abroad.',
    confirmed: false,
  },
];

/** §6.1 #7 */
export const PROCESS_STEPS = [
  {
    title: 'Meet & understand',
    text: 'We visit your plot and listen to how you want to live, rent or work in the building.',
  },
  {
    title: 'Design & approvals',
    text: 'Floor plans and elevation for your plot, and support with plan approval.',
  },
  {
    title: 'Fixed quote & agreement',
    text: 'Your package, materials and allowances in writing before work starts.',
  },
  { title: 'Construction with quality checks', text: 'Foundation to roof, with checks at every stage.' },
  { title: 'Finishing', text: 'Flooring, doors, windows, paint, kitchen and bathrooms.' },
  {
    title: 'Handover & support',
    text: 'A walkthrough of your home, your keys, and support after you move in.',
  },
] as const;

const [rental, medium, premium] = TIERS as [(typeof TIERS)[0], (typeof TIERS)[1], (typeof TIERS)[2]];

/** §6.1 #12 — every answer is taken from the §8 package sheet. */
export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: 'What does house construction cost per sq.ft with Nandini Constructions?',
    a: `Our packages are ${rental.shortName} at ${formatRate(rental.ratePerSqft)}, ${medium.shortName} at ${formatRate(medium.ratePerSqft)} and ${premium.shortName} at ${formatRate(premium.ratePerSqft)}. Each package lists every material, brand and allowance upfront.`,
  },
  {
    q: 'What is the difference between the Rental, Medium and Premium packages?',
    a: 'The brands and finishes. For example, cement goes from Maha (Rental) to ACC / Ramco (Medium) to Zuari, Ultratech or Birla Super (Premium); steel from Meenakshi to Kamdhenu / Meenakshi to SK TMT; waterproofing from Dr. Fixit to Fosroc Brush Bond in Premium.',
  },
  {
    q: 'Are the sump and overhead tank included?',
    a: 'Yes, in every package. The underground sump is 6,000 L (6" block work) in Rental and 8,000 L (8" block work) in Medium and Premium. A 1,000 L Ganga / Kaveri overhead tank is included in all three.',
  },
  {
    q: 'What does the ₹ value next to doors, tiles and fittings mean?',
    a: 'It is a budgeted allowance. You can choose any product up to that value; if you choose a higher-end product, you pay only the difference, before work completion.',
  },
  {
    q: 'What ceiling height do you build to?',
    a: 'All packages are built to a 10 ft clear floor-to-floor finish level, with the plinth 2 ft above road level for the building and 1.5 ft for the car park.',
  },
  {
    q: 'How long is a quotation valid?',
    a: PACKAGE_TERMS[0] ?? '',
  },
  {
    q: 'When is the final payment due?',
    a: 'After the building is completed, the final settlement amount is paid within a month.',
  },
  {
    q: 'Is anything charged extra in the Rental package?',
    a: 'Yes — ₹200/sq.ft is chargeable extra for non-tendering items in the Rental package. We’ll list exactly which items in your quotation.',
  },
];

/** §6.1 #10 — brand names exactly as spelled on the §8 package sheet. */
export const MATERIAL_BRANDS: { category: string; brands: string[] }[] = [
  { category: 'Cement', brands: ['Maha', 'ACC', 'Ramco', 'Zuari', 'Ultratech', 'Birla Super'] },
  { category: 'Steel', brands: ['Meenakshi', 'Kamdhenu', 'SK TMT'] },
  { category: 'Paints', brands: ['Asian', 'Birla'] },
  { category: 'Plumbing', brands: ['Astral', 'Ashirvad', 'Supreme'] },
  { category: 'Electrical', brands: ['Finolex', 'Greatwhite', 'Anchor', 'Legrand', 'GM', 'Hi-Fi'] },
  { category: 'Waterproofing', brands: ['Dr. Fixit', 'Fosroc'] },
  { category: 'Water tanks', brands: ['Ganga', 'Kaveri'] },
];

export type SampleProject = {
  slug: string;
  title: string;
  type: 'residential' | 'commercial' | 'interior';
  locality: string;
  floors: string;
  builtUpSqft: number;
  packageSlug: 'rental' | 'medium' | 'premium' | null;
  status: 'completed' | 'ongoing';
};

/**
 * [SAMPLE] projects — layout fillers only, clearly labelled on screen, never real claims.
 * Replaced by the `projects` table (Phase 2) and real client projects (§15 Q8).
 */
export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    slug: 'sample-g2-home',
    title: '[SAMPLE] G+2 family home',
    type: 'residential',
    locality: 'Locality TBD',
    floors: 'G+2',
    builtUpSqft: 2400,
    packageSlug: 'medium',
    status: 'completed',
  },
  {
    slug: 'sample-rental-units',
    title: '[SAMPLE] Rental units',
    type: 'residential',
    locality: 'Locality TBD',
    floors: 'G+3',
    builtUpSqft: 3600,
    packageSlug: 'rental',
    status: 'ongoing',
  },
  {
    slug: 'sample-showroom',
    title: '[SAMPLE] Ground-floor showroom',
    type: 'commercial',
    locality: 'Locality TBD',
    floors: 'G+1',
    builtUpSqft: 1800,
    packageSlug: null,
    status: 'completed',
  },
  {
    slug: 'sample-cafe-interior',
    title: '[SAMPLE] Café interior',
    type: 'interior',
    locality: 'Locality TBD',
    floors: '—',
    builtUpSqft: 900,
    packageSlug: null,
    status: 'completed',
  },
];
