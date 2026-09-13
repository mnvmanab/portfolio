/**
 * Before/after UI fixes shown in the "Before & after" section.
 *
 * Image paths live under public/assets/images/projects/;
 * null renders a labelled placeholder slot.
 */

export type Case = {
  number: string
  title: string
  description: string
  /** Image paths under public/assets/images/projects/ — null renders a slot */
  before: string | null
  after: string | null
  /**
   * The design shows a metric here (e.g. "+31%" / "COMPLETION RATE").
   * Left unset — add real figures only, e.g.
   *   result: { value: '+31%', label: 'Completion rate' }
   */
  result?: { value: string; label: string }
}

export const CASES: Case[] = [
  {
    number: '01',
    title: 'Checkout Flow',
    description:
      'A cluttered multi-step checkout, reduced to a single-tap flow.',
    before: null,
    after: null,
  },
  {
    number: '02',
    title: 'Onboarding',
    description:
      'A confusing sign-up replaced by three guided steps with clear progress.',
    before: null,
    after: null,
  },
  {
    number: '03',
    title: 'Home Dashboard',
    description:
      'A dense wall of data reorganised into a scannable card layout.',
    before: null,
    after: null,
  },
]
