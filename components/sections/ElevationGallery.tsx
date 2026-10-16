import Image from 'next/image';
import { Marquee } from '@/components/motion/Marquee';
import type { Elevation } from '@/lib/data/elevations';
import { MarqueeToggle } from './MarqueeToggle';
import { SectionCta } from './SectionCta';
import { SectionHeader } from './SectionHeader';

function ElevationCard({ item }: { item: Elevation }) {
  const crop = item.cropBottom ?? 0;
  const { width, height } = item.image;
  return (
    <figure
      className="group relative h-72 overflow-hidden rounded-(--radius-card) border border-line bg-sand md:h-[26rem]"
      // Width follows the visible (cropped) aspect ratio, so mixed portrait/landscape renders sit naturally.
      style={{ aspectRatio: `${width} / ${Math.round(height * (1 - crop))}` }}
    >
      <div className="absolute inset-x-0 top-0" style={{ height: `${100 / (1 - crop)}%` }}>
        <Image
          src={item.image}
          alt={item.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 42rem, 29rem"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </figure>
  );
}

/**
 * Front-elevation renders supplied by the client, in an auto-scrolling row (pure CSS marquee).
 * Pauses on hover/focus and via the button; without motion it becomes a swipeable row.
 */
export function ElevationGallery({ items }: { items: Elevation[] }) {
  return (
    <section
      id="elevations"
      aria-labelledby="elevations-title"
      className="overflow-hidden bg-sand py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          id="elevations-title"
          eyebrow="Elevation designs"
          title="Front elevations designed for our clients"
          text="Modern, practical façades — from narrow plots to corner sites."
          action={<MarqueeToggle targetId="elevations" />}
        />
      </div>

      <Marquee
        items={items.map((item) => ({ key: item.key, node: <ElevationCard item={item} /> }))}
        duration={80}
        fallback="scroll"
        label="Elevation designs — scroll to see more"
        listClassName="gap-4 pr-4 md:gap-5 md:pr-5"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionCta
          kind="quote"
          text="Like a design? Tell us about your plot and we’ll plan yours."
          className="bg-white"
        />
      </div>
    </section>
  );
}
