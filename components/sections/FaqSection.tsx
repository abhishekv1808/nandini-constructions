import { PlusIcon } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from './SectionHeader';

type Faq = { q: string; a: string };

/** §6.1 #12 — native <details> accordion (no JS) + FAQPage JSON-LD built from the same data. */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq" className="bg-white py-12 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeader
          id="faq"
          eyebrow="FAQ"
          title="Questions homeowners ask us"
          text="Straight answers from our package sheet."
        />
        <Reveal className="space-y-2">
          {faqs.map((f, i) => (
            <details key={f.q} className="group rounded-2xl border border-line bg-sand" open={i === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 px-5 py-3 font-heading font-bold text-ink [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{f.q}</span>
                <PlusIcon
                  className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </summary>
              <p className="px-5 pb-5 text-ink/75">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
