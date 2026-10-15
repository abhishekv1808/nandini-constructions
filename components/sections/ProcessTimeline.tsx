'use client';

import { useEffect, useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { clamp } from '@/lib/motion/math';
import { subscribeScroll } from '@/lib/motion/scroll-store';
import { useReducedMotion } from '@/lib/motion/use-reduced-motion';
import { cn } from '@/lib/utils';

type Step = { title: string; text: string };

/**
 * §6.1 #7 — a vertical line that draws with scroll (lib-free: scroll store + scaleY), steps
 * revealing alternately left/right; stacked on mobile. SSR renders the line fully drawn.
 */
export function ProcessTimeline({ steps }: { steps: readonly Step[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line || reduced) return;
    const unsubscribe = subscribeScroll(({ viewportHeight }) => {
      const rect = list.getBoundingClientRect();
      const p = clamp((viewportHeight * 0.6 - rect.top) / rect.height);
      line.style.transform = `scaleY(${p})`;
    });
    return () => {
      unsubscribe();
      line.style.transform = '';
    };
  }, [reduced]);

  return (
    <div ref={listRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-5 w-0.5 bg-line md:left-1/2 md:-translate-x-1/2"
      >
        <div ref={lineRef} className="h-full w-full origin-top bg-brand" />
      </div>
      <ol className="relative space-y-8 md:space-y-12">
        {steps.map((step, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={step.title}
              className="relative grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-2 md:gap-16"
            >
              <span
                aria-hidden="true"
                className="relative z-[1] flex size-10 items-center justify-center rounded-full border-2 border-brand bg-white font-heading font-extrabold text-brand-dark md:absolute md:top-4 md:left-1/2 md:-translate-x-1/2"
              >
                {i + 1}
              </span>
              <Reveal
                x={right ? 24 : -24}
                y={0}
                className={cn(
                  'rounded-(--radius-card) border border-line bg-white p-5 md:p-6',
                  right ? 'md:col-start-2' : 'md:col-start-1 md:text-right',
                )}
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-brand-dark uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-bold md:text-xl">{step.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink/70">{step.text}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
