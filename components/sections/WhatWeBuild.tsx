import {
  ArrowUpRightIcon,
  Building2Icon,
  HammerIcon,
  HomeIcon,
  SofaIcon,
  type LucideIcon,
} from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { BUILD_TYPES } from '@/lib/data/home';
import { TIERS, formatRate } from '@/lib/data/packages';
import { cn } from '@/lib/utils';
import residentialImg from '@/public/elevation_images/nandiniconstructions_1705371358_3281215235066975876_49712033359.jpg';
import interiorImg from '@/public/instagram/Dci4hWgOthf.jpg';
import { SectionHeader } from './SectionHeader';

type BuildKey = (typeof BUILD_TYPES)[number]['key'];

const ICONS: Record<BuildKey, LucideIcon> = {
  residential: HomeIcon,
  commercial: Building2Icon,
  interiors: SofaIcon,
  renovation: HammerIcon,
};

/** Real client imagery: a Nandini elevation render and an interior from their Instagram. */
const PHOTOS: Partial<Record<BuildKey, { src: StaticImageData; alt: string; position: string }>> = {
  residential: {
    src: residentialImg,
    alt: 'Two-storey corner home elevation with wood-finish balcony frame and terrace garden, designed by Nandini Constructions',
    position: 'object-[50%_35%]',
  },
  interiors: {
    src: interiorImg,
    alt: 'Bedroom interior by Nandini Constructions with wood-slat ceiling, backlit TV unit and wardrobe',
    position: 'object-[50%_72%]',
  },
};

/** Bento placement per card (lg: 4 columns × 2 rows). */
const LAYOUT: Record<BuildKey, string> = {
  residential: 'md:col-span-2 lg:row-span-2 min-h-[26rem] md:min-h-[30rem]',
  interiors: 'md:col-span-2 min-h-[20rem]',
  commercial: 'min-h-[17rem]',
  renovation: 'min-h-[17rem]',
};

const fromRate = Math.min(...TIERS.map((t) => t.ratePerSqft));

/** Bento reading order: the two photo cards first, so the grid packs into 2 rows on desktop. */
const ORDER: BuildKey[] = ['residential', 'interiors', 'commercial', 'renovation'];
const CARDS = [...BUILD_TYPES].sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key));

function Chips({ items, tone }: { items: readonly string[]; tone: 'photo' | 'dark' | 'light' }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Includes">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold',
            tone === 'photo' && 'bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm',
            tone === 'dark' && 'bg-white/10 text-white/90',
            tone === 'light' && 'bg-sand text-ink/75',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function CardArrow({ tone }: { tone: 'photo' | 'dark' | 'light' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:rotate-45',
        tone === 'light'
          ? 'bg-ink text-white group-hover:bg-brand'
          : 'bg-white text-ink group-hover:bg-brand group-hover:text-white',
      )}
    >
      <ArrowUpRightIcon className="size-5" strokeWidth={1.75} />
    </span>
  );
}

/** §6.1 #3 — bento of the four services; photo cards use real client imagery. */
export function WhatWeBuild() {
  return (
    <section aria-labelledby="what-we-build" className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          id="what-we-build"
          eyebrow="What we build"
          title="One team from foundation to finish"
          text="Pick what you’re planning — we’ll show you how we’d build it."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(17rem,auto))] lg:gap-5">
          {CARDS.map(({ key, title, href, text, items }, i) => {
            const Icon = ICONS[key];
            const photo = PHOTOS[key];
            const tone = photo ? 'photo' : key === 'commercial' ? 'dark' : 'light';

            return (
              <Reveal key={key} delay={i * 80} className={cn('flex', LAYOUT[key])}>
                <Link
                  href={href}
                  className={cn(
                    'group relative isolate flex w-full flex-col overflow-hidden rounded-[20px] p-6 transition-shadow duration-300 hover:shadow-xl md:p-7',
                    tone === 'dark' && 'bg-charcoal text-white',
                    tone === 'light' && 'border border-line bg-white hover:border-brand/40',
                    tone === 'photo' && 'justify-end bg-ink text-white',
                  )}
                >
                  {photo && (
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className={cn(
                          '-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.04]',
                          photo.position,
                        )}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(23,17,61,0)_30%,rgba(23,17,61,0.55)_60%,rgba(23,17,61,0.92)_100%)]"
                      />
                    </>
                  )}

                  {tone === 'dark' && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_0%,rgba(9,147,216,0.35),transparent_60%)]"
                    />
                  )}

                  {/* Top row: icon (+ starting price on residential) */}
                  <div
                    className={cn(
                      'flex items-start justify-between gap-3',
                      photo && 'absolute inset-x-6 top-6 md:inset-x-7 md:top-7',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-12 place-items-center rounded-2xl',
                        tone === 'photo' && 'bg-white/90 text-charcoal backdrop-blur-sm',
                        tone === 'dark' && 'bg-white/10 text-sky-light',
                        tone === 'light' && 'bg-brand-soft text-brand-dark',
                      )}
                    >
                      <Icon className="size-6" strokeWidth={1.5} aria-hidden />
                    </span>
                    {key === 'residential' && (
                      <span className="rounded-full bg-brand px-3.5 py-1.5 text-sm font-bold text-white shadow-md">
                        From {formatRate(fromRate)}
                      </span>
                    )}
                  </div>

                  <div className={cn('flex flex-1 flex-col gap-3', photo ? 'flex-none' : 'mt-6')}>
                    <h3
                      className={cn(
                        'font-extrabold',
                        key === 'residential' ? 'text-2xl md:text-3xl' : 'text-xl',
                        tone !== 'light' && 'text-white',
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={cn(
                        'max-w-md text-[0.9375rem]',
                        tone === 'light' ? 'text-ink/70' : 'text-white/80',
                      )}
                    >
                      {text}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-2">
                      <Chips items={items} tone={tone} />
                      <CardArrow tone={tone} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
