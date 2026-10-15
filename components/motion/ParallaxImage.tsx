'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { MOBILE_QUERY } from '@/lib/motion/breakpoints';
import { PARALLAX_MAX_STRENGTH, clamp, elementViewportProgress, parallaxOffset } from '@/lib/motion/math';
import { subscribeScroll } from '@/lib/motion/scroll-store';
import { useReducedMotion } from '@/lib/motion/use-reduced-motion';
import { cn } from '@/lib/utils';

type ParallaxImageProps = Omit<ImageProps, 'fill' | 'width' | 'height' | 'className' | 'style'> & {
  /** Fraction of the frame height, capped at 0.08 (§3.7). */
  strength?: number;
  /** Frame classes — the frame must have a size (e.g. aspect-[16/9] or h-full). */
  className?: string;
  imageClassName?: string;
};

/**
 * Subtle y-offset parallax around next/image. The image is oversized by `strength` above and
 * below so translating never reveals a gap (no layout change, no CLS). Off below 768px and with
 * reduced motion; only listens while on screen.
 */
export function ParallaxImage({
  strength = PARALLAX_MAX_STRENGTH,
  className,
  imageClassName,
  alt,
  sizes = '100vw',
  ...imageProps
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const s = clamp(strength, 0, PARALLAX_MAX_STRENGTH);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer || reduced || window.matchMedia(MOBILE_QUERY).matches) return;

    let unsubscribe: (() => void) | null = null;
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !unsubscribe) {
        unsubscribe = subscribeScroll(({ viewportHeight }) => {
          const rect = frame.getBoundingClientRect();
          const progress = elementViewportProgress(rect.top, rect.height, viewportHeight);
          layer.style.transform = `translate3d(0, ${parallaxOffset(progress, rect.height, s)}px, 0)`;
        });
      } else if (!entry?.isIntersecting && unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    });
    io.observe(frame);

    return () => {
      io.disconnect();
      unsubscribe?.();
      layer.style.transform = '';
    };
  }, [reduced, s]);

  return (
    <div ref={frameRef} className={cn('relative overflow-hidden', className)}>
      <div
        ref={layerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${s * 100}%`, bottom: `-${s * 100}%` } as CSSProperties}
      >
        <Image {...imageProps} alt={alt} sizes={sizes} fill className={cn('object-cover', imageClassName)} />
      </div>
    </div>
  );
}
