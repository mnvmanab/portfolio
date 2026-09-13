import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Tag = 'div' | 'nav' | 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'section'

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  /** Starting scale; animates to 1. Defaults to 1 (no scaling). */
  scale?: number
  /** Element tag to render, e.g. 'div', 'h1', 'p'. Defaults to 'div'. */
  as?: Tag
  className?: string
  style?: React.CSSProperties
}

const easing = [0.25, 0.1, 0.25, 1] as const

// Pre-created motion components. These must be stable references — creating
// them inside render (e.g. motion.create(as)) makes a new component type every
// render, which leaves the animation stuck at its initial state.
const MOTION_TAGS = {
  div: motion.div,
  nav: motion.nav,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  section: motion.section,
} as const

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  scale = 1,
  as = 'div',
  className,
  style,
}: FadeInProps) {
  const MotionTag = MOTION_TAGS[as]

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: easing }}
    >
      {children}
    </MotionTag>
  )
}
