import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeIn from '../common/FadeIn'
import { ACCENT } from '../../data/theme'
import { ROLES } from '../../data/experience'
import type { Role } from '../../data/experience'

/**
 * "Experience Segment" from the Claude Design project — a paper panel listing
 * roles as stacked cards. Only the current role shows by default; a ghost
 * card peeks out from underneath to hint at the rest, and the toggle expands
 * the full list.
 */


/**
 * Total time across every role, floored to whole years — e.g. "4+ YEARS".
 * Derived rather than hardcoded so it stays correct as the open role runs on.
 */
function durationLabel(roles: Role[]) {
  const now = new Date()
  const months = roles.reduce((sum, role) => {
    const start = new Date(role.from[0], role.from[1])
    const end = role.to ? new Date(role.to[0], role.to[1]) : now
    // Closed ranges count their final month; an open range runs to today.
    const m =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      (role.to ? 1 : 0)
    return sum + Math.max(0, m)
  }, 0)

  const years = Math.floor(months / 12)
  return years ? `${years}+ YEARS` : `${months} MOS`
}

/** The bent paperclip pinned to the top-right of the current role. */
function Paperclip() {
  return (
    <svg
      width="30"
      height="112"
      viewBox="0 0 30 112"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute -top-[30px] right-[38px] hidden sm:block"
    >
      <path
        d="M15 8c-5.4 0-8.6 3.2-8.6 8.6v70.8c0 5 3.8 8.6 8.6 8.6s8.6-3.6 8.6-8.6V24.6"
        stroke="#a09788"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M23.6 16.6C23.6 11.2 20.4 8 15 8"
        stroke="#a09788"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function RoleCard({ role, pinned = false }: { role: Role; pinned?: boolean }) {
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-lg border border-[#ded8cc] bg-[#faf8f3] px-6 py-6 sm:flex-row sm:items-center sm:gap-6 sm:px-8 ${
        pinned ? 'shadow-[0_12px_28px_-22px_rgba(40,32,20,0.4)]' : ''
      }`}
    >
      {pinned && <Paperclip />}

      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[#e4ded1]">
        {role.logo ? (
          <img
            src={role.logo}
            alt={`${role.company} logo`}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#14110e]/30">
              Logo
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="text-[#14110e]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: 'clamp(1.75rem, 3vw, 34px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}
        >
          {role.company}
        </div>
        <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6f695f]">
          {role.title}
        </div>
      </div>

      {/* The clip's 52px of clearance is reserved on every row, not just the
          pinned one — otherwise the dates end at different x positions. */}
      <div className="whitespace-nowrap text-[15px] font-medium tracking-[0.02em] text-[#4a463e] sm:pr-[52px]">
        {role.dates}
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState(false)
  const [current, ...rest] = ROLES

  return (
    <section
      id="experience"
      /* A darker band than the cream either side — the inset panel is what
         gives this section its own edge and separates hero from disciplines.
         The band's padding matches every other section (px-6/10/14) so the
         panel's edges land on the page's shared content column. */
      className="bg-[#e9e7e2] px-6 py-10 sm:px-10 lg:px-14"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      <div className="rounded-[30px] border border-[#ded8cc] bg-[#f4f1ea] px-6 pb-10 pt-10 sm:px-10 sm:pb-11 sm:pt-12 lg:px-14">
        {/* The panel background spans the full content column, but the content
            itself stays at the design's 1104px — otherwise the rows stretch and
            the dates drift far away from the company names. */}
        <div className="mx-auto w-full max-w-[1104px]">
          <FadeIn
            delay={0}
            y={24}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
          >
            <div>
              <h2
                className="m-0 text-[#14110e]"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(2.2rem, 5vw, 52px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Where I&apos;ve{' '}
                <em style={{ fontStyle: 'italic', color: ACCENT }}>worked</em>
              </h2>
            </div>

            <span className="whitespace-nowrap text-[11px] font-bold tracking-[0.16em] text-[#6f695f]">
              EXPERIENCE — {durationLabel(ROLES)}
            </span>
          </FadeIn>

          <div className="relative mt-[34px]">
            {/* Ghost sheet peeking out from under the stack — the cue that
              there's more to open. Hidden once the list is expanded. */}
            {!expanded && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center"
              >
                <div className="mt-6 h-[132px] w-[95%] rotate-[-1.1deg] rounded-lg border border-[#ded8cc] bg-[#faf8f3] shadow-[0_8px_20px_-16px_rgba(40,32,20,0.3)]" />
              </div>
            )}

            <div className="relative flex flex-col gap-3">
              <RoleCard role={current} pinned />

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="rest"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3">
                      {rest.map((role) => (
                        <RoleCard key={role.company} role={role} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative mt-[22px] flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-[11px] rounded-full border border-[#cfc7b8] bg-[#f4f1ea] px-6 py-[13px] text-[13px] font-semibold text-[#14110e] transition-colors duration-200 hover:border-[#14110e] hover:bg-[#eae5da]"
              >
                {expanded ? 'Show less' : `View all ${ROLES.length}`}
                <span
                  className="inline-flex transition-transform duration-[250ms]"
                  style={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg
                    width="13"
                    height="8"
                    viewBox="0 0 14 9"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1.5L7 7.5L13 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
