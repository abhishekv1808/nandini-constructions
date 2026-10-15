import type { Field } from '@/types/site-config';
import { QUOTE_HREF, WHATSAPP_MESSAGE } from './site-nav';

export type ContactLink =
  | { href: string; external: boolean; missing: false }
  | {
      href: string;
      external: false;
      missing: true;
      label: string;
    };

/** The lead form is the honest fallback while the number is unconfirmed — never a broken tel:. */
const FALLBACK = QUOTE_HREF;

function digits(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

export function telLink(phone: Field<string>): ContactLink {
  if (phone.status === 'missing')
    return { href: FALLBACK, external: false, missing: true, label: phone.label };
  return { href: `tel:${digits(phone.value)}`, external: false, missing: false };
}

export function whatsappLink(whatsapp: Field<string>, message = WHATSAPP_MESSAGE): ContactLink {
  if (whatsapp.status === 'missing')
    return { href: FALLBACK, external: false, missing: true, label: whatsapp.label };
  const number = digits(whatsapp.value).replace(/^\+/, '');
  return {
    href: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    external: true,
    missing: false,
  };
}
