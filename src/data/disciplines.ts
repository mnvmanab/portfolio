import type { LucideIcon } from 'lucide-react'
import { Smartphone, PenTool, Component, Layers, Sparkles } from 'lucide-react'
import { ACCENT_WARM as ACCENT } from './theme'

/** The five cards in "What I bring to the table". */

export type Discipline = {
  number: string
  category: string
  title: string
  description: string
  Icon: LucideIcon
  bg: string
  fg: string
  /** light cards need a hairline to read against the paper */
  bordered?: boolean
}

export const DISCIPLINES: Discipline[] = [
  {
    number: '01',
    category: 'Mobile',
    title: 'iOS Development',
    description:
      'Native apps in Swift & SwiftUI — fast, reliable, App Store–ready.',
    Icon: Smartphone,
    bg: '#14110e',
    fg: '#f4f1ea',
  },
  {
    number: '02',
    category: 'Product',
    title: 'UI/UX Design',
    description:
      'End-to-end product design, from wireframes to polished interfaces.',
    Icon: PenTool,
    bg: ACCENT,
    fg: '#fdf1ec',
  },
  {
    number: '03',
    category: 'Systems',
    title: 'Design Systems',
    description:
      'Component libraries and tokens that keep design and code in sync.',
    Icon: Component,
    bg: '#e8dfcd',
    fg: '#14110e',
  },
  {
    number: '04',
    category: 'Validation',
    title: 'Prototyping',
    description:
      'Interactive prototypes that validate ideas before code is written.',
    Icon: Layers,
    bg: '#fffdf8',
    fg: '#14110e',
    bordered: true,
  },
  {
    number: '05',
    category: 'Motion',
    title: 'Motion & Interaction',
    description:
      'Thoughtful animations and micro-interactions that make apps feel alive.',
    Icon: Sparkles,
    bg: '#d8cfc0',
    fg: '#14110e',
  },
]
