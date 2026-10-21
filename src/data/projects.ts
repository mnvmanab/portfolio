/**
 * Selected work shown in "Things I've made".
 *
 * Drop screenshots into public/assets/images/projects/ and set `src`;
 * null renders a labelled placeholder slot.
 */

export type Project = {
  number: string
  meta: string
  title: string
  description: string
  /** Card tint */
  bg: string
  /** Image path under public/assets/images/projects/ — null renders a slot */
  src: string | null
  /**
   * How the image sits in the slot. 'cover' (default) fills it and crops to
   * the top ~60%, which suits a tall mockup. 'contain' scales the whole
   * image down so nothing is cut — use it when the full screen matters more
   * than filling the slot.
   */
  fit?: 'cover' | 'contain'
  /**
   * Slot shape. 'portrait' (default) is the tall phone slot capped at 296px.
   * 'landscape' reshapes it to 16:9 and lets it use the card's content width,
   * for wide multi-device mockups that would be illegible at 296px.
   */
  slotShape?: 'portrait' | 'landscape'
  /**
   * Slot aspect, as `width / height`, for whichever shape the card uses.
   * Portrait defaults to '1742 / 2165' (the top 60% of a 1742 × 3609 mockup);
   * landscape defaults to '2000 / 1116'. Set it per card — a taller portrait
   * slot applied to every card pushes the placeholder into the card's link
   * on narrow screens.
   */
  slotRatio?: string
  slotLabel: string
  /** Link label; omitted for work that isn't viewable yet */
  cta?: string
  /**
   * Destination for the card. Hash routes (e.g. `#/tutorme`) open a case-study
   * view inside the SPA; absolute URLs open in a new tab. When omitted the
   * card is rendered as a plain (non-interactive) tile.
   */
  href?: string
  comingSoon?: boolean
}

export const PROJECTS: Project[] = [
  {
    number: '01',
    meta: 'iOS · Product design & engineering — 2022–Present',
    title: 'Employee Engagement App',
    description:
      "Ongoing UI/UX work on the company's iOS app. I spot the rough edges in live screens, redesign them, and ship the fix myself — a continuous loop of before-and-after improvements across the product.",
    bg: '#e4e6ec',
    // Wide before/after comparison, so it takes the landscape slot at its
    // own 2000 × 1237 rather than the tall phone slot.
    src: '/assets/images/projects/engagement-card.jpg',
    slotShape: 'landscape',
    slotRatio: '2000 / 1237',
    slotLabel: 'Redesigned screens',
    cta: 'View case study',
    href: '#/engagement',
  },
  {
    number: '02',
    meta: 'App · Landing page — 2026',
    title: 'SpendWise',
    description:
      'A privacy-first spending tracker. I designed and built the marketing site and the in-app budgeting surfaces — habit-to-goal flows, streak states, and the weekly budget ring.',
    bg: '#efe6d3',
    // Served out of public/spendwise/assets/. The card slot is 296×368 with
    // object-cover anchored to the top, so a full 1170×2532 screenshot shows
    // its top ~57% — logo, period toggle and the budget ring.
    // Wide two-phone mockup with a transparent background, so it gets the
    // landscape slot and floats on the card tint rather than sitting in a box.
    src: '/spendwise/assets/hero-card.png',
    slotShape: 'landscape',
    slotLabel: 'SpendWise — app screen',
    href: '#/spendwise',
    cta: 'View case study',
  },
  {
    number: '03',
    meta: 'UI/UX Design — 2026',
    title: 'Tutor Me',
    description:
      'A tutoring app I designed end-to-end — onboarding, session booking, and the tutor discovery flow, built on a reusable component library.',
    bg: '#dfe7de',
    // Served out of public/tutorme/assets/. The card uses the framed
    // iMockup export (with iPhone bezel) so the tile reads as a device;
    // the case study itself uses the naked 393×852 welcome.png inside
    // its own coded phone frames.
    src: '/tutorme/assets/welcome-card.png',
    // Taller than the default so 75% of the mockup shows (1742 × 2707 of
    // 1742 × 3609) — this card's art earns the extra height; the others
    // keep the 60% slot.
    slotRatio: '1742 / 2707',
    slotLabel: 'Tutor Me — key screens',
    cta: 'View case study',
    href: '#/tutorme',
  },
  {
    number: '04',
    meta: 'UI/UX Design — In progress',
    title: 'Coming Soon',
    description:
      'A new product design currently in progress. Case study, screens, and process notes landing here soon.',
    bg: '#e6e2ec',
    src: null,
    slotLabel: 'Coming soon',
    comingSoon: true,
  },
]
