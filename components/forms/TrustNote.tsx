import { LockIcon, PhoneCallIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { hasValue } from '@/components/site/Placeholder';
import type { SiteConfig } from '@/types/site-config';
import { cn } from '@/lib/utils';

/** §4.8 — trust next to every form: Google rating (once real), response promise, privacy line. */
export function TrustNote({
  config,
  tone = 'light',
  inline = false,
}: {
  config: SiteConfig;
  tone?: 'light' | 'dark';
  /** One wrapping row instead of three lines (hero quote bar). */
  inline?: boolean;
}) {
  const muted = tone === 'dark' ? 'text-white/70' : 'text-ink/65';
  return (
    <div
      className={cn('text-xs', inline ? 'flex flex-wrap items-center gap-x-5 gap-y-2' : 'space-y-2', muted)}
    >
      {hasValue(config.googleRating) && (
        <p className="flex items-center gap-2">
          <StarIcon className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
          <span>
            <strong className="font-semibold">{config.googleRating.value.toFixed(1)} / 5</strong> on Google
          </span>
        </p>
      )}
      <p className="flex items-center gap-2">
        <PhoneCallIcon className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
        <span>No spam — our team calls you back to discuss your plot.</span>
      </p>
      <p className="flex items-center gap-2">
        <LockIcon className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
        <span>
          We only use your details to contact you about your project.{' '}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy policy
          </Link>
        </span>
      </p>
    </div>
  );
}
