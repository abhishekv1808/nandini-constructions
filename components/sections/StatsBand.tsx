import { CountUp } from '@/components/motion/CountUp';
import { hasValue } from '@/components/site/Placeholder';
import { MATERIAL_BRANDS } from '@/lib/data/home';
import { SPEC_CATEGORIES, TIERS } from '@/lib/data/packages';
import type { Field, SiteConfig } from '@/types/site-config';

type Stat = { label: string; value: number; prefix?: string; suffix?: string };

const startingRate = Math.min(...TIERS.map((t) => t.ratePerSqft));
const specCount = SPEC_CATEGORIES.reduce((n, c) => n + c.rows.length, 0);
const brandCount = MATERIAL_BRANDS.reduce((n, g) => n + g.brands.length, 0);

/** Verifiable facts from the package sheet (§8) — always true, used to fill the band. */
const PACKAGE_FACTS: Stat[] = [
  { label: 'Turnkey construction from', value: startingRate, prefix: '₹', suffix: '/sq.ft' },
  { label: 'Specifications listed upfront', value: specCount },
  { label: 'Trusted material brands', value: brandCount },
  { label: 'Clear floor-to-floor height', value: 10, suffix: ' ft' },
];

/**
 * §6.1 #2 — indigo band that slides up over the sticky hero. Company stats from site_settings
 * take priority once supplied; until then the band shows true facts from the package sheet.
 * Nothing is invented.
 */
export function StatsBand({ config }: { config: SiteConfig }) {
  const company: [string, Field<number>, string][] = [
    ['Projects delivered', config.stats.projectsDelivered, '+'],
    ['Sq.ft built', config.stats.sqftBuilt, '+'],
    ['Years of experience', config.stats.yearsExperience, '+'],
    ['Quality checks per stage', config.stats.qualityChecksPerStage, ''],
  ];
  const real: Stat[] = company.flatMap(([label, field, suffix]) =>
    hasValue(field) ? [{ label, value: field.value, suffix }] : [],
  );
  const stats = [...real, ...PACKAGE_FACTS].slice(0, 4);

  return (
    <section
      aria-label="Nandini Constructions in numbers"
      className="relative z-[1] -mt-6 rounded-t-[28px] bg-charcoal text-white shadow-[0_-20px_40px_rgba(0,0,0,0.25)]"
    >
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 md:grid-cols-4 md:px-6 md:py-14">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1">
            <dt className="text-sm text-white/70 md:text-base">{s.label}</dt>
            <dd className="font-heading text-3xl font-extrabold md:text-5xl">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
