import type Lenis from 'lenis';
import type { GsapBundle } from './gsap';

/**
 * Coordinates Lenis and GSAP so there is exactly one ticker (§3.7):
 * - Lenis alone → its own rAF loop.
 * - Once GSAP loads → the rAF loop stops and gsap.ticker drives Lenis; Lenis scroll → ScrollTrigger.update.
 * Either side may arrive first.
 */
let lenis: Lenis | null = null;
let bundle: GsapBundle | null = null;
let rafId = 0;
let tick: ((time: number) => void) | null = null;
let offScroll: (() => void) | null = null;

function rafLoop(time: number) {
  lenis?.raf(time);
  rafId = requestAnimationFrame(rafLoop);
}

function connect() {
  if (!lenis) return;
  if (bundle) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    if (!tick) {
      const { gsap, ScrollTrigger } = bundle;
      const instance = lenis;
      offScroll = instance.on('scroll', ScrollTrigger.update);
      tick = (time) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
  } else if (!rafId) {
    rafId = requestAnimationFrame(rafLoop);
  }
}

function disconnect() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  if (tick && bundle) bundle.gsap.ticker.remove(tick);
  tick = null;
  offScroll?.();
  offScroll = null;
}

export function registerLenis(instance: Lenis) {
  disconnect();
  lenis = instance;
  connect();
}

export function unregisterLenis() {
  disconnect();
  lenis?.destroy();
  lenis = null;
}

export function registerGsap(loaded: GsapBundle) {
  bundle = loaded;
  connect();
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function getLoadedGsap(): GsapBundle | null {
  return bundle;
}

/**
 * Smooth-scroll to an element/selector/position, falling back to native scrolling. Element
 * targets clear the sticky header via CSS `scroll-margin-top` (globals.css), which both Lenis and
 * scrollIntoView honour — don't add a second offset here.
 */
export function scrollToTarget(target: string | number | HTMLElement, options: { immediate?: boolean } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate: options.immediate });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'auto' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ block: 'start' });
}

/** Re-measure all triggers after layout changes (route change, fonts, images). */
export function refreshScrollTriggers() {
  bundle?.ScrollTrigger.refresh();
}
