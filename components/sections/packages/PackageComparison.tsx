import { ChevronDownIcon, InfoIcon } from 'lucide-react';
import {
  ALLOWANCE_NOTE,
  formatRate,
  isAllowance,
  rowDiffers,
  type SpecCategory,
  type Tier,
} from '@/lib/data/packages';
import { cn } from '@/lib/utils';

type PackageComparisonProps = {
  tiers: Tier[];
  categories: SpecCategory[];
  /** Open only the first category (home page — keeps the section short on phones). */
  collapsed?: boolean;
};

/**
 * Full §8.2 comparison: collapsible categories, "only differences" toggle, cells that change
 * from the previous tier highlighted, ₹ allowances marked. Phones: tabs pick one package and the
 * table shows spec + that package (no sideways scroll); md+: all three columns. Server Component —
 * tabs and the toggle are radios/checkbox + CSS `:has()` in globals.css (work without JS).
 */
export function PackageComparison({ tiers, categories, collapsed = false }: PackageComparisonProps) {
  const defaultTier = tiers.find((t) => t.isPopular)?.slug ?? tiers[0]?.slug;
  return (
    <div className="spec-compare space-y-4">
      <fieldset className="md:hidden">
        <legend className="sr-only">Show package</legend>
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-sand p-1 ring-1 ring-line">
          {tiers.map((t) => (
            <label
              key={t.slug}
              className="flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-xl px-1 text-center text-ink/75 transition-colors has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand"
            >
              <input
                type="radio"
                name="spec-tier-view"
                value={t.slug}
                defaultChecked={t.slug === defaultTier}
                className="tier-view sr-only"
              />
              <span className="text-sm font-bold">{t.shortName}</span>
              <span className="text-[0.6875rem] font-semibold opacity-80">{formatRate(t.ratePerSqft)}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-2 text-xs text-ink/60">
          <span className="inline-block size-3 rounded-sm bg-brand-soft ring-1 ring-brand/20" aria-hidden />
          Highlighted = upgraded from the package below
        </p>
      </fieldset>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-start gap-2 text-sm text-ink/75">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-brand-dark" strokeWidth={1.5} aria-hidden />
          <span>
            <strong className="font-semibold text-ink">₹ values are allowances.</strong> {ALLOWANCE_NOTE}
          </span>
        </p>
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold select-none">
          <input type="checkbox" className="only-diff size-4 accent-brand" />
          Only show differences
        </label>
      </div>

      <div className="overflow-hidden rounded-(--radius-card) border border-line bg-white md:overflow-x-auto">
        <div className="md:min-w-[44rem]">
          <div className="hidden grid-cols-[minmax(10rem,1.1fr)_repeat(3,minmax(0,1fr))] border-b border-line bg-sand text-sm md:grid">
            <div className="sticky left-0 z-[1] bg-sand p-3 font-semibold text-ink/70">Specification</div>
            {tiers.map((t) => (
              <div key={t.slug} className={cn('p-3', t.isPopular && 'bg-brand-soft/70')}>
                <p className="font-heading font-extrabold text-ink">{t.shortName}</p>
                <p className="text-sm font-semibold text-brand-dark">{formatRate(t.ratePerSqft)}</p>
              </div>
            ))}
          </div>

          {categories.map((category, ci) => {
            const rows = category.rows;
            const allSame = !rows.some(rowDiffers);
            return (
              <details
                key={category.key}
                open={!collapsed || ci === 0}
                data-same={allSame ? '' : undefined}
                className="group border-b border-line last:border-b-0"
              >
                <summary className="sticky left-0 flex min-h-12 w-fit cursor-pointer list-none items-center gap-2 px-3 font-heading font-bold text-ink [&::-webkit-details-marker]:hidden">
                  <ChevronDownIcon
                    className="size-4 -rotate-90 transition-transform group-open:rotate-0"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {category.name}
                </summary>
                <table className="w-full text-sm md:table-fixed">
                  <caption className="sr-only">{category.name}</caption>
                  <colgroup>
                    <col className="md:w-[27.5%]" />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Specification</th>
                      {tiers.map((t) => (
                        <th key={t.slug} scope="col" data-tier={t.slug}>
                          {t.shortName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        key={row.key}
                        data-same={rowDiffers(row) ? undefined : ''}
                        className="border-t border-line/70 align-top"
                      >
                        <th
                          scope="row"
                          className="w-[42%] bg-white p-3 text-left font-semibold text-ink md:sticky md:left-0 md:w-auto"
                        >
                          {row.label}
                        </th>
                        {tiers.map((t, i) => {
                          const value = row.values[t.slug];
                          const prev = i > 0 ? tiers[i - 1] : undefined;
                          const changed = prev ? row.values[prev.slug] !== value : false;
                          return (
                            <td
                              key={t.slug}
                              data-tier={t.slug}
                              className={cn('p-3 text-ink/85', changed && 'bg-brand-soft/60')}
                            >
                              {value}
                              {isAllowance(value) && (
                                <span className="ml-1 inline-block rounded bg-sand px-1 text-[0.6875rem] font-semibold text-ink/60">
                                  allowance
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
