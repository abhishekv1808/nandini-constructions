import type { ReactNode } from 'react';
import { telLink, whatsappLink } from '@/lib/contact-links';
import { getSiteConfig } from '@/lib/site-config';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileCtaBar } from './MobileCtaBar';
import { WhatsAppFab } from './WhatsAppFab';

/** Header + main + footer + persistent CTAs. Shared by the public site and /dev previews. */
export async function SiteShell({ children }: { children: ReactNode }) {
  const config = await getSiteConfig();
  const call = telLink(config.phone);
  const whatsapp = whatsappLink(config.whatsapp);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <MobileCtaBar call={call} whatsapp={whatsapp} />
      <WhatsAppFab whatsapp={whatsapp} />
    </>
  );
}
