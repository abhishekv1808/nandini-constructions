import { CheckIcon } from 'lucide-react';
import { ConfirmChip } from '@/components/site/Placeholder';
import { Button } from '@/components/ui/button';
import { UPGRADES, formatRate, getTier, type Tier } from '@/lib/data/packages';
import { cn } from '@/lib/utils';

export function PopularRibbon({ tier }: { tier: Tier }) {
  if (!tier.isPopular) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
        Most popular
      </span>
      {!tier.popularConfirmed && <ConfirmChip label="CONFIRM: most popular tier" />}
    </span>
  );
}

export function UpgradeNote({ tier, className }: { tier: Tier; className?: string }) {
  const upgrade = UPGRADES[tier.slug];
  if (!upgrade) return null;
  const next = getTier(upgrade.to);
  return (
    <p className={cn('text-sm text-ink/75', className)}>
      <span className="font-semibold text-ink">
        ₹{(next.ratePerSqft - tier.ratePerSqft).toLocaleString('en-IN')}/sq.ft more
      </span>{' '}
      gets you {upgrade.items.join(', ')} in {next.shortName}.
    </p>
  );
}

/** One tier, full summary (§6.2 package card). Server-compatible. */
export function PackageCard({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <article
      className={cn(
        'flex h-full flex-col gap-5 rounded-(--radius-card) border bg-white p-6',
        tier.isPopular ? 'border-brand shadow-lg' : 'border-line',
        className,
      )}
    >
      <div className="space-y-2">
        <PopularRibbon tier={tier} />
        <h3 className="text-xl font-extrabold">{tier.name}</h3>
        <p className="font-heading text-4xl font-extrabold text-ink">{formatRate(tier.ratePerSqft)}</p>
        <p className="text-[0.9375rem] text-ink/75">{tier.tagline}</p>
      </div>
      <ul className="space-y-2">
        {tier.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-[0.9375rem]">
            <CheckIcon className="mt-1 size-4 shrink-0 text-success" strokeWidth={2} aria-hidden />
            {h}
          </li>
        ))}
      </ul>
      <UpgradeNote tier={tier} />
      <div className="mt-auto grid gap-2">
        <Button asChild>
          <a href="#quote" data-select-package={tier.slug}>
            Get quote for this package
          </a>
        </Button>
        <Button asChild variant="secondary">
          <a href="#cost-estimate" data-select-package={tier.slug}>
            Calculate cost
          </a>
        </Button>
      </div>
    </article>
  );
}
