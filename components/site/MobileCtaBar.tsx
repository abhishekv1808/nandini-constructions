'use client';

import { CalculatorIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { ContactLink } from '@/lib/contact-links';
import { subscribeScroll } from '@/lib/motion/scroll-store';
import { QUOTE_HREF } from '@/lib/site-nav';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from './icons';

const SHOW_AFTER_PX = 300;

/** Mobile-only bottom bar: Call | WhatsApp | Get Quote, after 300px of scroll (§4.2). */
export function MobileCtaBar({ call, whatsapp }: { call: ContactLink; whatsapp: ContactLink }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => subscribeScroll(({ y }) => setVisible(y > SHOW_AFTER_PX)), []);

  const cell =
    'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.8125rem] font-semibold [&_svg]:size-5';

  return (
    <nav
      aria-label="Quick contact"
      inert={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-(--z-cta) flex border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(20,23,28,0.08)] transition-transform duration-300 md:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <a href={call.href} className={cn(cell, 'text-ink')}>
        <PhoneIcon strokeWidth={1.5} aria-hidden />
        Call
      </a>
      <a
        href={whatsapp.href}
        className={cn(cell, 'border-x border-line text-success')}
        {...(whatsapp.external ? { target: '_blank', rel: 'noopener' } : {})}
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <Link href={QUOTE_HREF} className={cn(cell, 'bg-brand text-white')}>
        <CalculatorIcon strokeWidth={1.5} aria-hidden />
        Get Quote
      </Link>
    </nav>
  );
}
