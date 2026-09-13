/**
 * Colour tokens shared across sections.
 *
 * NOTE: there are genuinely TWO terracotta accents in the design — the hero and
 * disciplines sections use a slightly warmer one than the paper sheets below
 * them. Both values are kept verbatim; collapsing them into one would change
 * the page's appearance.
 */

/** Paper sheets: experience, projects, before & after, contact. */
export const ACCENT = '#b03d27'

/** Hero and disciplines — a touch warmer than ACCENT. */
export const ACCENT_WARM = '#c2452d'

/** Ink, body copy and paper tones, for reference when adding new sections. */
export const COLORS = {
  ink: '#14110e',
  body: '#57524a',
  muted: '#6f695f',
  paper: '#f4f1ea',
  paperLight: '#faf8f3',
  paperSheet: '#f7f5f0',
  band: '#e9e7e2',
  rule: '#ded8cc',
  ruleStrong: '#cfc7b8',
} as const
