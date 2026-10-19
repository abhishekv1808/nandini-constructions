import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { HouseBuild, type BuildStage } from '@/components/scenes/HouseBuild/HouseBuild';
import { AreasGrid } from '@/components/sections/AreasGrid';
import { BrandMarquee } from '@/components/sections/BrandMarquee';
import { CalculatorTeaser } from '@/components/sections/CalculatorTeaser';
import { ElevationGallery } from '@/components/sections/ElevationGallery';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { InstagramMoments } from '@/components/sections/InstagramMoments';
import { PackageComparison } from '@/components/sections/packages/PackageComparison';
import { PackageSwitcher } from '@/components/sections/packages/PackageSwitcher';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { SectionCta } from '@/components/sections/SectionCta';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { StatsBand } from '@/components/sections/StatsBand';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { WhyNandini } from '@/components/sections/WhyNandini';
import { telLink, whatsappLink } from '@/lib/contact-links';
import { HOME_FAQS, HOUSE_STAGES, MATERIAL_BRANDS, PROCESS_STEPS, PROMISES } from '@/lib/data/home';
import { KEY_SPEC_KEYS, PACKAGE_TERMS, SPEC_CATEGORIES, TIERS, getSpecRow } from '@/lib/data/packages';
import { ELEVATIONS } from '@/lib/data/elevations';
import { INSTAGRAM_MOMENTS } from '@/lib/data/instagram';
import { getSiteConfig } from '@/lib/site-config';
import { SERVICE_AREAS_TENTATIVE } from '@/lib/site-nav';

export const metadata: Metadata = {
  title: { absolute: 'House Construction in Tumakuru at Fixed Package Prices | Nandini Constructions' },
  description:
    'Turnkey house construction in Tumakuru from ₹1,850/sq.ft. Rental, Medium and Premium packages with every material and brand listed upfront. Get a free quote for your plot.',
  alternates: { canonical: '/' },
};

/** CLAUDE.md §6.1 + §3.7 — data from the §8 package sheet and site_settings (no invented facts). */
export default async function HomePage() {
  const config = await getSiteConfig();
  const call = telLink(config.phone);
  const whatsapp = whatsappLink(config.whatsapp);
  const defaultTier = TIERS.find((t) => t.isPopular)?.slug ?? 'medium';

  const stages: BuildStage[] = HOUSE_STAGES.map((s) => ({
    title: s.title,
    text: s.text,
    materials: s.materials.map((key) => {
      const row = getSpecRow(key);
      return { label: row.label, values: row.values };
    }),
  }));
  const keySpecs = KEY_SPEC_KEYS.map((key) => getSpecRow(key));

  return (
    <>
      {/* ── 1. Who we are ─────────────────────────────────────────────── */}
      {/* Hero (sticky on large screens) + stats band sliding over it — charcoal */}
      <div className="relative">
        <Hero config={config} />
        <StatsBand config={config} />
      </div>

      {/* Client-supplied elevation renders, first thing after the hero — sand */}
      <ElevationGallery items={ELEVATIONS} />

      {/* What we build — white */}
      <WhatWeBuild />

      {/* Signature scene: watch your home rise — sand */}
      <HouseBuild
        stages={stages}
        tiers={TIERS.map(({ slug, shortName }) => ({ slug, shortName }))}
        defaultTier={defaultTier}
        skipTo="#packages"
      />

      {/* ── 2. What it costs ──────────────────────────────────────────── */}
      {/* Package switcher scene + full specifications — white */}
      <PackageSwitcher tiers={TIERS} keySpecs={keySpecs} />
      <section
        id="package-details"
        aria-labelledby="package-details-title"
        className="bg-white pt-4 pb-16 md:pb-24"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="package-details-title"
            eyebrow="Package details"
            title="Compare every specification"
            text="All three packages, line by line — straight from our package sheet."
          />
          <Reveal>
            <PackageComparison tiers={TIERS} categories={SPEC_CATEGORIES} collapsed />
          </Reveal>
          <Reveal className="mt-8 grid gap-6 rounded-(--radius-card) border border-line bg-sand p-5 md:grid-cols-2 md:p-8">
            <div>
              <h3 className="mb-3 text-lg font-bold">Terms & conditions</h3>
              <ol className="list-decimal space-y-1.5 pl-5 text-[0.9375rem] text-ink/80">
                {PACKAGE_TERMS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Good to know</h3>
              <p className="text-[0.9375rem] text-ink/80">
                Sump and overhead tank are included in every package. Rupee values are budgeted allowances —
                upgrade any item and pay only the difference.
              </p>
              <p className="text-[0.9375rem] text-ink/80">
                Items outside the package — such as a compound wall, electricity and water connections or
                plan-approval fees — are listed separately in your written quotation, so nothing comes as a
                surprise.
              </p>
            </div>
          </Reveal>
          <SectionCta kind="packages" text="See what every package includes and what each upgrade buys." />
        </div>
      </section>

      {/* Cost estimate, right after the prices — sand */}
      <section id="cost-estimate" aria-labelledby="cost-estimate-title" className="bg-sand py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="cost-estimate-title"
            eyebrow="Cost calculator"
            title="What will your home cost?"
            text="Pick a package and enter your built-up area for an instant estimate."
          />
          <Reveal>
            <CalculatorTeaser tiers={TIERS} defaultTier={defaultTier} />
          </Reveal>
        </div>
      </section>

      {/* ── 3. Why trust us ───────────────────────────────────────────── */}
      {/* Why Nandini — white */}
      <section id="why-nandini" aria-labelledby="why-nandini-title" className="bg-white py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            id="why-nandini-title"
            eyebrow="Why Nandini"
            title="Built on promises you can check"
            text="What you can expect from us, from agreement to handover."
          />
          <WhyNandini promises={PROMISES} />
          <SectionCta kind="quote" text="Get a fixed quote for your plot — free." />
        </div>
      </section>

      {/* How it works — sand */}
      <section id="how-it-works" aria-labelledby="how-it-works-title" className="bg-sand py-12 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <SectionHeader
            id="how-it-works-title"
            eyebrow="How it works"
            title="From first meeting to your keys"
            text="Six clear steps, with you in the loop at every one."
            align="center"
          />
          <ProcessTimeline steps={PROCESS_STEPS} />
          <SectionCta
            kind="engineer"
            call={call}
            text="Have questions about your plot? Talk to an engineer."
          />
        </div>
      </section>

      {/* Material brands from the package sheet — white */}
      <BrandMarquee groups={MATERIAL_BRANDS} />

      {/* ── 4. Real people, real homes ────────────────────────────────── */}
      {/* Family Celebrations + Testimonials stay off the page until real families' stories, photos and
          reviews (with consent) are supplied — the current drafts are illustrative, not real clients. */}

      {/* Ceremonies & site videos from Instagram (embed loads on tap) — sand */}
      <InstagramMoments moments={INSTAGRAM_MOMENTS} config={config} />

      {/* ── 5. Close ──────────────────────────────────────────────────── */}
      {/* FAQ — white · Areas (local SEO links) — sand */}
      <FaqSection faqs={HOME_FAQS} />
      <AreasGrid areas={SERVICE_AREAS_TENTATIVE} />

      {/* Final CTA (#quote) — charcoal */}
      <FinalCta config={config} tiers={TIERS} call={call} whatsapp={whatsapp} />
    </>
  );
}
