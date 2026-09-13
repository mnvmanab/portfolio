import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import FadeIn from '../common/FadeIn'
import { ACCENT_WARM as ACCENT } from '../../data/theme'
import { DISCIPLINES } from '../../data/disciplines'
import type { Discipline } from '../../data/disciplines'

/**
 * "What I bring to the table" — five discipline cards.
 *
 * Desktop: the section pins while you scroll. The cards start docked at the
 * bottom of the viewport, fanned and overlapping, then un-fan and rise into an
 * even row as scroll progresses (scroll-scrubbed, not a one-shot animation).
 * Below lg the whole thing degrades to a plain stacked list — a five-across
 * pinned row is unusable on a phone.
 */


/** The card visual, shared by the pinned desktop row and the mobile stack. */
function CardFace({ item }: { item: Discipline }) {
  const { Icon } = item
  return (
    <div
      className="flex h-full flex-col rounded-[18px] p-5 lg:p-6"
      style={{
        background: item.bg,
        color: item.fg,
        border: item.bordered ? '1px solid #dcd4c4' : '1px solid transparent',
        boxShadow: '0 20px 44px -22px rgba(40,32,20,0.42)',
      }}
    >
      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} />

      {/* Every row below reserves a fixed height (title = 2 lines,
          description = 3 lines) so the numbers, titles and descriptions all
          sit on the same baseline across the five cards, regardless of how
          each one wraps. */}
      <div className="mt-auto pt-8">
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ opacity: 0.6 }}
        >
          {item.number} <span className="mx-1">/</span> {item.category}
        </div>
        <h3
          className="mt-2 flex items-start font-black uppercase leading-[0.95] tracking-tight"
          style={{
            fontFamily: "'Archivo', system-ui, sans-serif",
            fontSize: 'clamp(1.05rem, 1.5vw, 1.55rem)',
            minHeight: '1.9em', // two lines at leading-[0.95]
          }}
        >
          {item.title}
        </h3>
        <p
          className="mt-5 text-[13px] leading-[1.5]"
          style={{ opacity: 0.72, minHeight: '4.5em' }} // three lines
        >
          {item.description}
        </p>
      </div>
    </div>
  )
}

/** One card in the pinned row, transformed by scroll progress. */
function ScrubCard({
  item,
  index,
  progress,
}: {
  item: Discipline
  index: number
  progress: MotionValue<number>
}) {
  // Docked state — a scattered, overlapping pile rather than a neat arc:
  // x converges the cards so they overlap ~⅓ of their width, y zig-zags
  // (down/up/down/up/down) and the tilt alternates direction.
  const fromY = [232, 200, 245, 220, 257][index]
  const fromX = [190, 95, 0, -95, -190][index]
  const fromRotate = [-7, 5, -4, 6, -5][index]

  // Each card resolves slightly after the previous one. The last one lands at
  // ~92% of the scrub so the pin releases almost immediately afterwards —
  // leaving a long settled tail makes the page feel frozen mid-scroll.
  const start = index * 0.06
  const end = 0.68 + index * 0.06

  const y = useTransform(progress, [start, end], [fromY, 0])
  const x = useTransform(progress, [start, end], [fromX, 0])
  const rotate = useTransform(progress, [start, end], [fromRotate, 0])

  return (
    <motion.div
      className="min-w-0 flex-1"
      style={{
        y,
        x,
        rotate,
        height: 'clamp(285px, 43vh, 395px)',
        willChange: 'transform',
        // left-to-right stacking so each card overlaps the one before it
        zIndex: index,
      }}
    >
      <CardFace item={item} />
    </motion.div>
  )
}

function Heading() {
  return (
    <div className="px-6 text-center sm:px-10 lg:px-14">
      {/* Editorial eyebrow — mirrors the "01 — INTRODUCTION" device in the
          hero design, and marks this as a new chapter. */}
      <FadeIn
        delay={0}
        y={14}
        className="mb-6 flex items-center justify-center gap-4"
      >
        <span className="h-px w-8 bg-[#ded8cc]" />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: '#b03d27' }}
        >
          02 — What I bring
        </span>
        <span className="h-px w-8 bg-[#ded8cc]" />
      </FadeIn>

      <FadeIn
        as="h2"
        delay={0.06}
        y={24}
        className="m-0 text-[#14110e]"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: 'clamp(2.4rem, 7vw, 76px)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        What I bring to the{' '}
        <em style={{ fontStyle: 'italic', color: ACCENT }}>table</em>
      </FadeIn>
      <FadeIn
        as="p"
        delay={0.12}
        y={16}
        className="mx-auto mt-5 max-w-md text-sm text-[#57524a]"
      >
        Five disciplines, owned end to end.
      </FadeIn>
    </div>
  )
}

export default function DisciplinesSection() {
  const runwayRef = useRef<HTMLDivElement>(null)
  // Progress 0 lands when the section top is 25% down the viewport — which
  // puts the heading around mid-screen with the cards docked and peeking at
  // the bottom edge, matching the reference's opening frame.
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start 0.25', 'end end'],
  })

  return (
    <section
      id="work"
      /* Hairline at the seam — the hero shares this exact cream, so without a
         rule the two sections run together with no boundary at all. */
      className="border-t border-[#ded8cc] bg-[#f4f1ea]"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      {/* ── Desktop: pinned scroll-scrub ── */}
      <div ref={runwayRef} className="relative hidden h-[150vh] lg:block">
        {/* Heading + cards are centred as one block, so the slack is shared
            above and below instead of pooling between them. */}
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <Heading />

          <div className="mt-14 flex w-full items-end gap-4 px-14">
            {DISCIPLINES.map((item, i) => (
              <ScrubCard
                key={item.number}
                item={item}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet: plain stack, no pinning ── */}
      <div className="px-6 pb-20 pt-14 sm:px-10 lg:hidden">
        <Heading />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DISCIPLINES.map((item, i) => (
            <FadeIn
              key={item.number}
              delay={i * 0.07}
              y={26}
              scale={0.96}
              className="h-[330px]"
            >
              <CardFace item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
