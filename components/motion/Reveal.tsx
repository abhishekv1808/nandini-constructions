import type { CSSProperties, ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Start offset in px (default 16, per §3.6). */
  y?: number;
  x?: number;
  /** ms */
  delay?: number;
  /** ms (default 500) */
  duration?: number;
  className?: string;
  id?: string;
};

/**
 * Fade/translate on enter, once. A Server Component: the single global observer started by
 * ScrollProvider flips `data-revealed`. Without JS or with reduced motion the content is simply
 * visible. Don't wrap above-the-fold content (it would wait for hydration) — use
 * <SplitHeading immediate> in heroes instead.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  y = 16,
  x = 0,
  delay = 0,
  duration,
  className,
  id,
}: RevealProps) {
  const style = {
    '--reveal-y': `${y}px`,
    '--reveal-x': `${x}px`,
    '--reveal-delay': `${delay}ms`,
    ...(duration ? { '--reveal-duration': `${duration}ms` } : {}),
  } as CSSProperties;

  return (
    <Tag data-reveal="" className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}
