import { MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { areaSlug } from '@/lib/site-nav';
import { SectionHeader } from './SectionHeader';

/** §6.1 #11 — chip grid → local SEO pages (Phase 5). Areas seen on Nandini's own posts. */
export function AreasGrid({ areas }: { areas: string[] }) {
  return (
    <section aria-labelledby="areas" className="bg-sand py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          id="areas"
          eyebrow="Areas we serve"
          title="Localities we build in"
          text="Planning a home in or around these areas? We’d love to see your plot."
        />
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <li key={area}>
                <Link
                  href={areaSlug(area)}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:border-brand hover:text-brand-dark"
                >
                  <MapPinIcon className="size-4 text-brand" strokeWidth={1.5} aria-hidden />
                  {area}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
