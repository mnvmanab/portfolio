import { ArrowRight } from 'lucide-react'
import FadeIn from '../../components/common/FadeIn'

type CaseStudy = {
  number: string
  title: string
  /** problem → solution one-liner */
  caption: string
  /** Put real image paths here (e.g. '/assets/images/projects/checkout-before.png').
      Leave null to render a labelled placeholder. */
  before: string | null
  after: string | null
}

// Placeholder case studies — replace title/caption with your real ones and
// drop image pairs into portfolio_V2/public/assets/images/projects/, then set before/after paths.
const CASES: CaseStudy[] = [
  {
    number: '01',
    title: 'Checkout Flow',
    caption: 'Cluttered multi-step checkout → simplified to a single-tap flow.',
    before: null,
    after: null,
  },
  {
    number: '02',
    title: 'Onboarding',
    caption: 'Confusing sign-up → guided 3-step onboarding with clear progress.',
    before: null,
    after: null,
  },
  {
    number: '03',
    title: 'Home Dashboard',
    caption: 'Dense wall of data → scannable card layout with clear hierarchy.',
    before: null,
    after: null,
  },
]

function Screen({
  label,
  src,
  alt,
  tone,
}: {
  label: string
  src: string | null
  alt: string
  tone: 'before' | 'after'
}) {
  const badge =
    tone === 'after'
      ? 'bg-[#0C0C0C] text-white'
      : 'border border-[rgba(12,12,12,0.2)] text-[#0C0C0C]/60'

  return (
    <figure className="flex flex-col">
      <figcaption
        className={`mb-3 self-start rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest ${badge}`}
      >
        {label}
      </figcaption>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full rounded-2xl border border-[rgba(12,12,12,0.08)] object-cover"
        />
      ) : (
        <div className="flex aspect-[9/16] w-full items-center justify-center rounded-2xl border border-dashed border-[rgba(12,12,12,0.25)] bg-[rgba(12,12,12,0.04)]">
          <span className="px-4 text-center text-xs font-medium uppercase tracking-widest text-[#0C0C0C]/35">
            {label} screen
            <br />
            placeholder
          </span>
        </div>
      )}
    </figure>
  )
}

export default function BeforeAfterSection() {
  return (
    <section
      id="case-studies"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-28 md:pb-36"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="font-black uppercase leading-none text-[#0C0C0C]"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
        >
          Before &amp; After
        </h2>
        <p className="mt-5 text-sm sm:text-base font-light uppercase tracking-widest text-[#0C0C0C]/50">
          UI/UX improvements I shipped
        </p>
      </div>

      <div className="mx-auto mt-16 sm:mt-20 md:mt-24 flex max-w-4xl flex-col gap-20 sm:gap-24 md:gap-28">
        {CASES.map((c, i) => (
          <FadeIn key={c.number} delay={i * 0.1} y={40}>
            {/* Caption: problem → solution */}
            <div className="mb-6 flex items-start gap-4 sm:gap-6">
              <span
                className="font-black leading-none text-[#0C0C0C]/15"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 84px)' }}
              >
                {c.number}
              </span>
              <div className="pt-1 sm:pt-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)' }}
                >
                  {c.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm sm:text-base font-light leading-relaxed text-[#0C0C0C]/60">
                  {c.caption}
                </p>
              </div>
            </div>

            {/* Side-by-side before/after */}
            <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
              <Screen
                label="Before"
                src={c.before}
                alt={`${c.title} before`}
                tone="before"
              />
              <Screen
                label="After"
                src={c.after}
                alt={`${c.title} after`}
                tone="after"
              />
              {/* Transformation cue between the two screens */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0C0C0C] text-white shadow-[0_4px_16px_rgba(12,12,12,0.35)] ring-4 ring-white sm:h-12 sm:w-12"
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Placeholder CTA — not wired to a destination yet. Point href at a
          /case-studies route or swap for a show-more handler later. */}
      <FadeIn delay={0.15} y={30} className="mt-20 flex justify-center sm:mt-24">
        <a
          href="#"
          className="group inline-flex items-center gap-3 rounded-full bg-[#0C0C0C] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-opacity duration-200 hover:opacity-80"
        >
          View all case studies
          <ArrowRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </FadeIn>
    </section>
  )
}
