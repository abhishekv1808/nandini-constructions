import type { Field, SiteConfig, SiteSettingsRow } from '@/types/site-config';

/** Pure data + mapping (no server imports) so it can be unit-tested. */

const missing = (label: string) => ({ status: 'missing', value: null, label }) as const;

function fromDb<T>(value: T | null | undefined, label: string): Field<T> {
  return value === null || value === undefined || value === ''
    ? missing(label)
    : { status: 'confirmed', value };
}

const ADDRESS = {
  street: 'Opposite Makkah Masjid',
  locality: 'KR Extension Main Road',
  city: 'Tumakuru',
  postalCode: '572101',
  region: 'Karnataka',
};

/**
 * Used until Supabase is connected. Values come from Nandini Constructions' own Instagram profile
 * (@nandiniconstructions, CLAUDE.md §1.1) and are treated as confirmed (ITBIZone, 2026-10-19).
 * Facts nobody has supplied (ratings, reviews, most stats, email, hours, GSTIN) stay `missing` and
 * the UI hides them — never invented. Quality checks per stage: ITBIZone decision (2026-10-16).
 */
export const FALLBACK_SITE_CONFIG: SiteConfig = {
  source: 'fallback',
  companyName: 'Nandini Constructions',
  legalName: { status: 'confirmed', value: 'Nandini Constructions' },
  founder: missing('founder / proprietor'),
  established: missing('year established'),
  phone: { status: 'confirmed', value: '+91 79753 22922' },
  // Same number as in every Instagram caption — the usual setup for local builders.
  whatsapp: { status: 'confirmed', value: '+91 79753 22922' },
  email: missing('email'),
  address: { status: 'confirmed', value: ADDRESS },
  // Derived from the address (Google Maps search), not a separately supplied link.
  mapUrl: {
    status: 'confirmed',
    value: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `Nandini Constructions, ${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.city} ${ADDRESS.postalCode}`,
    )}`,
  },
  gbpUrl: missing('Google Business Profile link'),
  googleRating: missing('Google rating'),
  googleReviewCount: missing('Google review count'),
  gstin: missing('GSTIN + approval to display'),
  showGstin: false,
  officeHours: missing('office hours'),
  social: {
    instagram: { status: 'confirmed', value: 'https://www.instagram.com/nandiniconstructions/' },
    youtube: { status: 'confirmed', value: 'https://www.youtube.com/@nandini_constructions_tumkur' },
    facebook: missing('Facebook page'),
  },
  stats: {
    projectsDelivered: missing('projects delivered'),
    sqftBuilt: missing('sq.ft built'),
    // ITBIZone decision 2026-10-16 (modest figure): get the client's sign-off before launch.
    qualityChecksPerStage: { status: 'confirmed', value: 10 },
    yearsExperience: missing('years of experience'),
  },
};

/** Admin-entered values are treated as confirmed; empty columns render as missing placeholders. */
export function mapSettingsRow(row: SiteSettingsRow): SiteConfig {
  const f = FALLBACK_SITE_CONFIG;
  return {
    source: 'supabase',
    companyName: row.company_name || f.companyName,
    legalName: fromDb(row.legal_name, 'CONFIRM: legal name'),
    founder: fromDb(row.founder, 'CONFIRM: founder'),
    established: fromDb(row.established_year, 'CONFIRM: year established'),
    phone: fromDb(row.phone, 'CONFIRM: phone number'),
    whatsapp: fromDb(row.whatsapp, 'CONFIRM: WhatsApp number'),
    email: fromDb(row.email, 'CONFIRM: email'),
    address: fromDb(row.address, 'CONFIRM: office address'),
    mapUrl: fromDb(row.map_embed_url, 'CONFIRM: Google Maps link'),
    gbpUrl: fromDb(row.gbp_url, 'CONFIRM: Google Business Profile link'),
    googleRating: fromDb(row.google_rating, 'CONFIRM: Google rating'),
    googleReviewCount: fromDb(row.google_review_count, 'CONFIRM: Google review count'),
    gstin: fromDb(row.gstin, 'CONFIRM: GSTIN'),
    showGstin: row.show_gstin === true,
    officeHours: fromDb(row.office_hours?.length ? row.office_hours : null, 'CONFIRM: office hours'),
    social: {
      instagram: fromDb(row.social_links?.instagram, 'CONFIRM: Instagram handle'),
      youtube: fromDb(row.social_links?.youtube, 'CONFIRM: YouTube channel'),
      facebook: fromDb(row.social_links?.facebook, 'CONFIRM: Facebook page'),
    },
    stats: {
      projectsDelivered: fromDb(row.stats?.projects_delivered, 'CONFIRM: projects delivered'),
      sqftBuilt: fromDb(row.stats?.sqft_built, 'CONFIRM: sq.ft built'),
      qualityChecksPerStage:
        row.stats?.quality_checks_per_stage == null
          ? f.stats.qualityChecksPerStage
          : { status: 'confirmed', value: row.stats.quality_checks_per_stage },
      yearsExperience: fromDb(row.stats?.years_experience, 'CONFIRM: years of experience'),
    },
  };
}
