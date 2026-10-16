import { ArrowRightIcon, CalculatorIcon, LayersIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import type { ContactLink } from '@/lib/contact-links';
import { QUOTE_HREF } from '@/lib/site-nav';
import { cn } from '@/lib/utils';

type Kind = 'quote' | 'calculate' | 'engineer' | 'packages';

/** §4.7 — a CTA after every major section, alternating the three actions. */
export function SectionCta({
  kind,
  text,
  call,
  className,
}: {
  kind: Kind;
  text: string;
  call?: ContactLink;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'mt-12 flex flex-col items-start gap-4 rounded-(--radius-card) border border-line bg-sand p-5 sm:flex-row sm:items-center sm:justify-between md:p-6',
        className,
      )}
    >
      <p className="font-heading text-lg font-bold text-ink">{text}</p>
      {kind === 'quote' && (
        <Button asChild>
          <Link href={QUOTE_HREF}>
            Get Free Quote <ArrowRightIcon strokeWidth={1.5} />
          </Link>
        </Button>
      )}
      {kind === 'calculate' && (
        <Button asChild>
          <a href="#cost-estimate">
            <CalculatorIcon strokeWidth={1.5} /> Calculate Cost
          </a>
        </Button>
      )}
      {kind === 'packages' && (
        <Button asChild>
          <Link href="/packages">
            <LayersIcon strokeWidth={1.5} /> Explore Packages
          </Link>
        </Button>
      )}
      {kind === 'engineer' && call && (
        <Button asChild>
          <a href={call.href}>
            <PhoneIcon strokeWidth={1.5} /> Talk to an Engineer
          </a>
        </Button>
      )}
    </Reveal>
  );
}
