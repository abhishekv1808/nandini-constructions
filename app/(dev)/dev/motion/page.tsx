import type { Metadata } from 'next';
import { CountUp } from '@/components/motion/CountUp';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { PinnedProgressDemo, PinnedTimelineDemo, ReducedMotionToggle } from './demos';

export const metadata: Metadata = { title: 'Motion primitives' };

function DemoHeader({ name, note }: { name: string; note: string }) {
  return (
    <div className="mb-6 space-y-1">
      <p className="font-mono text-sm font-semibold text-brand-dark">{name}</p>
      <p className="text-sm text-ink/70">{note}</p>
    </div>
  );
}

/** /dev/motion — every primitive from CLAUDE.md §3.7, plus the reduced-motion override. */
export default function MotionDevPage() {
  return (
    <>
      <div className="sticky top-(--header-h) z-(--z-scene) border-b border-line bg-sand/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 md:px-6">
          <ReducedMotionToggle />
        </div>
      </div>

      <section className="mx-auto max-w-5xl space-y-6 px-4 py-14 md:px-6">
        <DemoHeader
          name="<SplitHeading immediate>"
          note="Hero mode: pure CSS stagger from first paint. Screen readers get the sr-only sentence once."
        />
        <SplitHeading
          as="h1"
          immediate
          accent="home"
          text="Watch your home rise, one floor at a time."
          className="text-4xl font-extrabold md:text-6xl"
          accentClassName="text-brand-dark"
        />
        <p className="text-sm text-ink/70">
          The header&apos;s bottom edge shows <code className="font-mono">&lt;ScrollProgress&gt;</code>.
          Scroll to see it fill.
        </p>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
          <DemoHeader
            name="<Reveal>"
            note="Fade-up 16px, 0.5s, once. Configurable y / x / delay / duration."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal className="rounded-(--radius-card) bg-white p-6">Default (y=16)</Reveal>
            <Reveal y={40} delay={120} className="rounded-(--radius-card) bg-white p-6">
              y=40, delay=120ms
            </Reveal>
            <Reveal x={-24} y={0} delay={240} duration={800} className="rounded-(--radius-card) bg-white p-6">
              x=-24, 800ms
            </Reveal>
          </div>
          <div className="mt-10">
            <SplitHeading
              text="Scroll-triggered split heading (viewport entry)."
              className="text-3xl font-extrabold"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6">
        <DemoHeader
          name="<CountUp>"
          note="Values are the real package rates from CLAUDE.md §8. SSR renders the final value; counts once on entry."
        />
        <dl className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Rental', value: 1850 },
            { label: 'Medium', value: 2100 },
            { label: 'Premium', value: 2300 },
          ].map((p) => (
            <div key={p.label} className="rounded-(--radius-card) border border-line p-6">
              <dt className="text-sm font-semibold text-ink/70">{p.label} package</dt>
              <dd className="font-heading text-4xl font-extrabold">
                <CountUp value={p.value} prefix="₹" suffix="/sq.ft" />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 md:px-6">
        <DemoHeader
          name="<ParallaxImage>"
          note="≤8% y-offset, oversized frame (no gaps / CLS). Off below 768px and with reduced motion."
        />
        <ParallaxImage
          src="/dev/parallax-demo.svg"
          alt="Placeholder illustration of buildings (dev only)"
          unoptimized
          className="aspect-[16/9] rounded-(--radius-card)"
          sizes="(min-width: 1024px) 960px, 100vw"
        />
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-6 md:px-6">
        <DemoHeader
          name="<PinnedScene> (render prop)"
          note="300vh desktop / 150vh mobile, CSS sticky with reserved height. Stage buttons use scrollToProgress()."
        />
      </div>
      <PinnedProgressDemo />

      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <DemoHeader
          name="<PinnedScene timeline>"
          note="Layers scrubbed by a lazily-loaded GSAP timeline — no React re-render per frame."
        />
      </div>
      <PinnedTimelineDemo />

      <section id="after-pins" className="mx-auto max-w-5xl px-4 py-24 md:px-6">
        <Reveal>
          <h2 className="text-3xl font-extrabold">End of demos</h2>
          <p className="mt-2 text-ink/70">
            Check: no jump when the pinned sections initialise, header CTA always on top, mobile bar after
            300px.
          </p>
        </Reveal>
      </section>
    </>
  );
}
