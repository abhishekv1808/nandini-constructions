import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger';
import { registerGsap } from './runtime';

export type GsapBundle = {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerPlugin;
};

let pending: Promise<GsapBundle> | null = null;

/**
 * The only way to get GSAP (§3.7). Dynamic import → GSAP/ScrollTrigger land in a separate chunk
 * that only pages with pinned scenes download. Memoised; registers ScrollTrigger and hands
 * Lenis over to gsap.ticker.
 */
export function loadGsap(): Promise<GsapBundle> {
  if (!pending) {
    pending = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, st]) => {
      const loaded: GsapBundle = { gsap: core.gsap, ScrollTrigger: st.ScrollTrigger };
      loaded.gsap.registerPlugin(loaded.ScrollTrigger);
      registerGsap(loaded);
      return loaded;
    });
  }
  return pending;
}
