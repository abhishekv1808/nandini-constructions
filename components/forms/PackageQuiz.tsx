'use client';

import { ArrowRightIcon, CheckIcon, RotateCcwIcon, SparklesIcon } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import { formatRate, type Tier, type TierSlug } from '@/lib/data/packages';
import {
  TIMELINE_LABELS,
  isQuizComplete,
  quizSummary,
  recommendTier,
  type BudgetAnswer,
  type FinishAnswer,
  type QuizAnswers,
  type TimelineAnswer,
} from '@/lib/package-quiz';
import { cn } from '@/lib/utils';
import { LeadForm } from './LeadForm';

type Option<T extends string> = { value: T; label: string; hint?: string };

const FINISH_COPY: Record<TierSlug, { label: string; hint: string }> = {
  rental: { label: 'Solid & functional', hint: 'It’s for rent or investment' },
  medium: { label: 'Good branded materials', hint: 'A family home that lasts' },
  premium: { label: 'Top brands & premium finishes', hint: 'No compromise on details' },
};

function Choice<T extends string>({
  name,
  legend,
  step,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  step: number;
  options: Option<T>[];
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-2 font-heading font-bold text-ink">
        <span
          aria-hidden="true"
          className={cn(
            'grid size-6 place-items-center rounded-full text-xs',
            value ? 'bg-success text-white' : 'bg-ink text-white',
          )}
        >
          {value ? <CheckIcon className="size-3.5" strokeWidth={2.5} /> : step}
        </span>
        {legend}
      </legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              'flex min-h-14 cursor-pointer flex-col justify-center rounded-xl border px-3 py-2 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand sm:px-4',
              value === o.value ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/40',
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span className="text-sm leading-snug font-semibold sm:text-[0.9375rem]">{o.label}</span>
            {o.hint && (
              <span className={cn('text-xs', value === o.value ? 'text-white/75' : 'text-ink/60')}>
                {o.hint}
              </span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * §6.2 "Not sure which package?" — 3 questions (budget, finish level, timeline) → recommended
 * tier → short lead form with the package and answers attached. Logic in lib/package-quiz.ts.
 */
export function PackageQuiz({
  tiers,
  defaultTier,
  trust,
}: {
  tiers: Tier[];
  defaultTier: TierSlug;
  trust?: ReactNode;
}) {
  const uid = useId();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const set =
    <K extends keyof QuizAnswers>(key: K) =>
    (v: NonNullable<QuizAnswers[K]>) =>
      setAnswers((a) => ({ ...a, [key]: v }));

  const budgetOptions: Option<BudgetAnswer>[] = [
    ...tiers.map((t, i) => ({
      value: t.slug,
      label:
        i === tiers.length - 1
          ? `${formatRate(t.ratePerSqft)} or more`
          : `Around ${formatRate(t.ratePerSqft)}`,
    })),
    { value: 'unsure', label: 'Not sure yet' },
  ];
  const finishOptions: Option<FinishAnswer>[] = tiers.map((t) => ({ value: t.slug, ...FINISH_COPY[t.slug] }));
  const timelineOptions: Option<TimelineAnswer>[] = (
    Object.entries(TIMELINE_LABELS) as [TimelineAnswer, string][]
  ).map(([value, label]) => ({ value, label }));

  const answered = [answers.budget, answers.finish, answers.timeline].filter(Boolean).length;
  const complete = isQuizComplete(answers);
  const result = recommendTier(answers, defaultTier);
  const tier = tiers.find((t) => t.slug === result.tier);
  const budgetTier = result.budgetTier ? tiers.find((t) => t.slug === result.budgetTier) : undefined;

  return (
    <div className="grid overflow-hidden rounded-[24px] border border-line bg-white lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="space-y-7 p-5 md:p-8">
        <Choice
          name={`${uid}-finish`}
          step={1}
          legend="What finish level do you want?"
          options={finishOptions}
          value={answers.finish}
          onChange={set('finish')}
        />
        <Choice
          name={`${uid}-budget`}
          step={2}
          legend="What budget per sq.ft are you planning?"
          options={budgetOptions}
          value={answers.budget}
          onChange={set('budget')}
        />
        <Choice
          name={`${uid}-timeline`}
          step={3}
          legend="When do you want to start?"
          options={timelineOptions}
          value={answers.timeline}
          onChange={set('timeline')}
        />
      </div>

      <div
        className={cn('flex flex-col gap-5 bg-sand p-5 md:p-8', !complete && 'max-lg:hidden')}
        aria-live="polite"
      >
        {complete && tier ? (
          <>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-brand-dark uppercase">
                <SparklesIcon className="size-4" strokeWidth={1.5} aria-hidden /> Our suggestion
              </p>
              <p className="font-heading text-3xl font-extrabold">{tier.name}</p>
              <p className="font-heading text-xl font-bold text-brand-dark">{formatRate(tier.ratePerSqft)}</p>
              <ul className="space-y-1.5 pt-1">
                {tier.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex gap-2 text-[0.9375rem] text-ink/85">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-success" strokeWidth={2} aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              {budgetTier && (
                <p className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink/80">
                  Your budget is closer to <strong className="text-ink">{budgetTier.shortName}</strong> (
                  {formatRate(budgetTier.ratePerSqft)}). Our engineer can suggest which upgrades to keep
                  within it.
                </p>
              )}
              <a
                href={`#tier-${tier.slug}`}
                className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline"
              >
                See the full {tier.shortName} package <ArrowRightIcon className="size-4" strokeWidth={1.5} />
              </a>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <p className="mb-4 font-heading font-bold">Get a free quote for the {tier.shortName} package</p>
              <LeadForm
                key={tier.slug}
                formType="package"
                packageInterest={tier.slug}
                context={quizSummary(answers, tier.name)}
                trust={trust}
                submitLabel="Get my free quote"
              />
            </div>
            <button
              type="button"
              onClick={() => setAnswers({})}
              className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-ink/70 hover:text-ink"
            >
              <RotateCcwIcon className="size-4" strokeWidth={1.5} aria-hidden /> Start again
            </button>
          </>
        ) : (
          <div className="my-auto space-y-3 text-center">
            <p className="font-heading text-5xl font-extrabold text-ink/20 tabular-nums">{answered}/3</p>
            <p className="font-heading text-lg font-bold">Answer three quick questions</p>
            <p className="text-sm text-ink/70">
              We’ll suggest the package that fits — then an engineer can confirm it for your plot.
            </p>
            <div className="mx-auto h-1.5 max-w-48 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div
                className="h-full rounded-full bg-sky transition-[width] duration-300"
                style={{ width: `${(answered / 3) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
