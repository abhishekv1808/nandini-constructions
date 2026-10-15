'use client';

import { MenuIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navLinkClass,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { ContactLink } from '@/lib/contact-links';
import { PRIMARY_NAV, QUOTE_HREF, SERVICES } from '@/lib/site-nav';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from './icons';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [before, after] = [PRIMARY_NAV.slice(0, 2), PRIMARY_NAV.slice(2)];

  const link = (item: (typeof PRIMARY_NAV)[number]) => (
    <NavigationMenuItem key={item.href}>
      <NavigationMenuLink asChild active={isActive(pathname, item.href)}>
        <Link href={item.href} className={navLinkClass}>
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  return (
    <NavigationMenu className={className} aria-label="Main">
      <NavigationMenuList>
        {before.map(link)}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger data-active={isActive(pathname, '/services') ? '' : undefined}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-72 rounded-2xl border border-line bg-white p-2 shadow-lg">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <NavigationMenuLink asChild active={isActive(pathname, service.href)}>
                    <Link
                      href={service.href}
                      className="flex min-h-11 items-center rounded-xl px-3 text-[0.9375rem] font-medium text-ink hover:bg-sand data-[active]:text-brand-dark"
                    >
                      {service.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
              <li className="mt-1 border-t border-line pt-1">
                <NavigationMenuLink asChild>
                  <Link
                    href="/services"
                    className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-brand-dark hover:bg-sand"
                  >
                    All services →
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {after.map(link)}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type MobileNavProps = { className?: string; call: ContactLink; whatsapp: ContactLink };

export function MobileNav({ className, call, whatsapp }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const item = (href: string, label: string) => (
    <li key={href}>
      <Link
        href={href}
        onClick={close}
        aria-current={isActive(pathname, href) ? 'page' : undefined}
        className={cn(
          'flex min-h-12 items-center rounded-xl px-3 font-medium text-ink hover:bg-sand',
          'aria-[current=page]:bg-brand-soft/60 aria-[current=page]:text-brand-dark',
        )}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className} aria-label="Open menu">
          <MenuIcon strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <div className="border-b border-line px-5 pt-5 pb-4">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>
        </div>
        <nav aria-label="Mobile" className="flex-1 px-2 py-3">
          <ul>
            {item('/', 'Home')}
            {PRIMARY_NAV.slice(0, 2).map((l) => item(l.href, l.label))}
          </ul>
          <p className="mt-3 px-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Services
          </p>
          <ul>{SERVICES.map((l) => item(l.href, l.label))}</ul>
          <ul className="mt-3 border-t border-line pt-3">
            {PRIMARY_NAV.slice(2).map((l) => item(l.href, l.label))}
          </ul>
        </nav>
        <div className="grid gap-2 border-t border-line p-4">
          <Button asChild>
            <Link href={QUOTE_HREF} onClick={close}>
              Get Free Quote
            </Link>
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="secondary">
              <a href={call.href} onClick={close}>
                <PhoneIcon strokeWidth={1.5} /> Call
              </a>
            </Button>
            <Button asChild variant="whatsapp">
              <a
                href={whatsapp.href}
                onClick={close}
                {...(whatsapp.external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
