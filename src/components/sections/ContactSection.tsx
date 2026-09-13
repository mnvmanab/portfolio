import FadeIn from '../common/FadeIn'
import { ACCENT } from '../../data/theme'
import { LINKEDIN_URL, SHOW_AVAILABILITY, SOCIALS } from '../../data/site'

/**
 * "Get In Touch" from the Claude Design project — the closing paper sheet.
 * Centred editorial column over a gradient display heading, with the footer
 * rule tucked inside the same panel. The panel has no bottom edge: it runs
 * off the end of the page rather than closing itself off.
 */


function ArrowDiagonal({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 18L18 4M18 4h-8.6M18 4v8.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      /* The sheet itself, not a panel inside a band — a band would show as a
         strip of its own colour above the rounded corners. Pulled up over the
         section above like the other sheets, so the corners reveal it. */
      className="relative z-10 -mt-10 rounded-t-[36px] border-t border-[#ded8cc] bg-[#f4f1ea] px-6 pb-7 pt-10 shadow-[0_-24px_60px_-34px_rgba(40,32,20,0.4)] sm:-mt-12 sm:px-10 sm:pt-12 lg:-mt-14 lg:px-14 lg:pt-16"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      {/* Content stays at the design's width while the sheet spans the page */}
      <div className="mx-auto w-full max-w-[1104px]">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0} y={18} className="flex items-center gap-3.5">
            <span
              className="h-px w-[26px] shrink-0"
              style={{ background: ACCENT }}
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6f695f]">
              Get in touch
            </span>
            <span
              className="h-px w-[26px] shrink-0"
              style={{ background: ACCENT }}
            />
          </FadeIn>

          <FadeIn
            as="h2"
            delay={0.06}
            y={30}
            className="m-0 mt-5"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: 'clamp(40px, 7.5vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              maxWidth: '15ch',
              textWrap: 'balance',
              // background-clip:text paints only inside the element's box,
              // so the box has to clear the glyphs on every side. lineHeight
              // 0.9 cuts the descender off the bottom, and the italic "r"
              // ink overhangs its advance width on the right (made worse by
              // the negative letter-spacing). Symmetric x-padding keeps the
              // heading optically centred while giving both sides room.
              paddingBottom: '0.22em',
              paddingLeft: '0.1em',
              paddingRight: '0.1em',
              // Ink bleeding into terracotta across the phrase
              backgroundImage: `linear-gradient(168deg, #14110e 26%, ${ACCENT} 96%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Let&apos;s work <em style={{ fontStyle: 'italic' }}>together</em>
          </FadeIn>

          <FadeIn
            as="p"
            delay={0.12}
            y={20}
            className="mt-[22px] text-[15px] leading-[1.65] text-[#57524a]"
            style={{ maxWidth: '46ch' }}
          >
            Open to product design and design-engineering work. Tell me what
            you&apos;re building and where it&apos;s stuck.
          </FadeIn>

          {/* Primary CTA — matches the hero's "Let's connect" pill. Routes to
              LinkedIn rather than exposing an email address publicly. */}
          <FadeIn delay={0.18} y={20} className="mt-7 max-w-full">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#14110e] px-7 py-[14px] text-[15px] font-semibold text-[#f4f1ea] transition-colors duration-200 hover:bg-[#b03d27]"
            >
              Connect on LinkedIn
              <ArrowDiagonal size={17} />
            </a>
          </FadeIn>

          {SHOW_AVAILABILITY && (
            <FadeIn
              delay={0.24}
              y={16}
              className="mt-5 flex items-center gap-2.5"
            >
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#2f7d4f]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4a463e]">
                Available for new work
              </span>
            </FadeIn>
          )}
        </div>

        {/* Footer rule — lives inside the panel, not as its own bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#ded8cc] pt-[18px] sm:mt-12 sm:flex-row sm:gap-7 lg:mt-14">
          <span className="text-[13px] text-[#6f695f]">
            © 2026 Manab. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-7">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#14110e] transition-colors duration-200 hover:text-[#b03d27]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
