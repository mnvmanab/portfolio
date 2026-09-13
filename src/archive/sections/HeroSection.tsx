import { useState } from 'react'
import { Dribbble, Github, Linkedin } from 'lucide-react'
import FadeIn from '../../components/common/FadeIn'
import FloatingAccent from '../components/FloatingAccent'

// ← Replace with your real profile URLs.
const SOCIALS = [
  { label: 'GitHub', href: '#', Icon: Github },
  { label: 'Dribbble', href: '#', Icon: Dribbble },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
]

const NAV_LINKS = ['About', 'Services', 'Projects', 'Contact']

const PORTRAIT_URL = '/assets/images/hero-character.png'

// ← Drop your Apple logo here: portfolio_V2/public/apple-logo.png
// Until the file exists, a labelled placeholder renders in its place.
const APPLE_LOGO_URL = '/assets/images/apple-logo.png'

function AppleMark() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-[22%] border border-dashed border-white/40 bg-white/10 p-2 text-center text-[0.55rem] font-medium uppercase leading-tight tracking-widest text-white/70 backdrop-blur-sm">
        Apple
        <br />
        logo
      </div>
    )
  }

  return (
    <img
      src={APPLE_LOGO_URL}
      alt=""
      onError={() => setFailed(true)}
      draggable={false}
      className="h-auto w-full select-none drop-shadow-[0_14px_28px_rgba(10,3,24,0.55)]"
    />
  )
}

// Faux-3D extruded wordmark: solid light face + stacked shadows for the
// extrusion, on a perspective-tilted wrapper so it reads as a 3D object.
function UiUxMark() {
  return (
    <div
      style={{
        transform: 'perspective(520px) rotateY(-16deg) rotateX(8deg) rotate(-4deg)',
      }}
    >
      <span
        className="font-black uppercase tracking-tight text-white"
        style={{
          fontSize: 'clamp(1.15rem, 2.7vw, 2.6rem)',
          textShadow: [
            '1px 1px 0 #7E22CE',
            '2px 2px 0 #6D1FB8',
            '3px 3px 0 #5B1A9E',
            '4px 4px 0 #4A1583',
            '5px 5px 0 #3A1068',
            '6px 6px 0 #2C0C50',
            '9px 14px 22px rgba(10,3,24,0.55)',
          ].join(', '),
        }}
      >
        UI/UX
      </span>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      className="relative flex h-screen flex-col"
      style={{
        overflowX: 'clip',
        background:
          'radial-gradient(125% 95% at 50% 28%, #A855F7 0%, #8B2FD6 26%, #5B1A9E 52%, #38106B 76%, #240A4A 100%)',
      }}
    >
      {/* Navbar */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-40 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#EBE3F7] transition-opacity duration-200 hover:opacity-70"
          >
            {link}
          </a>
        ))}
      </FadeIn>

      {/* Text blocks: normal flow on mobile (stacked under the nav),
          absolutely positioned from md: up. */}

      {/* Left info block */}
      <FadeIn
        delay={0.3}
        x={-30}
        y={0}
        className="z-30 px-6 pt-8 md:absolute md:left-10 md:top-[26%] md:max-w-[380px] md:p-0"
      >
        <h1 className="font-semibold leading-[1.05] tracking-tight text-white text-[clamp(2.2rem,5vw,4.75rem)]">
          Hi, I am
          <br />
          Manab.
        </h1>
        <div className="mt-5 md:mt-8 space-y-1">
          <p className="text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#C9B8E6]">
            Focus
          </p>
          <p className="text-sm sm:text-base font-light uppercase tracking-wide text-[#EBE3F7]">
            iOS Apps &amp; UI/UX
          </p>
        </div>
        <p className="mt-3 md:mt-4 text-sm sm:text-base font-light uppercase tracking-wide text-[#EBE3F7]">
          Designed and shipped end-to-end.
        </p>
      </FadeIn>

      {/* Right description block — flows under the left block on mobile,
          pinned top-right on md+. Arrow buttons are decorative; md+ only. */}
      <FadeIn
        delay={0.4}
        x={30}
        y={0}
        className="z-30 px-6 pt-6 md:absolute md:right-10 md:top-[18%] md:max-w-[230px] md:p-0 md:text-right"
      >
        <p className="max-w-[300px] text-xs sm:text-sm font-light leading-relaxed text-[#D9CCEF] md:max-w-none">
          Hey I&apos;m Manab, An Engineer turned Designer with over 4+ years of
          experience in B2B &amp; SaaS.
        </p>
        <div className="mt-8 hidden items-center justify-end gap-3 md:flex">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-200 hover:bg-white/10"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Centered portrait (static). Height-driven sizing: the image scales
          with viewport height so the head can never crop on short screens.
          Flex wrapper centers it; FadeIn's own transform would otherwise
          clobber a -translate-x-1/2 centering class. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
        {/* `relative` makes this box the anchor for the floating accents, so
            they track the character as he scales with viewport height. */}
        <FadeIn delay={0.6} y={30} className="relative">
          {/* lg+: top edge sits exactly 24px below the navbar (nav bottom is
              60px → 100vh - 60 - 24). Smaller screens stay height-clamped. */}
          <img
            src={PORTRAIT_URL}
            alt="3D creator character portrait"
            className="h-[clamp(300px,58vh,640px)] w-auto max-w-[86vw] select-none lg:h-[calc(100vh-84px)] lg:max-w-none"
            draggable={false}
          />

          {/* Floating accents. Positioned with left/right offsets (never
              translate-*, which framer-motion's transform would override).
              On mobile they tuck over the character's edges; from md: up they
              sit clear beside him. */}
          <FloatingAccent
            delay={0}
            duration={4.4}
            distance={13}
            className="absolute top-[58%] right-[calc(100%-52px)] w-[58px] sm:top-[54%] sm:right-[calc(100%-30px)] sm:w-[74px] md:top-[57%] md:right-[calc(100%+14px)] md:w-[96px] lg:w-[112px]"
          >
            <AppleMark />
          </FloatingAccent>

          <FloatingAccent
            delay={1.1}
            duration={5.2}
            distance={11}
            className="absolute top-[45%] left-[calc(100%-72px)] sm:top-[40%] sm:left-[calc(100%-40px)] md:top-[34%] md:left-[calc(100%+16px)]"
          >
            <UiUxMark />
          </FloatingAccent>
        </FadeIn>
      </div>
    </section>
  )
}
