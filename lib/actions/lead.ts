'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { whatsappLink } from '@/lib/contact-links';
import { TIERS } from '@/lib/data/packages';
import { getSiteConfig } from '@/lib/site-config';
import { verifyTurnstile } from '@/lib/turnstile';
import { leadSchema, type LeadField } from '@/lib/validations';

export type LeadFormState = {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
  /** Echoed back so fields keep their values after React resets the form. */
  values?: Partial<Record<LeadField, string>>;
  /** wa.me link with the lead's details pre-filled (success only). */
  handoffUrl?: string;
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
 * Lead Server Action. Validates server-side (Zod) + Turnstile, then hands the lead to Nandini on
 * WhatsApp (pre-filled message) — the visitor taps once to send it. Phase 6 adds: rate limit,
 * insert into `leads`, Resend notifications, UTM capture and /thank-you conversion events.
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

  const lead = parsed.data;
  const config = await getSiteConfig();
  const packageName = lead.packageInterest
    ? (TIERS.find((t) => t.slug === lead.packageInterest)?.name ?? lead.packageInterest)
    : undefined;
  const text = [
    `Hi ${config.companyName}, I'd like a free quote for building on my plot.`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Plot location: ${lead.plotLocation}`,
    lead.plotSize && `Plot size: ${lead.plotSize}`,
    packageName && `Package: ${packageName}`,
    lead.message && `Message: ${lead.message}`,
  ]
    .filter(Boolean)
    .join('\n');
  const handoff = whatsappLink(config.whatsapp, text);

  return {
    status: 'success',
    message: `Thanks, ${lead.name.split(' ')[0]}! One last step — send your details to our team.`,
    // Until the Phase 6 pipeline (Supabase + email) is live, the lead reaches Nandini via WhatsApp.
    handoffUrl: handoff.missing ? undefined : handoff.href,
  };
}
