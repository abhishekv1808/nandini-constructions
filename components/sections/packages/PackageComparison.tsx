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

type PackageComparisonProps = { tiers: Tier[]; categories: SpecCategory[] };

/**
 * Full §8.2 comparison: collapsible categories, "only differences" toggle, cells that change
 * from the previous tier highlighted, ₹ allowances marked. Horizontal scroll with a sticky first
 * column on mobile. Server Component: the toggle is a checkbox + CSS `:has()` (works without JS).
 */
export function PackageComparison({ tiers, categories }: PackageComparisonProps) {
  return (
    <div className="spec-compare space-y-4">
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

      <div className="overflow-x-auto rounded-(--radius-card) border border-line bg-white">
        <div className="min-w-[44rem]">
          <div className="grid grid-cols-[minmax(10rem,1.1fr)_repeat(3,minmax(0,1fr))] border-b border-line bg-sand text-sm">
            <div className="sticky left-0 z-[1] bg-sand p-3 font-semibold text-ink/70">Specification</div>
            {tiers.map((t) => (
              <div key={t.slug} className={cn('p-3', t.isPopular && 'bg-brand-soft/70')}>
                <p className="font-heading font-extrabold text-ink">{t.shortName}</p>
                <p className="text-sm font-semibold text-brand-dark">{formatRate(t.ratePerSqft)}</p>
              </div>
            ))}
          </div>

          {categories.map((category) => {
            const rows = category.rows;
            const allSame = !rows.some(rowDiffers);
            return (
              <details
                key={category.key}
                open
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
                <table className="w-full table-fixed text-sm">
                  <caption className="sr-only">{category.name}</caption>
                  <colgroup>
                    <col className="w-[27.5%]" />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Specification</th>
                      {tiers.map((t) => (
                        <th key={t.slug} scope="col">
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
                          className="sticky left-0 bg-white p-3 text-left font-semibold text-ink"
                        >
                          {row.label}
                        </th>
                        {tiers.map((t, i) => {
                          const value = row.values[t.slug];
                          const prev = i > 0 ? tiers[i - 1] : undefined;
                          const changed = prev ? row.values[prev.slug] !== value : false;
                          return (
                            <td key={t.slug} className={cn('p-3 text-ink/85', changed && 'bg-brand-soft/60')}>
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
