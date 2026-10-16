'use client';

import { ArrowRightIcon, PhoneIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ContactLink } from '@/lib/contact-links';
import { subscribeScroll } from '@/lib/motion/scroll-store';
import { QUOTE_HREF } from '@/lib/site-nav';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from './icons';

const SHOW_AFTER_PX = 120;

/**
 * Mobile bottom bar (§4.2): Call | WhatsApp | Get Free Quote (the widest, brand-red cell).
 * - Appears after a short scroll, so the hero stays clean on first paint.
 * - "Get Free Quote" jumps to the page's own `#quote` form when there is one (else the home form).
 * - Steps aside while a lead form is on screen, so it never covers a submit button.
 */
export function MobileCtaBar({ call, whatsapp }: { call: ContactLink; whatsapp: ContactLink }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [quoteHref, setQuoteHref] = useState(QUOTE_HREF);

  useEffect(() => subscribeScroll(({ y }) => setScrolled(y > SHOW_AFTER_PX)), []);

  useEffect(() => {
    setQuoteHref(document.getElementById('quote') ? '#quote' : QUOTE_HREF);

    const forms = document.querySelectorAll('form[data-lead-form]');
    if (!forms.length) {
      setFormInView(false);
      return;
    }
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setFormInView(visible.size > 0);
      },
      // Only counts once a form reaches the lower part of the screen, where the bar sits.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
    );
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, [pathname]);

  const visible = scrolled && !formInView;
  const cell =
    'flex min-h-[3.75rem] flex-col items-center justify-center gap-0.5 text-xs font-semibold [&_svg]:size-5';

  return (
    <nav
      aria-label="Quick contact"
      inert={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-(--z-cta) grid grid-cols-[1fr_1fr_2fr] items-stretch gap-2 border-t border-line bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(23,17,61,0.10)] backdrop-blur transition-transform duration-300 md:hidden',
        visible ? 'translate-y-0' : 'translate-y-[110%]',
      )}
    >
      <a href={call.href} className={cn(cell, 'rounded-xl text-ink active:bg-sand')}>
        <PhoneIcon strokeWidth={1.75} aria-hidden />
        Call
      </a>
      <a
        href={whatsapp.href}
        className={cn(cell, 'rounded-xl text-success active:bg-sand')}
        {...(whatsapp.external ? { target: '_blank', rel: 'noopener' } : {})}
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        href={quoteHref}
        className="flex min-h-[3.25rem] items-center justify-center gap-2 self-center rounded-full bg-brand px-4 text-[0.9375rem] font-bold text-white shadow-md active:bg-brand-dark"
      >
        Get Free Quote
        <ArrowRightIcon className="size-4" strokeWidth={2} aria-hidden />
      </a>
    </nav>
  );
}
