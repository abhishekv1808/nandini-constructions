import { PlayIcon, QuoteIcon, StarIcon } from 'lucide-react';
import { ConfirmChip, Placeholder } from '@/components/site/Placeholder';
import type { SiteConfig } from '@/types/site-config';
import { SectionHeader } from './SectionHeader';

/**
 * §6.1 #9 / §6.10 — only real reviews. Until the client supplies testimonials (§15 Q9) this
 * renders the layout with clearly empty slots; it never shows invented quotes.
 */
export function Testimonials({ config }: { config: SiteConfig }) {
  return (
    <section aria-labelledby="testimonials" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          id="testimonials"
          eyebrow="Homeowners"
          title="What our homeowners say"
          action={
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-line px-4 py-3 text-sm">
              <StarIcon className="size-4 fill-amber-400 text-amber-400" aria-hidden />
              <span className="font-semibold">Google rating</span>
              <Placeholder field={config.googleRating}>{(r) => `${r.toFixed(1)} / 5`}</Placeholder>
              <Placeholder field={config.googleReviewCount}>{(n) => `(${n} reviews)`}</Placeholder>
            </div>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-(--radius-card) border-2 border-dashed border-line bg-sand p-6 text-center md:col-span-1 md:aspect-auto md:min-h-64">
            <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm">
              <PlayIcon className="size-6 text-brand" strokeWidth={1.5} aria-hidden />
            </span>
            <ConfirmChip label="CONFIRM: video testimonial from a real homeowner" />
          </div>
          {[1, 2].map((n) => (
            <figure
              key={n}
              className="flex min-h-64 flex-col justify-between gap-4 rounded-(--radius-card) border-2 border-dashed border-line p-6"
            >
              <QuoteIcon className="size-8 text-line" strokeWidth={1.5} aria-hidden />
              <p className="text-ink/50">Real homeowner review goes here — name, BHK, floors and locality.</p>
              <ConfirmChip label="CONFIRM: real review + owner consent" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
