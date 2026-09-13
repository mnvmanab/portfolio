import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
  style?: React.CSSProperties
}

type CharProps = {
  char: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block">
      {/* invisible placeholder keeps layout/spacing intact */}
      <span className="opacity-0">{char === ' ' ? ' ' : char}</span>
      <motion.span
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({
  text,
  className,
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => {
        const start = i / chars.length
        const end = start + 1 / chars.length
        return (
          <Char
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        )
      })}
    </p>
  )
}
