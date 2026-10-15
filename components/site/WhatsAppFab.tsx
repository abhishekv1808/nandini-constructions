import type { ContactLink } from '@/lib/contact-links';
import { WhatsAppIcon } from './icons';

/** Desktop floating WhatsApp button with the §4.3 pre-filled message. Server Component, no JS. */
export function WhatsAppFab({ whatsapp }: { whatsapp: ContactLink }) {
  return (
    <a
      href={whatsapp.href}
      aria-label={whatsapp.missing ? `Chat on WhatsApp (${whatsapp.label})` : 'Chat on WhatsApp'}
      title={whatsapp.missing ? whatsapp.label : 'Chat on WhatsApp'}
      {...(whatsapp.external ? { target: '_blank', rel: 'noopener' } : {})}
      className="fixed right-6 bottom-6 z-(--z-cta) hidden size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-offset-4 md:flex"
    >
      <WhatsAppIcon className="size-7" />
      {whatsapp.missing && (
        <span
          className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full border-2 border-white bg-amber-500"
          aria-hidden
        />
      )}
    </a>
  );
}
