import FadeIn from '../../components/common/FadeIn'

/**
 * Design 4A — "What I Do · Editorial Paper" from the Claude Design project.
 * Cream card, Instrument Serif heading, terracotta accents, 2-column grid
 * with a full-width fifth card.
 */

const ACCENT = '#b03d27'

type Service = {
  number: string
  name: string
  description: string
  /** Card 05 spans both columns and lays out number/title on one row. */
  wide?: boolean
}

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'iOS Development',
    description:
      'Native apps in Swift & SwiftUI — fast, reliable, App Store–ready.',
  },
  {
    number: '02',
    name: 'UI/UX Design',
    description:
      'End-to-end product design, from wireframes to polished interfaces.',
  },
  {
    number: '03',
    name: 'Design Systems',
    description:
      'Component libraries and tokens that keep design and code in sync.',
  },
  {
    number: '04',
    name: 'Prototyping',
    description:
      'Interactive prototypes that validate ideas before code is written.',
  },
  {
    number: '05',
    name: 'Motion & Interaction',
    description:
      'Thoughtful animations and micro-interactions that make apps feel alive.',
    wide: true,
  },
]

// Near-white tiles + a soft paper shadow give real separation from the cream
// ground (the flat #faf8f3 sat only ~6 RGB units off the background).
// Hover lifts the tile and deepens the shadow.
const CARD =
  'group relative rounded-md border border-[#dcd4c4] bg-[#fffdf8] p-[22px] ' +
  'shadow-[0_1px_2px_rgba(40,32,20,0.04),0_6px_16px_-8px_rgba(40,32,20,0.16)] ' +
  'transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out ' +
  'hover:-translate-y-1 hover:border-[#b03d27] hover:bg-white ' +
  'hover:shadow-[0_2px_4px_rgba(40,32,20,0.05),0_18px_34px_-14px_rgba(40,32,20,0.28)]'

const NUMBER_STYLE: React.CSSProperties = {
  fontFamily: "'Instrument Serif', serif",
  fontSize: 28,
  lineHeight: 1,
  color: ACCENT,
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      /* Same paper as the hero, and the same horizontal inset, so the two
         sections read as one continuous sheet with aligned gutters. */
      className="bg-[#f4f1ea] px-6 pb-16 pt-10 sm:px-10 sm:pb-20 lg:px-14 lg:pb-24 lg:pt-12"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      <div className="w-full">
        <FadeIn
          as="h2"
          delay={0}
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
          delay={0.06}
          y={18}
          className="mb-7 mt-4 flex items-center gap-4"
        >
          <span className="h-px w-[34px] shrink-0" style={{ background: ACCENT }} />
          <span className="text-sm text-[#57524a]">
            Design and engineering, owned end to end.
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <FadeIn
              key={s.number}
              delay={0.1 + i * 0.07}
              y={26}
              scale={0.96}
              className={s.wide ? 'sm:col-span-2' : undefined}
            >
              {s.wide ? (
                <div
                  className={`${CARD} grid h-full grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-[9px]`}
                >
                  <span style={NUMBER_STYLE}>{s.number}</span>
                  <span className="text-[13px] font-bold uppercase tracking-[0.09em] text-[#14110e]">
                    {s.name}
                  </span>
                  <span className="col-start-2 text-sm leading-[1.6] text-[#57524a]">
                    {s.description}
                  </span>
                </div>
              ) : (
                <div className={`${CARD} flex h-full flex-col gap-[9px]`}>
                  <span style={NUMBER_STYLE}>{s.number}</span>
                  <span className="text-[13px] font-bold uppercase tracking-[0.09em] text-[#14110e]">
                    {s.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-[#57524a]">
                    {s.description}
                  </span>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
