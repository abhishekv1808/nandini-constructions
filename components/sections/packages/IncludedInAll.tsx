import {
  AppWindowIcon,
  ArrowUpFromLineIcon,
  BlocksIcon,
  CookingPotIcon,
  DropletsIcon,
  type LucideIcon,
  PaintRollerIcon,
  RulerIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { getSpecRow, rowDiffers, type Tier } from '@/lib/data/packages';

const ICONS: LucideIcon[] = [
  BlocksIcon,
  RulerIcon,
  ArrowUpFromLineIcon,
  AppWindowIcon,
  DropletsIcon,
  PaintRollerIcon,
  CookingPotIcon,
  ShieldCheckIcon,
];

/** Items every tier includes; "What each package gets" lists the sheet value per tier. */
export function IncludedInAll({
  items,
  tiers,
}: {
  items: { title: string; specKeys: string[] }[];
  tiers: Tier[];
}) {
  return (
    <ul className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const Icon = ICONS[i % ICONS.length] ?? BlocksIcon;
        const rows = item.specKeys.map(getSpecRow);
        return (
          <li
            key={item.title}
            className="flex flex-col gap-3 rounded-(--radius-card) border border-line bg-white p-5"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-sky-soft text-charcoal">
              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <h3 className="text-base leading-snug font-bold">{item.title}</h3>
            <details className="group text-sm">
              <summary className="flex min-h-11 cursor-pointer list-none items-center font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">What each package gets</span>
                <span className="hidden group-open:inline">Hide details</span>
              </summary>
              <dl className="space-y-2">
                {rows.map((row) => (
                  <div key={row.key}>
                    <dt className="text-xs font-semibold text-ink/60">{row.label}</dt>
                    {rowDiffers(row) ? (
                      tiers.map((t) => (
                        <dd key={t.slug} className="text-ink/85">
                          <span className="font-semibold text-ink">{t.shortName}:</span> {row.values[t.slug]}
                        </dd>
                      ))
                    ) : (
                      <dd className="text-ink/85">All packages: {row.values.rental}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
