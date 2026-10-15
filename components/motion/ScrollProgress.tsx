'use client';

import { useEffect, useRef } from 'react';
import { subscribeScroll } from '@/lib/motion/scroll-store';
import { cn } from '@/lib/utils';

/** Thin brand bar showing page progress. Transform-only (no layout), decorative. */
export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      subscribeScroll(({ progress }) => {
        if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
      }),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-x-0 bottom-0 z-(--z-progress) h-0.5', className)}
    >
      <div ref={ref} className="h-full origin-left bg-sky" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
