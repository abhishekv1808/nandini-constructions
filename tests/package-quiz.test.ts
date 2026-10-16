import { describe, expect, it } from 'vitest';
import { INCLUDED_IN_ALL, TIERS, allowanceRows, changedRows, getSpecRow } from '@/lib/data/packages';
import { isQuizComplete, quizSummary, recommendTier } from '@/lib/package-quiz';

describe('package quiz', () => {
  it('lets the finish level decide the tier', () => {
    expect(recommendTier({ budget: 'premium', finish: 'premium' }, 'medium')).toEqual({
      tier: 'premium',
      basis: 'finish',
    });
  });

  it('flags a budget that points to a different tier', () => {
    expect(recommendTier({ budget: 'rental', finish: 'premium' }, 'medium')).toEqual({
      tier: 'premium',
      basis: 'finish',
      budgetTier: 'rental',
    });
    expect(recommendTier({ budget: 'unsure', finish: 'rental' }, 'medium').budgetTier).toBeUndefined();
  });

  it('falls back to the budget, then the default tier', () => {
    expect(recommendTier({ budget: 'rental' }, 'medium')).toEqual({ tier: 'rental', basis: 'budget' });
    expect(recommendTier({ budget: 'unsure' }, 'medium')).toEqual({ tier: 'medium', basis: 'default' });
  });

  it('requires all three answers and summarises them', () => {
    expect(isQuizComplete({ budget: 'rental', finish: 'rental' })).toBe(false);
    const answers = { budget: 'unsure', finish: 'medium', timeline: 'soon' } as const;
    expect(isQuizComplete(answers)).toBe(true);
    expect(quizSummary(answers, 'Medium Package')).toBe(
      'Package quiz → Medium Package · budget: not sure · finish: medium · timeline: Within 3 months',
    );
  });
});

describe('/packages derived data', () => {
  it('lists upgrades between tiers from the sheet', () => {
    const toPremium = changedRows('medium', 'premium').map((c) => c.row.key);
    expect(toPremium).toContain('cement');
    expect(toPremium).toContain('stairRailing');
    expect(toPremium).not.toContain('windows'); // ₹400/sq.ft in both
    expect(changedRows('rental', 'rental')).toEqual([]);
  });

  it('finds allowance rows and only references real spec keys', () => {
    expect(allowanceRows().map((r) => r.key)).toContain('mainDoor');
    expect(allowanceRows().map((r) => r.key)).not.toContain('cement');
    for (const key of INCLUDED_IN_ALL.flatMap((i) => i.specKeys)) {
      expect(() => getSpecRow(key)).not.toThrow();
    }
    expect(TIERS).toHaveLength(3);
  });
});
