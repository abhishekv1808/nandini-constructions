import { z } from 'zod';

/** §7.4.5 — Indian mobile `^[6-9]\d{9}$` with +91 handling; international (E.164) allowed for NRIs. */
export function normalisePhone(raw: string): string | null {
  const compact = raw.replace(/[\s\-().]/g, '');
  const indian = compact.match(/^(?:\+91|0091|91|0)?([6-9]\d{9})$/);
  if (indian?.[1]) return `+91${indian[1]}`;
  if (/^\+[1-9]\d{7,14}$/.test(compact) && !compact.startsWith('+91')) return compact;
  return null;
}

export const PACKAGE_INTERESTS = ['rental', 'medium', 'premium', 'not-sure'] as const;
export const SERVICE_INTERESTS = [
  'residential-construction',
  'commercial-construction',
  'interior-design',
  'renovation-and-extension',
  'architectural-design',
] as const;
export const FORM_TYPES = ['hero', 'contact', 'calculator', 'package', 'exit_intent'] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

/** Shared by the client form (field hints) and the Server Action (authoritative). */
export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .transform((value, ctx) => {
      const phone = normalisePhone(value);
      if (!phone) {
        ctx.addIssue({ code: 'custom', message: 'Enter a 10-digit mobile number (or +country code)' });
        return z.NEVER;
      }
      return phone;
    }),
  plotLocation: z.string().trim().min(2, 'Where is your plot?').max(120, 'Location is too long'),
  plotSize: optionalText(60),
  packageInterest: z.enum(PACKAGE_INTERESTS).optional(),
  serviceInterest: z.enum(SERVICE_INTERESTS).optional(),
  message: optionalText(1000),
  formType: z.enum(FORM_TYPES),
  sourcePage: optionalText(200),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadField = keyof z.input<typeof leadSchema>;
