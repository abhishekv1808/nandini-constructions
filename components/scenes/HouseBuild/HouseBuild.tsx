'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PinnedScene } from '@/components/motion/PinnedScene';
import { Button } from '@/components/ui/button';
import type { TierSlug } from '@/lib/data/packages';
import { QUOTE_HREF } from '@/lib/site-nav';
import { cn } from '@/lib/utils';
import { HouseSvg } from './HouseSvg';

export type StageMaterial = { label: string; values: Record<TierSlug, string> };
export type BuildStage = { title: string; text: string; materials: StageMaterial[] };
export type TierOption = { slug: TierSlug; shortName: string };

type HouseBuildProps = {
  stages: BuildStage[];
  tiers: TierOption[];
  defaultTier: TierSlug;
  /** Where "Skip" goes — the next section's id. */
  skipTo?: string;
};

function TierPicker({
  tiers,
  value,
  onChange,
}: {
  tiers: TierOption[];
  value: TierSlug;
  onChange: (t: TierSlug) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Show materials for package">
      <span className="text-xs font-semibold text-ink/60">Materials in:</span>
      {tiers.map((t) => (
        <button
          key={t.slug}
          type="button"
          aria-pressed={value === t.slug}
          onClick={() => onChange(t.slug)}
          className={cn(
            'min-h-9 rounded-full border px-3 text-xs font-semibold transition-colors',
            value === t.slug
              ? 'border-ink bg-ink text-white'
              : 'border-line bg-white text-ink hover:border-ink/40',
          )}
        >
          {t.shortName}
        </button>
      ))}
    </div>
  );
}

function Materials({
  materials,
  tier,
  compact = false,
}: {
  materials: StageMaterial[];
  tier: TierSlug;
  compact?: boolean;
}) {
  return (
    <dl className={cn('grid gap-2', compact && 'max-md:[&>div:nth-child(n+3)]:hidden')}>
      {materials.map((m) => (
        <div key={m.label} className="rounded-xl border border-line bg-white/80 px-3 py-2">
          <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-dark uppercase">
            {m.label}
          </dt>
          <dd className="text-sm leading-snug text-ink">{m.values[tier]}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * "Watch your home rise" (§3.7): pinned ~300vh scene. GSAP scrubs the SVG stage layers (no React
 * re-render per frame); the render prop only swaps the caption when the stage index changes.
 */
export function HouseBuild({ stages, tiers, defaultTier, skipTo = '#packages' }: HouseBuildProps) {
  const [tier, setTier] = useState<TierSlug>(defaultTier);
  const count = stages.length;
  // Stable element → React skips the ~200-node SVG when the caption re-renders.
  const sceneSvg = useMemo(
    () => <HouseSvg idPrefix="house-scene" className="h-full max-h-[60svh] w-full max-w-2xl" />,
    [],
  );

  const staticFallback = (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <HouseSvg idPrefix="house-static" className="mx-auto w-full max-w-xl" />
        <div className="space-y-5">
          <TierPicker tiers={tiers} value={tier} onChange={setTier} />
          <ol className="space-y-4">
            {stages.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-brand-dark uppercase">
                  Stage {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink/75">{s.text}</p>
                <div className="mt-3">
                  <Materials materials={s.materials} tier={tier} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );

  return (
    <PinnedScene
      id="build-process"
      label="Watch your home rise: seven stages of construction"
      heightDesktop={320}
      progressSteps={count * 4}
      heightMobile={150}
      className="bg-sand"
      innerClassName="pt-(--header-h)"
      skip={{ href: skipTo, label: 'Skip to packages' }}
      cta={
        <Button asChild size="sm" className="max-md:hidden">
          <Link href={QUOTE_HREF}>Get Free Quote</Link>
        </Button>
      }
      staticFallback={staticFallback}
      timeline={(tl, scope, { gsap }) => {
        const seg = 1 / count;
        for (let i = 1; i <= count; i += 1) {
          const start = (i - 1) * seg;
          const pieces = scope.querySelectorAll(`[data-stage="${i}"] > [data-piece]`);
          const draws = scope.querySelectorAll(`[data-stage="${i}"] [data-draw]`);
          // Explicit set + to(): a staggered fromTo() only pre-renders its first target, which
          // left future stages visible. set() is reverted with the gsap.context on unmount.
          if (pieces.length) {
            gsap.set(pieces, { opacity: 0, y: -18 });
            tl.to(
              pieces,
              { opacity: 1, y: 0, duration: seg * 0.7, stagger: { amount: seg * 0.22 } },
              start + seg * 0.04,
            );
          }
          if (draws.length) {
            gsap.set(draws, { strokeDashoffset: 1 });
            tl.to(draws, { strokeDashoffset: 0, duration: seg * 0.6 }, start);
          }
        }
      }}
    >
      {(progress, { scrollToProgress }) => {
        const active = Math.min(count - 1, Math.floor(progress * count));
        const stage = stages[active];
        if (!stage) return null;
        return (
          <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_minmax(0,1fr)_auto] gap-3 px-4 pt-4 pb-36 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,24rem)] md:grid-rows-1 md:items-center md:gap-8 md:px-6 md:pt-0 md:pb-20">
            <div className="md:self-center">
              <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-brand-dark uppercase md:hidden">
                Watch your home rise
              </p>
              <ol className="flex gap-1 md:flex-col md:gap-2" aria-label="Construction stages">
                {stages.map((s, i) => (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => scrollToProgress((i + 0.96) / count)}
                      aria-current={i === active ? 'step' : undefined}
                      aria-label={`Stage ${i + 1}: ${s.title}`}
                      className={cn(
                        'size-10 rounded-full border text-sm font-bold transition-colors md:size-11',
                        i === active
                          ? 'border-brand bg-brand text-white'
                          : i < active
                            ? 'border-ink/20 bg-ink/5 text-ink'
                            : 'border-line bg-white text-ink/70',
                      )}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex min-h-0 items-center justify-center">{sceneSvg}</div>

            <div className="min-w-0 space-y-3 md:space-y-4" aria-live="polite">
              <p className="hidden text-sm font-semibold tracking-[0.16em] text-brand-dark uppercase md:block">
                Watch your home rise
              </p>
              <div key={active} className="animate-in space-y-2 duration-300 fade-in slide-in-from-bottom-2">
                <p className="text-xs font-semibold text-ink/60">
                  Stage {active + 1} of {count}
                </p>
                <h2 className="text-2xl font-extrabold md:text-4xl">{stage.title}</h2>
                <p className="text-[0.9375rem] text-ink/75 md:text-base">{stage.text}</p>
              </div>
              <TierPicker tiers={tiers} value={tier} onChange={setTier} />
              <Materials materials={stage.materials} tier={tier} compact />
            </div>
          </div>
        );
      }}
    </PinnedScene>
  );
}
