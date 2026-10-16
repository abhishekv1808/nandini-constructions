import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/data/services';
import { cn } from '@/lib/utils';
import { SERVICE_ICONS } from './service-icons';

/** Service summary card (/services grid, "other services" rows). Photo when we have a real one. */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const Icon = SERVICE_ICONS[service.slug];
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white transition-shadow duration-300 hover:border-brand/40 hover:shadow-xl',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
        {service.image ? (
          <Image
            src={service.image.src}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              'object-cover transition-transform duration-700 group-hover:scale-[1.04]',
              service.image.position,
            )}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_100%_0%,rgba(9,147,216,0.35),transparent_60%),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px]"
          >
            <Icon
              className="size-24 text-sky-light/70 transition-transform duration-700 group-hover:scale-[1.06]"
              strokeWidth={0.75}
            />
          </div>
        )}
        <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-xl bg-white/95 text-charcoal shadow-sm">
          <Icon className="size-5" strokeWidth={1.5} aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="text-lg font-extrabold">{service.title}</h3>
        <p className="text-[0.9375rem] text-ink/70">{service.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-sm font-semibold text-brand-dark">Explore</span>
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand"
          >
            <ArrowUpRightIcon className="size-5" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </Link>
  );
}
