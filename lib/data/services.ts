import type { StaticImageData } from 'next/image';
import interiorImg from '@/public/instagram/Dci4hWgOthf.jpg';
import { ELEVATIONS } from './elevations';
import { HOME_FAQS, PROCESS_STEPS } from './home';
import { SPEC_CATEGORIES, TIERS, formatRate } from './packages';

/**
 * Services (CLAUDE.md §6.7) — interim source until Phase 2 seeds the `services` table. Scope
 * lists come from §6.7; residential "what's included" is the §8 package sheet. Anything the client
 * hasn't confirmed is listed in `confirm` and shown as a visible [CONFIRM] marker.
 */

export type ServiceSlug =
  | 'residential-construction'
  | 'commercial-construction'
  | 'interior-design'
  | 'renovation-and-extension'
  | 'architectural-design';

export type ServiceStep = { title: string; text: string };

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Short line for cards. */
  summary: string;
  eyebrow: string;
  h1: string;
  /** H1 word rendered in the accent serif. */
  accent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** What kinds of buildings/rooms — chips. */
  types: string[];
  included: { title: string; text: string }[];
  includedNote?: string;
  process: readonly ServiceStep[];
  /** Pricing line shown in the hero (only real, client-published figures). */
  pricing?: { label: string; confirm?: string };
  image?: { src: StaticImageData; alt: string; position?: string };
  showPackages?: boolean;
  showElevations?: boolean;
  faqs?: { q: string; a: string }[];
  confirm: string[];
};

const elevation = (key: string) => {
  const found = ELEVATIONS.find((e) => e.key === key);
  if (!found) throw new Error(`Unknown elevation: ${key}`);
  return found;
};

/** Residential "what's included" = one card per §8.2 category, values summarised from the sheet. */
const PACKAGE_INCLUDED: Record<string, string> = {
  structure: 'Branded cement and TMT steel, solid block walls, M sand and P sand.',
  doors: 'Wooden main and puja doors, bedroom and toilet doors, UPVC windows with grills.',
  flooring: 'Tile or granite flooring, bathroom and kitchen dado, balcony and parking tiles.',
  staircase: 'Granite steps with MS railing — SS railing in Premium.',
  painting: '2 coats putty + 2 coats emulsion inside, Asian exterior emulsion outside.',
  kitchen: 'Granite kitchen slab and stainless-steel sink.',
  bathroom: 'Bathroom fittings allowance, branded plumbing, sump and overhead tank.',
  electrical: 'Branded wiring and modular switches and sockets.',
  waterproofing: 'Dr. Fixit or Fosroc waterproofing, 10 ft clear height, raised plinth.',
};

const fromRate = formatRate(Math.min(...TIERS.map((t) => t.ratePerSqft)));
const residentialImage = elevation('corner-wood-balcony');
const architecturalImage = elevation('grey-white-porch');

export const SERVICES_DATA: Service[] = [
  {
    slug: 'residential-construction',
    title: 'Residential construction',
    summary: 'Independent houses, duplexes, villas and rental units, G+1 to G+3.',
    eyebrow: 'Residential construction · Tumakuru',
    h1: 'House construction in Tumakuru, from foundation to keys.',
    accent: 'keys.',
    intro:
      'Independent houses, duplexes, villas and rental units built in one of three fixed packages — with every material, brand and allowance listed before work starts.',
    metaTitle: 'House Construction in Tumakuru (Tumkur) — Turnkey Packages',
    metaDescription: `Turnkey house construction in Tumakuru: independent houses, duplexes, villas and rental units from ${fromRate}. Every material and brand listed upfront.`,
    types: ['Independent houses', 'Duplexes', 'Villas', 'Rental units', 'G+1 to G+3'],
    included: SPEC_CATEGORIES.map((c) => ({ title: c.name, text: PACKAGE_INCLUDED[c.key] ?? '' })),
    includedNote: 'Exact brands and allowances depend on the package you choose.',
    process: PROCESS_STEPS,
    pricing: { label: `From ${fromRate}` },
    image: {
      src: residentialImage.image,
      alt: 'Two-storey corner home elevation designed by Nandini Constructions',
      position: 'object-[50%_35%]',
    },
    showPackages: true,
    showElevations: true,
    faqs: HOME_FAQS.slice(0, 6),
    confirm: ['CONFIRM: are design, drawings & approvals included in the package rate?'],
  },
  {
    slug: 'commercial-construction',
    title: 'Commercial construction',
    summary: 'Offices, showrooms, hotels, factories and PG / co-living buildings.',
    eyebrow: 'Commercial construction · Tumakuru',
    h1: 'Commercial buildings planned around how they’ll earn.',
    accent: 'earn.',
    intro:
      'Offices, showrooms, hotels, factories and PG / co-living buildings — one team from layout and structure to finishing, so your building is ready to open or let out.',
    metaTitle: 'Commercial Construction in Tumakuru — Offices, Showrooms, PGs',
    metaDescription:
      'Commercial construction in Tumakuru: offices, showrooms, hotels, factories and PG / co-living buildings, from layout and structure to finishing.',
    types: ['Offices', 'Showrooms', 'Hotels', 'Factories', 'PG / co-living'],
    included: [
      {
        title: 'Layout for the use',
        text: 'Shopfronts, rentable units, rooms or work floors planned around your business.',
      },
      { title: 'Structure', text: 'Foundation, columns, slabs and walls for the floors you need.' },
      {
        title: 'Services',
        text: 'Plumbing, electrical points and water storage sized for the building’s use.',
      },
      { title: 'Finishing', text: 'Flooring, toilets, doors, windows and paint inside and out.' },
    ],
    process: PROCESS_STEPS,
    pricing: {
      label: 'Quoted per project after a site visit',
      confirm: 'CONFIRM: commercial pricing approach',
    },
    confirm: ['CONFIRM: commercial project types and scope Nandini takes on'],
  },
  {
    slug: 'interior-design',
    title: 'Interior design',
    summary: 'Homes, modular kitchens, cafés, offices, gyms, clinics and spas.',
    eyebrow: 'Interior design · Tumakuru',
    h1: 'Interiors designed and built by the same team.',
    accent: 'built',
    intro:
      'Modular kitchens, wardrobes, ceilings, TV units and full interiors for homes — and fit-outs for cafés, offices, gyms, clinics and spas.',
    metaTitle: 'Interior Design in Tumakuru — Homes, Kitchens, Cafés & Offices',
    metaDescription:
      'Interior design and execution in Tumakuru: modular kitchens, wardrobes, ceilings and TV units for homes, plus café, office, gym and clinic interiors.',
    types: ['Homes', 'Modular kitchens', 'Cafés', 'Offices', 'Gyms', 'Clinics & spas'],
    included: [
      { title: 'Modular kitchen', text: 'Cabinets, storage and countertop planned around how you cook.' },
      { title: 'Wardrobes & storage', text: 'Bedroom wardrobes, lofts and utility storage.' },
      { title: 'Ceilings & lighting', text: 'False ceilings, wood-slat panels and concealed lighting.' },
      {
        title: 'TV units & wall panels',
        text: 'Feature walls, TV units and panelling for living and bedrooms.',
      },
      { title: 'Commercial fit-outs', text: 'Cafés, offices, gyms, clinics and spas.' },
    ],
    process: [
      { title: 'Visit & measure', text: 'We see the space and understand how you’ll use it.' },
      { title: 'Design & layout', text: 'Layout, materials and finishes agreed with you.' },
      { title: 'Quote', text: 'A clear quote for the agreed design before work starts.' },
      { title: 'Make & install', text: 'Carpentry, ceilings, lighting and finishing on site.' },
      { title: 'Handover', text: 'A walkthrough of the finished space.' },
    ],
    pricing: {
      label: 'From ₹850/sq.ft (as advertised)',
      confirm: 'CONFIRM: interior rate ₹850–₹1,000/sq.ft from Instagram',
    },
    image: {
      src: interiorImg,
      alt: 'Bedroom interior by Nandini Constructions with wood-slat ceiling, backlit TV unit and wardrobe',
      position: 'object-[50%_72%]',
    },
    confirm: ['CONFIRM: interior process steps and what the rate includes'],
  },
  {
    slug: 'renovation-and-extension',
    title: 'Renovation & extension',
    summary: 'Floor additions and remodels on your existing building.',
    eyebrow: 'Renovation & extension · Tumakuru',
    h1: 'Add a floor or remodel the home you already have.',
    accent: 'remodel',
    intro:
      'Floor additions, extensions and remodels — planned around your existing structure, so you get more space without starting over.',
    metaTitle: 'Renovation & Floor Addition in Tumakuru — Extend Your Home',
    metaDescription:
      'Renovation, extension and floor additions in Tumakuru: add a floor, extend or remodel your existing home or building.',
    types: ['Floor additions', 'Extensions', 'Kitchen & bathroom remodels', 'Repainting & waterproofing'],
    included: [
      {
        title: 'Site assessment',
        text: 'We look at the existing building before planning anything new on it.',
      },
      { title: 'Floor addition', text: 'New floors or rooms built onto your existing structure.' },
      { title: 'Remodel', text: 'Kitchens, bathrooms and layouts reworked for how you live now.' },
      { title: 'Refresh', text: 'Re-flooring, repainting and waterproofing.' },
    ],
    process: [
      {
        title: 'Visit & assess',
        text: 'We inspect the existing building and discuss what you want to add or change.',
      },
      { title: 'Plan & quote', text: 'A plan for the work and a clear quote before anything starts.' },
      { title: 'Build in stages', text: 'Work planned to keep disruption to your home low.' },
      { title: 'Handover', text: 'A walkthrough of the finished work.' },
    ],
    pricing: {
      label: 'Quoted after inspecting your building',
      confirm: 'CONFIRM: renovation pricing approach',
    },
    confirm: ['CONFIRM: renovation scope Nandini takes on (structural checks, floor additions)'],
  },
  {
    slug: 'architectural-design',
    title: 'Architectural design & approvals',
    summary: 'Floor plans, 3D elevations, structural design and plan approval support.',
    eyebrow: 'Architectural design · Tumakuru',
    h1: 'Floor plans and 3D elevations for your plot.',
    accent: 'elevations',
    intro:
      'Plans that fit your plot, family and budget — with a 3D front elevation so you can see your home before the first brick is laid.',
    metaTitle: 'Architectural Design in Tumakuru — Floor Plans & 3D Elevations',
    metaDescription:
      'Floor plans and 3D front elevation designs for homes in Tumakuru, with structural design and plan approval support.',
    types: ['Floor plans', '3D elevations', 'Structural design', 'Plan approval support'],
    included: [
      { title: 'Floor plans', text: 'Room layouts planned for your plot size, facing and family.' },
      {
        title: '3D front elevation',
        text: 'A realistic render of your home’s front, like the designs below.',
      },
      { title: 'Structural design', text: 'Structural drawings for the building.' },
      { title: 'Plan approval support', text: 'Help with drawings and documents for plan approval.' },
    ],
    process: [
      { title: 'Brief', text: 'Your plot, family, budget and must-haves.' },
      { title: 'Floor plan', text: 'Layout options refined with you.' },
      { title: '3D elevation', text: 'The front design, rendered so you can see it.' },
      { title: 'Drawings & approvals', text: 'Final drawings and support for plan approval.' },
    ],
    image: {
      src: architecturalImage.image,
      alt: 'Modern two-storey home 3D elevation with wood-finish canopy and terrace planters, designed by Nandini Constructions',
      position: 'object-center',
    },
    showElevations: true,
    confirm: [
      'CONFIRM: structural design & plan approval support offered?',
      'CONFIRM: is design charged separately or included with construction?',
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
