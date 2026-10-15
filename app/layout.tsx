import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter, Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import { NO_FLASH_SCRIPT } from '@/lib/motion/no-flash-script';
import { ScrollProvider } from '@/lib/motion/ScrollProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  variable: '--font-instrument-serif',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nandini Constructions — House Construction in Tumakuru at Fixed Package Prices',
    template: '%s | Nandini Constructions',
  },
  description:
    'Turnkey house and commercial construction in Tumakuru, from design to handover. Fixed package prices with every material and brand listed upfront.',
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'Nandini Constructions' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#29176E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${manrope.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
