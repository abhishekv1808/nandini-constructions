import { CountUp } from '@/components/motion/CountUp';
import { Placeholder } from '@/components/site/Placeholder';
import type { SiteConfig } from '@/types/site-config';

/**
 * §6.1 #2 — charcoal band that slides up over the sticky hero. Numbers come only from
 * site_settings.stats; until confirmed each shows a [CONFIRM] chip (never a made-up figure).
 */
export function StatsBand({ config }: { config: SiteConfig }) {
  const stats = [
    { label: 'Projects delivered', field: config.stats.projectsDelivered, suffix: '+' },
    { label: 'Sq.ft built', field: config.stats.sqftBuilt, suffix: '+' },
    { label: 'Quality checks per stage', field: config.stats.qualityChecksPerStage, suffix: '' },
    { label: 'Years of experience', field: config.stats.yearsExperience, suffix: '+' },
  ];

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
              <Placeholder field={s.field} tone="dark">
                {(n) => <CountUp value={n} suffix={s.suffix} />}
              </Placeholder>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
