'use client';

import { CheckCircle2Icon, LoaderCircleIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useActionState, useCallback, useId, useState, type ReactNode } from 'react';
import { ConfirmChip } from '@/components/site/Placeholder';
import { Button } from '@/components/ui/button';
import { submitLead, type LeadFormState } from '@/lib/actions/lead';
import type { TierSlug } from '@/lib/data/packages';
import { usePackageSelectClicks } from '@/lib/package-select';
import type { LeadField, SERVICE_INTERESTS } from '@/lib/validations';
import { cn } from '@/lib/utils';

type LeadFormProps = {
  variant?: 'hero' | 'full';
  formType: 'hero' | 'contact' | 'calculator' | 'package' | 'exit_intent';
  tiers?: { slug: TierSlug; name: string }[];
  /** Trust row (rating, response promise, privacy) — rendered by the server. */
  trust?: ReactNode;
  submitLabel?: string;
  tone?: 'light' | 'dark';
  /**
   * `bar`: short fields + submit in one row on desktop (2×2 + full-width button on phones);
   * field hints become screen-reader-only so the row stays aligned.
   */
  layout?: 'stack' | 'bar';
  /** Pre-selected package (full variant) or sent as a hidden field (hero variant). */
  packageInterest?: TierSlug;
  /** Service the lead came from (`/services/[slug]`), sent as a hidden field. */
  serviceInterest?: (typeof SERVICE_INTERESTS)[number];
  /** Hidden context sent as the message on the hero variant (e.g. package-quiz answers). */
  context?: string;
  className?: string;
};

const initialState: LeadFormState = { status: 'idle' };

/**
 * Lead form (§4.4, §4.8). Server Action + useActionState → works before hydration and without
 * JS; errors are linked to fields via aria-describedby. Hero variant: Name, Phone, Plot location,
 * Plot size. Full variant adds package + message.
 */
export function LeadForm({
  variant = 'hero',
  formType,
  tiers = [],
  trust,
  submitLabel = 'Get Free Quote',
  tone = 'light',
  layout = 'stack',
  packageInterest,
  serviceInterest,
  context,
  className,
}: LeadFormProps) {
  const [state, action, pending] = useActionState(submitLead, initialState);
  const pathname = usePathname();
  const uid = useId();
  const [pkg, setPkg] = useState<string>(packageInterest ?? '');
  usePackageSelectClicks(useCallback((slug: TierSlug) => setPkg(slug), []));

  const id = (f: string) => `${uid}-${f}`;
  const err = (f: LeadField) => state.fieldErrors?.[f];
  const val = (f: LeadField) => state.values?.[f];

  const fieldClass = cn(
    'block min-h-12 w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-ink/45 focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand aria-[invalid=true]:border-red-600',
  );
  const labelClass = cn('mb-1.5 block text-sm font-semibold', tone === 'dark' ? 'text-white/90' : 'text-ink');

  const field = (name: LeadField, label: string, input: ReactNode, hint?: string) => (
    <div>
      <label htmlFor={id(name)} className={labelClass}>
        {label}
      </label>
      {input}
      {hint && !err(name) && (
        <p
          id={id(`${name}-hint`)}
          className={cn(
            'mt-1 text-xs',
            tone === 'dark' ? 'text-white/60' : 'text-ink/60',
            layout === 'bar' && 'sr-only',
          )}
        >
          {hint}
        </p>
      )}
      {err(name) && (
        <p
          id={id(`${name}-error`)}
          className={cn('mt-1 text-sm font-medium', tone === 'dark' ? 'text-amber-300' : 'text-red-700')}
        >
          {err(name)}
        </p>
      )}
    </div>
  );

  const aria = (name: LeadField, hasHint = false) => ({
    id: id(name),
    name,
    'aria-invalid': err(name) ? true : undefined,
    'aria-describedby': err(name) ? id(`${name}-error`) : hasHint ? id(`${name}-hint`) : undefined,
  });

  const submit = (
    <Button
      type="submit"
      size="lg"
      className={cn('w-full', layout === 'bar' && 'lg:h-12 lg:px-6 lg:text-base')}
      disabled={pending}
    >
      {pending && <LoaderCircleIcon className="animate-spin" strokeWidth={1.5} aria-hidden />}
      {pending ? 'Sending…' : submitLabel}
    </Button>
  );

  if (state.status === 'success') {
    return (
      <div className={cn('space-y-3 rounded-2xl bg-white p-6 text-ink', className)} role="status">
        <CheckCircle2Icon className="size-8 text-success" strokeWidth={1.5} aria-hidden />
        <p className="text-lg font-bold">{state.message}</p>
        <ConfirmChip label="Preview build: lead storage & notifications arrive in Phase 6 — nothing was sent." />
      </div>
    );
  }

  return (
    <form action={action} className={cn('space-y-4', className)} noValidate data-lead-form="">
      <input type="hidden" name="formType" value={formType} />
      <input type="hidden" name="sourcePage" value={pathname} />
      {variant === 'hero' && packageInterest && (
        <input type="hidden" name="packageInterest" value={packageInterest} />
      )}
      {serviceInterest && <input type="hidden" name="serviceInterest" value={serviceInterest} />}
      {variant === 'hero' && context && <input type="hidden" name="message" value={context} />}
      {/* Turnstile widget mounts here in Phase 6 */}
      <input type="hidden" name="cf-turnstile-response" value="" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div
        className={cn(
          'grid gap-4',
          variant === 'full' && 'sm:grid-cols-2',
          layout === 'bar' && 'items-start gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]',
        )}
      >
        {field(
          'name',
          'Your name',
          <input
            {...aria('name')}
            type="text"
            autoComplete="name"
            required
            defaultValue={val('name')}
            className={fieldClass}
          />,
        )}
        {field(
          'phone',
          'Mobile number',
          <input
            {...aria('phone', true)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="98xxx xxxxx"
            defaultValue={val('phone')}
            className={fieldClass}
          />,
          'Indian mobile, or include +country code if you’re abroad',
        )}
        {field(
          'plotLocation',
          'Plot location',
          <input
            {...aria('plotLocation')}
            type="text"
            autoComplete="address-level2"
            required
            placeholder="e.g. SIT Extension, Tumakuru"
            defaultValue={val('plotLocation')}
            className={fieldClass}
          />,
        )}
        {field(
          'plotSize',
          'Plot size (optional)',
          <input
            {...aria('plotSize')}
            type="text"
            placeholder="e.g. 30×40 or 1,200 sq.ft"
            defaultValue={val('plotSize')}
            className={fieldClass}
          />,
        )}
        {variant === 'full' && (
          <>
            {field(
              'packageInterest',
              'Package (optional)',
              <select
                {...aria('packageInterest')}
                value={pkg || val('packageInterest') || ''}
                onChange={(e) => setPkg(e.target.value)}
                className={fieldClass}
              >
                <option value="">Not sure yet</option>
                {tiers.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>,
            )}
            <div className="sm:col-span-2">
              {field(
                'message',
                'Anything else? (optional)',
                <textarea
                  {...aria('message')}
                  rows={3}
                  placeholder="Floors, budget, timeline…"
                  defaultValue={val('message')}
                  className={cn(fieldClass, 'py-3')}
                />,
              )}
            </div>
          </>
        )}
        {layout === 'bar' && <div className="sm:col-span-2 lg:col-span-1 lg:pt-[1.625rem]">{submit}</div>}
      </div>

      {state.status === 'error' && state.message && (
        <p
          role="alert"
          className={cn('text-sm font-semibold', tone === 'dark' ? 'text-amber-300' : 'text-red-700')}
        >
          {state.message}
        </p>
      )}

      {layout === 'stack' && submit}
      {trust}
    </form>
  );
}
