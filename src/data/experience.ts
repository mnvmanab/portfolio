/**
 * Work history, newest first.
 *
 * `from`/`to` drive the computed duration label in the experience section —
 * keep them in sync with `dates` when you edit either.
 */

export type Role = {
  company: string
  title: string
  /** [year, monthIndex] — monthIndex is 0-based, so 6 = July */
  from: [number, number]
  /** null = still there */
  to: [number, number] | null
  dates: string
  /** Logo path under public/assets/logos/ — null renders a labelled slot */
  logo: string | null
}

export const ROLES: Role[] = [
  {
    company: 'Vantage Circle',
    title: 'Software Engineer — II (iOS)',
    from: [2022, 11],
    to: null,
    dates: 'Dec 2022 — Present',
    logo: '/assets/logos/vantage-circle.png',
  },
  {
    company: 'Geekworkx',
    title: 'Software Engineer — Intern',
    from: [2019, 0],
    to: [2019, 5],
    dates: 'Jan 2019 — Jun 2019',
    logo: '/assets/logos/geekworkx.png',
  },
]
