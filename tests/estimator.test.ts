import { describe, expect, it } from 'vitest';
import { estimateCost, formatInr, formatInrCompact } from '@/lib/estimator';

describe('estimateCost', () => {
  it('multiplies built-up area by the package rate and gives a ±5% range rounded to ₹10k', () => {
    const e = estimateCost({ builtUpSqft: 2400, ratePerSqft: 2100 });
    expect(e.base).toBe(5_040_000);
    expect(e.total).toBe(5_040_000);
    expect(e.low).toBe(4_790_000); // 4,788,000 → 4,790,000
    expect(e.high).toBe(5_290_000); // 5,292,000 → 5,290,000
  });

  it('adds flat add-ons and ignores negative ones', () => {
    expect(estimateCost({ builtUpSqft: 1000, ratePerSqft: 1800, addons: 200_000 }).total).toBe(2_000_000);
    expect(estimateCost({ builtUpSqft: 1000, ratePerSqft: 1800, addons: -5 }).total).toBe(1_800_000);
  });

  it('rejects non-positive input', () => {
    expect(() => estimateCost({ builtUpSqft: 0, ratePerSqft: 1800 })).toThrow(RangeError);
    expect(() => estimateCost({ builtUpSqft: 1000, ratePerSqft: Number.NaN })).toThrow(RangeError);
  });
});

describe('INR formatting', () => {
  it('uses Indian grouping and lakh/crore compaction', () => {
    expect(formatInr(4_788_000)).toBe('₹47,88,000');
    expect(formatInrCompact(4_790_000)).toBe('₹47.9 L');
    expect(formatInrCompact(11_200_000)).toBe('₹1.12 Cr');
    expect(formatInrCompact(95_000)).toBe('₹95,000');
  });
});
