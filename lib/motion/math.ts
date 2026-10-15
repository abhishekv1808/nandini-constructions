/** Pure helpers shared by the scroll primitives — unit-tested in tests/motion-math.test.ts. */

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

/** Page scroll progress 0→1. */
export function pageProgress(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const max = scrollHeight - viewportHeight;
  return max <= 0 ? 0 : clamp(scrollY / max);
}

/**
 * Progress of an element travelling through the viewport:
 * 0 when its top meets the viewport bottom, 1 when its bottom meets the viewport top.
 */
export function elementViewportProgress(rectTop: number, rectHeight: number, viewportHeight: number): number {
  const total = viewportHeight + rectHeight;
  return total <= 0 ? 0 : clamp((viewportHeight - rectTop) / total);
}

export const PARALLAX_MAX_STRENGTH = 0.08;

/** Y offset in px for a parallax layer; centred so the image is untranslated mid-viewport. */
export function parallaxOffset(progress: number, frameHeight: number, strength: number): number {
  const s = clamp(strength, 0, PARALLAX_MAX_STRENGTH);
  return (clamp(progress) - 0.5) * 2 * s * frameHeight;
}

/** Quantise to avoid React re-renders for sub-pixel progress changes. */
export function quantize(value: number, steps = 1000): number {
  return Math.round(value * steps) / steps;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - clamp(t), 3);
}
