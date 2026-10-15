'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import { PinnedScene } from '@/components/motion/PinnedScene';
import { Button } from '@/components/ui/button';
import type { SpecRow, Tier } from '@/lib/data/packages';
import { clamp } from '@/lib/motion/math';
import { cn } from '@/lib/utils';
import { PackageCard, PopularRibbon, UpgradeNote } from './PackageCard';

type PackageSwitcherProps = {
  tiers: Tier[];
  keySpecs: SpecRow[];
};

const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/** Holds each tier for most of its segment, then counts the price to the next tier. */
function tierState(progress: number, rates: number[]) {
  const n = rates.length;
  const t = clamp(progress) * n;
  const index = Math.min(n - 1, Math.floor(t + 0.1));
  const base = Math.min(n - 1, Math.floor(t));
  const next = Math.min(n - 1, base + 1);
  const k = base === next ? 0 : smooth((t - base - 0.8) / 0.2);
  const price = (rates[base] ?? 0) + ((rates[next] ?? 0) - (rates[base] ?? 0)) * k;
  return { index, price };
}

/**
 * §3.7 package switcher: pinned; scrolling (or tapping a tab) moves Rental → Medium → Premium.
 * The rate counts between tiers, key specs cross-fade, and specs upgraded vs the previous tier
 * are highlighted. Reduced motion / no-JS: the three package cards side by side.
 */
export function PackageSwitcher({ tiers, keySpecs }: PackageSwitcherProps) {
  const rates = tiers.map((t) => t.ratePerSqft);

  return (
    <PinnedScene
      id="packages"
      label="Construction packages"
      heightDesktop={260}
      heightMobile={150}
      className="bg-white"
      innerClassName="pt-(--header-h)"
      skip={{ href: '#package-details', label: 'Skip to full specs' }}
      staticFallback={
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <header className="mb-10 max-w-2xl space-y-3">
            <p className="text-sm font-semibold tracking-[0.16em] text-brand-dark uppercase">Packages</p>
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Every material, brand and finish listed upfront
            </h2>
          </header>
          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((t) => (
              <PackageCard key={t.slug} tier={t} />
            ))}
          </div>
        </div>
      }
    >
      {(progress, { scrollToProgress }) => {
        const { index, price } = tierState(progress, rates);
        const tier = tiers[index];
        const prev = index > 0 ? tiers[index - 1] : undefined;
        if (!tier) return null;

        return (
          <div className="mx-auto grid h-full max-w-7xl content-start gap-3 px-4 pt-3 pb-36 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:content-center md:gap-12 md:px-6 md:pt-0 md:pb-16">
            <div className="space-y-3 md:space-y-6">
              <div className="space-y-1 md:space-y-2">
                <p className="text-xs font-semibold tracking-[0.16em] text-brand-dark uppercase md:text-sm">
                  Packages
                </p>
                <h2 className="text-xl font-extrabold md:text-4xl">
                  Every material, brand and finish listed upfront
                </h2>
              </div>

              <div
                className="inline-flex rounded-full border border-line bg-sand p-1"
                role="group"
                aria-label="Choose package"
              >
                {tiers.map((t, i) => (
                  <button
                    key={t.slug}
                    type="button"
                    aria-pressed={i === index}
                    onClick={() => scrollToProgress((i + 0.45) / tiers.length)}
                    className={cn(
                      'min-h-11 rounded-full px-4 text-sm font-semibold transition-colors md:px-5',
                      i === index ? 'bg-ink text-white shadow-sm' : 'text-ink/75 hover:text-ink',
                    )}
                  >
                    {t.shortName}
                  </button>
                ))}
              </div>

              <div className="space-y-1 md:space-y-2">
                <div className="min-h-7">
                  <PopularRibbon tier={tier} />
                </div>
                <p className="font-heading text-4xl font-extrabold tracking-tight text-ink tabular-nums md:text-7xl">
                  ₹{Math.round(price).toLocaleString('en-IN')}
                  <span className="text-lg font-bold text-ink/60 md:text-2xl">/sq.ft</span>
                </p>
                <p key={tier.slug} className="animate-in text-ink/75 duration-300 fade-in max-md:hidden">
                  {tier.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <a href="#cost-estimate" data-select-package={tier.slug}>
                    Calculate cost for this package
                  </a>
                </Button>
                <Button asChild variant="ghost" className="max-md:hidden">
                  <a href="#quote" data-select-package={tier.slug}>
                    Get quote <ArrowUpRightIcon strokeWidth={1.5} />
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-(--radius-card) border border-line bg-sand/60 p-3 md:p-6">
              <p className="mb-2 text-xs font-semibold text-ink/70 md:mb-3 md:text-sm">
                Key specifications — <span className="text-ink">{tier.name}</span>
              </p>
              <dl className="grid grid-cols-2 gap-1.5 md:gap-2">
                {keySpecs.map((row) => {
                  const value = row.values[tier.slug];
                  const upgraded = prev ? row.values[prev.slug] !== value : false;
                  return (
                    <div
                      key={row.key}
                      className={cn(
                        'rounded-xl border px-2.5 py-1.5 transition-colors duration-300 md:px-3 md:py-3',
                        upgraded ? 'border-brand/40 bg-brand-soft' : 'border-line bg-white',
                      )}
                    >
                      <dt className="flex items-center justify-between gap-1 text-[0.625rem] font-semibold tracking-[0.1em] text-ink/60 uppercase md:gap-2 md:text-[0.6875rem] md:tracking-[0.12em]">
                        <span className="truncate">{row.label}</span>
                        {upgraded && (
                          <span className="shrink-0 rounded-full bg-brand px-1.5 py-0.5 text-[0.5625rem] tracking-wide text-white md:px-2 md:text-[0.625rem]">
                            <span className="max-md:sr-only">Upgraded</span>
                            <span aria-hidden="true" className="md:hidden">
                              ↑
                            </span>
                          </span>
                        )}
                      </dt>
                      <dd
                        key={`${row.key}-${tier.slug}`}
                        className="animate-in text-xs leading-snug text-ink duration-300 fade-in max-md:line-clamp-2 md:text-[0.9375rem]"
                      >
                        {value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <UpgradeNote tier={tier} className="mt-4 max-md:hidden" />
            </div>
          </div>
        );
      }}
    </PinnedScene>
  );
}
