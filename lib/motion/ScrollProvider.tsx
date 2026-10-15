'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { REDUCED_MOTION_QUERY } from './breakpoints';
import { startRevealObserver } from './reveal-observer';
import { getLenis, refreshScrollTriggers, registerLenis, unregisterLenis } from './runtime';
import { startScrollStore } from './scroll-store';
import {
  MotionPreferenceContext,
  usePrefersReducedMotion,
  type MotionPreference,
} from './use-reduced-motion';

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

function onIdle(callback: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 200);
  return () => clearTimeout(id);
}

/**
 * Single owner of global scroll behaviour (§3.7): scroll store, reveal observer, Lenis (lazy,
 * after first paint, off for reduced motion), `html.motion-ok`, and ScrollTrigger refresh on
 * route change.
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const prefersReduced = usePrefersReducedMotion();
  const [forced, setForced] = useState<boolean | null>(null);
  const reduced = forced ?? prefersReduced;
  const pathname = usePathname();

  // Tell the no-flash head script that JS is alive, and keep `motion-ok` in sync.
  // Read the media query directly: during hydration `prefersReduced` is briefly the server value
  // (true), and toggling the class off for one frame would flash hidden reveal states.
  useEffect(() => {
    window.__motionReady = true;
    const actual = forced ?? window.matchMedia(REDUCED_MOTION_QUERY).matches;
    document.documentElement.classList.toggle('motion-ok', !actual);
  }, [forced, prefersReduced]);

  useEffect(() => {
    const stopStore = startScrollStore();
    const stopReveal = startRevealObserver();
    return () => {
      stopStore();
      stopReveal();
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const cancelIdle = onIdle(() => {
      import('lenis').then(({ default: Lenis }) => {
        if (cancelled) return;
        registerLenis(new Lenis({ autoRaf: false, anchors: false, lerp: 0.12, syncTouch: false }));
      });
    });
    return () => {
      cancelled = true;
      cancelIdle();
      unregisterLenis();
    };
  }, [reduced]);

  // Next.js restores/sets scroll on navigation; sync Lenis to it and re-measure triggers.
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      lenis.resize();
    }
    const id = requestAnimationFrame(() => refreshScrollTriggers());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const value = useMemo<MotionPreference>(() => ({ reduced, forced, setForced }), [reduced, forced]);

  return <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>;
}
