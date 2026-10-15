import { ArrowRightIcon, Building2Icon, HammerIcon, HomeIcon, SofaIcon, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { BUILD_TYPES } from '@/lib/data/home';
import { SectionHeader } from './SectionHeader';

const ICONS: Record<(typeof BUILD_TYPES)[number]['key'], LucideIcon> = {
  residential: HomeIcon,
  commercial: Building2Icon,
  interiors: SofaIcon,
  renovation: HammerIcon,
};

/** §6.1 #3 */
export function WhatWeBuild() {
  return (
    <section aria-labelledby="what-we-build" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          id="what-we-build"
          eyebrow="What we build"
          title="One team from foundation to finish"
          text="Pick what you’re planning — we’ll show you how we’d build it."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUILD_TYPES.map(({ key, title, href, text }, i) => {
            const Icon = ICONS[key];
            return (
              <Reveal key={key} delay={i * 80}>
                <Link
                  href={href}
                  className="group flex h-full flex-col gap-3 rounded-(--radius-card) border border-line bg-white p-6 transition-shadow hover:border-brand/40 hover:shadow-md"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-soft">
                    <Icon className="size-6 text-brand-dark" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-[0.9375rem] text-ink/70">{text}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-dark">
                    Learn more
                    <ArrowRightIcon
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
