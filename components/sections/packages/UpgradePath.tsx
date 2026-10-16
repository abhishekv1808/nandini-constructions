import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';
import { changedRows, type Tier } from '@/lib/data/packages';

const VISIBLE = 6;

function ChangeItem({ label, from, to }: { label: string; from: string; to: string }) {
  return (
    <li className="grid gap-1 border-t border-line/70 py-3 first:border-t-0">
      <p className="text-xs font-semibold tracking-[0.1em] text-ink/60 uppercase">{label}</p>
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.9375rem]">
        <span className="text-ink/60">{from}</span>
        <ArrowRightIcon className="size-3.5 shrink-0 self-center text-brand" strokeWidth={2} aria-hidden />
        <span className="sr-only">upgraded to</span>
        <span className="font-semibold text-ink">{to}</span>
      </p>
    </li>
  );
}

/** Every spec that changes from one tier to the next, computed from the §8.2 sheet. */
export function UpgradePath({ tiers }: { tiers: Tier[] }) {
  const steps = tiers.flatMap((to, i) => {
    const from = i > 0 ? tiers[i - 1] : undefined;
    return from ? [{ from, to, changes: changedRows(from.slug, to.slug) }] : [];
  });

  return (
    <div className="grid items-start gap-5 lg:grid-cols-2">
      {steps.map(({ from, to, changes }) => (
        <article key={to.slug} className="rounded-(--radius-card) border border-line bg-white p-5 md:p-6">
          <header className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <h3 className="text-lg font-extrabold">
              {from.shortName} <span className="text-ink/40">→</span> {to.shortName}
            </h3>
            <p className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-dark">
              +₹{(to.ratePerSqft - from.ratePerSqft).toLocaleString('en-IN')}/sq.ft · {changes.length}{' '}
              upgrades
            </p>
          </header>
          <ul>
            {changes.slice(0, VISIBLE).map((c) => (
              <ChangeItem key={c.row.key} label={c.row.label} from={c.from} to={c.to} />
            ))}
          </ul>
          {changes.length > VISIBLE && (
            <details className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 text-sm font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                <ChevronDownIcon
                  className="size-4 transition-transform group-open:rotate-180"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="group-open:hidden">Show all {changes.length} upgrades</span>
                <span className="hidden group-open:inline">Show fewer</span>
              </summary>
              <ul className="border-t border-line/70">
                {changes.slice(VISIBLE).map((c) => (
                  <ChangeItem key={c.row.key} label={c.row.label} from={c.from} to={c.to} />
                ))}
              </ul>
            </details>
          )}
        </article>
      ))}
    </div>
  );
}
