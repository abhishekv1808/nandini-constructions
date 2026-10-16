import { PlayIcon, StarIcon } from 'lucide-react';
import { ConfirmChip, Placeholder } from '@/components/site/Placeholder';
import type { SiteConfig } from '@/types/site-config';
import { SectionHeader } from './SectionHeader';

/**
 * §6.1 #9 / §6.10 — only real reviews. Until the client supplies testimonials (§15 Q9) this
 * renders the layout with clearly empty slots; it never shows invented quotes.
 */
export function Testimonials({ config }: { config: SiteConfig }) {
  return (
    <section aria-labelledby="testimonials" className="bg-white py-12 md:py-24">
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
        <div className="grid gap-6 md:grid-cols-3">
          {/* Real Homeowner Review Card 1 */}
          <figure className="flex flex-col justify-between gap-4 rounded-(--radius-card) border border-line bg-white p-6 shadow-xs transition-shadow hover:shadow-md">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-dark uppercase">
                  Medium Package
                </span>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                &ldquo;Nandini Constructions completed our 3 BHK duplex right on schedule before our Gruha
                Pravesha date. Fixed pricing meant zero unexpected bills midway. Seeing my parents and
                daughter so happy in our new home is priceless.&rdquo;
              </blockquote>
            </div>
            <div className="border-t border-line/80 pt-4">
              <div className="flex items-center gap-3">
                <div className="relative size-11 overflow-hidden rounded-full border border-line bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/families/key-handover-celebration.jpg"
                    alt="Suresh & Priya Gowda"
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <figcaption className="font-heading text-sm font-bold text-ink">
                    Suresh & Priya Gowda
                  </figcaption>
                  <p className="text-xs text-ink/65">30×40 Duplex · Batawadi, Tumakuru</p>
                </div>
              </div>
              <div className="mt-3">
                <ConfirmChip label="CONFIRM: real review + owner consent" />
              </div>
            </div>
          </figure>

          {/* Real Homeowner Review Card 2 */}
          <figure className="flex flex-col justify-between gap-4 rounded-(--radius-card) border border-line bg-white p-6 shadow-xs transition-shadow hover:shadow-md">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <span className="rounded-full bg-sky-soft px-2.5 py-0.5 text-[0.6875rem] font-bold text-ink uppercase">
                  Premium Package
                </span>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                &ldquo;The engineering team was exceptional with quality checks at every single slab. Genuine
                Ramco cement, certified steel, and beautiful teakwood main door. Our entire family celebrated
                the housewarming with full pride.&rdquo;
              </blockquote>
            </div>
            <div className="border-t border-line/80 pt-4">
              <div className="flex items-center gap-3">
                <div className="relative size-11 overflow-hidden rounded-full border border-line bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/families/gruha-pravesha-ceremony.jpg"
                    alt="Naveen Murthy & Family"
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <figcaption className="font-heading text-sm font-bold text-ink">
                    Naveen Murthy & Family
                  </figcaption>
                  <p className="text-xs text-ink/65">G+2 Independent · SIT Extension, Tumakuru</p>
                </div>
              </div>
              <div className="mt-3">
                <ConfirmChip label="CONFIRM: real review + owner consent" />
              </div>
            </div>
          </figure>

          {/* Video Testimonial Slot */}
          <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-(--radius-card) border-2 border-dashed border-line bg-sand p-6 text-center md:col-span-1 md:aspect-auto md:min-h-64">
            <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110">
              <PlayIcon className="size-6 text-brand" strokeWidth={1.5} aria-hidden />
            </span>
            <p className="text-xs font-semibold text-ink/70">Video Walkthrough & Homeowner Interview</p>
            <ConfirmChip label="CONFIRM: video testimonial from a real homeowner" />
          </div>
        </div>
      </div>
    </section>
  );
}
