/** Mirrors Tailwind's `md` breakpoint (48rem). Below this: shorter pins, no parallax (§3.7). */
export const MOBILE_MAX_WIDTH = 767;
export const MOBILE_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`;
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Pinned scenes may never exceed this height on mobile (in vh). */
export const MOBILE_PIN_MAX_VH = 150;

export function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
}
