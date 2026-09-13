import FadeIn from '../../components/common/FadeIn'

/**
 * The previous "What I Do" layout — white panel, oversized heading, and a
 * vertical numbered list separated by hairlines. Kept alongside the newer
 * 4A paper design for comparison.
 */

const SERVICES = [
  {
    number: '01',
    name: 'iOS Development',
    description:
      'Native apps built in Swift & SwiftUI — fast, reliable, and App Store–ready.',
  },
  {
    number: '02',
    name: 'UI/UX Design',
    description:
      'End-to-end product design in Figma, from wireframes to polished, usable interfaces.',
  },
  {
    number: '03',
    name: 'Design Systems',
    description:
      'Scalable component libraries and tokens that keep design and code in sync.',
  },
  {
    number: '04',
    name: 'Prototyping',
    description:
      'Interactive prototypes that validate ideas before a line of code is written.',
  },
  {
    number: '05',
    name: 'Motion & Interaction',
    description:
      'Thoughtful animations and micro-interactions that make apps feel alive.',
  },
]

export default function ServicesListSection() {
  return (
    <section
      id="services-list"
      className="bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
    >
      <h2
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(1.9rem, 6vw, 86px)' }}
      >
        What I Bring to the Table
      </h2>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            y={30}
            className="flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-3 pt-1 sm:pt-2 md:pt-4">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                style={{
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  opacity: 0.6,
                }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
