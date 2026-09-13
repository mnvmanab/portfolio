import { ImageIcon, Linkedin } from 'lucide-react'
import FadeIn from '../common/FadeIn'
import { ACCENT_WARM as ACCENT } from '../../data/theme'
import {
  BADGE_PHOTO,
  BADGE_NAME,
  BADGE_ROLE,
  HERO_STATS,
  LINKEDIN_URL,
  NAV,
} from '../../data/site'

/**
 * Design 3A — "Editorial Paper · Serif" from the Claude Design project.
 * Light cream paper, Instrument Serif display type, terracotta accent.
 */

const STATS = HERO_STATS

function ArrowGlyph() {
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

export default function HeroEditorialSection() {
  return (
    <section
      id="intro-editorial"
      className="relative overflow-hidden bg-[#f4f1ea] lg:min-h-[834px]"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      {/* Ruled-paper lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage: 'linear-gradient(#e4ded1 1px, transparent 1px)',
          backgroundSize: '100% 96px',
        }}
      />

      {/* min-h on the grid (not just the section) so the left column actually
          stretches — otherwise mt-auto leaves dead space below the stats. */}
      <div className="relative grid grid-cols-1 lg:min-h-[834px] lg:grid-cols-[1fr_470px]">
        {/* ── Left column ── */}
        <div className="flex flex-col px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:pb-12 lg:pt-16">
          {/* Nav */}
          <FadeIn
            as="nav"
            delay={0}
            y={-16}
            className="flex flex-wrap items-center gap-x-[34px] gap-y-3 border-b border-[#ded8cc] pb-[18px]"
          >
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.16em] text-[#14110e] transition-colors duration-200 hover:text-[#b03d27]"
              >
                {item.label}
              </a>
            ))}
          </FadeIn>

          <div className="mt-14 lg:mt-auto">
            {/* Availability pill — hidden for now. Uncomment to restore.
            <FadeIn delay={0.08} y={20} className="mb-[18px] flex items-center gap-3.5">
              <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#d3ccbe] bg-[#faf8f3] py-1.5 pl-[11px] pr-3.5">
                <span className="ph-pulse h-1.5 w-1.5 rounded-full bg-[#2f7d4f]" />
                <span className="text-[11px] font-semibold tracking-[0.12em] text-[#4a463e]">
                  AVAILABLE FOR WORK
                </span>
              </span>
              <span className="h-px flex-1 bg-[#ded8cc]" />
            </FadeIn>
            */}

            <FadeIn
              as="h2"
              delay={0.14}
              y={30}
              className="m-0 text-[#14110e]"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: 'clamp(2.6rem, 7.2vw, 108px)',
                lineHeight: 0.94,
                letterSpacing: '-0.025em',
              }}
            >
              Hi, I am
              <br />
              Manab <em className="not-italic" style={{ color: ACCENT }}>—</em> an
              <br />
              engineer &amp; designer.
            </FadeIn>

            <FadeIn
              as="p"
              delay={0.2}
              y={24}
              className="mt-7 max-w-[520px] text-base leading-[1.68] text-[#57524a]"
            >
              An engineer turned designer with 4+ years across B2B &amp; SaaS. I
              don&apos;t just bridge design and engineering — I own the entire
              experience, from the first sketch to the final shipped product.
            </FadeIn>

            <FadeIn delay={0.26} y={24} className="mb-11 mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#14110e] px-[26px] py-[15px] text-sm font-semibold text-[#f4f1ea] transition-colors duration-200 hover:bg-[#c2452d]"
              >
                Let&apos;s connect
                <ArrowGlyph />
              </a>
              {/* ← point at your CV PDF, e.g. /manab-cv.pdf */}
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-full border border-[#cfc7b8] px-[26px] py-[15px] text-sm font-semibold text-[#14110e] transition-colors duration-200 hover:border-[#14110e] hover:bg-[#eae5da]"
              >
                Download CV
              </a>
            </FadeIn>

            {/* Stats */}
            <FadeIn
              delay={0.32}
              y={20}
              className="flex flex-wrap gap-x-10 gap-y-6 border-t border-[#ded8cc] pt-[22px] sm:gap-x-[52px]"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-[32px] leading-none text-[#14110e]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {s.value}
                    <span style={{ color: ACCENT }}>{s.suffix}</span>
                  </div>
                  <div className="mt-[7px] text-[11px] font-semibold uppercase tracking-[0.13em] text-[#6f695f]">
                    {s.label}
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>

        {/* ── Right column: hanging badge ── */}
        <div className="relative flex justify-center border-[#ded8cc] pb-16 lg:border-l lg:pb-0">
          {/* strap */}
          <div
            className="absolute top-0 w-1 rounded-b-[2px]"
            style={{
              height: 150,
              background: 'linear-gradient(180deg,#3c362d,#584f43)',
            }}
          />
          {/* clip */}
          <div
            className="absolute h-[21px] w-3.5 rounded"
            style={{ top: 140, border: '2.5px solid #a09788', background: '#f4f1ea' }}
          />
          {/* badge */}
          <div className="ph-sway absolute" style={{ top: 154 }}>
            <div
              className="overflow-hidden rounded-[10px] border border-[#ded8cc] bg-[#faf8f3]"
              style={{
                width: 'min(352px, 82vw)',
                boxShadow: '0 30px 55px -28px rgba(40,32,20,.45)',
              }}
            >
              <div style={{ height: 8, background: ACCENT }} />
              <div className="px-4 pt-4">
                {/* Aspect ratio, not a vh height — the badge's width is fixed
                    by its column, so a vh-based height turned the portrait
                    square on any window shorter than ~855px. 6/7 keeps the
                    design's 320 × 376 proportions at every window height. */}
                <div
                  className="relative w-full overflow-hidden rounded-md bg-[#e4ded1]"
                  style={{ aspectRatio: '6 / 7' }}
                >
                  {BADGE_PHOTO ? (
                    <img
                      src={BADGE_PHOTO}
                      alt="Portrait"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                      <ImageIcon
                        className="h-6 w-6"
                        strokeWidth={1.25}
                        color="#8a8377"
                        opacity={0.6}
                      />
                      <span className="text-[10px] font-bold tracking-[0.18em] text-[#8a8377]">
                        PORTRAIT
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-3.5 p-4">
                <div>
                  <div
                    className="text-[26px] leading-none text-[#14110e]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {BADGE_NAME}
                  </div>
                  <div className="mt-[7px] text-[10px] font-bold tracking-[0.16em] text-[#6f695f]">
                    {BADGE_ROLE}
                  </div>
                </div>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfc7b8] text-[#14110e] transition-colors duration-200 hover:border-[#14110e] hover:bg-[#eae5da]"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* reserves height for the absolutely-positioned badge */}
          <div aria-hidden="true" style={{ height: 'min(640px, 78vh)' }} />
        </div>
      </div>
    </section>
  )
}
