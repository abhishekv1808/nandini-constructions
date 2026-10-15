'use client';

import { ArrowDownIcon } from 'lucide-react';
import { useCallback, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { MOBILE_PIN_MAX_VH } from '@/lib/motion/breakpoints';
import type { GsapBundle } from '@/lib/motion/gsap';
import { quantize } from '@/lib/motion/math';
import { getLenis, scrollToTarget } from '@/lib/motion/runtime';
import { useGsapContext } from '@/lib/motion/use-gsap-context';
import { useReducedMotion } from '@/lib/motion/use-reduced-motion';
import { cn } from '@/lib/utils';

export type PinnedSceneApi = {
  /** Scroll so the scene sits at progress p (0→1) — e.g. clickable stage indicators. */
  scrollToProgress: (p: number) => void;
  /** True when rendering the static (reduced-motion / pre-hydration) variant. */
  isStatic: boolean;
};

type PinnedSceneProps = {
  /** Accessible name for the scene's <section>. */
  label: string;
  id?: string;
  /** Total scroll length in vh on desktop (default 300). */
  heightDesktop?: number;
  /** Total scroll length in vh below 768px (default and max 150). */
  heightMobile?: number;
  /** Render prop gets progress 0→1 (rAF-batched, quantised). Also exposed as CSS var `--p`. */
  children?: ReactNode | ((progress: number, api: PinnedSceneApi) => ReactNode);
  /**
   * For heavy scenes: add tweens to a scrubbed GSAP timeline positioned in 0→1 time,
   * so animation runs without React re-renders.
   */
  timeline?: (tl: gsap.core.Timeline, scope: HTMLElement, bundle: GsapBundle) => void;
  /** Shown instead of children for no-JS / reduced motion. Defaults to children at progress 1. */
  staticFallback?: ReactNode;
  /** Every scene needs a CTA or a skip affordance (§3.7). */
  skip?: { href: string; label: string };
  cta?: ReactNode;
  /** GSAP scrub smoothing in seconds (Lenis already smooths wheel input). */
  scrub?: number | true;
  /**
   * Resolution of the render-prop progress. React only re-renders when the quantised value
   * changes — use a small number (e.g. stages × 4) for heavy scenes. Default 1000.
   */
  progressSteps?: number;
  /** 'static' = no pin below 768px (native layout, e.g. swipe carousels). */
  mobile?: 'pin' | 'static';
  className?: string;
  innerClassName?: string;
};

/**
 * Pinned, scrubbed section. Pinning is CSS `position: sticky` inside a wrapper whose height is
 * set in CSS at SSR → space is reserved (no CLS) and it degrades to static stacked content
 * without JS (`html:not(.motion-ok)`). ScrollTrigger is lazy-loaded and only measures progress.
 */
export function PinnedScene({
  label,
  id,
  heightDesktop = 300,
  heightMobile = MOBILE_PIN_MAX_VH,
  children,
  timeline,
  staticFallback,
  skip,
  cta,
  scrub = 0.4,
  progressSteps = 1000,
  mobile = 'pin',
  className,
  innerClassName,
}: PinnedSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);
  const latest = useRef(0);
  const wantsRenderProp = typeof children === 'function';

  const push = useCallback(
    (p: number) => {
      sectionRef.current?.style.setProperty('--p', p.toFixed(4));
      if (!wantsRenderProp) return;
      latest.current = p;
      if (!frame.current)
        frame.current = requestAnimationFrame(() => {
          frame.current = 0;
          setProgress(quantize(latest.current, progressSteps));
        });
    },
    [wantsRenderProp, progressSteps],
  );

  useGsapContext(
    sectionRef,
    (bundle, el) => {
      const { gsap, ScrollTrigger } = bundle;
      const tl = gsap.timeline({ defaults: { ease: 'none' }, onUpdate: () => push(tl.progress()) });
      tl.set({}, {}, 1); // fixes the timeline length at 1 so callers position tweens in 0→1
      timeline?.(tl, el, bundle);
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        scrub,
        animation: tl,
        invalidateOnRefresh: true,
      });
      return () => {
        if (frame.current) cancelAnimationFrame(frame.current);
        frame.current = 0;
      };
    },
    [scrub, push],
    !reduced,
  );

  const scrollToProgress = useCallback((p: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    scrollToTarget(top + Math.max(0, travel) * Math.min(1, Math.max(0, p)));
  }, []);

  const onSkip = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!skip || !getLenis()) return; // native anchor jump otherwise
    event.preventDefault();
    scrollToTarget(skip.href);
  };

  const api: PinnedSceneApi = { scrollToProgress, isStatic: reduced };
  const content = reduced
    ? (staticFallback ?? (typeof children === 'function' ? children(1, api) : children))
    : typeof children === 'function'
      ? children(progress, api)
      : children;

  const style = {
    '--pin-h-desktop': `${heightDesktop}vh`,
    '--pin-h-mobile': `${Math.min(heightMobile, MOBILE_PIN_MAX_VH)}vh`,
    '--p': reduced ? 1 : 0,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={label}
      className={cn('pinned', className)}
      data-mobile={mobile}
      style={style}
    >
      <div className={cn('pinned-sticky', innerClassName)}>
        {content}
        {(skip || cta) && (
          <div
            className={cn(
              'pointer-events-none flex items-end justify-between gap-3 p-4 md:p-6 md:pr-28',
              reduced
                ? 'relative'
                : // clear the mobile CTA bar (§4.2) and the desktop WhatsApp FAB
                  'absolute inset-x-0 bottom-0 max-md:pb-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom)+0.75rem)]',
              !reduced && mobile === 'static' && 'max-md:static max-md:pb-6',
            )}
          >
            <div className="pointer-events-auto">{cta}</div>
            {skip && (
              <a
                href={skip.href}
                onClick={onSkip}
                className="pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/85 px-4 text-sm font-semibold text-ink/80 shadow-sm backdrop-blur hover:text-ink"
              >
                {skip.label}
                <ArrowDownIcon className="size-4" strokeWidth={1.5} aria-hidden />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
