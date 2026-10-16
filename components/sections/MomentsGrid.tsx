'use client';

import {
  ArrowUpRightIcon,
  HardHatIcon,
  KeyRoundIcon,
  MapPinIcon,
  PlayIcon,
  SproutIcon,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useState, type MouseEvent } from 'react';
import { InstagramIcon } from '@/components/site/icons';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import {
  MOMENT_KINDS,
  instagramEmbedUrl,
  instagramPostUrl,
  type InstagramMoment,
  type MomentKind,
} from '@/lib/data/instagram';
import { cn } from '@/lib/utils';

const KIND_STYLE: Record<MomentKind, { Icon: LucideIcon; card: string; icon: string }> = {
  'bhoomi-pooja': { Icon: SproutIcon, card: 'bg-brand-soft text-ink', icon: 'text-brand-dark' },
  'gruha-pravesha': { Icon: KeyRoundIcon, card: 'bg-charcoal text-white', icon: 'text-sky-light' },
  construction: { Icon: HardHatIcon, card: 'bg-sand text-ink', icon: 'text-ink/60' },
};

const kindLabel = (kind: MomentKind) => MOMENT_KINDS.find((k) => k.value === kind)?.label ?? kind;

function MomentCard({
  moment,
  poster,
  onOpen,
}: {
  moment: InstagramMoment;
  poster?: string;
  onOpen: (event: MouseEvent<HTMLAnchorElement>, moment: InstagramMoment) => void;
}) {
  const style = KIND_STYLE[moment.kind];
  const dark = Boolean(poster) || moment.kind === 'gruha-pravesha';
  return (
    <a
      href={instagramPostUrl(moment.code)}
      target="_blank"
      rel="noopener"
      onClick={(e) => onOpen(e, moment)}
      className={cn(
        'group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-(--radius-card) p-4 transition-shadow hover:shadow-lg focus-visible:outline-offset-4 md:p-5',
        poster ? 'bg-ink text-white' : style.card,
      )}
    >
      {poster ? (
        <>
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 30vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,23,28,0.85),rgba(20,23,28,0.1)_55%,rgba(20,23,28,0.35))]" />
        </>
      ) : (
        <style.Icon
          aria-hidden
          strokeWidth={1}
          className={cn('absolute -right-6 -bottom-6 size-40 opacity-15 md:size-48', style.icon)}
        />
      )}

      <span className="relative flex items-center justify-between gap-2">
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide uppercase',
            dark ? 'bg-white/15 text-white' : 'bg-white text-ink',
          )}
        >
          {kindLabel(moment.kind)}
        </span>
        <InstagramIcon className={cn('size-5', dark ? 'text-white/80' : 'text-ink/50')} />
      </span>

      <span className="relative space-y-2">
        <span
          className={cn(
            'flex size-12 items-center justify-center rounded-full shadow-md transition-transform group-hover:scale-110',
            dark ? 'bg-white text-ink' : 'bg-brand text-white',
          )}
        >
          <PlayIcon className="ml-0.5 size-5 fill-current" aria-hidden />
        </span>
        <span className="block font-heading text-[0.9375rem] leading-snug font-bold md:text-lg">
          {moment.title}
        </span>
        {moment.place && (
          <span
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              dark ? 'text-white/75' : 'text-ink/65',
            )}
          >
            <MapPinIcon className="size-3.5" strokeWidth={1.5} aria-hidden />
            {moment.place}
          </span>
        )}
        <span className="sr-only">— watch video</span>
      </span>
    </a>
  );
}

type Filter = 'all' | MomentKind;

/**
 * Filterable grid of Instagram reels. Cards are real links to the post (work without JS); with JS
 * they open Instagram's official embed in a dialog. No Instagram code loads until a visitor taps.
 */
const MOBILE_VISIBLE = 6;

export function MomentsGrid({
  moments,
  posters,
}: {
  moments: InstagramMoment[];
  posters: Record<string, string>;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState<InstagramMoment | null>(null);
  // Phones show the first few videos; the rest are one tap away (keeps the page short).
  const [expanded, setExpanded] = useState(false);
  const visible = filter === 'all' ? moments : moments.filter((m) => m.kind === filter);

  const open = (event: MouseEvent<HTMLAnchorElement>, moment: InstagramMoment) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return; // allow new-tab
    event.preventDefault();
    setActive(moment);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter videos">
        {([{ value: 'all', label: 'All' }, ...MOMENT_KINDS] as { value: Filter; label: string }[]).map(
          (f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors',
                filter === f.value
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-white text-ink hover:border-ink/40',
              )}
            >
              {f.label}
            </button>
          ),
        )}
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {visible.map((m, i) => (
          <li key={m.code} className={cn(i >= MOBILE_VISIBLE && !expanded && 'max-md:hidden')}>
            <MomentCard moment={m} poster={posters[m.code]} onOpen={open} />
          </li>
        ))}
      </ul>
      {visible.length > MOBILE_VISIBLE && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full border border-ink/20 bg-white text-sm font-semibold text-ink md:hidden"
        >
          Show all {visible.length} videos
        </button>
      )}

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-[26rem] overflow-visible p-0" closeLabel="Close video">
          {active && (
            <>
              <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
                <div>
                  <DialogTitle>{active.title}</DialogTitle>
                  <DialogDescription>
                    {kindLabel(active.kind)}
                    {active.place ? ` · ${active.place}` : ''}
                  </DialogDescription>
                </div>
              </div>
              <iframe
                key={active.code}
                src={instagramEmbedUrl(active.code)}
                title={`Instagram video: ${active.title}`}
                className="block h-[min(72svh,40rem)] w-full border-0 bg-sand"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
              <a
                href={instagramPostUrl(active.code)}
                target="_blank"
                rel="noopener"
                className="flex min-h-12 items-center justify-center gap-1.5 rounded-b-2xl text-sm font-semibold text-brand-dark hover:bg-sand"
              >
                Open on Instagram <ArrowUpRightIcon className="size-4" strokeWidth={1.5} aria-hidden />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
