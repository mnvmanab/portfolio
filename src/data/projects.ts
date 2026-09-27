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
    src: null,
    slotLabel: 'Redesigned screens',
  },
  {
    number: '02',
    meta: 'App · Landing page — 2026',
    title: 'SpendWise',
    description:
      'A privacy-first spending tracker. I designed and built the marketing site and the in-app budgeting surfaces — habit-to-goal flows, streak states, and the weekly budget ring.',
    bg: '#efe6d3',
    src: null,
    slotLabel: 'SpendWise — app screen',
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
