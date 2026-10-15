'use client';

import {
  CalendarCheckIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  HardHatIcon,
  ListChecksIcon,
  type LucideIcon,
  ReceiptIndianRupeeIcon,
  WalletIcon,
} from 'lucide-react';
import { Tabs } from 'radix-ui';
import { ConfirmChip } from '@/components/site/Placeholder';
import type { BrandPromise } from '@/lib/data/home';
import { cn } from '@/lib/utils';

const ICONS: LucideIcon[] = [
  ListChecksIcon,
  ReceiptIndianRupeeIcon,
  ClipboardCheckIcon,
  WalletIcon,
  CalendarCheckIcon,
  HardHatIcon,
];

function PromiseBody({ promise, large = false }: { promise: BrandPromise; large?: boolean }) {
  return (
    <div className="space-y-3">
      <p className={cn('text-ink/75', large ? 'text-lg' : 'text-[0.9375rem]')}>{promise.text}</p>
      {!promise.confirmed && <ConfirmChip label="CONFIRM: client commits to this in writing" />}
    </div>
  );
}

/** §6.1 #5 — tabbed on desktop, accordion on mobile. Unconfirmed promises are visibly marked. */
export function WhyNandini({ promises }: { promises: BrandPromise[] }) {
  const first = promises[0]?.title ?? '';

  return (
    <>
      {/* Desktop: vertical tabs */}
      <Tabs.Root
        defaultValue={first}
        orientation="vertical"
        className="hidden gap-8 md:grid md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
      >
        <Tabs.List aria-label="Our promises" className="flex flex-col gap-2">
          {promises.map((p, i) => {
            const Icon = ICONS[i % ICONS.length] ?? ListChecksIcon;
            return (
              <Tabs.Trigger
                key={p.title}
                value={p.title}
                className="group flex min-h-14 items-center gap-3 rounded-2xl border border-transparent px-4 text-left font-heading font-bold text-ink/70 transition-colors hover:bg-white data-[state=active]:border-line data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-sm"
              >
                <Icon
                  className="size-5 shrink-0 text-ink/50 group-data-[state=active]:text-brand"
                  strokeWidth={1.5}
                  aria-hidden
                />
                {p.title}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {promises.map((p, i) => {
          const Icon = ICONS[i % ICONS.length] ?? ListChecksIcon;
          return (
            <Tabs.Content
              key={p.title}
              value={p.title}
              className="rounded-(--radius-card) border border-line bg-white p-8 data-[state=active]:animate-in data-[state=active]:fade-in lg:p-10"
            >
              <Icon className="size-10 text-brand" strokeWidth={1.25} aria-hidden />
              <h3 className="mt-5 mb-3 text-2xl font-extrabold md:text-3xl">{p.title}</h3>
              <PromiseBody promise={p} large />
            </Tabs.Content>
          );
        })}
      </Tabs.Root>

      {/* Mobile: accordion (native details — works without JS) */}
      <div className="space-y-2 md:hidden">
        {promises.map((p, i) => {
          const Icon = ICONS[i % ICONS.length] ?? ListChecksIcon;
          return (
            <details key={p.title} className="group rounded-2xl border border-line bg-white" open={i === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 font-heading font-bold [&::-webkit-details-marker]:hidden">
                <Icon className="size-5 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
                <span className="flex-1">{p.title}</span>
                <ChevronDownIcon
                  className="size-5 transition-transform group-open:rotate-180"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </summary>
              <div className="px-4 pb-4">
                <PromiseBody promise={p} />
              </div>
            </details>
          );
        })}
      </div>
    </>
  );
}
