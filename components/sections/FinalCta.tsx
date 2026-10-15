import { PhoneIcon } from 'lucide-react';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';
import { LeadForm } from '@/components/forms/LeadForm';
import { TrustNote } from '@/components/forms/TrustNote';
import { WhatsAppIcon } from '@/components/site/icons';
import { Button } from '@/components/ui/button';
import type { ContactLink } from '@/lib/contact-links';
import type { Tier } from '@/lib/data/packages';
import type { SiteConfig } from '@/types/site-config';

/** §6.1 #13 — dark final CTA with the full lead form (the `#quote` target for every quote CTA). */
export function FinalCta({
  config,
  tiers,
  call,
  whatsapp,
}: {
  config: SiteConfig;
  tiers: Tier[];
  call: ContactLink;
  whatsapp: ContactLink;
}) {
  return (
    <section
      id="quote"
      aria-labelledby="final-cta"
      className="relative isolate overflow-hidden bg-charcoal text-white"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ParallaxImage
          src="/placeholders/blueprint.svg"
          alt=""
          unoptimized
          className="h-full w-full opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-charcoal)_10%,rgba(41,23,110,0.72))]" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal className="space-y-6">
          <p className="text-sm font-semibold tracking-[0.16em] text-sky-light uppercase">Free quote</p>
          <h2 id="final-cta" className="text-4xl font-extrabold text-white md:text-5xl">
            Ready to build on your plot?
          </h2>
          <p className="max-w-md text-lg text-white/75">
            Share a few details and an engineer will call you to discuss your plot, package and budget.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="inverse">
              <a href={call.href}>
                <PhoneIcon strokeWidth={1.5} /> Call us
              </a>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsapp.href} {...(whatsapp.external ? { target: '_blank', rel: 'noopener' } : {})}>
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
        <Reveal x={40} y={0} className="rounded-[20px] bg-white p-5 text-ink shadow-2xl sm:p-8">
          <LeadForm
            variant="full"
            formType="contact"
            tiers={tiers.map((t) => ({
              slug: t.slug,
              name: `${t.name} — ₹${t.ratePerSqft.toLocaleString('en-IN')}/sq.ft`,
            }))}
            trust={<TrustNote config={config} />}
            submitLabel="Get my free quote"
          />
        </Reveal>
      </div>
    </section>
  );
}
