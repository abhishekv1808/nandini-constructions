import type { TierSlug } from './data/packages';

/** /packages "Not sure which package?" quiz (CLAUDE.md §6.2) — pure, unit-tested. */

export type BudgetAnswer = TierSlug | 'unsure';
export type FinishAnswer = TierSlug;
export type TimelineAnswer = 'soon' | 'months' | 'exploring';

export type QuizAnswers = {
  budget?: BudgetAnswer;
  finish?: FinishAnswer;
  timeline?: TimelineAnswer;
};

export type QuizResult = {
  tier: TierSlug;
  /** What decided it: the finish level, the budget, or the popular-tier default. */
  basis: 'finish' | 'budget' | 'default';
  /** Set when the budget points to a different tier than the finish level. */
  budgetTier?: TierSlug;
};

export const TIMELINE_LABELS: Record<TimelineAnswer, string> = {
  soon: 'Within 3 months',
  months: 'In 3–6 months',
  exploring: 'Just exploring',
};

export function isQuizComplete(a: QuizAnswers): a is Required<QuizAnswers> {
  return Boolean(a.budget && a.finish && a.timeline);
}

/**
 * The finish level the owner wants decides the tier (that's what the packages differ in); the
 * budget only flags a mismatch so an engineer can discuss which upgrades to keep.
 */
export function recommendTier(a: QuizAnswers, fallback: TierSlug): QuizResult {
  const budgetTier = a.budget && a.budget !== 'unsure' ? a.budget : undefined;
  if (a.finish) {
    return budgetTier && budgetTier !== a.finish
      ? { tier: a.finish, basis: 'finish', budgetTier }
      : { tier: a.finish, basis: 'finish' };
  }
  if (budgetTier) return { tier: budgetTier, basis: 'budget' };
  return { tier: fallback, basis: 'default' };
}

/** One-line summary sent with the lead so the engineer has the context. */
export function quizSummary(a: QuizAnswers, tierName: string): string {
  const parts = [`Package quiz → ${tierName}`];
  if (a.budget) parts.push(`budget: ${a.budget === 'unsure' ? 'not sure' : a.budget}`);
  if (a.finish) parts.push(`finish: ${a.finish}`);
  if (a.timeline) parts.push(`timeline: ${TIMELINE_LABELS[a.timeline]}`);
  return parts.join(' · ');
}
