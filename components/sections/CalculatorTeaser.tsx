'use client';

import { ArrowRightIcon } from 'lucide-react';
import { useCallback, useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  RENTAL_NON_TENDERING_EXTRA_PER_SQFT,
  formatRate,
  type Tier,
  type TierSlug,
} from '@/lib/data/packages';
import {
  MAX_BUILT_UP_SQFT,
  MIN_BUILT_UP_SQFT,
  estimateCost,
  formatInr,
  formatInrCompact,
} from '@/lib/estimator';
import { usePackageSelectClicks } from '@/lib/package-select';
import { cn } from '@/lib/utils';

const FLOORS = ['G', 'G+1', 'G+2', 'G+3', 'G+4'];

/**
 * §6.1 #8 — compact estimator. The range is shown freely (never gated); the detailed breakdown
 * is the lead step. Built-up area is entered directly — plot→built-up (FAR coverage) and add-on
 * prices are [CONFIRM] and arrive with the full /cost-calculator (Phase 4).
 */
export function CalculatorTeaser({ tiers, defaultTier }: { tiers: Tier[]; defaultTier: TierSlug }) {
  const uid = useId();
  const [tierSlug, setTierSlug] = useState<TierSlug>(defaultTier);
  const [area, setArea] = useState('2400');
  const [floors, setFloors] = useState('G+1');
  usePackageSelectClicks(useCallback((slug: TierSlug) => setTierSlug(slug), []));

  const tier = tiers.find((t) => t.slug === tierSlug) ?? tiers[0];
  const sqft = Number(area.replace(/[^\d]/g, ''));
  const valid = Number.isFinite(sqft) && sqft >= MIN_BUILT_UP_SQFT && sqft <= MAX_BUILT_UP_SQFT;
  const estimate = tier && valid ? estimateCost({ builtUpSqft: sqft, ratePerSqft: tier.ratePerSqft }) : null;

  return (
    <div className="grid gap-6 overflow-hidden rounded-[24px] border border-line bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-5 p-5 md:p-8">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Package</legend>
          <div className="grid grid-cols-3 gap-2">
            {tiers.map((t) => (
              <label
                key={t.slug}
                className={cn(
                  'flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-xl border px-2 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand',
                  tierSlug === t.slug ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/40',
                )}
              >
                <input
                  type="radio"
                  name={`${uid}-tier`}
                  value={t.slug}
                  checked={tierSlug === t.slug}
                  onChange={() => setTierSlug(t.slug)}
                  className="sr-only"
                />
                <span className="text-sm font-bold">{t.shortName}</span>
                <span className={cn('text-xs', tierSlug === t.slug ? 'text-white/75' : 'text-ink/60')}>
                  {formatRate(t.ratePerSqft)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8rem]">
          <div>
            <label htmlFor={`${uid}-area`} className="mb-1.5 block text-sm font-semibold">
              Total built-up area (sq.ft)
            </label>
            <input
              id={`${uid}-area`}
              type="text"
              inputMode="numeric"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              aria-invalid={!valid || undefined}
              aria-describedby={`${uid}-area-hint`}
              className="block min-h-12 w-full rounded-xl border bg-white px-4 text-base aria-[invalid=true]:border-red-600"
            />
            <p id={`${uid}-area-hint`} className={cn('mt-1 text-xs', valid ? 'text-ink/60' : 'text-red-700')}>
              {valid
                ? 'All floors combined.'
                : `Enter between ${MIN_BUILT_UP_SQFT.toLocaleString('en-IN')} and ${MAX_BUILT_UP_SQFT.toLocaleString('en-IN')} sq.ft`}
            </p>
          </div>
          <div>
            <label htmlFor={`${uid}-floors`} className="mb-1.5 block text-sm font-semibold">
              Floors
            </label>
            <select
              id={`${uid}-floors`}
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
              className="block min-h-12 w-full rounded-xl border bg-white px-3 text-base"
            >
              {FLOORS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col justify-between gap-5 bg-charcoal p-5 text-white md:p-8"
        aria-live="polite"
      >
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-[0.14em] text-sky-light uppercase">Estimated cost</p>
          {estimate && tier ? (
            <>
              <p className="font-heading text-4xl font-extrabold tabular-nums md:text-5xl">
                {formatInrCompact(estimate.low)} – {formatInrCompact(estimate.high)}
              </p>
              <p className="text-sm text-white/70 tabular-nums">
                {formatInr(estimate.low)} – {formatInr(estimate.high)} · {sqft.toLocaleString('en-IN')} sq.ft
                ({floors}) × {formatRate(tier.ratePerSqft)} ± 5%
              </p>
              {tier.slug === 'rental' && (
                <p className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/85">
                  Rental package: ₹{RENTAL_NON_TENDERING_EXTRA_PER_SQFT}/sq.ft is chargeable extra for
                  non-tendering items (not included above).
                </p>
              )}
            </>
          ) : (
            <p className="text-white/70">Enter your built-up area to see an estimate.</p>
          )}
          <p className="text-xs text-white/60">Indicative estimate. Final quote after site visit.</p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href="#quote" data-select-package={tierSlug}>
            Get detailed breakdown <ArrowRightIcon strokeWidth={1.5} />
          </a>
        </Button>
      </div>
    </div>
  );
}
