import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MarqueeItem = { key: string; node: ReactNode };

type MarqueeProps = {
  items: MarqueeItem[];
  /** Seconds for one full loop (lower = faster). */
  duration?: number;
  reverse?: boolean;
  /**
   * Without motion (no JS / reduced motion): 'wrap' lays the items out as a wrapped grid,
   * 'scroll' keeps one row the visitor can swipe / scroll (better for large images).
   */
  fallback?: 'wrap' | 'scroll';
  /** Accessible name — required for 'scroll' since that row becomes keyboard-scrollable. */
  label?: string;
  className?: string;
  listClassName?: string;
};

/**
 * Infinite auto-scrolling row (§3.7, pure CSS, zero JS). The list is rendered twice and the
 * track slides by -50% for a seamless loop; the copy is aria-hidden and removed when motion is
 * off. Pauses on hover/focus and when a `MarqueeToggle` sets `data-paused` (WCAG 2.2.2).
 */
export function Marquee({
  items,
  duration = 45,
  reverse = false,
  fallback = 'wrap',
  label,
  className,
  listClassName,
}: MarqueeProps) {
  const list = (dup: boolean) => (
    <ul
      className={cn('flex shrink-0 gap-3 pr-3', dup && 'marquee-dup', listClassName)}
      aria-hidden={dup || undefined}
    >
      {items.map((item) => (
        <li key={dup ? `dup-${item.key}` : item.key} className="shrink-0">
          {item.node}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn('marquee', className)}
      data-direction={reverse ? 'reverse' : undefined}
      data-fallback={fallback}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      {...(fallback === 'scroll' ? { role: 'region', 'aria-label': label, tabIndex: 0 } : {})}
    >
      <div className="marquee-track">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
