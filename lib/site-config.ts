import 'server-only';
import { unstable_cache } from 'next/cache';
import type { SiteConfig, SiteSettingsRow } from '@/types/site-config';
import { FALLBACK_SITE_CONFIG, mapSettingsRow } from './site-config-data';
import { createPublicClient } from './supabase/server';

/**
 * Business facts for every component (CLAUDE.md §1.1, §7.1). Reads the single `site_settings`
 * row; falls back to visibly-marked placeholders when Supabase isn't configured or the row is
 * missing. Cached under the `settings` tag — admin edits call revalidateTag('settings').
 */
export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    const supabase = createPublicClient();
    if (!supabase) return FALLBACK_SITE_CONFIG;

    const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (error || !data) {
      if (error) console.error('[site-config] falling back to placeholders:', error.message);
      return FALLBACK_SITE_CONFIG;
    }
    return mapSettingsRow(data as SiteSettingsRow);
  },
  ['site-config'],
  { tags: ['settings'], revalidate: 3600 },
);
