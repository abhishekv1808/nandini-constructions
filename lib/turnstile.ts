import 'server-only';

export type TurnstileResult = { ok: boolean; skipped: boolean };

/**
 * Cloudflare Turnstile check (§7.4). PLACEHOLDER until Phase 6 adds the widget + keys: with no
 * TURNSTILE_SECRET_KEY configured, verification is skipped (and reported as skipped) so the
 * form can be exercised locally. Once the secret is set, a missing/invalid token fails.
 */
export async function verifyTurnstile(
  token: FormDataEntryValue | null,
  ip?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  if (typeof token !== 'string' || !token) return { ok: false, skipped: false };

  const body = new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return { ok: data.success === true, skipped: false };
  } catch {
    return { ok: false, skipped: false };
  }
}
