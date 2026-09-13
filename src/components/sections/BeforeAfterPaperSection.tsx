import FadeIn from '../common/FadeIn'
import { ACCENT } from '../../data/theme'
import { CASES } from '../../data/caseStudies'
import type { Case } from '../../data/caseStudies'

/**
 * Design 6A — "Before & After · Editorial Paper" from the Claude Design
 * project. Three cards, each pairing a desaturated "before" against a
 * full-colour "after", with an optional result metric in the footer.
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

function Shot({
  kind,
  src,
  alt,
}: {
  kind: 'before' | 'after'
  src: string | null
  alt: string
}) {
  const isBefore = kind === 'before'
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ color: isBefore ? '#6f695f' : ACCENT }}
        >
          {isBefore ? 'Before' : 'After'}
        </span>
      </div>

      {/* Phone-shaped: 9 / 19.5 is the iPhone 16 screen (1179 × 2556), so a
          full-height screenshot drops in without cropping or stretching.
          Height is derived from the column width — never fix it.
          "Before" is dashed + desaturated; "after" is solid, full colour,
          and lifted with a shadow. */}
      <div
        className="relative w-full overflow-hidden rounded-[12px]"
        style={{
          aspectRatio: '9 / 19.5',
          ...(isBefore
            ? {
                border: '1px dashed #cfc7b8',
                background: '#efebe2',
                filter: 'grayscale(1)',
                opacity: 0.78,
              }
            : {
                border: '1px solid #cfc7b8',
                background: '#e4ded1',
                boxShadow: '0 10px 24px -16px rgba(40,32,20,.5)',
              }),
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#14110e]/30">
              {isBefore ? 'Before' : 'After'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function CaseCard({ item }: { item: Case }) {
  // h-full so the card fills its grid cell — the cell already stretches to the
  // tallest card in the row, but the card itself would not.
  return (
    <div className="flex h-full flex-col rounded-md border border-[#ded8cc] bg-[#faf8f3] px-[26px] pb-6 pt-[26px]">
      <div className="flex items-baseline gap-3">
        <span
          className="leading-none"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 24,
            color: ACCENT,
          }}
        >
          {item.number}
        </span>
        <span className="text-[13px] font-bold uppercase tracking-[0.09em] text-[#14110e]">
          {item.title}
        </span>
      </div>

      {/* Reserve two lines so a one-line description doesn't make its card
          shorter — and so the shots below start at the same y in every card. */}
      <p
        className="mt-3 text-sm leading-[1.6] text-[#57524a]"
        style={{ minHeight: '3.2em' }}
      >
        {item.description}
      </p>

      <div className="mt-[22px] grid grid-cols-2 items-start gap-2.5">
        <Shot kind="before" src={item.before} alt={`${item.title} before`} />
        <Shot kind="after" src={item.after} alt={`${item.title} after`} />
      </div>

      {item.result && (
        <div className="mt-auto flex items-baseline gap-2.5 border-t border-[#ded8cc] pt-5">
          <span
            className="leading-none text-[#14110e]"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30 }}
          >
            {item.result.value}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#6f695f]">
            {item.result.label}
          </span>
        </div>
      )}
    </div>
  )
}

export default function BeforeAfterPaperSection() {
  return (
    <section
      id="before-after"
      /* Same sheet treatment as the section above: rounded top, hairline
         edge and an upward shadow, pulled up so the corners reveal cream. */
      className="relative z-10 -mt-10 rounded-t-[32px] border-t border-[#ded8cc] bg-[#f4f1ea] px-6 pb-16 pt-12 shadow-[0_-18px_44px_-26px_rgba(40,32,20,0.42)] sm:-mt-12 sm:rounded-t-[40px] sm:px-10 sm:pb-20 sm:pt-14 lg:-mt-14 lg:rounded-t-[48px] lg:px-14 lg:pb-24 lg:pt-16"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      <FadeIn
        delay={0}
        y={24}
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
      >
        <div>
          {/* Continues the numbering: 02 What I bring → 03 Selected work */}
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 shrink-0 bg-[#ded8cc]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: ACCENT }}
            >
              04 — Improvements
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
            Before &amp; <em style={{ fontStyle: 'italic', color: ACCENT }}>after</em>
          </h2>

          <div className="mt-4 flex items-center gap-4">
            <span className="h-px w-[34px] shrink-0" style={{ background: ACCENT }} />
            <span className="text-sm text-[#57524a]">
              UI/UX fixes I shipped on our company app.
            </span>
          </div>
        </div>

        {/* ← point at a fuller case-study page when one exists */}
        <a
          href="#"
          className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-[#cfc7b8] px-[22px] py-[13px] text-[13px] font-semibold text-[#14110e] transition-colors duration-200 hover:border-[#14110e] hover:bg-[#eae5da] sm:self-auto"
        >
          View more
          <ArrowDiagonal />
        </a>
      </FadeIn>

      <div className="mt-[34px] grid grid-cols-1 gap-4 lg:grid-cols-3">
        {CASES.map((item, i) => (
          <FadeIn key={item.number} delay={0.06 + i * 0.08} y={26}>
            <CaseCard item={item} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
