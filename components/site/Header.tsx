import { PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { Button } from '@/components/ui/button';
import { telLink, whatsappLink } from '@/lib/contact-links';
import { getSiteConfig } from '@/lib/site-config';
import { QUOTE_HREF } from '@/lib/site-nav';
import { DesktopNav, MobileNav } from './HeaderNav';
import { Logo } from './Logo';

/** Sticky header — "Get Free Quote" always visible, phone icon on every breakpoint (§4.1). */
export async function Header() {
  const config = await getSiteConfig();
  const call = telLink(config.phone);
  const whatsapp = whatsappLink(config.whatsapp);

  return (
    <header className="sticky top-0 z-(--z-header) h-(--header-h) border-b border-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-(--z-toast) focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-full max-w-7xl items-center gap-2 px-4 md:px-6">
        <Logo name={config.companyName} />
        <DesktopNav className="ml-6 hidden lg:flex" />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="icon" className="relative hidden text-ink md:inline-flex">
            <a href={call.href} aria-label={call.missing ? `Call us (${call.label})` : 'Call us'}>
              <PhoneIcon strokeWidth={1.5} />
              {call.missing && (
                <span className="absolute top-2 right-2 size-2 rounded-full bg-amber-500" aria-hidden />
              )}
            </a>
          </Button>
          <Button asChild size="sm" className="px-3 sm:px-5">
            <Link href={QUOTE_HREF}>
              <span className="sm:hidden">Get Quote</span>
              <span className="hidden sm:inline">Get Free Quote</span>
            </Link>
          </Button>
          <MobileNav className="lg:hidden" call={call} whatsapp={whatsapp} />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
