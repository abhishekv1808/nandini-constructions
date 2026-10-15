'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import { REDUCED_MOTION_QUERY } from './breakpoints';

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

/** OS-level preference only. Prefer `useReducedMotion()`, which also honours the dev override. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    // Server: assume reduced, so SSR output is the static/final state (safe for no-JS too).
    () => true,
  );
}

export type MotionPreference = {
  reduced: boolean;
  /** Dev-only override (used by /dev/motion). `null` = follow the OS. */
  forced: boolean | null;
  setForced: (value: boolean | null) => void;
};

export const MotionPreferenceContext = createContext<MotionPreference | null>(null);

export function useMotionPreference(): MotionPreference {
  const ctx = useContext(MotionPreferenceContext);
  const prefers = usePrefersReducedMotion();
  return ctx ?? { reduced: prefers, forced: null, setForced: () => {} };
}

/** True when motion must be off: OS setting, dev override, or before hydration. */
export function useReducedMotion(): boolean {
  return useMotionPreference().reduced;
}
