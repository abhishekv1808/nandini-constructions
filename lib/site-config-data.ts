import type { Field, SiteConfig, SiteSettingsRow } from '@/types/site-config';

/** Pure data + mapping (no server imports) so it can be unit-tested. */

const missing = (label: string) => ({ status: 'missing', value: null, label }) as const;

function fromDb<T>(value: T | null | undefined, label: string): Field<T> {
  return value === null || value === undefined || value === ''
    ? missing(label)
    : { status: 'confirmed', value };
}

/**
 * Used until Supabase is connected. Tentative values come from Nandini Constructions' own
 * Instagram profile (@nandiniconstructions, CLAUDE.md §1.1) and render with a visible [CONFIRM]
 * marker. Numbers are never invented: all stats are missing.
 */
export const FALLBACK_SITE_CONFIG: SiteConfig = {
  source: 'fallback',
  companyName: 'Nandini Constructions',
  legalName: { status: 'tentative', value: 'Nandini Constructions', label: 'CONFIRM: registered legal name' },
  founder: missing('CONFIRM: founder / proprietor'),
  established: missing('CONFIRM: year established'),
  phone: { status: 'tentative', value: '+91 79753 22922', label: 'CONFIRM: phone (from Instagram)' },
  whatsapp: missing('CONFIRM: WhatsApp number'),
  email: missing('CONFIRM: email'),
  address: {
    status: 'tentative',
    value: {
      street: 'Opposite Makkah Masjid',
      locality: 'KR Extension Main Road',
      city: 'Tumakuru',
      postalCode: '572101',
      region: 'Karnataka',
    },
    label: 'CONFIRM: office address (from Instagram bio)',
  },
  mapUrl: missing('CONFIRM: Google Maps link'),
  gbpUrl: missing('CONFIRM: Google Business Profile link'),
  googleRating: missing('CONFIRM: Google rating'),
  googleReviewCount: missing('CONFIRM: Google review count'),
  gstin: missing('CONFIRM: GSTIN + approval to display'),
  showGstin: false,
  officeHours: missing('CONFIRM: office hours'),
  social: {
    instagram: { status: 'confirmed', value: 'https://www.instagram.com/nandiniconstructions/' },
    youtube: { status: 'confirmed', value: 'https://www.youtube.com/@nandini_constructions_tumkur' },
    facebook: missing('CONFIRM: Facebook page'),
  },
  stats: {
    projectsDelivered: missing('CONFIRM: projects delivered'),
    sqftBuilt: missing('CONFIRM: sq.ft built'),
    qualityChecksPerStage: missing('CONFIRM: quality checks per stage'),
    yearsExperience: missing('CONFIRM: years of experience'),
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
      qualityChecksPerStage: fromDb(row.stats?.quality_checks_per_stage, 'CONFIRM: quality checks per stage'),
      yearsExperience: fromDb(row.stats?.years_experience, 'CONFIRM: years of experience'),
    },
  };
}
