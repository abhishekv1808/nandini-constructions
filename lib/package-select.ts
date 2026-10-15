'use client';

import { useEffect } from 'react';
import type { TierSlug } from './data/packages';

const SLUGS: readonly string[] = ['rental', 'medium', 'premium'];

/**
 * "Get quote / Calculate cost for this package" links are plain anchors (work without JS) with
 * `data-select-package="medium"`. Forms on the page listen for those clicks and pre-select the
 * package — no global state, no URL params (keeps the home page static).
 */
export function usePackageSelectClicks(onSelect: (slug: TierSlug) => void) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>('[data-select-package]');
      const slug = el?.dataset.selectPackage;
      if (slug && SLUGS.includes(slug)) onSelect(slug as TierSlug);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [onSelect]);
}
