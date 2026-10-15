import { TriangleAlertIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Field } from '@/types/site-config';
import { cn } from '@/lib/utils';

/**
 * Visible [CONFIRM] marker. Deliberately off-palette (amber, dashed) so unconfirmed business
 * facts can't slip into launch unnoticed (CLAUDE.md §14). Every one must be gone by Phase 10.
 */
export function ConfirmChip({
  label,
  className,
  tone = 'light',
}: {
  label: string;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <span
      data-placeholder=""
      title={label}
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-dashed px-1.5 py-0.5 align-middle font-sans text-[0.75rem] leading-tight font-semibold tracking-normal normal-case',
        tone === 'light'
          ? 'border-amber-500 bg-amber-50 text-amber-900'
          : 'border-amber-300/80 bg-amber-300/10 text-amber-200',
        className,
      )}
    >
      <TriangleAlertIcon className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
      {label}
    </span>
  );
}

type PlaceholderProps<T> = {
  field: Field<T>;
  /** How to render a known value. Defaults to String(value). */
  children?: (value: T) => ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
};

/** Renders a Field: the value when confirmed, value + marker when tentative, a chip when missing. */
export function Placeholder<T>({ field, children, tone, className }: PlaceholderProps<T>) {
  if (field.status === 'missing')
    return <ConfirmChip label={field.label} tone={tone} className={className} />;
  const rendered = children ? children(field.value) : String(field.value);
  if (field.status === 'confirmed') return <>{rendered}</>;
  return (
    <span className={className}>
      {rendered} <ConfirmChip label={field.label} tone={tone} />
    </span>
  );
}
