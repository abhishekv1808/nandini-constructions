'use client';

import { PauseIcon, PlayIcon } from 'lucide-react';
import { useState } from 'react';
import { useReducedMotion } from '@/lib/motion/use-reduced-motion';

/** WCAG 2.2.2 — auto-moving content needs a pause control. Toggles `data-paused` on the target marquees. */
export function MarqueeToggle({ targetId }: { targetId: string }) {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  if (reduced) return null;

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document
      .querySelectorAll(`#${targetId} .marquee`)
      .forEach((el) => el.toggleAttribute('data-paused', next));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-ink/40"
    >
      {paused ? (
        <PlayIcon className="size-4" strokeWidth={1.5} aria-hidden />
      ) : (
        <PauseIcon className="size-4" strokeWidth={1.5} aria-hidden />
      )}
      {paused ? 'Play' : 'Pause'} scrolling
    </button>
  );
}
