'use client';

import { PinnedScene } from '@/components/motion/PinnedScene';
import { Button } from '@/components/ui/button';
import { useMotionPreference } from '@/lib/motion/use-reduced-motion';
import { cn } from '@/lib/utils';

export function ReducedMotionToggle() {
  const { reduced, forced, setForced } = useMotionPreference();
  const options: { label: string; value: boolean | null }[] = [
    { label: 'Follow OS', value: null },
    { label: 'Force reduced', value: true },
    { label: 'Force full', value: false },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-white p-3 text-sm shadow-sm">
      <span className="font-semibold">Motion:</span>
      <span
        className={cn(
          'rounded-full px-2 py-0.5 font-semibold',
          reduced ? 'bg-amber-100 text-amber-900' : 'bg-success/10 text-success',
        )}
      >
        {reduced ? 'reduced (Lenis off, scenes static)' : 'full'}
      </span>
      <div className="flex flex-wrap gap-1 sm:ml-auto" role="group" aria-label="Motion override">
        {options.map((o) => (
          <Button
            key={o.label}
            size="sm"
            variant={forced === o.value ? 'primary' : 'ghost'}
            aria-pressed={forced === o.value}
            onClick={() => setForced(o.value)}
          >
            {o.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

const STAGES = [
  'Plot & excavation',
  'Foundation & plinth',
  'Columns & slabs',
  'Block walls',
  'Plastering & waterproofing',
  'Windows, doors, paint',
  'Handover',
];

/** Render-prop demo: progress → active stage, with clickable indicator (scrollToProgress). */
export function PinnedProgressDemo() {
  return (
    <PinnedScene
      id="pinned-progress"
      label="Pinned scene demo: render prop"
      heightDesktop={300}
      heightMobile={150}
      skip={{ href: '#pinned-timeline', label: 'Skip demo' }}
      className="bg-sand"
      innerClassName="pt-(--header-h)"
      staticFallback={
        <ol className="mx-auto grid max-w-3xl gap-2 px-4 py-12 md:px-6">
          {STAGES.map((s, i) => (
            <li key={s} className="rounded-xl border border-line bg-white p-4 font-semibold">
              {i + 1}. {s}
            </li>
          ))}
        </ol>
      }
    >
      {(progress, { scrollToProgress }) => {
        const active = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
        return (
          <div className="mx-auto grid h-full max-w-5xl content-center gap-8 px-4 md:grid-cols-[auto_1fr] md:px-6">
            <ol className="flex gap-1 md:flex-col md:gap-2" aria-label="Stages">
              {STAGES.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => scrollToProgress((i + 0.5) / STAGES.length)}
                    aria-current={i === active ? 'step' : undefined}
                    aria-label={`Stage ${i + 1}: ${s}`}
                    className={cn(
                      'size-11 rounded-full border text-sm font-bold transition-colors',
                      i === active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink',
                    )}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-[0.16em] text-brand-dark uppercase">
                Stage {active + 1} of {STAGES.length}
              </p>
              <h2 className="text-3xl font-extrabold md:text-5xl">{STAGES[active]}</h2>
              <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                <div className="h-full origin-left bg-brand" style={{ transform: `scaleX(${progress})` }} />
              </div>
              <p className="font-mono text-sm text-ink/70">progress = {progress.toFixed(3)}</p>
            </div>
          </div>
        );
      }}
    </PinnedScene>
  );
}

/** Timeline demo: GSAP scrubs layers without React re-renders (the house scene pattern). */
export function PinnedTimelineDemo() {
  return (
    <PinnedScene
      id="pinned-timeline"
      label="Pinned scene demo: GSAP timeline"
      heightDesktop={250}
      skip={{ href: '#after-pins', label: 'Skip demo' }}
      cta={
        <Button size="sm" asChild>
          <a href="#after-pins">In-scene CTA</a>
        </Button>
      }
      className="bg-charcoal"
      innerClassName="pt-(--header-h)"
      timeline={(tl) => {
        tl.fromTo(
          '[data-layer="1"]',
          { yPercent: 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.3 },
          0,
        )
          .fromTo(
            '[data-layer="2"]',
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.3 },
            0.3,
          )
          .fromTo(
            '[data-layer="3"]',
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.3 },
            0.6,
          );
      }}
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4">
        <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-white/70 uppercase">
          Scrubbed GSAP timeline
        </p>
        {[3, 2, 1].map((n) => (
          <div
            key={n}
            data-layer={n}
            className="flex h-16 w-64 items-center justify-center rounded-lg bg-brand-soft font-bold text-ink md:w-96"
          >
            Floor {n}
          </div>
        ))}
        <div className="h-2 w-72 rounded bg-white/20 md:w-[26rem]" aria-hidden />
      </div>
    </PinnedScene>
  );
}
