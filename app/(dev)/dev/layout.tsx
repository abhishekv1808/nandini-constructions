import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { SiteShell } from '@/components/site/SiteShell';

export const metadata: Metadata = {
  title: 'Dev preview',
  robots: { index: false, follow: false },
};

/** Internal previews (§3.7). 404 in production unless ENABLE_DEV_PAGES=1. */
export default function DevLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_DEV_PAGES !== '1') notFound();
  return <SiteShell>{children}</SiteShell>;
}
