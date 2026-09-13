import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import FadeIn from '../../components/common/FadeIn'

// Drop a portrait into public/ and set this path to wire up the badge photo.
const BADGE_PHOTO: string | null = null

const ACCENT = '#A855F7'

function LanyardBadge() {
  return (
    <motion.div
      className="flex flex-col items-center"
      style={{ transformOrigin: 'top center', willChange: 'transform' }}
      animate={{ rotate: [-2.2, 2.2, -2.2] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Strap */}
      <div
        className="w-[11px] rounded-b-sm h-[70px] md:h-[clamp(130px,32vh,360px)]"
        style={{
          background:
            'linear-gradient(90deg, #141414 0%, #2E2E2E 35%, #3A3A3A 55%, #141414 100%)',
        }}
      />

      {/* Metal clip */}
      <div
        className="relative -mt-px h-8 w-[18px] rounded-[4px]"
        style={{
          background:
            'linear-gradient(90deg, #6B7075 0%, #D7DADE 40%, #F1F3F5 52%, #9AA0A6 70%, #5A5F64 100%)',
        }}
      >
        <span className="absolute left-1/2 top-1.5 h-2 w-1.5 -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
        <span className="absolute bottom-1.5 left-1/2 h-2 w-1.5 -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
      </div>

      {/* Badge card */}
      <div
        className="-mt-1 overflow-hidden rounded-[14px] border border-white/10 bg-[#121212] shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
        style={{ width: 'clamp(190px, 22vw, 290px)' }}
      >
        {/* Accent top bar */}
        <div className="h-[9px] w-full" style={{ background: ACCENT }} />

        <div className="aspect-[4/5] w-full">
          {BADGE_PHOTO ? (
            <img
              src={BADGE_PHOTO}
              alt="Portrait"
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.03]">
              <ImageIcon
                className="h-7 w-7"
                strokeWidth={1.25}
                color="#D7E2EA"
                opacity={0.25}
              />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/30">
                Photo
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function IntroBannerSection() {
  return (
    <section
      id="intro"
      className="relative overflow-hidden bg-[#0A0A0A] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-0 md:min-h-screen md:flex md:items-center"
    >
      {/* Dot-grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(215,226,234,0.2) 1.3px, transparent 1.3px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-[1.15fr_1fr] md:gap-10">
        {/* ── Left column ── */}
        <div>
          <FadeIn delay={0} y={20}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#D7E2EA]/75">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available
            </span>
          </FadeIn>

          <FadeIn
            as="h2"
            delay={0.1}
            y={30}
            className="mt-6 font-normal leading-[1.1] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.1rem, 5.4vw, 4.4rem)' }}
          >
            Hi, I am Manab <span className="whitespace-nowrap">👋</span>
          </FadeIn>

          <FadeIn
            as="p"
            delay={0.18}
            y={24}
            className="mt-2 font-light leading-tight text-[#D7E2EA]/45"
            style={{ fontSize: 'clamp(1.2rem, 2.9vw, 2.15rem)' }}
          >
            iOS Engineer &amp; Designer
          </FadeIn>

          <FadeIn
            as="p"
            delay={0.26}
            y={24}
            className="mt-7 max-w-xl text-sm sm:text-base font-light leading-relaxed text-[#D7E2EA]/55"
          >
            An engineer turned designer with 4+ years across B2B &amp; SaaS. I
            don&apos;t just bridge design and engineering — I own the entire
            experience, from the first sketch to the final shipped product.
          </FadeIn>

          <FadeIn delay={0.34} y={24} className="mt-9 flex flex-wrap gap-3">
            {/* ← point href at your CV PDF (e.g. /manab-cv.pdf) */}
            <a
              href="#"
              className="rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.03] px-7 py-3.5 text-[0.95rem] font-medium text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.07] px-7 py-3.5 text-[0.95rem] font-medium text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/12"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: ACCENT }}
              />
              Let&apos;s connect
            </a>
          </FadeIn>
        </div>

        {/* ── Right column: hanging badge ── */}
        <FadeIn
          delay={0.4}
          y={-30}
          className="flex justify-center md:-mt-48 md:justify-end md:pr-6 lg:pr-16"
        >
          <LanyardBadge />
        </FadeIn>
      </div>
    </section>
  )
}
