import { describe, expect, it } from 'vitest';
import {
  PARALLAX_MAX_STRENGTH,
  clamp,
  easeOutCubic,
  elementViewportProgress,
  pageProgress,
  parallaxOffset,
  quantize,
} from '@/lib/motion/math';
import { telLink, whatsappLink } from '@/lib/contact-links';
import { QUOTE_HREF } from '@/lib/site-nav';

describe('motion math', () => {
  it('clamps', () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(clamp(0.3)).toBe(0.3);
  });

  it('computes page progress and handles short pages', () => {
    expect(pageProgress(0, 3000, 1000)).toBe(0);
    expect(pageProgress(1000, 3000, 1000)).toBe(0.5);
    expect(pageProgress(5000, 3000, 1000)).toBe(1);
    expect(pageProgress(0, 800, 1000)).toBe(0);
  });

  it('computes element progress through the viewport', () => {
    expect(elementViewportProgress(1000, 500, 1000)).toBe(0); // top at viewport bottom
    expect(elementViewportProgress(-500, 500, 1000)).toBe(1); // bottom at viewport top
    expect(elementViewportProgress(250, 500, 1000)).toBe(0.5);
  });

  it('caps parallax at 8% of the frame and centres it', () => {
    expect(parallaxOffset(0.5, 400, 0.08)).toBe(0);
    expect(parallaxOffset(1, 400, 0.5)).toBeCloseTo(400 * PARALLAX_MAX_STRENGTH);
    expect(parallaxOffset(0, 400, 0.08)).toBeCloseTo(-32);
  });

  it('quantises and eases', () => {
    expect(quantize(0.123456)).toBe(0.123);
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });
});

describe('contact links', () => {
  it('falls back to the quote page (never a broken tel:) when the number is missing', () => {
    const link = telLink({ status: 'missing', value: null, label: 'CONFIRM: phone number' });
    expect(link).toMatchObject({ href: QUOTE_HREF, missing: true });
  });

  it('builds tel: and wa.me links with the pre-filled message', () => {
    expect(telLink({ status: 'confirmed', value: '+91 98450 00000' }).href).toBe('tel:+919845000000');
    const wa = whatsappLink({ status: 'confirmed', value: '+91 98450 00000' }, 'Hi there');
    expect(wa.href).toBe('https://wa.me/919845000000?text=Hi%20there');
    expect(wa.external).toBe(true);
  });
});
