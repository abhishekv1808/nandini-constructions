import { ReceiptIndianRupeeIcon } from 'lucide-react';
import { ALLOWANCE_NOTE, getSpecRow, type SpecRow, type Tier } from '@/lib/data/packages';

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2">
      <span className="grid size-6 place-items-center rounded-full bg-ink text-xs font-bold text-white">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Explains §8.2 ₹ allowances with a worked example from the sheet (main door of the given tier). */
export function AllowanceExplainer({ tier, rows }: { tier: Tier; rows: SpecRow[] }) {
  const door = getSpecRow('mainDoor').values[tier.slug];
  const amount = door.match(/₹[\d,]+/)?.[0];

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="space-y-5">
        <p className="text-lg text-ink/80">{ALLOWANCE_NOTE}</p>
        <div>
          <p className="mb-2 text-sm font-semibold text-ink/70">Items with an allowance</p>
          <ul className="flex flex-wrap gap-2">
            {rows.map((r) => (
              <li key={r.key} className="rounded-full border border-line bg-white px-3 py-1 text-sm">
                {r.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="rounded-(--radius-card) border border-line bg-white p-5 md:p-6">
        <figcaption className="mb-4 flex items-center gap-2 font-heading font-bold">
          <ReceiptIndianRupeeIcon className="size-5 text-brand" strokeWidth={1.5} aria-hidden />
          Example: main door, {tier.name}
        </figcaption>
        <ol className="space-y-4 text-[0.9375rem]">
          <Step n={1}>
            The package budgets <strong>{amount ?? 'an allowance'}</strong> for the main door —{' '}
            <span className="text-ink/70">{door}</span>.
          </Step>
          <Step n={2}>Choose any door up to that value; it’s covered by your package rate.</Step>
          <Step n={3}>
            Prefer a costlier door? You pay <strong>only the difference</strong> above the allowance, before
            work completion.
          </Step>
        </ol>
      </figure>
    </div>
  );
}
