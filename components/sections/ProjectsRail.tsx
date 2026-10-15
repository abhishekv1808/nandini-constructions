'use client';

import { ArrowRightIcon, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PinnedScene } from '@/components/motion/PinnedScene';
import { Badge } from '@/components/ui/badge';
import type { SampleProject } from '@/lib/data/home';
import { cn } from '@/lib/utils';

type Filter = 'all' | SampleProject['type'];
const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interiors' },
];

function ProjectCard({ project, packageName }: { project: SampleProject; packageName?: string }) {
  return (
    <article className="group flex h-full w-[80vw] max-w-[22rem] shrink-0 snap-start flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white md:w-[24rem] md:max-w-none">
      <div className="relative aspect-[4/3] overflow-hidden bg-[repeating-linear-gradient(135deg,#F5F4FA_0_14px,#ECEAF5_14px_28px)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink/50 transition-transform duration-500 group-hover:scale-[1.04]">
          <ImageIcon className="size-8" strokeWidth={1.25} aria-hidden />
          <span className="text-xs font-semibold">Project photo — awaiting client</span>
        </div>
        <Badge variant="dark" className="absolute top-3 left-3">
          SAMPLE — not a real project
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="neutral" className="capitalize">
            {project.type}
          </Badge>
          <Badge variant={project.status === 'completed' ? 'success' : 'brand'} className="capitalize">
            {project.status}
          </Badge>
          {packageName && <Badge variant="brand">{packageName}</Badge>}
        </div>
        <h3 className="text-lg font-bold">{project.title}</h3>
        <dl className="mt-auto grid grid-cols-3 gap-2 text-sm">
          <div>
            <dt className="text-ink/55">Floors</dt>
            <dd className="font-semibold">{project.floors}</dd>
          </div>
          <div>
            <dt className="text-ink/55">Built-up</dt>
            <dd className="font-semibold">{project.builtUpSqft.toLocaleString('en-IN')} sq.ft</dd>
          </div>
          <div>
            <dt className="text-ink/55">Locality</dt>
            <dd className="font-semibold">{project.locality}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/**
 * §6.1 #6 / §3.7 — pinned horizontal gallery on desktop (track translateX driven by the scene's
 * `--p`, no React re-render), native swipe carousel on mobile.
 */
export function ProjectsRail({
  projects,
  packageNames,
}: {
  projects: SampleProject[];
  packageNames: Record<string, string>;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const visible = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => setShift(Math.max(0, track.scrollWidth - viewport.clientWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);
    measure();
    return () => ro.disconnect();
  }, [visible.length]);

  return (
    <PinnedScene
      id="projects"
      label="Featured projects"
      // Pin only as long as the horizontal travel needs (no dead scroll when every card fits).
      // Measured after mount while the section is still far below the fold, so no visible shift.
      heightDesktop={shift > 0 ? 160 : 100}
      mobile="static"
      className="bg-sand"
      innerClassName="pt-(--header-h)"
      skip={{ href: '#how-it-works', label: 'Skip' }}
      cta={
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-semibold text-white"
        >
          View all projects <ArrowRightIcon className="size-4" strokeWidth={1.5} />
        </Link>
      }
    >
      <div className="flex h-full flex-col justify-center gap-8 py-14 md:py-0">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 md:flex-row md:items-end md:justify-between md:px-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold tracking-[0.16em] text-brand-dark uppercase">
              Featured projects
            </p>
            <h2 className="text-3xl font-extrabold md:text-4xl">Homes and spaces we’ve built</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
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
            ))}
          </div>
        </div>

        <div
          ref={viewportRef}
          className="[scrollbar-width:none] overflow-x-auto overscroll-x-contain px-4 max-md:snap-x max-md:snap-mandatory md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] motion-ok:md:overflow-visible"
        >
          <div
            ref={trackRef}
            className="rail-track flex w-max gap-4 pb-2 md:gap-6"
            style={{ '--rail-shift': shift } as CSSProperties}
          >
            {visible.map((p) => (
              <ProjectCard
                key={p.slug}
                project={p}
                packageName={p.packageSlug ? packageNames[p.packageSlug] : undefined}
              />
            ))}
            {visible.length === 0 && <p className="py-10 text-ink/60">No projects in this category yet.</p>}
          </div>
        </div>
      </div>
    </PinnedScene>
  );
}
