import { ArrowRightIcon, CalculatorIcon, StarIcon } from 'lucide-react';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { LeadForm } from '@/components/forms/LeadForm';
import { TrustNote } from '@/components/forms/TrustNote';
import { HouseSvg } from '@/components/scenes/HouseBuild/HouseSvg';
import { Placeholder } from '@/components/site/Placeholder';
import { Button } from '@/components/ui/button';
import type { SiteConfig } from '@/types/site-config';
import { HeroBackdrop } from './HeroBackdrop';

/**
 * §6.1 #1 Hero. Until real photos arrive (§3.4) the full-bleed visual is the finished isometric
 * house (tracked in docs/placeholder-assets.md). H1 renders at first paint via CSS; the form is a
 * Server Action form, so the CTA works before hydration. On ≥1024×760 the hero is sticky and the
 * stats band slides over it.
 */
export function Hero({ config }: { config: SiteConfig }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-sticky relative isolate overflow-hidden bg-ink text-white lg:min-h-[calc(100svh-var(--header-h))]"
    >
      <HeroBackdrop>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(9,147,216,0.30),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <HouseSvg
          decorative
          idPrefix="house-hero"
          className="absolute top-1/2 left-1/2 w-[150%] max-w-none -translate-x-[38%] -translate-y-[42%] opacity-30 md:w-[105%] md:-translate-x-[20%] md:opacity-40 lg:w-[78%] lg:-translate-x-[8%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(23,17,61,0.82)_45%,rgba(23,17,61,0.35)_100%)]" />
      </HeroBackdrop>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-16 md:px-6 md:pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:pb-24">
        <div className="space-y-6">
          <p className="text-sm font-semibold tracking-[0.16em] text-sky-light uppercase">
            Turnkey construction · Tumakuru
          </p>
          <SplitHeading
            as="h1"
            id="hero-title"
            immediate
            accent="home"
            text="Build your dream home in Tumakuru — at a fixed price, delivered on time."
            className="text-[2.25rem] leading-[1.06] font-extrabold text-white sm:text-5xl xl:text-6xl"
            accentClassName="text-sky-light"
          />
          <p className="max-w-xl text-lg text-white/80">
            One team from design and approvals to handover — with every material, brand and finish listed
            upfront in your package.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#hero-form">
                Get Free Quote <ArrowRightIcon strokeWidth={1.5} />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href="#cost-estimate">
                <CalculatorIcon strokeWidth={1.5} /> Calculate Cost
              </a>
            </Button>
          </div>
          <ul
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80"
            aria-label="Why homeowners trust us"
          >
            <li className="flex flex-wrap items-center gap-2">
              <StarIcon className="size-4 fill-amber-400 text-amber-400" aria-hidden />
              <span className="font-semibold text-white">Google rating</span>
              <Placeholder field={config.googleRating} tone="dark">
                {(r) => `${r.toFixed(1)} / 5`}
              </Placeholder>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white">Homes delivered</span>
              <Placeholder field={config.stats.projectsDelivered} tone="dark" />
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white">Years</span>
              <Placeholder field={config.stats.yearsExperience} tone="dark" />
            </li>
          </ul>
        </div>

        <div id="hero-form" className="rounded-[20px] bg-white p-5 text-ink shadow-2xl sm:p-7">
          <h2 className="text-xl font-extrabold">Get a free quote for your plot</h2>
          <p className="mt-1 mb-5 text-sm text-ink/70">
            Tell us about your plot — an engineer will call you back.
          </p>
          <LeadForm formType="hero" trust={<TrustNote config={config} />} />
        </div>
      </div>
    </section>
  );
}
