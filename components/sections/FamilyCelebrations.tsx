'use client';

import {
  ArrowRightIcon,
  CheckCircle2Icon,
  FlameIcon,
  HeartIcon,
  KeyRoundIcon,
  MapPinIcon,
  Maximize2Icon,
  QuoteIcon,
  ShieldCheckIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FAMILY_MOMENT_CATEGORIES,
  FAMILY_MOMENTS,
  type FamilyMoment,
  type FamilyMomentCategory,
} from '@/lib/data/family-moments';
import { QUOTE_HREF } from '@/lib/site-nav';
import { cn } from '@/lib/utils';
import { SectionCta } from './SectionCta';
import { SectionHeader } from './SectionHeader';

const CATEGORY_ICONS: Record<Exclude<FamilyMomentCategory, 'all'>, LucideIcon> = {
  housewarming: FlameIcon,
  handover: KeyRoundIcon,
  'family-life': HeartIcon,
  construction: ShieldCheckIcon,
};

export function FamilyCelebrations() {
  const [selectedCategory, setSelectedCategory] = useState<FamilyMomentCategory>('all');
  const [activeMoment, setActiveMoment] = useState<FamilyMoment | null>(null);

  const filteredMoments =
    selectedCategory === 'all'
      ? FAMILY_MOMENTS
      : FAMILY_MOMENTS.filter((m) => m.category === selectedCategory);

  const featuredMoment = filteredMoments[0] ?? FAMILY_MOMENTS[0];
  const gridMoments = filteredMoments.slice(1);

  return (
    <section
      id="family-celebrations"
      aria-labelledby="family-celebrations-title"
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      {/* Subtle brand ambient backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 left-1/2 -z-10 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(208,48,42,0.06),rgba(41,23,110,0.03)_60%,transparent)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <SectionHeader
          id="family-celebrations-title"
          eyebrow="Gruha Pravesha & Family Joy"
          title="From Bhoomi Pooja to Gruha Pravesha — Built for Lifetime Happiness"
          text="Nothing brings us greater pride than watching Tumakuru families step across their threshold on their auspicious day, entering homes built with transparent care."
          action={
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/70 px-4 py-2 text-xs font-bold text-brand-dark shadow-xs">
              <SparklesIcon className="size-4 text-brand" />
              <span>ನಮ್ಮ ಗ್ರಾಹಕರ ಸಂಭ್ರಮದ ಕ್ಷಣಗಳು</span>
            </div>
          }
        />

        {/* Auspicious Trust Strip */}
        <Reveal className="mb-10 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-sand/80 p-4 transition-colors hover:border-brand/30">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs">
              <FlameIcon className="size-5 text-brand" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-ink">Auspicious Muhurtham Priority</p>
              <p className="text-xs text-ink/70">Scheduled & delivered before your Gruha Pravesha date</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-line bg-sand/80 p-4 transition-colors hover:border-brand/30">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs">
              <CheckCircle2Icon className="size-5 text-success" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-ink">Fixed-Price Handover</p>
              <p className="text-xs text-ink/70">Zero hidden costs, zero budget anxiety along the way</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-line bg-sand/80 p-4 transition-colors hover:border-brand/30">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs">
              <ShieldCheckIcon className="size-5 text-sky" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-ink">Built For Generations</p>
              <p className="text-xs text-ink/70">Engineered with certified ACC/Ramco cement & TMT steel</p>
            </div>
          </div>
        </Reveal>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter celebration moments">
          {FAMILY_MOMENT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all duration-200',
                  isSelected
                    ? 'border-ink bg-ink text-white shadow-sm'
                    : 'border-line bg-white text-ink hover:border-ink/40 hover:bg-sand/60',
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Card */}
        {featuredMoment && (
          <Reveal className="mb-10">
            <article className="group relative overflow-hidden rounded-(--radius-card) border border-line bg-sand transition-shadow hover:shadow-xl lg:grid lg:grid-cols-12">
              {/* Photo Side */}
              <div
                className="relative aspect-[16/11] cursor-pointer overflow-hidden sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]"
                onClick={() => setActiveMoment(featuredMoment)}
              >
                <Image
                  src={featuredMoment.image}
                  alt={featuredMoment.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:hidden" />

                {/* Floating badge */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge variant="brand" className="shadow-xs">
                    {featuredMoment.categoryLabel}
                  </Badge>
                  <Badge variant="dark" className="bg-black/60 backdrop-blur-xs">
                    {featuredMoment.locality}
                  </Badge>
                </div>

                {/* Click affordance */}
                <button
                  type="button"
                  aria-label="View celebration details"
                  className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-bold text-ink shadow-md backdrop-blur-xs transition-transform hover:scale-105 hover:bg-white"
                >
                  <Maximize2Icon className="size-3.5" />
                  <span>View Story & Specs</span>
                </button>
              </div>

              {/* Story & Quote Side */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-9 xl:p-10">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wider text-brand-dark uppercase">
                      {featuredMoment.kannadaTitle}
                    </p>
                    <h3 className="font-heading text-2xl font-extrabold text-ink md:text-3xl">
                      {featuredMoment.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-ink/75">{featuredMoment.story}</p>

                  {/* Quote Callout */}
                  <div className="relative rounded-2xl border border-brand/20 bg-white p-4.5 shadow-xs">
                    <QuoteIcon className="mb-2 size-6 text-brand/30" />
                    <blockquote className="text-[0.9375rem] font-medium text-ink italic">
                      &ldquo;{featuredMoment.quote}&rdquo;
                    </blockquote>
                    <p className="mt-2 text-xs font-bold text-ink/80">— {featuredMoment.quoteAuthor}</p>
                  </div>
                </div>

                {/* Key Specs Row */}
                <div className="mt-6 border-t border-line/80 pt-5">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-ink/55">Homeowner:</span>
                      <p className="font-bold text-ink">{featuredMoment.familyName}</p>
                    </div>
                    <div>
                      <span className="text-ink/55">Package:</span>
                      <p className="font-bold text-brand-dark">{featuredMoment.packageName}</p>
                    </div>
                    <div>
                      <span className="text-ink/55">Area:</span>
                      <p className="font-bold text-ink">{featuredMoment.plotOrSize}</p>
                    </div>
                    <div>
                      <span className="text-ink/55">Delivery:</span>
                      <p className="font-bold text-success">{featuredMoment.completionTime}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveMoment(featuredMoment)}
                    >
                      Read Full Story <ArrowRightIcon className="size-4" />
                    </Button>
                    <Button asChild variant="secondary" size="sm">
                      <Link href="#cost-estimate">Calculate Cost</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Secondary Moments Grid */}
        {gridMoments.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gridMoments.map((moment, index) => {
              const Icon = CATEGORY_ICONS[moment.category];
              return (
                <Reveal key={moment.id} delay={index * 70}>
                  <article
                    onClick={() => setActiveMoment(moment)}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                      <Image
                        src={moment.image}
                        alt={moment.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <Badge
                        variant="brand"
                        className="absolute top-3 left-3 bg-white/95 text-brand-dark shadow-xs backdrop-blur-xs"
                      >
                        <Icon className="mr-1 size-3 text-brand" />
                        {moment.categoryLabel}
                      </Badge>

                      <span className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                        <Maximize2Icon className="size-4" />
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-ink/65">
                          <MapPinIcon className="size-3.5 text-brand" />
                          <span>{moment.locality}</span>
                        </div>

                        <h4 className="font-heading text-base font-bold leading-snug text-ink transition-colors group-hover:text-brand-dark">
                          {moment.title}
                        </h4>

                        <p className="line-clamp-2 text-xs leading-relaxed text-ink/70">
                          {moment.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-line pt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-ink/80">{moment.familyName}</span>
                          <span className="font-semibold text-brand-dark">{moment.packageName}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Section CTA */}
        <SectionCta
          kind="quote"
          text="Ready to build your family’s dream home in Tumakuru? Let’s plan it together."
          className="mt-14"
        />
      </div>

      {/* Story & Spec Detail Dialog */}
      <Dialog open={activeMoment !== null} onOpenChange={(open) => !open && setActiveMoment(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto p-0" closeLabel="Close dialog">
          {activeMoment && (
            <div>
              {/* Modal Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand sm:aspect-[16/9]">
                <Image
                  src={activeMoment.image}
                  alt={activeMoment.alt}
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant="brand">{activeMoment.categoryLabel}</Badge>
                    <Badge variant="dark" className="bg-white/20 backdrop-blur-xs">
                      {activeMoment.locality}
                    </Badge>
                  </div>
                  <DialogTitle className="text-xl font-extrabold text-white sm:text-2xl">
                    {activeMoment.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-white/80 sm:text-sm">
                    {activeMoment.kannadaTitle}
                  </DialogDescription>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-6 p-6 sm:p-8">
                {/* Homeowner Quote */}
                <div className="rounded-2xl border border-brand/20 bg-brand-soft/40 p-5">
                  <QuoteIcon className="mb-2 size-6 text-brand" />
                  <blockquote className="text-base font-medium text-ink italic sm:text-lg">
                    &ldquo;{activeMoment.quote}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs font-bold text-brand-dark">
                    — {activeMoment.quoteAuthor} ({activeMoment.familyName})
                  </p>
                </div>

                {/* Narrative */}
                <div className="space-y-2">
                  <h4 className="font-heading text-sm font-bold text-ink uppercase tracking-wider">
                    The Story Behind This Milestone
                  </h4>
                  <p className="text-sm leading-relaxed text-ink/80 sm:text-base">
                    {activeMoment.story}
                  </p>
                </div>

                {/* Specifications Grid */}
                <div className="rounded-2xl border border-line bg-sand p-5">
                  <h4 className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-ink/70">
                    Project Snapshot
                  </h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs">
                    <div>
                      <span className="text-ink/60">Family:</span>
                      <p className="font-bold text-ink text-sm">{activeMoment.familyName}</p>
                    </div>
                    <div>
                      <span className="text-ink/60">Locality:</span>
                      <p className="font-bold text-ink text-sm">{activeMoment.locality}</p>
                    </div>
                    <div>
                      <span className="text-ink/60">Package:</span>
                      <p className="font-bold text-brand-dark text-sm">{activeMoment.packageName}</p>
                    </div>
                    <div>
                      <span className="text-ink/60">Dimensions:</span>
                      <p className="font-bold text-ink text-sm">{activeMoment.plotOrSize}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {activeMoment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink/75"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Dialog Actions */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href={QUOTE_HREF} onClick={() => setActiveMoment(null)}>
                      Build a Home Like This <ArrowRightIcon className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <a href="#cost-estimate" onClick={() => setActiveMoment(null)}>
                      Calculate Construction Cost
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
