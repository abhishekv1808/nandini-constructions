import { TriangleAlertIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Field } from '@/types/site-config';
import { cn } from '@/lib/utils';

/** Internal review mode only: set NEXT_PUBLIC_SHOW_CONFIRM=1 to see markers for unsupplied facts. */
const SHOW_MARKERS = process.env.NEXT_PUBLIC_SHOW_CONFIRM === '1';

/**
 * Review marker for facts the client hasn't supplied. Hidden on the live site (ITBIZone decision,
 * 2026-10-19); enable with NEXT_PUBLIC_SHOW_CONFIRM=1 for an internal pass.
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
  if (!SHOW_MARKERS) return null;
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

/**
 * Renders a Field's value. Unknown (missing) facts render nothing — never an invented value —
 * so callers should hide their surrounding label with `hasValue()`.
 */
export function Placeholder<T>({ field, children, tone, className }: PlaceholderProps<T>) {
  if (field.status === 'missing')
    return <ConfirmChip label={field.label} tone={tone} className={className} />;
  return <>{children ? children(field.value) : String(field.value)}</>;
}

export function hasValue<T>(field: Field<T>): field is Exclude<Field<T>, { status: 'missing' }> {
  return field.status !== 'missing';
}
