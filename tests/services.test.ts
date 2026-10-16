import { describe, expect, it } from 'vitest';
import { BUILD_TYPES } from '@/lib/data/home';
import { SERVICES_DATA, getService } from '@/lib/data/services';
import { SERVICES } from '@/lib/site-nav';
import { SERVICE_INTERESTS, leadSchema } from '@/lib/validations';

describe('services (CLAUDE.md §6.7)', () => {
  it('has a page for every nav link and home card', () => {
    const slugs = SERVICES_DATA.map((s) => `/services/${s.slug}`);
    expect(SERVICES.map((l) => l.href).sort()).toEqual([...slugs].sort());
    for (const b of BUILD_TYPES) expect(slugs).toContain(b.href);
  });

  it('keeps the lead schema in sync with service slugs', () => {
    expect([...SERVICE_INTERESTS].sort()).toEqual(SERVICES_DATA.map((s) => s.slug).sort());
    const lead = leadSchema.parse({
      name: 'Asha',
      phone: '9876543210',
      plotLocation: 'Tumakuru',
      formType: 'contact',
      serviceInterest: 'interior-design',
    });
    expect(lead.serviceInterest).toBe('interior-design');
  });

  it('only shows packages on residential, and every service has content', () => {
    expect(SERVICES_DATA.filter((s) => s.showPackages).map((s) => s.slug)).toEqual([
      'residential-construction',
    ]);
    for (const s of SERVICES_DATA) {
      expect(s.included.length).toBeGreaterThan(0);
      expect(s.process.length).toBeGreaterThan(0);
      expect(s.h1.toLowerCase()).toContain(s.accent.toLowerCase().replace(/[^a-z]/g, ''));
    }
    expect(getService('nope')).toBeUndefined();
  });
});
