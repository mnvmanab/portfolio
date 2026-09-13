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
  comingSoon?: boolean
}

export const PROJECTS: Project[] = [
  {
    number: '01',
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
    number: '02',
    meta: 'UI/UX Design — 2026',
    title: 'TutorMe',
    description:
      'A tutoring app I designed end-to-end — onboarding, session booking, and the tutor discovery flow, built on a reusable component library.',
    bg: '#dfe7de',
    src: null,
    slotLabel: 'TutorMe — key screens',
    cta: 'View case study',
  },
  {
    number: '03',
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
