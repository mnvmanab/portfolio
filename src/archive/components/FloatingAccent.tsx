import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type FloatingAccentProps = {
  children: ReactNode
  /** Positioning classes. Use left/right/top offsets — NOT translate-*,
      because framer-motion writes its own transform and would override them. */
  className?: string
  /** Seconds to offset the bob so multiple accents aren't in sync. */
  delay?: number
  /** Bob travel distance in px. */
  distance?: number
  /** Seconds for one full bob cycle. */
  duration?: number
}

export default function FloatingAccent({
  children,
  className,
  delay = 0,
  distance = 12,
  duration = 4,
}: FloatingAccentProps) {
  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform' }}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}
