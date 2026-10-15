import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cookie-less anon client for public, cacheable reads (published content, settings). Safe inside
 * `unstable_cache`. Returns null until Supabase env vars exist (Phase 2), so callers fall back.
 * The cookie-aware client for admin/auth arrives with Phase 2/7.
 */
export function createPublicClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
