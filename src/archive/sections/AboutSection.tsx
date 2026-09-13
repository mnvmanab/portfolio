import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import FadeIn from '../../components/common/FadeIn'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'

const BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7'

const ABOUT_TEXT =
  "Hey I'm Manab, An Engineer turned Designer with over 4+ years of experience in B2B & SaaS."

type ParallaxObjectProps = {
  progress: MotionValue<number>
  src: string
  className: string
  /** [start, end] vertical drift in px across the section's scroll range. */
  yRange: [number, number]
  /** [start, end] rotation in degrees across the section's scroll range. */
  rotateRange: [number, number]
}

function ParallaxObject({
  progress,
  src,
  className,
  yRange,
  rotateRange,
}: ParallaxObjectProps) {
  const y = useTransform(progress, [0, 1], yRange)
  const rotate = useTransform(progress, [0, 1], rotateRange)
  return (
    <motion.img
      src={src}
      alt=""
      draggable={false}
      style={{ y, rotate, willChange: 'transform' }}
      className={className}
    />
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  // Progress runs 0 → 1 while the section travels through the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative corner objects — parallax drift + rotate on scroll */}
      <ParallaxObject
        progress={scrollYProgress}
        src={`${BASE}/moon_icon.11395d36.png`}
        yRange={[110, -110]}
        rotateRange={[-25, 15]}
        className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] select-none sm:w-[160px] md:w-[210px]"
      />

      <ParallaxObject
        progress={scrollYProgress}
        src={`${BASE}/lego_icon-1.703bb594.png`}
        yRange={[-80, 80]}
        rotateRange={[20, -20]}
        className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] select-none sm:w-[160px] md:w-[210px]"
      />

      <ParallaxObject
        progress={scrollYProgress}
        src={`${BASE}/p59_1.4659672e.png`}
        yRange={[90, -90]}
        rotateRange={[-18, 22]}
        className="pointer-events-none absolute bottom-[8%] left-[3%] select-none sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
      />

      <ParallaxObject
        progress={scrollYProgress}
        src={`${BASE}/Group_134-1.2e04f3ce.png`}
        yRange={[-100, 100]}
        rotateRange={[25, -20]}
        className="pointer-events-none absolute bottom-[8%] right-[3%] select-none sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]"
      />

      {/* Content */}
      <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="text-center font-medium leading-relaxed text-[#D7E2EA] max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0} y={30}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
