import { ArrowRightIcon, CalculatorIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { LeadForm } from '@/components/forms/LeadForm';
import { TrustNote } from '@/components/forms/TrustNote';
import { ELEVATIONS } from '@/lib/data/elevations';
import { TIERS, formatRate } from '@/lib/data/packages';
import type { SiteConfig } from '@/types/site-config';
import { HeroBackdrop } from './HeroBackdrop';

/** Client-supplied render (no client name on it); its soft sky fades into the white hero. */
const HERO_ELEVATION = ELEVATIONS.find((e) => e.key === 'stone-red-jaali') ?? ELEVATIONS[0]!;
const fromRate = formatRate(Math.min(...TIERS.map((t) => t.ratePerSqft)));

/**
 * §6.1 #1 Hero — light and simple. Desktop: the elevation fills the right ~60% and fades into
 * white behind the headline; the short lead form runs as a quote bar along the bottom. Phones: the
 * elevation is a banner above the text. H1 paints immediately (CSS); the form is a Server Action,
 * so the CTA works before hydration. On ≥1024×760 the hero is sticky and the stats band slides over.
 */
export function Hero({ config }: { config: SiteConfig }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-sticky relative isolate overflow-hidden bg-white lg:flex lg:min-h-[calc(100svh-var(--header-h))] lg:flex-col lg:justify-center"
    >
      {/* Elevation: banner on phones, right-hand background on desktop */}
      <HeroBackdrop
        maxShade={0.35}
        className="relative aspect-[16/11] sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:aspect-auto lg:w-[62%]"
      >
        <Image
          src={HERO_ELEVATION.image}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[50%_12%] lg:object-[50%_30%]"
        />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.92)_12%,rgba(255,255,255,0.45)_30%,rgba(255,255,255,0)_55%)] lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/70 to-transparent lg:h-1/4 lg:from-white/60 lg:via-transparent" />
        <p className="absolute right-4 bottom-4 hidden rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink/80 shadow-sm backdrop-blur-sm lg:top-[52%] lg:right-6 lg:bottom-auto lg:block">
          3D elevation by Nandini Constructions
        </p>
      </HeroBackdrop>

      {/* Packages teaser floating over the sky (desktop) */}
      <Link
        href="/packages"
        className="group absolute top-[12%] right-[5%] hidden items-center gap-4 rounded-2xl bg-white/90 py-3 pr-3 pl-5 shadow-xl ring-1 ring-black/5 backdrop-blur-md transition-transform hover:-translate-y-0.5 lg:flex"
      >
        <span>
          <span className="block text-xs font-semibold tracking-[0.12em] text-ink/60 uppercase">
            Turnkey packages
          </span>
          <span className="font-heading text-xl font-extrabold text-ink">from {fromRate}</span>
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-brand text-white transition-transform group-hover:translate-x-0.5">
          <ArrowRightIcon className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="sr-only">— see packages</span>
      </Link>

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="-mt-6 max-w-xl space-y-4 sm:-mt-10 sm:space-y-5 lg:mt-0 lg:max-w-[38rem] lg:pt-10 xl:max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-charcoal shadow-sm ring-1 ring-line">
            <span className="size-2 rounded-full bg-success" aria-hidden="true" />
            Turnkey home construction in Tumakuru
          </p>
          <SplitHeading
            as="h1"
            id="hero-title"
            immediate
            accent="home"
            text="Build your dream home in Tumakuru — at a fixed price, delivered on time."
            className="text-[1.875rem] leading-[1.1] font-extrabold text-ink sm:text-5xl xl:text-[3.5rem]"
            accentClassName="text-brand"
          />
          <p className="max-w-lg text-base text-ink/70 sm:text-lg">
            One friendly team from design to handover — with every material, brand and finish listed upfront.
          </p>
        </div>

        {/* Quick quote bar */}
        <div
          id="hero-form"
          className="mt-6 mb-10 rounded-[22px] bg-white/95 p-4 shadow-[0_24px_60px_-20px_rgba(23,17,61,0.35)] ring-1 ring-line backdrop-blur-md sm:p-6 lg:mt-12 lg:mb-14"
        >
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 className="text-base font-extrabold sm:text-lg">Get a free quote for your plot</h2>
            <a
              href="#cost-estimate"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline lg:min-h-0"
            >
              <CalculatorIcon className="size-4" strokeWidth={1.5} aria-hidden />
              Calculate your cost first
            </a>
          </div>
          <LeadForm formType="hero" layout="bar" trust={<TrustNote config={config} inline />} />
        </div>
      </div>
    </section>
  );
}
