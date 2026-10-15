import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type SplitHeadingProps = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** One emotional word rendered in Instrument Serif italic (§3.3), matched case-insensitively. */
  accent?: string;
  /** Hero mode: CSS animation from first paint instead of waiting for viewport entry. */
  immediate?: boolean;
  className?: string;
  accentClassName?: string;
  id?: string;
};

const normalise = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

/**
 * Word-stagger heading. The real text lives in an sr-only span (read once, as a sentence, and
 * indexed by crawlers); the animated words are aria-hidden. Server Component, zero JS: the
 * staggered entrance is pure CSS keyed off `--i`.
 */
export function SplitHeading({
  text,
  as: Tag = 'h2',
  accent,
  immediate = false,
  className,
  accentClassName,
  id,
}: SplitHeadingProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const accentKey = accent ? normalise(accent) : null;

  return (
    <Tag
      id={id}
      className={className}
      data-split={immediate ? 'immediate' : ''}
      {...(immediate ? {} : { 'data-reveal': '' })}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span
              className={cn(
                'split-word',
                accentKey &&
                  normalise(word) === accentKey && ['font-accent font-normal italic', accentClassName],
              )}
              style={{ '--i': i } as CSSProperties}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
