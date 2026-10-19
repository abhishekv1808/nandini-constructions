import Image from 'next/image';
import { Marquee } from '@/components/motion/Marquee';
import { getBrandLogos, type BrandLogo } from '@/lib/data/brand-logos';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';
import { MarqueeToggle } from './MarqueeToggle';

type BrandGroup = { category: string; brands: string[] };
type Brand = { name: string; category: string; logo?: BrandLogo };

const LOGO_H = 48;

function BrandChip({ name, category, logo }: Brand) {
  // Box follows the artwork's aspect (clamped) so stacked and wide logos both read well,
  // and its size is known at SSR — no width change inside the moving marquee.
  const logoW = logo ? Math.round(Math.min(176, Math.max(64, LOGO_H * logo.aspect))) : 0;
  return (
    <div
      className={cn(
        'flex min-h-24 min-w-44 flex-col items-center justify-center gap-1.5 rounded-2xl border px-6 py-3 text-center shadow-[0_1px_0_rgba(20,23,28,0.04)]',
        logo?.onDark ? 'border-charcoal bg-charcoal' : 'border-line bg-white',
      )}
    >
      {logo ? (
        <span className="relative block" style={{ width: logoW, height: LOGO_H }}>
          <Image
            src={logo.src}
            alt={`${name} logo`}
            fill
            sizes={`${logoW * 2}px`}
            unoptimized={logo.isSvg}
            className="object-contain"
          />
        </span>
      ) : (
        <span className="font-heading text-xl font-extrabold tracking-tight text-ink">{name}</span>
      )}
      <span
        className={cn(
          'text-[0.6875rem] font-semibold tracking-[0.14em] uppercase',
          logo?.onDark ? 'text-white/60' : 'text-ink/50',
        )}
      >
        {category}
      </span>
    </div>
  );
}

const toItems = (brands: Brand[]) =>
  brands.map((b) => ({ key: `${b.category}-${b.name}`, node: <BrandChip {...b} /> }));

/**
 * §6.1 #10 — material brands from the §8 package sheet, auto-scrolling (pure CSS). Pauses on
 * hover/focus and via a button; static wrapped grid without JS or with reduced motion.
 * Shows the brand's logo when `public/brand_logos/<slug>.*` exists, else a text wordmark.
 */
export function BrandMarquee({ groups }: { groups: BrandGroup[] }) {
  const logos = getBrandLogos(groups.flatMap((g) => g.brands));
  const all: Brand[] = groups.flatMap((g) =>
    g.brands.map((name) => ({ name, category: g.category, logo: logos[name] })),
  );
  const half = Math.ceil(all.length / 2);

  return (
    <section id="brands" aria-labelledby="brands-title" className="overflow-hidden bg-white py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          id="brands-title"
          eyebrow="Materials"
          title="Brands we build with"
          text="Every brand below is named in our package specifications — you see exactly what goes into your home."
          action={<MarqueeToggle targetId="brands" />}
        />
      </div>
      <div className="space-y-3" role="region" aria-label="Material brands">
        <Marquee items={toItems(all.slice(0, half))} duration={50} />
        <Marquee items={toItems(all.slice(half))} duration={58} reverse />
      </div>
      <div className="mx-auto mt-6 max-w-7xl px-4 text-xs text-ink/60 md:px-6">
        Brands vary by package — see the full comparison above. Logos are trademarks of their respective
        owners.
      </div>
    </section>
  );
}
