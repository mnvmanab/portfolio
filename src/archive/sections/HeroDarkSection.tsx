import { ImageIcon } from 'lucide-react'
import FadeIn from '../../components/common/FadeIn'

/**
 * Design 3C — "Refined Dark" from the Claude Design project.
 * Near-black canvas, Space Grotesk, orange accent, dot grid + corner glow.
 */

// Drop a portrait into public/ and set this to wire up the badge photo.
const BADGE_PHOTO: string | null = null

const ACCENT = '#ff4d00'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const STATS = [
  { value: '3+', label: 'Years shipping' },
  { value: 'B2B & SaaS', label: 'Domain' },
  // ← replace with your city / timezone
  { value: 'India', label: 'IST' },
]

function ArrowGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2 11L11 2M11 2H4.8M11 2v6.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroDarkSection() {
  return (
    <section
      id="intro"
      className="relative overflow-hidden bg-[#0a0a0b] lg:min-h-[834px]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      {/* Warm corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: -180,
          left: -120,
          width: 640,
          height: 420,
          background:
            'radial-gradient(closest-side, rgba(255,77,0,.10), rgba(255,77,0,0))',
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_470px]">
        {/* ── Left column ── */}
        <div className="flex flex-col px-6 py-12 sm:px-10 sm:py-14 lg:pb-14 lg:pl-16 lg:pr-0 lg:pt-16">
          {/* Nav */}
          <FadeIn
            as="nav"
            delay={0}
            y={-16}
            className="flex flex-wrap items-center gap-x-[34px] gap-y-3 border-b border-white/[0.09] pb-[18px] lg:pr-16"
          >
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:text-[#ff4d00]"
              >
                {item.label}
              </a>
            ))}
          </FadeIn>

          {/* Availability pill — hidden for now. Uncomment to restore.
          <FadeIn delay={0.06} y={-12} className="mt-8 self-start">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.04] py-[7px] pl-3 pr-[15px]">
              <span
                className="ph-pulse h-1.5 w-1.5 rounded-full bg-[#3ddc84]"
                style={{ boxShadow: '0 0 0 3px rgba(61,220,132,.16)' }}
              />
              <span className="text-[11px] font-semibold tracking-[0.13em] text-[#c9ccd2]">
                AVAILABLE FOR WORK
              </span>
            </span>
          </FadeIn>
          */}

          <div className="mt-14 lg:mt-auto">
            <FadeIn
              as="h2"
              delay={0.1}
              y={30}
              className="m-0 font-bold text-white"
              style={{
                fontSize: 'clamp(2.3rem, 5.6vw, 82px)',
                lineHeight: 1,
                letterSpacing: '-0.035em',
              }}
            >
              Hi, I am Manab
            </FadeIn>

            <FadeIn delay={0.16} y={22} className="mt-5 flex items-center gap-4">
              <span className="h-0.5 w-[34px]" style={{ background: ACCENT }} />
              <span className="text-xl font-medium tracking-[0.01em] text-[#9aa0a9]">
                iOS Engineer &amp; Designer
              </span>
            </FadeIn>

            <FadeIn
              as="p"
              delay={0.22}
              y={22}
              className="mt-[26px] max-w-[520px] text-base leading-[1.7] text-[#8b9099]"
            >
              An engineer turned designer with 4+ years across B2B &amp; SaaS. I
              don&apos;t just bridge design and engineering — I own the entire
              experience, from the first sketch to the final shipped product.
            </FadeIn>

            <FadeIn delay={0.28} y={22} className="mb-11 mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-full px-[26px] py-[15px] text-sm font-semibold text-[#0a0a0b] transition-[filter] duration-200 hover:brightness-110"
                style={{ background: ACCENT }}
              >
                Let&apos;s connect
                <ArrowGlyph />
              </a>
              {/* ← point at your CV PDF, e.g. /manab-cv.pdf */}
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-[26px] py-[15px] text-sm font-semibold text-white transition-colors duration-200 hover:border-white/45 hover:bg-white/[0.07]"
              >
                Download CV
              </a>
            </FadeIn>

            <FadeIn
              delay={0.34}
              y={20}
              className="flex flex-wrap gap-x-10 gap-y-6 border-t border-white/[0.09] pt-[22px] sm:gap-x-12"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-[26px] font-bold tracking-[-0.02em] text-white">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#7e848c]">
                    {s.label}
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>

        {/* ── Right column: hanging badge ── */}
        <div className="relative flex justify-center pb-16 lg:pb-0">
          {/* strap */}
          <div
            className="absolute top-0 w-[5px] rounded-b-[3px]"
            style={{
              height: 196,
              background: 'linear-gradient(180deg,#2a2c31,#1a1b1f)',
            }}
          />
          {/* clip */}
          <div
            className="absolute h-[22px] w-[15px] rounded-[5px]"
            style={{ top: 186, border: '2.5px solid #6c7178', background: '#17181c' }}
          />
          {/* badge */}
          <div className="ph-sway absolute" style={{ top: 200 }}>
            <div
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#17181c]"
              style={{
                width: 'min(330px, 80vw)',
                height: 'min(430px, 56vh)',
                boxShadow: '0 40px 70px -30px rgba(0,0,0,.9)',
              }}
            >
              <div style={{ height: 9, background: ACCENT }} />
              <div className="relative" style={{ height: 'calc(100% - 9px)' }}>
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
                      className="h-7 w-7"
                      strokeWidth={1.25}
                      color="#D7E2EA"
                      opacity={0.22}
                    />
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#7e848c]">
                      PORTRAIT
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3.5 text-center text-[11px] font-semibold tracking-[0.16em] text-[#7e848c]">
              MANAB · iOS ENGINEER &amp; DESIGNER
            </div>
          </div>

          {/* reserves height for the absolutely-positioned badge */}
          <div aria-hidden="true" style={{ height: 'min(700px, 84vh)' }} />
        </div>
      </div>
    </section>
  )
}
