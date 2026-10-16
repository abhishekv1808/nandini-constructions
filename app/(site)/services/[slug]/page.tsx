import { ArrowRightIcon, CalculatorIcon, CheckIcon, PhoneIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { CalculatorTeaser } from '@/components/sections/CalculatorTeaser';
import { ElevationGallery } from '@/components/sections/ElevationGallery';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { PackageCard } from '@/components/sections/packages/PackageCard';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { SectionCta } from '@/components/sections/SectionCta';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { SERVICE_ICONS } from '@/components/sections/services/service-icons';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ConfirmChip } from '@/components/site/Placeholder';
import { Button } from '@/components/ui/button';
import { telLink, whatsappLink } from '@/lib/contact-links';
import { ELEVATIONS } from '@/lib/data/elevations';
import { TIERS } from '@/lib/data/packages';
import { SERVICES_DATA, getService } from '@/lib/data/services';
import { getSiteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Alternating section background, so any combination of optional sections stays striped. */
function Band({
  i,
  id,
  labelledBy,
  children,
}: {
  i: number;
  id?: string;
  labelledBy: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('py-12 md:py-24', i % 2 === 0 ? 'bg-white' : 'bg-sand')}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">{children}</div>
    </section>
  );
}

/** CLAUDE.md §6.7 — hero · what's included · packages (residential) · process · FAQs · lead form. */
export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const config = await getSiteConfig();
  const call = telLink(config.phone);
  const whatsapp = whatsappLink(config.whatsapp);
  const Icon = SERVICE_ICONS[service.slug];
  const popular = TIERS.find((t) => t.isPopular)?.slug ?? 'medium';
  const others = SERVICES_DATA.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.intro,
    serviceType: service.title,
    url: `${siteUrl}/services/${service.slug}`,
    provider: { '@type': 'HomeAndConstructionBusiness', name: 'Nandini Constructions' },
    areaServed: { '@type': 'City', name: 'Tumakuru' },
  };

  // Optional sections, in order; backgrounds alternate by position.
  const sections: ((i: number) => ReactNode)[] = [
    (i) => (
      <Band key="included" i={i} labelledBy="included-title">
        <SectionHeader
          id="included-title"
          eyebrow="What’s included"
          title={service.showPackages ? 'Everything from structure to finish' : 'What we take care of'}
          text={service.includedNote}
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.included.map((item, n) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(n % 3) * 60}
              className="flex gap-4 rounded-(--radius-card) border border-line bg-white p-5"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft font-heading text-sm font-extrabold text-brand-dark tabular-nums">
                {String(n + 1).padStart(2, '0')}
              </span>
              <div className="space-y-1">
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="text-[0.9375rem] text-ink/70">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        {service.confirm.length > 0 && (
          <div className="mt-6 flex flex-col items-start gap-2">
            {service.confirm.map((c) => (
              <ConfirmChip key={c} label={c} />
            ))}
          </div>
        )}
      </Band>
    ),
    ...(service.showPackages
      ? [
          (i: number) => (
            <Band key="packages" i={i} labelledBy="service-packages-title">
              <SectionHeader
                id="service-packages-title"
                eyebrow="Packages"
                title="Three packages, every brand listed"
                text="Pick a finish level — the rate per sq.ft covers everything in the package sheet."
                action={
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/packages">
                      Compare all specs <ArrowRightIcon strokeWidth={1.5} />
                    </Link>
                  </Button>
                }
              />
              <div className="grid gap-5 lg:grid-cols-3">
                {TIERS.map((t, n) => (
                  <Reveal key={t.slug} delay={n * 80}>
                    <PackageCard tier={t} />
                  </Reveal>
                ))}
              </div>
            </Band>
          ),
          (i: number) => (
            <Band key="cost" i={i} id="cost-estimate" labelledBy="cost-estimate-title">
              <SectionHeader
                id="cost-estimate-title"
                eyebrow="Cost calculator"
                title="What will your home cost?"
                text="Pick a package and enter your built-up area for an instant estimate."
              />
              <Reveal>
                <CalculatorTeaser tiers={TIERS} defaultTier={popular} />
              </Reveal>
            </Band>
          ),
        ]
      : []),
    ...(service.showElevations ? [() => <ElevationGallery key="elevations" items={ELEVATIONS} />] : []),
    (i) => (
      <Band key="process" i={i} labelledBy="service-process-title">
        <SectionHeader
          id="service-process-title"
          eyebrow="How it works"
          title="How we’ll work with you"
          text={`${service.process.length} clear steps, with you in the loop at every one.`}
          align="center"
        />
        <div className="mx-auto max-w-5xl">
          <ProcessTimeline steps={service.process} />
          <SectionCta
            kind="engineer"
            call={call}
            text="Have a question about your project? Talk to us."
            className={i % 2 === 0 ? undefined : 'bg-white'}
          />
        </div>
      </Band>
    ),
    ...(service.faqs ? [() => <FaqSection key="faq" faqs={service.faqs ?? []} />] : []),
    (i) => (
      <Band key="others" i={i} labelledBy="other-services-title">
        <SectionHeader id="other-services-title" eyebrow="More services" title="Other things we build" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Band>
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Hero */}
      <section aria-labelledby="service-title" className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(9,147,216,0.28),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-14 md:px-6 md:pt-8 md:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
          <div className="space-y-6">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: service.title, href: `/services/${service.slug}` },
              ]}
            />
            <p className="text-xs font-semibold tracking-[0.14em] text-sky-light uppercase md:text-sm md:tracking-[0.16em]">
              {service.eyebrow}
            </p>
            <SplitHeading
              as="h1"
              id="service-title"
              immediate
              accent={service.accent}
              text={service.h1}
              className="text-[1.875rem] leading-[1.1] font-extrabold text-white sm:text-5xl xl:text-[3.5rem]"
              accentClassName="text-sky-light"
            />
            <p className="max-w-xl text-base text-white/80 sm:text-lg">{service.intro}</p>
            {service.pricing && (
              <p className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-4 py-1.5 font-heading font-bold text-white ring-1 ring-white/20">
                  {service.pricing.label}
                </span>
                {service.pricing.confirm && <ConfirmChip label={service.pricing.confirm} tone="dark" />}
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="max-sm:h-12 max-sm:text-base">
                <a href="#quote">
                  Get Free Quote <ArrowRightIcon strokeWidth={1.5} />
                </a>
              </Button>
              {service.showPackages ? (
                <Button asChild size="lg" variant="outline-light" className="max-sm:h-12 max-sm:text-base">
                  <a href="#cost-estimate">
                    <CalculatorIcon strokeWidth={1.5} /> Calculate Cost
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" variant="outline-light" className="max-sm:h-12 max-sm:text-base">
                  <a href={call.href}>
                    <PhoneIcon strokeWidth={1.5} /> Call us
                  </a>
                </Button>
              )}
            </div>
          </div>

          {service.image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-white/15 lg:aspect-[5/4]">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={cn('object-cover', service.image.position)}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-16">
                <ul className="flex flex-wrap gap-1.5" aria-label="We build">
                  {service.types.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="rounded-[24px] bg-white/[0.06] p-6 ring-1 ring-white/15 md:p-8">
              <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-white/10 text-sky-light">
                <Icon className="size-7" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="mb-4 font-heading text-lg font-bold text-white">What we build</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.types.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-white/85">
                    <CheckIcon className="size-4 shrink-0 text-sky-light" strokeWidth={2} aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {sections.map((render, i) => render(i))}

      <FinalCta
        config={config}
        tiers={TIERS}
        call={call}
        whatsapp={whatsapp}
        serviceInterest={service.slug}
        title={
          service.showPackages ? 'Ready to build on your plot?' : `Planning ${service.title.toLowerCase()}?`
        }
      />
    </>
  );
}
