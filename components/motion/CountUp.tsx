'use client';

import { useEffect, useRef } from 'react';
import { easeOutCubic } from '@/lib/motion/math';
import { useReducedMotion } from '@/lib/motion/use-reduced-motion';

type CountUpProps = {
  /** Must be real data (site_settings / package rates) — never a made-up number. */
  value: number;
  from?: number;
  /** ms */
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/**
 * Counts up once when it enters the viewport. SSR renders the final value (crawlers, no-JS,
 * reduced motion all see the real number). If already on screen at mount, it stays static
 * rather than flashing back to `from`.
 */
export function CountUp({
  value,
  from = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const format = (n: number) =>
    `${prefix}${n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  const finalText = format(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already visible → static

    el.textContent = format(from);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(from + (value - from) * easeOutCubic(t));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = finalText;
    };
    // format is derived from the listed props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, from, duration, prefix, suffix, decimals, reduced]);

  return (
    <span className={className}>
      <span className="sr-only">{finalText}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {finalText}
      </span>
    </span>
  );
}
