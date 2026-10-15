/**
 * Construction cost estimator (CLAUDE.md §6.4). Pure + unit-tested. The home teaser uses the
 * built-up-area path only; plot→built-up (FAR coverage) and add-ons arrive with the full
 * calculator once the client confirms coverage rules and add-on prices.
 */

export type EstimateInput = {
  builtUpSqft: number;
  ratePerSqft: number;
  /** Flat add-on total in ₹ (none on the teaser). */
  addons?: number;
};

export type Estimate = {
  base: number;
  total: number;
  low: number;
  high: number;
};

export const ESTIMATE_SPREAD = 0.05;
export const MIN_BUILT_UP_SQFT = 300;
export const MAX_BUILT_UP_SQFT = 50000;

const roundTo10k = (n: number) => Math.round(n / 10000) * 10000;

export function estimateCost({ builtUpSqft, ratePerSqft, addons = 0 }: EstimateInput): Estimate {
  if (!Number.isFinite(builtUpSqft) || builtUpSqft <= 0) throw new RangeError('builtUpSqft must be positive');
  if (!Number.isFinite(ratePerSqft) || ratePerSqft <= 0) throw new RangeError('ratePerSqft must be positive');
  const base = builtUpSqft * ratePerSqft;
  const total = base + Math.max(0, addons);
  return {
    base,
    total,
    low: roundTo10k(total * (1 - ESTIMATE_SPREAD)),
    high: roundTo10k(total * (1 + ESTIMATE_SPREAD)),
  };
}

/** ₹ in Indian notation, compact as lakh/crore for headline ranges: ₹42.5 L, ₹1.12 Cr. */
export function formatInrCompact(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
