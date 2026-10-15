'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { clamp } from '@/lib/motion/math';
import { subscribeScroll } from '@/lib/motion/scroll-store';
import { useReducedMotion } from '@/lib/motion/use-reduced-motion';

/**
 * Hero backdrop (§3.7): as the hero scrolls out, the visual scales 1 → 1.08 and darkens.
 * Transform/opacity only, driven by the shared scroll store; static with reduced motion.
 */
export function HeroBackdrop({ children }: { children: ReactNode }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    const shade = shadeRef.current;
    const hero = layer?.closest('section');
    if (!layer || !shade || !hero || reduced) return;
    const unsubscribe = subscribeScroll(({ y }) => {
      const p = clamp(y / Math.max(1, hero.offsetHeight));
      layer.style.transform = `scale(${1 + 0.08 * p})`;
      shade.style.opacity = String(p * 0.6);
    });
    return () => {
      unsubscribe();
      layer.style.transform = '';
      shade.style.opacity = '0';
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div ref={layerRef} className="absolute inset-0 origin-center will-change-transform">
        {children}
      </div>
      <div ref={shadeRef} className="absolute inset-0 bg-ink opacity-0" />
    </div>
  );
}
