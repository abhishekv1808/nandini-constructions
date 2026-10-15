import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Nandini Constructions lockup: the real building + "NC" mark (public/brand/nc-mark.png, cropped
 * from the client's logo) with the name set like the logo's banner — uppercase indigo with the
 * sky-blue underline. On dark backgrounds the mark sits on a white tile (the artwork is indigo).
 */
export function Logo({
  name,
  tone = 'dark',
  className,
}: {
  name: string;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      className={cn('inline-flex min-h-11 items-center gap-2 sm:gap-2.5', className)}
    >
      <span className={cn('shrink-0', tone === 'light' && 'rounded-lg bg-white p-1')}>
        <Image
          src="/brand/nc-mark.png"
          alt=""
          width={268}
          height={256}
          priority={tone === 'dark'}
          className="h-10 w-auto sm:h-11"
        />
      </span>
      <span className="flex flex-col gap-1">
        <span
          className={cn(
            'max-w-[6.75rem] font-heading text-[0.8125rem] leading-[1.05] font-extrabold tracking-wide uppercase sm:max-w-none sm:text-[0.9375rem]',
            tone === 'dark' ? 'text-charcoal' : 'text-white',
          )}
        >
          {name}
        </span>
        <span aria-hidden="true" className="h-[3px] w-full rounded-full bg-sky" />
      </span>
    </Link>
  );
}
