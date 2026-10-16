import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type LogoSize = 'default' | 'lg' | 'xl';

/**
 * Nandini Constructions lockup: the real building + "NC" mark (public/brand/nc-mark.png, cropped
 * from the client's logo) with the name set like the logo's banner — uppercase indigo with the
 * sky-blue underline. On dark backgrounds the mark sits on a white tile (the artwork is indigo).
 */
export function Logo({
  name,
  tone = 'dark',
  size = 'default',
  className,
}: {
  name: string;
  tone?: 'dark' | 'light';
  size?: LogoSize;
  className?: string;
}) {
  const isLarge = size === 'lg' || size === 'xl';

  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      className={cn(
        'inline-flex min-h-11 items-center transition-opacity hover:opacity-95',
        isLarge ? 'gap-3 sm:gap-4' : 'gap-2.5 sm:gap-3 md:gap-3.5',
        className,
      )}
    >
      <span
        className={cn(
          'shrink-0',
          tone === 'light' &&
            (isLarge
              ? 'rounded-xl bg-white p-2 shadow-sm sm:rounded-2xl sm:p-2.5'
              : 'rounded-xl bg-white p-1.5 shadow-xs'),
        )}
      >
        <Image
          src="/brand/nc-mark.png"
          alt=""
          width={268}
          height={256}
          priority={tone === 'dark'}
          className={cn('w-auto object-contain', isLarge ? 'h-14 sm:h-16 md:h-20' : 'h-10 sm:h-12 md:h-14')}
        />
      </span>
      <span className={cn('flex flex-col', isLarge ? 'gap-1.5 sm:gap-2' : 'gap-1 sm:gap-1.5')}>
        <span
          className={cn(
            'font-heading leading-[1.05] font-black tracking-wide uppercase',
            isLarge ? 'text-lg sm:text-xl md:text-2xl' : 'text-[0.8125rem] sm:text-[1.0625rem] md:text-lg',
            tone === 'dark' ? 'text-charcoal' : 'text-white',
          )}
        >
          {name}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'w-full rounded-full bg-sky',
            isLarge ? 'h-[4px] sm:h-[5px]' : 'h-[3.5px] md:h-[4px]',
          )}
        />
      </span>
    </Link>
  );
}
