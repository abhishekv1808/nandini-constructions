'use client';

import { useEffect, useRef, type DependencyList, type RefObject } from 'react';
import { loadGsap, type GsapBundle } from './gsap';

/**
 * Lazy-loads GSAP, runs `setup` inside a gsap.context scoped to `scope`, and reverts every
 * tween/ScrollTrigger it created on unmount or when deps change. Skipped when `enabled` is false
 * (e.g. reduced motion), so GSAP is never downloaded in that case. If `setup` returns a function,
 * gsap.context calls it on revert.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: (bundle: GsapBundle, scopeEl: HTMLElement) => void | (() => void),
  deps: DependencyList,
  enabled = true,
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap().then((bundle) => {
      const el = scope.current;
      if (cancelled || !el) return;
      const ctx = bundle.gsap.context(() => setupRef.current(bundle, el), el);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller-controlled deps, like useEffect
  }, [enabled, scope, ...deps]);
}
