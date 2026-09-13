import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import FadeIn from '../../components/common/FadeIn'
import LiveProjectButton from '../components/LiveProjectButton'

type Cta = { label: string; href?: string; disabled?: boolean }

type Slot = { src: string | null; label: string }

type Project = {
  number: string
  category: string
  year: string
  name: string
  description: string
  tags: string[]
  cta: Cta
  comingSoon?: boolean
  /** Large primary visual on the left. */
  main: Slot
  /** Right-hand panel: a small labelled slot plus a caption. */
  side: {
    label: string
    slot: Slot
    captionTitle: string
    captionSubtitle: string
  }
}

// Drop real images into public/assets/images/projects/ and replace the `src: null` values.
const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'App · Landing Page',
    year: '2026',
    name: 'SpendWise',
    description:
      'A privacy-first spending tracker. I designed and built the marketing site and the in-app budgeting surfaces — habit-to-goal flows, streak states, and the weekly budget ring.',
    tags: ['SwiftUI', 'Figma', 'Motion'],
    cta: { label: 'Live Site', href: undefined }, // ← add landing page URL
    main: { src: null, label: 'Landing page — full view' },
    side: {
      label: 'Logo',
      slot: { src: null, label: 'Logo' },
      captionTitle: 'Wordmark & app icon',
      captionSubtitle: 'Geometric grotesk · single-weight',
    },
  },
  {
    number: '02',
    category: 'UI/UX Design',
    year: '2026',
    name: 'TutorMe',
    description:
      'A tutoring app I designed end-to-end — onboarding, session booking, and the tutor discovery flow, built on a reusable component library.',
    tags: ['Figma', 'Prototyping', 'Design System'],
    cta: { label: 'View Design', href: undefined }, // ← add Figma/Dribbble URL
    main: { src: null, label: 'Key screens — full view' },
    side: {
      label: 'Logo',
      slot: { src: null, label: 'Logo' },
      captionTitle: 'Identity & app icon',
      captionSubtitle: 'Rounded sans · two-weight',
    },
  },
  {
    number: '03',
    category: 'UI/UX Design',
    year: '2026',
    name: 'Coming Soon',
    description:
      'A new product design currently in progress. Case study, screens, and process notes landing here soon.',
    tags: ['Figma', 'UI Design'],
    cta: { label: 'Coming Soon', disabled: true },
    comingSoon: true,
    main: { src: null, label: 'Coming soon' },
    side: {
      label: 'Logo',
      slot: { src: null, label: 'Coming soon' },
      captionTitle: 'Identity in progress',
      captionSubtitle: 'Details to follow',
    },
  },
]

const CARD_RADIUS = 'rounded-[32px] sm:rounded-[40px] md:rounded-[48px]'
const PANEL_RADIUS = 'rounded-[20px] sm:rounded-[26px]'

/** Renders a real image when `src` is set, otherwise a labelled dashed slot. */
function Media({
  slot,
  className,
  style,
  compact = false,
}: {
  slot: Slot
  className?: string
  style?: React.CSSProperties
  compact?: boolean
}) {
  if (slot.src) {
    return (
      <img
        src={slot.src}
        alt={slot.label}
        loading="lazy"
        className={`${PANEL_RADIUS} h-full w-full object-cover ${className ?? ''}`}
        style={style}
      />
    )
  }

  return (
    <div
      className={`${PANEL_RADIUS} flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.025] ${className ?? ''}`}
      style={style}
    >
      <ImageIcon
        className={compact ? 'h-5 w-5' : 'h-7 w-7'}
        strokeWidth={1.25}
        color="#D7E2EA"
        opacity={0.25}
      />
      <span
        className={`px-4 text-center font-medium uppercase tracking-[0.18em] text-[#D7E2EA]/30 ${
          compact ? 'text-[0.6rem]' : 'text-[0.65rem] sm:text-xs'
        }`}
      >
        {slot.label}
      </span>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={containerRef} className="flex h-[85vh] items-start justify-center">
      {/* Never set opacity on the card itself — a translucent card lets the
          previous sticky card show through during the stacking overlap. */}
      <motion.div
        className={`${CARD_RADIUS} sticky w-full border bg-[#0C0C0C] p-5 sm:p-7 md:p-9 ${
          project.comingSoon
            ? 'border-[#D7E2EA]/8'
            : 'border-[#D7E2EA]/15'
        }`}
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        {/* ── Header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black leading-none"
              style={{
                fontSize: 'min(clamp(2.5rem, 9vw, 132px), 11vh)',
                backgroundImage:
                  'linear-gradient(180deg, #FFFFFF 0%, #C9D2DA 45%, #6E7681 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {project.number}
            </span>

            {/* vertical rule */}
            <span
              aria-hidden="true"
              className="hidden w-px self-stretch bg-[#D7E2EA]/15 sm:block"
            />

            <div className="flex flex-col gap-1.5">
              <span className="text-[0.6rem] sm:text-xs font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/45">
                {project.category} <span className="mx-1">•</span> {project.year}
              </span>
              <h3
                className="font-bold uppercase leading-none tracking-tight text-white"
                style={{ fontSize: 'min(clamp(1.15rem, 2.4vw, 2.15rem), 4.6vh)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton
            label={project.cta.label}
            href={project.cta.href}
            disabled={project.cta.disabled}
          />
        </div>

        {/* ── Divider ── */}
        <div className="my-5 h-px w-full bg-[#D7E2EA]/10 sm:my-6" />

        {/* ── Description + tech tags ── */}
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="max-w-xl text-sm sm:text-[0.95rem] font-light leading-relaxed text-[#D7E2EA]/65">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#D7E2EA]/20 px-3 py-1.5 sm:px-4 sm:py-2 text-[0.6rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#D7E2EA]/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Media: large left panel + labelled right panel ── */}
        <div
          className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-[1.55fr_1fr]"
          style={{ height: 'min(clamp(230px, 32vw, 470px), 37.5vh)' }}
        >
          <Media slot={project.main} />

          <div
            className={`${PANEL_RADIUS} hidden h-full flex-col items-center border border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.02] p-4 sm:p-5 md:flex`}
          >
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/35">
              {project.side.label}
            </span>

            <div className="mt-3 min-h-0 w-full flex-1">
              <Media slot={project.side.slot} compact />
            </div>

            <div className="my-3 h-px w-10 bg-[#D7E2EA]/15" />

            <p className="text-center text-xs sm:text-sm font-semibold text-white">
              {project.side.captionTitle}
            </p>
            <p className="mt-0.5 text-center text-[0.65rem] sm:text-xs font-light text-[#D7E2EA]/50">
              {project.side.captionSubtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects-stack"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32 sm:pb-36 md:pb-44"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight mb-12 sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  )
}
