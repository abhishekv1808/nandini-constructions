'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { verifyTurnstile } from '@/lib/turnstile';
import { leadSchema, type LeadField } from '@/lib/validations';

export type LeadFormState = {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
  /** Echoed back so fields keep their values after React resets the form. */
  values?: Partial<Record<LeadField, string>>;
};

const FIELDS: LeadField[] = [
  'name',
  'phone',
  'plotLocation',
  'plotSize',
  'packageInterest',
  'serviceInterest',
  'message',
  'formType',
  'sourcePage',
];

/**
 * Lead Server Action — STUB (Phase 3). Validates server-side (Zod) + Turnstile placeholder.
 * Phase 6 adds: rate limit (5/IP/hour), insert into `leads` via the service role, Resend
 * notifications, UTM/click-ID capture and redirect to /thank-you with conversion events.
 * Nothing is stored or sent yet, and the success message says so.
 */
export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const values: Partial<Record<LeadField, string>> = {};
  for (const field of FIELDS) {
    const v = formData.get(field);
    if (typeof v === 'string' && v !== '') values[field] = v;
  }

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (formData.get('company_website')) return { status: 'success', message: 'Thank you!' };

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim();
  const turnstile = await verifyTurnstile(formData.get('cf-turnstile-response'), ip);
  if (!turnstile.ok) {
    return { status: 'error', message: 'Please complete the verification and try again.', values };
  }

  // Required fields default to '' so a blank field gets its friendly message, not "expected string".
  const parsed = leadSchema.safeParse({ name: '', phone: '', plotLocation: '', ...values });
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors as Partial<Record<LeadField, string[]>>;
    const fieldErrors: Partial<Record<LeadField, string>> = {};
    for (const [key, messages] of Object.entries(flat) as [LeadField, string[] | undefined][]) {
      if (messages?.[0]) fieldErrors[key] = messages[0];
    }
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors, values };
  }

  return {
    status: 'success',
    message: `Thanks, ${parsed.data.name.split(' ')[0]}! Your details are valid.`,
  };
}
