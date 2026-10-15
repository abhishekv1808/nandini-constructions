// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { startScrollStore, subscribeScroll } from '@/lib/motion/scroll-store';

describe('scroll store', () => {
  let stop: () => void = () => {};
  afterEach(() => stop());

  it('calls subscribers immediately and on rAF-batched scroll', () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 3000 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 });

    stop = startScrollStore();
    const listener = vi.fn();
    const unsubscribe = subscribeScroll(listener);
    expect(listener).toHaveBeenCalledTimes(1);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 1000 });
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersToNextFrame();

    expect(listener).toHaveBeenCalledTimes(2); // two events, one frame
    expect(listener).toHaveBeenLastCalledWith({ y: 1000, progress: 0.5, viewportHeight: 1000 });

    unsubscribe();
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersToNextFrame();
    expect(listener).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
