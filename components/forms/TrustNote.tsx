import { LockIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { ConfirmChip, Placeholder } from '@/components/site/Placeholder';
import type { SiteConfig } from '@/types/site-config';
import { cn } from '@/lib/utils';

/** §4.8 — trust next to every form: Google rating, response promise, privacy line. */
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
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <StarIcon className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
        <span>Google rating</span>
        <Placeholder field={config.googleRating} tone={tone}>
          {(r) => <strong className="font-semibold">{r.toFixed(1)} / 5</strong>}
        </Placeholder>
      </p>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        No spam — we call you back quickly{' '}
        <ConfirmChip label="CONFIRM: response time (e.g. 30 min)" tone={tone} />
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
