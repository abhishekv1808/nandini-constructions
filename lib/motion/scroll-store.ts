import { pageProgress } from './math';

/**
 * One passive native scroll listener, rAF-batched, shared by every lib-free primitive.
 * Lenis writes the native scroll position each frame, so this works with or without it.
 */
export type ScrollSnapshot = {
  y: number;
  progress: number;
  viewportHeight: number;
};

type Listener = (snapshot: ScrollSnapshot) => void;

const listeners = new Set<Listener>();
let snapshot: ScrollSnapshot = { y: 0, progress: 0, viewportHeight: 0 };
let frame = 0;
let started = false;

function read(): ScrollSnapshot {
  const y = window.scrollY;
  const viewportHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  return { y, viewportHeight, progress: pageProgress(y, scrollHeight, viewportHeight) };
}

function flush() {
  frame = 0;
  snapshot = read();
  listeners.forEach((listener) => listener(snapshot));
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

/** Idempotent; returns a teardown. Called by ScrollProvider. */
export function startScrollStore(): () => void {
  if (started) return () => {};
  started = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
  return () => {
    started = false;
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
}

/** Subscribe to scroll updates; the listener is called immediately with the current snapshot. */
export function subscribeScroll(listener: Listener): () => void {
  listeners.add(listener);
  if (typeof window !== 'undefined') {
    snapshot = read();
    listener(snapshot);
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getScrollSnapshot(): ScrollSnapshot {
  return snapshot;
}
