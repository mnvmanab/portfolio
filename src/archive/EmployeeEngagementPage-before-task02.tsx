import { useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import FadeIn from '../components/common/FadeIn'

/**
 * Employee Engagement App — case study page.
 *
 * A fully-React page, not iframed, so the black-orange-white palette can
 * take over the viewport without fighting the portfolio's cream theme.
 * Colour tokens are local to this file (`T`) so nothing here bleeds into
 * the rest of the site.
 *
 * The page structure is a repeating **Task block** — each task tells one
 * before → after story with: why it matters, the old flow, the problem,
 * the new flow, what changed, why, and the resulting benefit. Replace the
 * `TASKS` array with your real redesigns; the presentation layer below is
 * data-driven, so no JSX changes are needed for content updates.
 */

// ── Palette ──────────────────────────────────────────────────────────
// Black / orange / off-white — kept local so this case study can carry
// its own product-brand identity without touching the portfolio tokens.
const T = {
  ink: '#0A0A0B',
  inkSoft: '#141416',
  inkPanel: '#1A1A1D',
  inkLine: '#26262A',
  inkMuted: '#8B8B90',
  paper: '#FAFAF7',
  paperWarm: '#F2EDE5',
  paperLine: '#E8E4DA',
  orange: '#FF6B00',
  orangeDeep: '#E55A00',
  orangeGlow: 'rgba(255,107,0,0.14)',
  orangeInk: '#2D1300',
  bodyInk: '#2A2A2E',
  fadedInk: '#66666B',
} as const

// ── Placeholder content — replace with your real project data ────────
type Screen = { label: string; note: string; tone?: 'muted' | 'vivid' }
type Task = {
  number: string
  title: string
  why: string
  beforeFlow: Screen[]
  problem: string[]
  afterFlow: Screen[]
  changes: string[]
  rationale: string
  benefits: { k: string; v: string }[]
}

const TASKS: Task[] = [
  {
    number: '01',
    title: 'Redeem a reward from the store',
    why: 'The redeem flow is the app\'s most-repeated action — day-to-day traffic hinges on it. The old flow made users walk through four screens for a single-intent task.',
    beforeFlow: [
      { label: 'Home', note: 'User taps "Rewards" in the bottom nav.' },
      { label: 'Rewards catalog', note: 'A long grid; user scrolls, taps a card.' },
      { label: 'Reward detail', note: 'Full page. Price appears here for the first time.' },
      { label: 'Confirmation', note: 'A separate screen confirms the redemption succeeded.' },
    ],
    problem: [
      'Four screens for a single-tap intent — friction that read as corporate, not consumer.',
      'The reward\'s point cost only appeared on screen 3, after the user had committed attention.',
      'The confirmation screen was a dead-end — users had to tap back twice to keep browsing.',
    ],
    afterFlow: [
      { label: 'Home', note: 'Popular rewards live inline as cards with price + one-tap "Redeem".' },
      { label: 'Confirmation sheet', note: 'A bottom sheet slides up over Home. No page change.' },
    ],
    changes: [
      'Pulled top rewards from a separate tab onto Home as a horizontal card rail.',
      'Made the reward\'s point cost the first thing on each card — never a surprise on tap.',
      'Replaced the confirmation page with a bottom sheet so the user stays on Home.',
    ],
    rationale: 'The redeem flow is a habit, not a decision. Every extra screen was breaking the habit and adding cognitive weight to something that should feel instant. Collapsing the whole intent into a single tap turns the muscle memory back on.',
    benefits: [
      { k: 'Screens', v: '4 → 2' },
      { k: 'Taps to redeem', v: '5 → 2' },
      { k: 'Price visible on', v: 'Screen 3 → Screen 1' },
      { k: 'Return to browse', v: 'Automatic' },
    ],
  },
  {
    number: '02',
    title: 'Recognize a colleague',
    why: 'Peer recognition is the reason the app exists. If the "Give recognition" flow is slow, the whole product loses its purpose. The old form asked the user to make five decisions before writing a single word.',
    beforeFlow: [
      { label: 'Home', note: 'User taps a floating action button.' },
      { label: 'Pick recipient', note: 'Search + tap. No recent-colleagues shortcut.' },
      { label: 'Pick award type', note: 'Long dropdown of award categories.' },
      { label: 'Enter details', note: 'Points, message, hashtags, visibility — all on one screen.' },
      { label: 'Preview + send', note: 'A separate review screen before submission.' },
    ],
    problem: [
      'Recipients had to be searched every time — even for teammates the user recognizes weekly.',
      'The award-type dropdown pushed users to a decision they didn\'t care about upfront.',
      'The preview screen added a step for a message users had literally just written.',
    ],
    afterFlow: [
      { label: 'Home', note: '"Recognize" bar shows top 3 recent teammates. Tap = start.' },
      { label: 'Compose', note: 'Message-first. Award + points inline as chips below.' },
      { label: 'Sent', note: 'A subtle confetti moment over Home. No preview page.' },
    ],
    changes: [
      'Surfaced recent colleagues as one-tap suggestions on Home — search still available.',
      'Made the message the primary field. Award + points shrunk to inline chips.',
      'Dropped the preview page; the compose screen IS the preview.',
    ],
    rationale: 'Recognition is emotional. The old flow made it feel like filing a form. Leading with the person and the message — and demoting the metadata — puts the emotional beat first and lets the operational choices follow.',
    benefits: [
      { k: 'Screens', v: '5 → 3' },
      { k: 'Fields to fill', v: '5 → 2' },
      { k: 'Teammate search', v: 'Optional, not default' },
      { k: 'Feels like', v: 'Sending, not filing' },
    ],
  },
  {
    number: '03',
    title: 'Check your points balance',
    why: 'The point balance is the reason to open the app — but the old design buried it three taps deep, then paired it with a stale dashboard chart no one asked for.',
    beforeFlow: [
      { label: 'Home', note: 'No balance in view. Header shows only greeting + notifications.' },
      { label: 'Profile tab', note: 'User taps Profile in bottom nav.' },
      { label: 'Wallet page', note: 'Balance shown, but wrapped in a chart-heavy dashboard.' },
    ],
    problem: [
      'The single most-requested number was three taps away from Home.',
      'The wallet page was a chart-first layout — users wanted the number, not the trend.',
      'No fast path to redeem from the balance itself.',
    ],
    afterFlow: [
      { label: 'Home', note: 'Balance lives at the top of Home as a bold hero chip.' },
      { label: 'Wallet detail', note: 'One tap on the chip → clean, number-first wallet.' },
    ],
    changes: [
      'Promoted the balance to a top-of-Home hero — the first thing the user sees on open.',
      'Rebuilt Wallet as number-first: big balance, redeem CTA, then history below.',
      'Cut the trend chart to a small sparkline; kept it as a link to a full-history view.',
    ],
    rationale: 'Analytics are for admins; balance is for users. The old wallet was designed for someone reviewing engagement; the new one is designed for the person who wants to know how many points they have and what to spend them on.',
    benefits: [
      { k: 'Taps to see balance', v: '3 → 0' },
      { k: 'Balance visible on', v: 'Wallet only → Home' },
      { k: 'Wallet page', v: 'Chart-first → Number-first' },
      { k: 'Path to redeem', v: 'Wallet → Rewards (2 taps) → Wallet → Redeem (1 tap)' },
    ],
  },
]

// ── Small primitives ─────────────────────────────────────────────────

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px w-8 shrink-0"
        style={{ background: dark ? T.inkLine : T.paperLine }}
      />
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: T.orange }}
      >
        {children}
      </span>
    </div>
  )
}

// A stylised phone frame that renders either a real image or placeholder
// content blocks. Kept compact so the flow row reads as a *diagram*, not a
// mockup gallery.
function PhoneFrame({
  label,
  note,
  tone = 'muted',
  contentBlocks,
  src,
}: {
  label: string
  note: string
  tone?: 'muted' | 'vivid'
  contentBlocks?: React.ReactNode
  src?: string | null
}) {
  const isVivid = tone === 'vivid'
  const bezel = isVivid ? T.ink : '#8F8A80'
  const screenBg = isVivid ? T.inkSoft : '#EEEAE1'
  return (
    <figure className="flex w-[176px] shrink-0 flex-col items-center gap-3">
      <div
        className="relative w-full overflow-hidden rounded-[26px] p-1.5"
        style={{
          aspectRatio: '9 / 19.5',
          background: bezel,
          boxShadow: isVivid
            ? '0 24px 44px -22px rgba(0,0,0,0.55), 0 2px 0 rgba(255,107,0,0.15) inset'
            : '0 18px 36px -22px rgba(20,17,14,0.35)',
        }}
      >
        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-[20px]"
          style={{ background: screenBg }}
        >
          {/* status bar sliver */}
          <div
            className="flex items-center justify-between px-3 py-1.5 text-[8px] font-semibold"
            style={{ color: isVivid ? T.inkMuted : '#8F8A80' }}
          >
            <span>9:41</span>
            <span>•••</span>
          </div>

          {src ? (
            <img src={src} alt={label} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="flex flex-1 flex-col gap-2 px-3 pb-4 pt-1">
              {contentBlocks ?? <DefaultBlocks tone={tone} />}
            </div>
          )}
        </div>
      </div>
      <figcaption className="text-center">
        <div
          className="text-[13px] font-semibold leading-tight"
          style={{ color: T.ink }}
        >
          {label}
        </div>
        <div
          className="mt-1 text-[11px] leading-snug"
          style={{ color: T.fadedInk, maxWidth: '18ch' }}
        >
          {note}
        </div>
      </figcaption>
    </figure>
  )
}

function DefaultBlocks({ tone }: { tone: 'muted' | 'vivid' }) {
  const isVivid = tone === 'vivid'
  const line = isVivid ? '#2D2D31' : '#D6D0C4'
  const strong = isVivid ? T.orange : '#B9B1A0'
  return (
    <>
      <div className="h-2 w-3/5 rounded-full" style={{ background: strong }} />
      <div className="h-1.5 w-4/5 rounded-full" style={{ background: line }} />
      <div className="mt-2 h-16 w-full rounded-lg" style={{ background: line, opacity: 0.55 }} />
      <div className="mt-2 flex gap-1.5">
        <div className="h-8 w-full rounded-md" style={{ background: line, opacity: 0.45 }} />
        <div className="h-8 w-full rounded-md" style={{ background: line, opacity: 0.45 }} />
      </div>
      <div className="mt-auto h-6 w-full rounded-md" style={{ background: strong, opacity: isVivid ? 1 : 0.65 }} />
    </>
  )
}

function FlowArrow({ vivid }: { vivid?: boolean }) {
  const color = vivid ? T.orange : '#B9B1A0'
  return (
    <div className="hidden shrink-0 items-center self-center pt-6 sm:flex">
      <svg width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden="true">
        <path
          d="M1 7h30M25 2l6 5-6 5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function FlowStrip({ variant, screens }: { variant: 'before' | 'after'; screens: Screen[] }) {
  const isAfter = variant === 'after'
  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{
            background: isAfter ? T.orange : T.paperWarm,
            color: isAfter ? '#FFFFFF' : T.fadedInk,
          }}
        >
          {isAfter ? 'After' : 'Before'}
        </span>
        <span
          className="text-[11px] uppercase tracking-[0.14em]"
          style={{ color: T.fadedInk }}
        >
          {screens.length} screen{screens.length === 1 ? '' : 's'}
        </span>
        <span className="h-px flex-1" style={{ background: isAfter ? T.orangeGlow : T.paperLine }} />
      </div>

      <div className="flex flex-wrap items-start gap-x-3 gap-y-8 sm:flex-nowrap sm:overflow-x-auto sm:pb-2">
        {screens.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <PhoneFrame
              label={s.label}
              note={s.note}
              tone={isAfter ? 'vivid' : 'muted'}
            />
            {i < screens.length - 1 && <FlowArrow vivid={isAfter} />}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Sections ─────────────────────────────────────────────────────────

function TopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-0 z-40 border-b"
      style={{
        borderColor: T.inkLine,
        background: 'rgba(10,10,11,0.82)',
        backdropFilter: 'saturate(140%) blur(14px)',
        WebkitBackdropFilter: 'saturate(140%) blur(14px)',
        color: '#FFFFFF',
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200"
          style={{ color: '#FFFFFF' }}
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
            style={{ color: T.orange }}
          >
            01 — Engagement app
          </span>
          <span className="h-px w-6" style={{ background: T.inkLine }} />
          <span
            className="text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: T.inkMuted }}
          >
            Case study · 2026
          </span>
        </div>

        <span
          className="hidden rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] sm:inline-flex"
          style={{ borderColor: T.inkLine, color: T.inkMuted }}
        >
          Ongoing
        </span>
      </div>
    </motion.header>
  )
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pb-32 sm:pt-28 lg:px-14 lg:pb-40 lg:pt-32"
      style={{ background: T.ink, color: '#FFFFFF' }}
    >
      {/* soft orange glow, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${T.orangeGlow}, transparent 70%)`,
          filter: 'blur(4px)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <FadeIn y={12} delay={0.05}>
          <Eyebrow dark>Case study · Ongoing since 2022</Eyebrow>
        </FadeIn>

        <FadeIn
          as="h1"
          y={30}
          delay={0.12}
          className="mt-6 text-white"
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2.2rem, 5vw, 72px)',
            lineHeight: 0.96,
            letterSpacing: '-0.03em',
            maxWidth: '24ch',
          }}
        >
          Redesigning the{' '}
          <em className="not-italic" style={{ color: T.orange }}>
            everyday
          </em>{' '}
          of an employee engagement app.
        </FadeIn>

        <FadeIn
          as="p"
          y={24}
          delay={0.2}
          className="mt-8 max-w-[620px] text-[17px] leading-[1.65]"
          style={{ color: T.inkMuted, fontWeight: 400 }}
        >
          A running record of before-and-after redesigns on our iOS product —
          one live task at a time. Each block below is a real user flow: the
          old shape, the problem it hid, the new shape, and what the change
          bought for people using the app every day.
        </FadeIn>

        {/* meta grid */}
        <FadeIn y={20} delay={0.28} className="mt-14">
          <dl
            className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            style={{ borderTop: `1px solid ${T.inkLine}`, paddingTop: 24 }}
          >
            {[
              { k: 'Role', v: 'iOS engineer + product designer' },
              { k: 'Platform', v: 'iOS · SwiftUI' },
              { k: 'Style', v: 'Continuous redesign' },
              { k: 'Timeline', v: '2022 → present' },
            ].map(({ k, v }) => (
              <div key={k} className="flex flex-col gap-1.5">
                <dt
                  className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: T.orange }}
                >
                  {k}
                </dt>
                <dd className="text-[14px] font-medium" style={{ color: '#FFFFFF' }}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  )
}

function Overview() {
  return (
    <section
      className="px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-32"
      style={{ background: T.paper, color: T.bodyInk }}
    >
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[220px_1fr] lg:gap-24">
        <FadeIn y={16}>
          <Eyebrow>The product</Eyebrow>
        </FadeIn>
        <div>
          <FadeIn
            as="h2"
            y={24}
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.9rem, 4.2vw, 56px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: T.ink,
            }}
          >
            An engagement app used by <em className="not-italic" style={{ color: T.orange }}>[headcount]</em> people across <em className="not-italic" style={{ color: T.orange }}>[N]</em> companies — and my job is to keep making it feel less like software.
          </FadeIn>
          <FadeIn
            as="p"
            y={18}
            delay={0.08}
            className="mt-6 text-[17px] leading-[1.7]"
            style={{ color: T.bodyInk, fontWeight: 400 }}
          >
            [Replace with a paragraph about the product — what the app does,
            who uses it, how they use it day-to-day, and what my remit is on
            the team.] The case study below shows the redesign work through
            the lens of specific user flows, not the app as a whole.
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Mandate() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32 lg:px-14 lg:py-40"
      style={{ background: T.ink, color: '#FFFFFF' }}
    >
      <div className="mx-auto max-w-[1280px]">
        <FadeIn y={16}>
          <Eyebrow dark>The mandate</Eyebrow>
        </FadeIn>
        <FadeIn
          as="h2"
          y={24}
          className="mt-6 text-white"
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2rem, 5vw, 68px)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            maxWidth: '20ch',
          }}
        >
          Reduce friction on the flows people already run. Don't ship features — <em className="not-italic" style={{ color: T.orange }}>ship less</em>.
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            {
              k: 'Signal',
              v: 'Support tickets and in-app feedback pointed at the same handful of daily flows — redeem, recognize, check balance. Each felt heavier than it needed to.',
            },
            {
              k: 'Constraint',
              v: 'No new tabs, no new tabs\' worth of learning. Every change had to fit inside the app users already knew.',
            },
            {
              k: 'Bet',
              v: 'Compress steps, collapse decisions, and put the person before the machinery. Consumer-app rhythm inside an enterprise product.',
            },
          ].map(({ k, v }) => (
            <FadeIn
              key={k}
              y={20}
              delay={0.08}
              className="rounded-2xl p-6"
              style={{
                background: T.inkPanel,
                border: `1px solid ${T.inkLine}`,
              }}
            >
              <div
                className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                style={{ color: T.orange }}
              >
                {k}
              </div>
              <p
                className="mt-3 text-[15px] leading-[1.65]"
                style={{ color: T.inkMuted, fontWeight: 400 }}
              >
                {v}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function TaskBlock({ task }: { task: Task }) {
  return (
    <section
      className="px-6 py-24 sm:px-10 sm:py-32 lg:px-14 lg:py-40"
      style={{ background: T.paper, color: T.bodyInk }}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Task header */}
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-24">
          <FadeIn y={16} className="flex flex-col gap-3">
            <Eyebrow>Task {task.number}</Eyebrow>
            <div
              style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(3rem, 8vw, 120px)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: T.orange,
              }}
            >
              {task.number}
            </div>
          </FadeIn>

          <div>
            <FadeIn
              as="h2"
              y={22}
              style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.9rem, 4.5vw, 60px)',
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
                color: T.ink,
              }}
            >
              {task.title}.
            </FadeIn>
            <FadeIn
              as="p"
              y={16}
              delay={0.08}
              className="mt-5 max-w-[640px] text-[17px] leading-[1.7]"
              style={{ color: T.bodyInk, fontWeight: 400 }}
            >
              {task.why}
            </FadeIn>
          </div>
        </div>

        {/* Before flow */}
        <FadeIn y={22} className="mt-16">
          <FlowStrip variant="before" screens={task.beforeFlow} />
        </FadeIn>

        {/* Problem */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-24">
          <FadeIn y={16}>
            <Eyebrow>The problem</Eyebrow>
          </FadeIn>
          <FadeIn y={18} delay={0.06}>
            <ul className="grid gap-4">
              {task.problem.map((p, i) => (
                <li key={i} className="flex gap-3 text-[16px] leading-[1.65]" style={{ color: T.bodyInk }}>
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: T.orange }}
                    aria-hidden="true"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* After flow */}
        <FadeIn y={22} className="mt-16">
          <FlowStrip variant="after" screens={task.afterFlow} />
        </FadeIn>

        {/* What I changed + Why */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn y={18}>
            <Eyebrow>What I changed</Eyebrow>
            <ol className="mt-5 grid gap-4">
              {task.changes.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl p-4 text-[15px] leading-[1.6]"
                  style={{ background: T.paperWarm, color: T.bodyInk }}
                >
                  <span
                    className="text-[13px] font-bold"
                    style={{ color: T.orange, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn y={18} delay={0.05}>
            <Eyebrow>Why</Eyebrow>
            <blockquote
              className="mt-5 text-[19px] leading-[1.55]"
              style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 500,
                color: T.ink,
                borderLeft: `2px solid ${T.orange}`,
                paddingLeft: 20,
              }}
            >
              {task.rationale}
            </blockquote>
          </FadeIn>
        </div>

        {/* Benefit */}
        <FadeIn y={22} className="mt-16">
          <Eyebrow>Benefit</Eyebrow>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {task.benefits.map((b) => (
              <div
                key={b.k}
                className="rounded-2xl p-6"
                style={{
                  background: T.ink,
                  color: '#FFFFFF',
                  border: `1px solid ${T.inkLine}`,
                }}
              >
                <div
                  className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: T.orange }}
                >
                  {b.k}
                </div>
                <div
                  className="mt-3 text-[22px] font-semibold leading-tight"
                  style={{ color: '#FFFFFF' }}
                >
                  {b.v}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Outcomes() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32 lg:px-14 lg:py-40"
      style={{ background: T.ink, color: '#FFFFFF' }}
    >
      <div className="mx-auto max-w-[1280px]">
        <FadeIn y={16}>
          <Eyebrow dark>Cumulative outcome</Eyebrow>
        </FadeIn>
        <FadeIn
          as="h2"
          y={24}
          className="mt-6 text-white"
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2rem, 5vw, 68px)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            maxWidth: '22ch',
          }}
        >
          The redesigns don't stack up as features — they stack up as <em className="not-italic" style={{ color: T.orange }}>time saved</em>, every day, for everyone who opens the app.
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'Total screens removed', v: '[N]' },
            { k: 'Average taps saved / task', v: '[N]' },
            { k: 'Flows redesigned', v: `${TASKS.length}` },
            { k: 'Support tickets on these flows', v: '[↓ N%]' },
          ].map((s) => (
            <FadeIn
              key={s.k}
              y={18}
              delay={0.05}
              className="rounded-2xl p-6"
              style={{ background: T.inkPanel, border: `1px solid ${T.inkLine}` }}
            >
              <div
                className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                style={{ color: T.orange }}
              >
                {s.k}
              </div>
              <div
                className="mt-3 text-[28px] font-semibold leading-tight"
                style={{ color: '#FFFFFF' }}
              >
                {s.v}
              </div>
            </FadeIn>
          ))}
        </div>

        <p
          className="mt-8 text-[12px] uppercase tracking-[0.14em]"
          style={{ color: T.inkMuted }}
        >
          Replace bracketed numbers with real figures — or delete this section if you'd rather keep the case study qualitative.
        </p>
      </div>
    </section>
  )
}

function Learnings() {
  return (
    <section
      className="px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-32"
      style={{ background: T.paper, color: T.bodyInk }}
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[220px_1fr] lg:gap-24">
        <FadeIn y={16}>
          <Eyebrow>Learnings</Eyebrow>
        </FadeIn>
        <div className="grid gap-8">
          {[
            {
              t: 'Continuous redesign beats big redesigns.',
              p: 'Shipping one improved flow every few sprints was more valuable than a "v2 relaunch". Each fix compounds — and users never had to relearn the app.',
            },
            {
              t: 'The problem is almost always more taps than it should be.',
              p: 'Whenever a flow felt sluggish, the answer was the same: count the taps, count the screens, delete one.',
            },
            {
              t: 'Enterprise ≠ friction.',
              p: 'Users of a B2B app carry the same phones — and the same expectations — as anyone else. Consumer-grade rhythm inside enterprise software isn\'t a stretch goal; it\'s the baseline now.',
            },
          ].map((l, i) => (
            <FadeIn
              key={l.t}
              y={16}
              delay={0.05 + i * 0.04}
              className="border-t pt-6"
              style={{ borderColor: T.paperLine }}
            >
              <h3
                className="text-[22px]"
                style={{
                  fontFamily: "'Poppins', system-ui, sans-serif",
                  fontWeight: 600,
                  color: T.ink,
                  letterSpacing: '-0.015em',
                }}
              >
                {l.t}
              </h3>
              <p
                className="mt-3 max-w-[640px] text-[16px] leading-[1.7]"
                style={{ color: T.bodyInk, fontWeight: 400 }}
              >
                {l.p}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="px-6 py-16 sm:px-10 sm:py-20 lg:px-14"
      style={{ background: T.ink, color: '#FFFFFF' }}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <div
            className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
            style={{ color: T.orange }}
          >
            End of case study
          </div>
          <a
            href="#"
            className="group mt-4 inline-flex items-center gap-3 text-[24px] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              color: '#FFFFFF',
            }}
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2} />
            Back to portfolio
          </a>
        </div>

        <a
          href="#/tutorme"
          className="group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200"
          style={{ borderColor: T.inkLine, color: '#FFFFFF' }}
        >
          Next: Tutor Me
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
        </a>
      </div>
    </footer>
  )
}

// ── Root ─────────────────────────────────────────────────────────────

export default function EmployeeEngagementPage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Engagement app · Case study — Manab Jyoti Gogoi'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        background: T.paper,
        color: T.bodyInk,
        fontFamily: "'Poppins', system-ui, sans-serif",
      }}
    >
      <TopBar />
      <Hero />
      <Overview />
      <Mandate />
      {TASKS.map((task) => (
        <TaskBlock key={task.number} task={task} />
      ))}
      <Outcomes />
      <Learnings />
      <Footer />
    </div>
  )
}
