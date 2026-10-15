import type { Metadata } from 'next';
import { HouseBuild, type BuildStage } from '@/components/scenes/HouseBuild/HouseBuild';
import { HouseSvg } from '@/components/scenes/HouseBuild/HouseSvg';
import { HOUSE_STAGES } from '@/lib/data/home';
import { TIERS, getSpecRow } from '@/lib/data/packages';

export const metadata: Metadata = { title: 'House build scene' };

/** /dev/house — the HouseBuild scene in isolation, plus every stage rendered statically. */
export default function HouseDevPage() {
  const stages: BuildStage[] = HOUSE_STAGES.map((s) => ({
    title: s.title,
    text: s.text,
    materials: s.materials.map((key) => {
      const row = getSpecRow(key);
      return { label: row.label, values: row.values };
    }),
  }));

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <p className="font-mono text-sm font-semibold text-brand-dark">HouseSvg upToStage=1…7 (static)</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-sand p-3">
              <HouseSvg upToStage={i + 1} idPrefix={`dev-stage-${i + 1}`} className="w-full" />
              <p className="mt-2 text-sm font-semibold">
                {i + 1}. {s.title}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <HouseBuild
        stages={stages}
        tiers={TIERS.map(({ slug, shortName }) => ({ slug, shortName }))}
        defaultTier="medium"
        skipTo="#after-house"
      />
      <section id="after-house" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <p className="text-ink/70">End of scene.</p>
      </section>
    </>
  );
}
