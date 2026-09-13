/**
 * Site-wide identity, links and hero copy.
 *
 * There is deliberately no email address here — contact routes through
 * LinkedIn so no inbox is exposed on a public page.
 *
 * TODO (placeholders that still need real values):
 *   - The third hero stat ('India / IST') is a placeholder for your city.
 */

export const LINKEDIN_URL =
  'https://www.linkedin.com/in/manab-jyoti-gogoi-861953222/'

/** Primary nav in the hero. */
export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/** Three-up stat row under the hero copy. */
export const HERO_STATS = [
  // Matches the "4+ YEARS" the experience section computes from ROLES.
  // If you edit a role's dates, update this by hand too.
  { value: '4', suffix: '+', label: 'Years shipping' },
  { value: 'B2B', suffix: ' & SaaS', label: 'Domain' },
  // ← replace with your city / timezone
  { value: 'India', suffix: '', label: 'IST' },
]

/** Portrait on the hero lanyard badge. null renders a labelled slot. */
export const BADGE_PHOTO: string | null = '/assets/images/profile-photo.jpeg'

export const BADGE_NAME = 'Manab Jyoti Gogoi'
export const BADGE_ROLE = 'iOS ENGINEER & DESIGNER'

/** Footer links. GitHub and Dribbble are intentionally commented out. */
export const SOCIALS = [
  // { label: 'GitHub', href: 'https://github.com/mnvmanab' }, // hidden for now
  // { label: 'Dribbble', href: '#' }, // hidden for now
  { label: 'LinkedIn', href: LINKEDIN_URL },
]

/** Set false to drop the green availability line in the contact section. */
export const SHOW_AVAILABILITY = true
