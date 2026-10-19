import { afterEach, describe, expect, it, vi } from 'vitest';
import { FALLBACK_SITE_CONFIG, mapSettingsRow } from '@/lib/site-config-data';
import type { Field, SiteSettingsRow } from '@/types/site-config';

vi.mock('next/cache', () => ({ unstable_cache: <T>(fn: T) => fn }));

const emptyRow: SiteSettingsRow = {
  company_name: null,
  legal_name: null,
  phone: null,
  whatsapp: null,
  email: null,
  address: null,
  map_embed_url: null,
  gbp_url: null,
  google_rating: null,
  google_review_count: null,
  gstin: null,
  social_links: null,
  office_hours: null,
  stats: null,
};

describe('fallback site config', () => {
  it('never invents numbers: stats (except the agreed quality-check count), rating and reviews are missing', () => {
    const { qualityChecksPerStage, ...otherStats } = FALLBACK_SITE_CONFIG.stats;
    expect(qualityChecksPerStage).toEqual({ status: 'confirmed', value: 10 });
    const numeric: Field<number>[] = [
      ...Object.values(otherStats),
      FALLBACK_SITE_CONFIG.googleRating,
      FALLBACK_SITE_CONFIG.googleReviewCount,
    ];
    for (const field of numeric) {
      expect(field.status).toBe('missing');
      expect(field.value).toBeNull();
    }
  });

  it('uses the client’s Instagram details as confirmed contact facts', () => {
    const fields = [
      FALLBACK_SITE_CONFIG.legalName,
      FALLBACK_SITE_CONFIG.address,
      FALLBACK_SITE_CONFIG.phone,
      FALLBACK_SITE_CONFIG.whatsapp,
      FALLBACK_SITE_CONFIG.mapUrl,
    ];
    expect(fields.every((f) => f.status === 'confirmed')).toBe(true);
    expect(FALLBACK_SITE_CONFIG.address.value?.city).toBe('Tumakuru');
    expect(FALLBACK_SITE_CONFIG.mapUrl.value).toContain('Tumakuru');
  });

  it('carries none of the other company’s directory data (founder, GSTIN, Bengaluru address)', () => {
    expect(FALLBACK_SITE_CONFIG.founder.status).toBe('missing');
    expect(FALLBACK_SITE_CONFIG.gstin.status).toBe('missing');
    expect(FALLBACK_SITE_CONFIG.showGstin).toBe(false);
    expect(JSON.stringify(FALLBACK_SITE_CONFIG)).not.toMatch(/Bengaluru|Vidyaranyapura|Murugesh|29AVMPM/);
  });

  it('leaves facts nobody supplied as missing (hidden in the UI, never invented)', () => {
    expect(FALLBACK_SITE_CONFIG.email.status).toBe('missing');
    expect(FALLBACK_SITE_CONFIG.officeHours.status).toBe('missing');
  });
});

describe('mapSettingsRow', () => {
  it('treats admin-entered values as confirmed and empty columns as missing', () => {
    const config = mapSettingsRow({
      ...emptyRow,
      phone: '+91 98450 00000',
      google_rating: 4.8,
      stats: { projects_delivered: 42 },
    });
    expect(config.source).toBe('supabase');
    expect(config.phone).toEqual({ status: 'confirmed', value: '+91 98450 00000' });
    expect(config.googleRating).toEqual({ status: 'confirmed', value: 4.8 });
    expect(config.stats.projectsDelivered).toEqual({ status: 'confirmed', value: 42 });
    expect(config.stats.sqftBuilt.status).toBe('missing');
    expect(config.email.status).toBe('missing');
  });

  it('only shows GSTIN when explicitly approved', () => {
    expect(mapSettingsRow({ ...emptyRow, gstin: 'X' }).showGstin).toBe(false);
    expect(mapSettingsRow({ ...emptyRow, gstin: 'X', show_gstin: true }).showGstin).toBe(true);
  });
});

describe('getSiteConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('falls back to placeholders when Supabase env is absent', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');
    const { getSiteConfig } = await import('@/lib/site-config');
    await expect(getSiteConfig()).resolves.toBe(FALLBACK_SITE_CONFIG);
  });
});
