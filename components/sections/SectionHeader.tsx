import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

/**
 * §3.5 section header pattern: eyebrow → H2 → one-line subtext.
 * `action` (e.g. a Pause or Follow button) sits beside the heading on desktop and below it on
 * mobile; the bottom margin lives on the whole row so content never butts against the subtext.
 */
export function SectionHeader({
  eyebrow,
  title,
  text,
  tone = 'light',
  align = 'left',
  id,
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  id?: string;
  action?: ReactNode;
  className?: string;
}) {
  const heading = (
    <Reveal
      className={cn(
        'max-w-2xl space-y-3',
        !action && 'mb-8 md:mb-12',
        align === 'center' && 'mx-auto text-center',
        !action && className,
      )}
    >
      <p
        className={cn(
          'text-xs font-semibold tracking-[0.14em] uppercase md:text-sm md:tracking-[0.16em]',
          tone === 'dark' ? 'text-sky-light' : 'text-brand-dark',
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'text-[1.625rem] leading-[1.15] font-extrabold sm:text-3xl md:text-4xl',
          tone === 'dark' && 'text-white',
        )}
      >
        {title}
      </h2>
      {text && (
        <p className={cn('text-base md:text-lg', tone === 'dark' ? 'text-white/75' : 'text-ink/70')}>
          {text}
        </p>
      )}
    </Reveal>
  );

  if (!action) return heading;

  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10',
        className,
      )}
    >
      {heading}
      <div className="flex shrink-0 flex-wrap items-center gap-2 md:pb-1">{action}</div>
    </div>
  );
}
