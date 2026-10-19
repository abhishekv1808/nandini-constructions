import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { telLink } from '@/lib/contact-links';
import { getSiteConfig } from '@/lib/site-config';
import { FOOTER_GROUPS, LEGAL_LINKS, SERVICE_AREAS_TENTATIVE, areaSlug } from '@/lib/site-nav';
import { ConfirmChip, Placeholder, hasValue } from './Placeholder';
import { InstagramIcon, YouTubeIcon } from './icons';
import { Logo } from './Logo';

const linkClass = 'text-white/75 transition-colors hover:text-white';

export async function Footer() {
  const config = await getSiteConfig();
  const call = telLink(config.phone);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.3fr_2fr]">
        <div className="space-y-5">
          <Logo name={config.companyName} tone="light" size="lg" />
          <p className="max-w-sm text-[0.9375rem] text-white/75">
            Turnkey house and commercial construction in Tumakuru — design to handover, at fixed package
            prices with every material listed upfront.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-white/60">Follow us:</span>
            {(
              [
                { field: config.social.instagram, label: 'Instagram', Icon: InstagramIcon },
                { field: config.social.youtube, label: 'YouTube', Icon: YouTubeIcon },
              ] as const
            ).map(({ field, label, Icon }) =>
              field.status === 'missing' ? (
                <ConfirmChip key={label} label={field.label} tone="dark" />
              ) : (
                <a
                  key={label}
                  href={field.value}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${config.companyName} on ${label}`}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon className="size-5" />
                </a>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-3 font-heading text-sm font-bold tracking-[0.12em] text-white uppercase">
                {group.title}
              </h2>
              <ul className="space-y-2 text-[0.9375rem]">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-4 py-10 md:px-6 lg:grid-cols-[1.3fr_2fr]">
        <address className="space-y-3 text-[0.9375rem] not-italic">
          <h2 className="font-heading text-sm font-bold tracking-[0.12em] text-white uppercase">Office</h2>
          <p className="flex gap-2.5">
            <MapPinIcon className="mt-1 size-4 shrink-0 text-white/60" strokeWidth={1.5} aria-hidden />
            <Placeholder field={config.address} tone="dark">
              {(a) => `${a.street}, ${a.locality}, ${a.city} ${a.postalCode}`}
            </Placeholder>
          </p>
          <p className="flex items-center gap-2.5">
            <PhoneIcon className="size-4 shrink-0 text-white/60" strokeWidth={1.5} aria-hidden />
            <Placeholder field={config.phone} tone="dark">
              {(phone) => (
                <a href={call.href} className={linkClass}>
                  {phone}
                </a>
              )}
            </Placeholder>
          </p>
          {hasValue(config.email) && (
            <p className="flex items-center gap-2.5">
              <MailIcon className="size-4 shrink-0 text-white/60" strokeWidth={1.5} aria-hidden />
              <a href={`mailto:${config.email.value}`} className={linkClass}>
                {config.email.value}
              </a>
            </p>
          )}
          {hasValue(config.officeHours) && (
            <p className="flex items-center gap-2.5">
              <ClockIcon className="size-4 shrink-0 text-white/60" strokeWidth={1.5} aria-hidden />
              {config.officeHours.value.map((h) => `${h.days}: ${h.hours}`).join(' · ')}
            </p>
          )}
          <p>
            <Placeholder field={config.mapUrl} tone="dark">
              {(url) => (
                <a
                  href={url}
                  className="text-sky-light underline underline-offset-4"
                  target="_blank"
                  rel="noopener"
                >
                  Open in Google Maps
                </a>
              )}
            </Placeholder>
          </p>
        </address>

        <nav aria-label="Areas we serve">
          <h2 className="mb-3 flex flex-wrap items-center gap-2 font-heading text-sm font-bold tracking-[0.12em] text-white uppercase">
            Areas we serve
          </h2>
          <ul className="flex flex-wrap gap-2">
            {SERVICE_AREAS_TENTATIVE.map((area) => (
              <li key={area}>
                <Link
                  href={areaSlug(area)}
                  className="inline-flex min-h-9 items-center rounded-full border border-white/15 px-3 text-sm text-white/80 hover:border-white/40 hover:text-white"
                >
                  {area}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {year} <Placeholder field={config.legalName} tone="dark" />
            {config.showGstin && config.gstin.value ? <> · GSTIN {config.gstin.value}</> : null}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              Website by <span className="text-white/80">ITBIZone</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
