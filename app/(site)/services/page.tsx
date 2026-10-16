import { ArrowRightIcon, LayersIcon, PhoneIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { FinalCta } from '@/components/sections/FinalCta';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { SectionCta } from '@/components/sections/SectionCta';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { telLink, whatsappLink } from '@/lib/contact-links';
import { PROCESS_STEPS } from '@/lib/data/home';
import { TIERS } from '@/lib/data/packages';
import { SERVICES_DATA } from '@/lib/data/services';
import { getSiteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Construction Services in Tumakuru — Homes, Commercial, Interiors',
  description:
    'Construction services in Tumakuru (Tumkur): house construction, commercial buildings, interiors, renovation and floor additions, and architectural design.',
  alternates: { canonical: '/services' },
};

/** CLAUDE.md §6.7 — services overview. */
export default async function ServicesPage() {
  const config = await getSiteConfig();
  const call = telLink(config.phone);
  const whatsapp = whatsappLink(config.whatsapp);

  return (
    <>
      <section
        aria-labelledby="services-title"
        className="relative isolate overflow-hidden bg-ink text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(9,147,216,0.28),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="mx-auto max-w-7xl space-y-6 px-4 pt-6 pb-14 md:px-6 md:pt-8 md:pb-20">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services' },
            ]}
          />
          <p className="text-xs font-semibold tracking-[0.14em] text-sky-light uppercase md:text-sm md:tracking-[0.16em]">
            Our services · Tumakuru
          </p>
          <SplitHeading
            as="h1"
            id="services-title"
            immediate
            accent="build,"
            text="Whatever you’re planning to build, one team takes it from drawing to handover."
            className="max-w-4xl text-[1.875rem] leading-[1.1] font-extrabold text-white sm:text-5xl xl:text-[3.5rem]"
            accentClassName="text-sky-light"
          />
          <p className="max-w-2xl text-base text-white/80 sm:text-lg">
            Homes, commercial buildings, interiors, renovations and architectural design — planned, built and
            finished by Nandini Constructions.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="max-sm:h-12 max-sm:text-base">
              <a href="#quote">
                Get Free Quote <ArrowRightIcon strokeWidth={1.5} />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-light" className="max-sm:h-12 max-sm:text-base">
              <Link href="/packages">
                <LayersIcon strokeWidth={1.5} /> See home packages
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="all-services-title" className="bg-sand py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="all-services-title"
            eyebrow="What we do"
            title="Five services, one accountable team"
            text="Pick a service to see what’s included and how we work."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-[20px] bg-charcoal p-6 text-white md:p-7">
                <div className="space-y-3">
                  <p className="text-sm font-semibold tracking-[0.14em] text-sky-light uppercase">
                    Not sure?
                  </p>
                  <h3 className="text-2xl font-extrabold text-white">Tell us what you’re planning</h3>
                  <p className="text-white/75">
                    Share your plot or building details and we’ll suggest the right service and next step.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                  <Button asChild>
                    <a href="#quote">
                      Get Free Quote <ArrowRightIcon strokeWidth={1.5} />
                    </a>
                  </Button>
                  <Button asChild variant="outline-light">
                    <a href={call.href}>
                      <PhoneIcon strokeWidth={1.5} /> Call us
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-process-title" className="bg-white py-12 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <SectionHeader
            id="services-process-title"
            eyebrow="How it works"
            title="From first meeting to your keys"
            text="Six clear steps, with you in the loop at every one."
            align="center"
          />
          <ProcessTimeline steps={PROCESS_STEPS} />
          <SectionCta kind="engineer" call={call} text="Not sure which service you need? Talk to us." />
        </div>
      </section>

      <FinalCta
        config={config}
        tiers={TIERS}
        call={call}
        whatsapp={whatsapp}
        title="Tell us what you’re planning"
      />
    </>
  );
}
