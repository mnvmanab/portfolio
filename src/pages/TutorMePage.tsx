import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { ACCENT, COLORS } from '../data/theme'

/**
 * Tutor Me case study page.
 *
 * The case study itself is a fully self-contained HTML page at
 * public/tutorme/index.html — it has its own reset, its own font pairing
 * (Fraunces + Inter + JetBrains Mono), its own light/dark theme, and its
 * own inline SVG mockups. Inlining it into this React tree would fight
 * the portfolio's global `* { margin: 0 }` and its Kanit body font.
 *
 * So we host it inside a portfolio-styled top bar and iframe the document.
 * The React app owns the route (hash-based, via App.tsx); the iframe owns
 * the styling isolation.
 */
export default function TutorMePage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Tutor Me · Case study — Manab Jyoti Gogoi'
    // Case study pages should always start at the top.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: COLORS.paperSheet, fontFamily: "'Poppins', system-ui, sans-serif" }}
    >
      {/* Sticky top bar — portfolio's paper aesthetic, so the transition into
          the case study reads as one site, not a hand-off to another. */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="sticky top-0 z-40 border-b"
        style={{
          borderColor: COLORS.rule,
          background: 'rgba(247,245,240,0.86)',
          backdropFilter: 'saturate(140%) blur(14px)',
          WebkitBackdropFilter: 'saturate(140%) blur(14px)',
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200"
            style={{ color: COLORS.ink }}
            aria-label="Back to portfolio"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            <span className="transition-colors duration-200 group-hover:opacity-70">
              Back to portfolio
            </span>
          </a>

          <div className="hidden items-center gap-3 sm:flex">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: ACCENT }}
            >
              02 — Tutor Me
            </span>
            <span className="h-px w-6" style={{ background: COLORS.rule }} />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: COLORS.muted }}
            >
              Case study · 2026
            </span>
          </div>

          <a
            href="/tutorme/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors duration-200"
            style={{ borderColor: COLORS.rule, color: COLORS.ink }}
            aria-label="Open case study in a new tab"
          >
            Open full page
            <svg
              width="12"
              height="12"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 11L11 2M11 2H4.8M11 2v6.2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </motion.header>

      {/* The case study document.
          `flex-1` + a min-height keep the iframe filling the viewport under
          the sticky bar without forcing a fixed pixel height. */}
      <iframe
        src="/tutorme/index.html"
        title="Tutor Me case study"
        className="w-full flex-1 border-0"
        style={{ minHeight: 'calc(100vh - 52px)', background: COLORS.paperSheet }}
        loading="eager"
      />
    </div>
  )
}
