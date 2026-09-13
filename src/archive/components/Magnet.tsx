import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type MagnetProps = {
  children: ReactNode
  /** Distance (px) from the element edge at which the magnet activates. */
  padding?: number
  /** Higher = weaker pull (displacement is divided by this). */
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
  style?: React.CSSProperties
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      // Activate when cursor is within `padding` of the element edges.
      const withinX = Math.abs(distX) < rect.width / 2 + padding
      const withinY = Math.abs(distY) < rect.height / 2 + padding

      if (withinX && withinY) {
        setActive(true)
        setOffset({ x: distX / strength, y: distY / strength })
      } else {
        setActive(false)
        setOffset({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [padding, strength])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
