import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export type Crumb = { name: string; href: string };

/** Visible breadcrumb + BreadcrumbList JSON-LD (§10). The last crumb is the current page. */
export function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }}
      />
      <ol
        className={cn(
          'flex flex-wrap items-center gap-1 text-sm',
          tone === 'dark' ? 'text-white/65' : 'text-ink/60',
        )}
      >
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className={tone === 'dark' ? 'text-white' : 'text-ink'}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href}
                    className={cn(
                      'underline-offset-4 hover:underline',
                      tone === 'dark' ? 'hover:text-white' : 'hover:text-ink',
                    )}
                  >
                    {c.name}
                  </Link>
                  <ChevronRightIcon className="size-4" strokeWidth={1.5} aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
