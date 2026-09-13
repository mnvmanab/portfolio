import { ImageIcon } from 'lucide-react'
import FadeIn from '../common/FadeIn'
import { ACCENT } from '../../data/theme'
import { PROJECTS } from '../../data/projects'
import type { Project } from '../../data/projects'

/**
 * Design 5A — "Projects · Paper Index" from the Claude Design project.
 * Cream panel, serif header, and a two-column grid of tall tinted cards with
 * the visual anchored to the bottom edge of each card.
 */


function ArrowDiagonal() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2 11L11 2M11 2H4.8M11 2v6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
      <path
        d="M1 6h15M12 1.5L16.5 6 12 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({ item }: { item: Project }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg transition-transform duration-[250ms] hover:-translate-y-1"
      style={{
        background: item.bg,
        height: 'clamp(640px, 95vh, 900px)',
        transitionTimingFunction: 'cubic-bezier(.2,.7,.3,1)',
      }}
    >
      <div className="px-7 pb-7 pt-9 sm:px-9 sm:pt-11 lg:px-11 lg:pb-[34px] lg:pt-[46px]">
        <div className="flex items-baseline gap-3">
          <span
            className="leading-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 22,
              color: ACCENT,
            }}
          >
            {item.number}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6f695f]">
            {item.meta}
          </span>
        </div>

        <h3
          className="mt-3.5 text-[#14110e]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: 'clamp(1.9rem, 3.2vw, 46px)',
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            maxWidth: '11ch',
            textWrap: 'pretty',
          }}
        >
          {item.title}
        </h3>

        <p
          className="mt-[18px] text-[15px] leading-[1.65] text-[#4a463e]"
          style={{ maxWidth: '44ch' }}
        >
          {item.description}
        </p>

        {item.cta && (
          <span
            className="mt-[26px] inline-flex items-center gap-2.5 pb-[3px] text-[15px] font-semibold transition-opacity duration-200 group-hover:opacity-75"
            style={{
              color: ACCENT,
              borderBottom: '1px solid rgba(176,61,39,.35)',
            }}
          >
            {item.cta}
            <ArrowRight />
          </span>
        )}
      </div>

      {/* Phone-shaped column, flush to the card's bottom edge. Sized by
          aspect ratio off its height so portrait mobile screenshots fill it
          without being cropped or stretched. */}
      <div className="relative flex min-h-0 flex-1 justify-center px-7 sm:px-9 lg:px-11">
        <div
          className="h-full max-w-full overflow-hidden rounded-t-[26px]"
          style={{
            aspectRatio: '9 / 19.5',
            background: 'rgba(20,17,14,.06)',
          }}
        >
          {item.src ? (
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <ImageIcon
                className="h-6 w-6"
                strokeWidth={1.25}
                color="#14110e"
                opacity={0.22}
              />
              <span className="px-4 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.18em] text-[#14110e]/35">
                {item.slotLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPaperSection() {
  return (
    <section
      id="projects"
      /* A sheet laid over the section above: rounded top, a hairline paper
         edge and an upward shadow. The negative margin is what makes the
         rounded corners reveal the cream above rather than the dark page. */
      className="relative z-10 -mt-10 rounded-t-[32px] border-t border-[#ded8cc] bg-[#f7f5f0] px-6 pb-16 pt-12 shadow-[0_-18px_44px_-26px_rgba(40,32,20,0.42)] sm:-mt-12 sm:rounded-t-[40px] sm:px-10 sm:pb-20 sm:pt-14 lg:-mt-14 lg:rounded-t-[48px] lg:px-14 lg:pb-24 lg:pt-16"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      {/* Header */}
      <FadeIn
        delay={0}
        y={24}
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
      >
        <div>
          {/* Editorial eyebrow — continues the numbering from "02 — What I bring" */}
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 shrink-0 bg-[#ded8cc]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: ACCENT }}
            >
              03 — Selected work
            </span>
          </div>

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
            Things I&apos;ve{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>made</em>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="h-px w-[34px] shrink-0" style={{ background: ACCENT }} />
            <span className="text-sm text-[#57524a]">
              Personal projects in design and iOS development.
            </span>
          </div>
        </div>

        {/* ← point at an archive page when one exists */}
        <a
          href="#"
          className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-[#cfc7b8] px-[22px] py-[13px] text-[13px] font-semibold text-[#14110e] transition-colors duration-200 hover:border-[#14110e] hover:bg-[#eae5da] sm:self-auto"
        >
          View archive
          <ArrowDiagonal />
        </a>
      </FadeIn>

      {/* Grid */}
      <div className="mt-[34px] grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROJECTS.map((item, i) => (
          <FadeIn key={item.number} delay={0.06 + i * 0.08} y={30}>
            <ProjectCard item={item} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
