import { ArrowRightIcon, CheckIcon, ChevronRightIcon, ListChecksIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { PackageQuiz } from '@/components/forms/PackageQuiz';
import { TrustNote } from '@/components/forms/TrustNote';
import { CalculatorTeaser } from '@/components/sections/CalculatorTeaser';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { AllowanceExplainer } from '@/components/sections/packages/AllowanceExplainer';
import { IncludedInAll } from '@/components/sections/packages/IncludedInAll';
import { PackageCard } from '@/components/sections/packages/PackageCard';
import { PackageComparison } from '@/components/sections/packages/PackageComparison';
import { UpgradePath } from '@/components/sections/packages/UpgradePath';
import { SectionCta } from '@/components/sections/SectionCta';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ConfirmChip } from '@/components/site/Placeholder';
import { Button } from '@/components/ui/button';
import { telLink, whatsappLink } from '@/lib/contact-links';
import { HOME_FAQS } from '@/lib/data/home';
import {
  INCLUDED_IN_ALL,
  PACKAGE_TERMS,
  RENTAL_NON_TENDERING_EXTRA_PER_SQFT,
  SPEC_CATEGORIES,
  TIERS,
  allowanceRows,
  formatRate,
} from '@/lib/data/packages';
import { getSiteConfig } from '@/lib/site-config';

const lowest = Math.min(...TIERS.map((t) => t.ratePerSqft));

export const metadata: Metadata = {
  title: 'Construction Packages & Cost per Sq.ft in Tumakuru',
  description: `House construction packages in Tumakuru (Tumkur) from ${formatRate(lowest)}: ${TIERS.map((t) => `${t.shortName} ${formatRate(t.ratePerSqft)}`).join(', ')}. Every cement, steel, door, tile and fitting brand listed upfront — compare all specs.`,
  alternates: { canonical: '/packages' },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** CLAUDE.md §6.2 — the core conversion page. All package data from §8 (lib/data/packages.ts). */
export default async function PackagesPage() {
  const config = await getSiteConfig();
  const call = telLink(config.phone);
  const whatsapp = whatsappLink(config.whatsapp);
  const popular = TIERS.find((t) => t.isPopular) ?? TIERS[0]!;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Packages', item: `${siteUrl}/packages` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Turnkey house construction',
      provider: { '@type': 'HomeAndConstructionBusiness', name: 'Nandini Constructions' },
      areaServed: { '@type': 'City', name: 'Tumakuru' },
      offers: TIERS.map((t) => ({
        '@type': 'Offer',
        name: t.name,
        description: t.tagline,
        url: `${siteUrl}/packages#tier-${t.slug}`,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: t.ratePerSqft,
          priceCurrency: 'INR',
          unitText: 'sq.ft (built-up area)',
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Hero */}
      <section
        aria-labelledby="packages-title"
        className="relative isolate overflow-hidden bg-ink text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(9,147,216,0.28),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-14 md:px-6 md:pt-8 md:pb-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
          <div className="space-y-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1 text-sm text-white/65">
                <li>
                  <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRightIcon className="size-4" strokeWidth={1.5} />
                </li>
                <li aria-current="page" className="text-white">
                  Packages
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold tracking-[0.14em] text-sky-light uppercase md:text-sm md:tracking-[0.16em]">
              Construction packages · Tumakuru
            </p>
            <SplitHeading
              as="h1"
              id="packages-title"
              immediate
              accent="upfront"
              text="Every material, brand and finish — listed upfront."
              className="text-[1.875rem] leading-[1.1] font-extrabold text-white sm:text-5xl xl:text-6xl"
              accentClassName="text-sky-light"
            />
            <p className="max-w-xl text-base text-white/80 sm:text-lg">
              Three turnkey packages from {formatRate(lowest)}. Compare cement, steel, doors, tiles, wiring
              and fittings line by line — so the price you agree is the home you get.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="max-sm:h-12 max-sm:text-base">
                <a href="#quote">
                  Get Free Quote <ArrowRightIcon strokeWidth={1.5} />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline-light" className="max-sm:h-12 max-sm:text-base">
                <a href="#compare">
                  <ListChecksIcon strokeWidth={1.5} /> Compare all specs
                </a>
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {['Sump & overhead tank included', '10 ft clear height', 'Allowances shown in ₹'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-sky-light" strokeWidth={2} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Packages" className="rounded-[20px] bg-white/[0.06] p-2 ring-1 ring-white/15">
            <ul className="divide-y divide-white/10">
              {TIERS.map((t) => (
                <li key={t.slug}>
                  <a
                    href={`#tier-${t.slug}`}
                    className="group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/[0.07] md:p-5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-heading text-lg font-extrabold text-white">{t.name}</span>
                        {t.isPopular && (
                          <span className="rounded-full bg-brand px-2 py-0.5 text-[0.6875rem] font-bold tracking-wide text-white uppercase">
                            Most popular
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-sm text-white/65">{t.tagline}</span>
                    </span>
                    <span className="text-right font-heading text-2xl font-extrabold text-white tabular-nums md:text-3xl">
                      ₹{t.ratePerSqft.toLocaleString('en-IN')}
                      <span className="block text-xs font-semibold text-white/60">per sq.ft</span>
                    </span>
                    <ChevronRightIcon
                      className="size-5 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Package cards */}
      <section id="choose" aria-labelledby="choose-title" className="bg-sand py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="choose-title"
            eyebrow="Choose your package"
            title="Three packages, one honest price per sq.ft"
            text="Pick the finish level that fits your home — every package is turnkey, from foundation to paint."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.slug} id={`tier-${t.slug}`} delay={i * 80}>
                <PackageCard tier={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* In every package */}
      <section aria-labelledby="included-title" className="bg-white py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="included-title"
            eyebrow="In every package"
            title="What you get, whichever package you pick"
            text="These come standard in Rental, Medium and Premium — part of the package rate, not add-ons."
          />
          <Reveal>
            <IncludedInAll items={INCLUDED_IN_ALL} tiers={TIERS} />
          </Reveal>
        </div>
      </section>

      {/* Upgrade path */}
      <section aria-labelledby="upgrades-title" className="bg-sand py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="upgrades-title"
            eyebrow="What the upgrade buys"
            title="Exactly what changes as you move up"
            text="Every specification that’s different from the package below — nothing hidden in the price gap."
          />
          <Reveal>
            <UpgradePath tiers={TIERS} />
          </Reveal>
          <SectionCta
            kind="calculate"
            text="See what each package would cost for your home."
            className="bg-white"
          />
        </div>
      </section>

      {/* Full comparison */}
      <section id="compare" aria-labelledby="compare-title" className="bg-white py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="compare-title"
            eyebrow="Full specifications"
            title="Compare every specification"
            text="All three packages, line by line — straight from our package sheet. Changed items are highlighted."
          />
          <Reveal>
            <PackageComparison tiers={TIERS} categories={SPEC_CATEGORIES} />
          </Reveal>
        </div>
      </section>

      {/* Quiz */}
      <section id="package-quiz" aria-labelledby="quiz-title" className="bg-sand py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="quiz-title"
            eyebrow="Not sure which package?"
            title="Find your package in three questions"
            text="Tell us what matters to you and we’ll point you to the right fit."
          />
          <Reveal>
            <PackageQuiz tiers={TIERS} defaultTier={popular.slug} trust={<TrustNote config={config} />} />
          </Reveal>
        </div>
      </section>

      {/* Allowances */}
      <section aria-labelledby="allowances-title" className="bg-white py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="allowances-title"
            eyebrow="How allowances work"
            title="₹ values are budgets you control"
            text="Doors, tiles, granite, windows and fittings come with a set allowance — upgrade freely, pay only the difference."
          />
          <Reveal>
            <AllowanceExplainer tier={popular} rows={allowanceRows()} />
          </Reveal>
        </div>
      </section>

      {/* Terms & exclusions */}
      <section aria-labelledby="terms-title" className="bg-sand py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="terms-title"
            eyebrow="The fine print"
            title="Terms, in plain words"
            text="What applies to every quotation — read it before you sign, not after."
          />
          <Reveal className="grid gap-5 md:grid-cols-2">
            <div className="rounded-(--radius-card) border border-line bg-white p-5 md:p-7">
              <h3 className="mb-3 text-lg font-bold">Terms & conditions</h3>
              <ol className="list-decimal space-y-2 pl-5 text-[0.9375rem] text-ink/80">
                {PACKAGE_TERMS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-4 rounded-(--radius-card) border border-line bg-white p-5 md:p-7">
              <h3 className="text-lg font-bold">Good to know</h3>
              <ul className="space-y-2 text-[0.9375rem] text-ink/80">
                <li>Sump and overhead tank are included in every package — not add-ons.</li>
                <li>
                  Rental package: ₹{RENTAL_NON_TENDERING_EXTRA_PER_SQFT}/sq.ft extra for non-tendering items
                  is listed separately in your quotation, never hidden in the rate.
                </li>
                <li>Rates are per sq.ft of total built-up area. Final quote after a site visit.</li>
              </ul>
              <div className="flex flex-col items-start gap-2">
                <ConfirmChip label="CONFIRM: exclusions (compound wall, electricity/water connections, approval fees)" />
                <ConfirmChip label="CONFIRM: what “non-tendering items” covers" />
                <ConfirmChip label="CONFIRM: are design, drawings & approvals included in the rate?" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cost estimate */}
      <section id="cost-estimate" aria-labelledby="cost-estimate-title" className="bg-white py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="cost-estimate-title"
            eyebrow="Cost calculator"
            title="What will your home cost?"
            text="Pick a package and enter your built-up area for an instant estimate."
          />
          <Reveal>
            <CalculatorTeaser tiers={TIERS} defaultTier={popular.slug} />
          </Reveal>
          <SectionCta
            kind="engineer"
            call={call}
            text="Want help choosing between packages? Talk to an engineer."
          />
        </div>
      </section>

      <FaqSection faqs={HOME_FAQS} />

      <FinalCta config={config} tiers={TIERS} call={call} whatsapp={whatsapp} />
    </>
  );
}
