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
type Screen = { label: string; note: string; tone?: 'muted' | 'vivid'; src?: string }
/**
 * A screen the flow opens *off* one of its steps rather than after it —
 * a modal or sheet. Rendered as a second, smaller tier so a hub-and-popup
 * flow doesn't read as a straight line.
 */
type Branch = { trigger: string; label: string; note: string; src?: string }
type Task = {
  number: string
  title: string
  why: string
  beforeFlow: Screen[]
  /** Modals the last step of beforeFlow opens. */
  beforeBranches?: Branch[]
  branchNote?: string
  problem: string[]
  afterFlow: Screen[]
  changes: string[]
  rationale: string
  benefits: { k: string; v: string }[]
  /**
   * Optional looping video showing the new flow in motion. If present, the
   * task block renders a phone-framed `<VideoFrame>` directly below the
   * AFTER row — it augments the static shots rather than replacing them.
   * Served from `public/engagement/assets/`.
   */
  videoSrc?: string
  /**
   * Copy for the panel on the right of the video. Only rendered when
   * `videoSrc` is set; `eyebrow` defaults to "In motion".
   */
  videoCopy?: { eyebrow?: string; heading: string; body: string }
  /**
   * Optional wide/landscape image to use for the AFTER slot — e.g., a
   * before vs after comparison panel. When present, the task renders this
   * instead of the AFTER phone row (the `afterFlow` array is ignored for
   * display, but kept in data). "What I changed" stacks below the image
   * rather than sitting beside it.
   */
  afterImage?: string
  afterImageCaption?: string
  /**
   * Observations about how real teammates used the old flow. Renders as a
   * quiet block right after the Problem section. These are informal notes,
   * not formal usability-test findings — keep the voice honest ("I noticed",
   * "teammates often") rather than quantitative.
   */
  usabilityNotes?: {
    heading?: string
    notes: string[]
  }
  /**
   * Design decisions that bent under real-world constraints — timeline, dev
   * capacity, scope, exec feedback. Renders between the Why rationale and
   * the Benefit chips. Each card lists: what I wanted, what shipped, why
   * the gap exists, and when (if ever) it gets revisited.
   */
  tradeOffs?: {
    heading?: string
    items: {
      wanted: string
      shipped: string
      reason: string
      deferred?: string
    }[]
  }
  /**
   * Optional projected metrics — explicitly marked as EXPECTED, not measured.
   * Renders as a dashed-bordered block after the Benefit chips. Use only
   * for forecasts tied to the design decisions above; swap in real numbers
   * once post-ship analytics are in and remove the "expected" framing then.
   */
  expectedImpact?: {
    metrics: { label: string; before: string; after: string; context?: string }[]
    note?: string
  }
}

const TASKS: Task[] = [
  {
    number: '01',
    title: 'Recognize a colleague',
    why: 'Peer recognition is the reason the app exists. If giving it feels like filing a form, the whole product loses its purpose. The old flow put a required field behind a popup \u2014 three times over.',
    beforeFlow: [
      {
        label: 'Select an Award',
        note: 'A carousel of award badges. Pick one, optionally read its description, Proceed.',
        src: '/assets/images/engagement/recognize-01-award.jpg',
      },
      {
        label: 'Thank You form',
        note: 'Hashtags, message and visibility \u2014 the whole recognition, on one screen.',
        src: '/assets/images/engagement/recognize-02-form.jpg',
      },
    ],
    beforeBranches: [
      {
        trigger: 'Tap Add',
        label: 'Hashtags',
        note: 'Five values, radio-style circles, Confirm.',
        src: '/assets/images/engagement/recognize-03-hashtags.jpg',
      },
      {
        trigger: 'Tap the field',
        label: 'Message editor',
        note: 'Full-screen sheet with its own Save Changes.',
        src: '/assets/images/engagement/recognize-04-message.jpg',
      },
      {
        trigger: 'Tap Change',
        label: 'Select Group',
        note: 'Shared, Restricted or Private. Confirm.',
        src: '/assets/images/engagement/recognize-05-group.jpg',
      },
    ],
    branchNote:
      'Two steps, three detours. Every field on the form opens a popup \u2014 nothing on the recognition screen can be filled on the recognition screen.',
    problem: [
      'Submit stays disabled until both required fields are filled, but never says which ones \u2014 and both are hidden inside popups, so the user has to go looking.',
      'Writing the message is a full-screen takeover with its own Save Changes \u2014 the user leaves the recognition, writes, saves, and comes back to it.',
      'The hashtag sheet says \u201cMaximum selection allowed : 3\u201d but draws single-select circles, so the control contradicts its own instruction.',
      'Visibility defaults to Shared and is already explained in a paragraph underneath \u2014 yet it still gets a Change button and a third modal.',
      'The suggested messages that would save the most typing are a single horizontal row, with the second one already cut off at the edge.',
    ],
    afterFlow: [
      {
        label: 'Everything inline',
        note: 'Recipients, hashtag chips, message field and suggestions \u2014 all on one screen.',
        src: '/assets/images/engagement/recognize-after-01-form.jpg',
      },
      {
        label: 'Pick a writing style',
        note: 'Length, tone, emoji and tagging \u2014 set before you speak.',
        src: '/assets/images/engagement/recognize-after-02-style.jpg',
      },
      {
        label: 'Say it out loud',
        note: 'A recorder replaces the field. Speak; the app writes it.',
        src: '/assets/images/engagement/recognize-after-03-record.jpg',
      },
      {
        label: 'Written, ready to send',
        note: 'Drafted with recipients tagged. Regenerate if it misses.',
        src: '/assets/images/engagement/recognize-after-04-written.jpg',
      },
    ],
    changes: [
      'Brought both required fields onto the form \u2014 hashtags as tappable chips with a live count, the message as a field you type in. Neither opens a popup any more.',
      'Added voice capture that drafts the message. A style sheet sets length, tone, emoji use and whether to tag recipients first, so the user only has to talk.',
      'Kept the primary action disabled until the form is valid, but put a \u201cPending: Hashtags, Appreciation Message\u201d label directly above it. Same block, now explained \u2014 nobody has to guess which field is holding them up.',
      'Turned suggested messages from a clipped horizontal row into a vertical list with one-tap insert, and put recipients at the top as chips so you can see who it is going to.',
      'Kept visibility in a sheet, but gave Shared, Restricted and Private their own explanations, so the choice can be made inside the sheet rather than from prior knowledge.',
    ],
    rationale:
      'Recognition is emotional, and the old form made it clerical \u2014 every field pushed you somewhere else, and a blank message box asked for a sentence most people did not want to compose at their desk. Bringing the fields home fixed the mechanics. Voice fixed the harder part, which was the blank page. The preview step was added back deliberately: once the app drafts something that goes out organization-wide, the person whose name is on it should read it first.',
    benefits: [
      { k: 'Screens', v: '5 \u2192 1' },
      { k: 'Forced popups', v: '2 \u2192 0' },
      { k: 'Fastest path', v: '7 taps \u2192 4' },
      { k: 'Writing it', v: 'Type it \u2192 speak it' },
      { k: 'Blocked state', v: 'Unexplained \u2192 named' },
    ],
    usabilityNotes: {
      notes: [
        'Teammates who wanted to shorten a message after writing it had to re-open the full-screen editor \u2014 which also meant tapping Save Changes again, every time.',
        'The Hashtags popup said \u201cMaximum selection: 3\u201d but drew single-select circles. I watched more than one person tap three circles one at a time, waiting for each to confirm, before giving up.',
        'Visibility defaulted to \u201cShared\u201d and nobody in the sessions I observed changed it \u2014 the Change button and the modal added two taps for a decision nobody actually made.',
      ],
    },
    tradeOffs: {
      items: [
        {
          wanted:
            'Suggested messages that adapt to who you\u2019re recognizing \u2014 for a developer who just shipped something, suggestions like \u201cThanks for shipping the auth refactor,\u201d not generic \u201cThank you for being a team player.\u201d',
          shipped:
            '5 generic suggested messages. Same list for every recognition, every person, every award.',
          reason:
            'A smart suggestion engine needs backend work \u2014 pulling the recipient\u2019s info, their recent activity, maybe an AI model to phrase the suggestion. The backend team was already locked on other sprint commitments. Waiting for their time would have stalled the whole recognize-flow redesign for a quarter.',
          deferred: 'v2, when the backend has capacity.',
        },
        {
          wanted:
            'Full voice capture \u2014 say \u201cThanks Shaan and Priya for finishing the Q3 report\u201d out loud, and the app drafts the message AND tags Shaan and Priya as the recipients.',
          shipped:
            'Voice drafts the message. Recipients still have to be tagged manually at the top of the compose screen.',
          reason:
            'In testing, the voice system kept mishearing Indian names \u2014 \u201cSean\u201d instead of \u201cShaan,\u201d or missing names entirely. Tagging the wrong teammate on a kudos post that goes org-wide is embarrassing in a way the product can\u2019t afford. Safer to keep tagging manual.',
          deferred: 'Revisit when the speech framework gets better at Indian names \u2014 likely iOS 18 or later.',
        },
      ],
    },
    videoSrc: '/engagement/assets/vc.mp4',
    videoCopy: {
      eyebrow: 'In motion',
      heading: 'Everything on one screen. Spoken, if you want.',
      body:
        'Recipients at the top. Hashtags as chips, not a popup. The message field, or one tap on the microphone to draft it from your voice. The hardest part of recognition — sitting in front of a blank text box — becomes the easiest.',
    },
    expectedImpact: {
      metrics: [
        {
          label: '90-day retention',
          before: 'X%',
          after: 'Y%',
          context:
            'A friction-free recognition flow (7 taps → 4, voice to draft the message) means more kudos sent — which means more kudos received, which pulls teammates back for the reciprocity loop that powers retention.',
        },
      ],
      note: 'Not measured. Forecast based on the design levers above — a shorter recognition flow and voice-drafted messages feeding the reciprocity loop that drives return visits. Replace the placeholder values with real figures once 90 days of post-ship analytics are in.',
    },
  },
  {
    number: '02',
    title: 'Redesigning the top navigation of the R&R app',
    why:
      "I rebuilt the app's top nav from a decorative center-logo strip into a right-weighted action header — notifications pulled out of the bottom bar, wallet turned into a tappable pill, and the whole thing shipped as one reusable component for Vantage Circle, Vantage Fit, and client-branded versions. What I looked at before changing it: how consumer apps like LinkedIn, Slack and Instagram place the account and alerts; Apple's Human Interface Guidelines on tap targets; and the team's own observations about how people were (and weren't) using the old header.",
    beforeFlow: [
      {
        label: 'Old header',
        note:
          'Avatar on the left, company logo centered, wallet right as a plain label. Notifications live in the bottom nav, not here.',
        src: '/engagement/assets/header-before.png',
      },
    ],
    problem: [
      'The three elements — avatar, logo, wallet — belong to different mental categories (identity, brand, data), so the user has to re-sort them on every screen load.',
      'The wallet looks like a status label, not a button — no pill, no outline, no shadow — so most users never try tapping it.',
      "Notifications don't live in the header at all; they're buried in the bottom nav, far from where attention lands on app open — so the whole re-engagement loop (kudos received, points credited, reward available) runs late or gets missed.",
      'The two highest-value spots in the entire app — top-left and top-center of a header seen every session — are spent on decoration (avatar, brand logo), not on actions the user needs.',
      "A wallet styled as plain text suppresses the ownership feeling users form over points they've earned; points feel abstract instead of personal, and users forget to go spend them.",
      'The brand-centered layout reads as enterprise software — the "logo in the middle" pattern consumer apps have left behind — which anchors the user\'s emotional investment at tolerance, not loyalty.',
      "Problem statement — the old header is organised around the company, not the user. The brand gets the center, the avatar gets the hard-to-reach corner, notifications don't appear at all, and the wallet is styled as information instead of value the user owns. Result: lower re-engagement, lower redemption, lower loyalty.",
    ],
    afterFlow: [
      {
        label: 'Vantage Fit',
        note: "Fit's logo on the left. Wallet pill, bell and avatar grouped on the right.",
        // src: '/engagement/assets/header-after-fit.png',
      },
      {
        label: 'Vantage Circle',
        note: 'Same shell, different brand mark. Circle on the left, same right-side cluster.',
        // src: '/engagement/assets/header-after-circle.png',
      },
      {
        label: 'Client-branded',
        note:
          'Flexible logo slot takes any client mark. The chevron inside the wallet pill here is a design exploration for a future multi-wallet feature — not shipped yet (the backend doesn’t support it).',
        // src: '/engagement/assets/header-after-client.png',
      },
    ],
    changes: [
      'The three right-side elements now share one visual family — same grey chip, same corner of the screen, same tap-rhythm — so the header parses as "brand on the left, me on the right" in a single glance. No more re-sorting on every screen load.',
      "The wallet is now a filled pill — grey chip, visible icon, bold number, clearly pressable. Users don't miss it, and they don't miss at it either.",
      'Notifications sit in the header with a red count badge — in the exact spot the eye lands on app open. The re-engagement loop (kudos received, points credited, reward available) fires in the first second of a session instead of hours later or never.',
      "The wallet pill makes the balance feel like a thing you own. Points live in a chip you can see every session and tap in a moment — personal, present, pressable. The ownership feeling that was flattened by plain text is restored. Users don't forget their balance exists.",
      'The layout reads as a consumer app, not an enterprise portal. Brand small-left, actions clustered right — the muscle memory users bring from LinkedIn, Slack and Instagram. The emotional register shifts from "corporate tool my employer makes me use" to "an app I open." Loyalty gets a surface it can land on.',
      "Overall result — the header is now organised around the user, not the company. The brand gets a quiet left-side credit; the user's identity, actions and accumulated value all cluster on the thumb-reach right. Notifications are visible on open, the wallet looks and feels like value owned, and one component — slotted at the logo — scales across every product and client without a rebuild.",
    ],
    rationale:
      "Three psychology levers, three revenue outcomes. The wallet pill makes points feel owned, not forgotten — ownership psychology drives redemption, which is the only act in the app that converts accumulated points into perceived product value. The bell badge pulls the recognition-reciprocity loop into the first-second-of-session attention zone — fast reciprocity is the engagement engine of an R&R app, and delayed notifications are the quietest form of churn. The consumer-app layout (brand small-left, actions right) swaps the user's emotional register from “corporate tool my employer makes me use” to “an app I open” — the gap between tolerance and loyalty, and the gap between a redemption rate that looks like compliance and one that looks like adoption.",
    benefits: [
      { k: 'Layout', v: 'Logo center → logo left' },
      { k: 'Notifications', v: 'Bottom nav → header' },
      { k: 'Wallet', v: 'Plain label → pill button' },
      { k: 'Scalability', v: 'Per-product build → one slotted component' },
    ],
    afterImage: '/engagement/assets/header-after.png',
    afterImageCaption:
      'Before: avatar on the left, logo center, wallet styled as a label. After: logo on the left, wallet pill + bell + avatar grouped on the right.',
    usabilityNotes: {
      notes: [
        'Teammates checking their balance on the fly tried tapping the “972” number — nothing happened. They went looking for the wallet in Settings, then in Profile, before giving up.',
        'Notifications in the bottom nav were often discovered hours or days after they arrived — usually when the user next opened Messages for an unrelated reason.',
      ],
    },
    tradeOffs: {
      items: [
        {
          wanted:
            'A redesigned notification feed — one neat sheet showing “Shaan recognized you,” “You earned 50 points,” “Lenovo offer: 10% off laptops” — all organized by type and time, right from the bell.',
          shipped:
            'Bell with a red count badge. Tapping it opens the existing (unchanged) notifications screen.',
          reason:
            'Redesigning the notifications screen is a whole separate project — more screens, more data, more edge cases, 3–4 months of work. Rolling it in would have delayed the header redesign that long. I shipped the header fast and parked the notifications redesign as a separate project.',
          deferred: 'Separate case study. Separate quarter.',
        },
        {
          wanted:
            'A multi-wallet switcher. One app, multiple point programs (Rewards, Perks, Fit, client-specific) — and a quick way to pick which wallet you want to use for the current transaction. The chevron inside the wallet pill on the client-branded variant was my first exploration of this idea.',
          shipped:
            'Single-tap on the wallet opens the one wallet screen. The chevron in the client-branded variant mock is a design exploration, not a shipped feature.',
          reason:
            'The backend doesn’t support multiple wallets per user yet. Until the data model has multi-wallet in it, there’s nothing meaningful for the UI to switch between — so the exploration stays as a design artifact instead of a shipped behaviour.',
          deferred: 'When the backend introduces multi-wallet support, bring the switcher in — probably as the chevron-in-pill pattern first, extending to the other variants if multiple wallets land there too.',
        },
      ],
    },
  },
  {
    number: '03',
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
  width = 176,
}: {
  label: string
  note: string
  tone?: 'muted' | 'vivid'
  contentBlocks?: React.ReactNode
  src?: string | null
  width?: number
}) {
  const isVivid = tone === 'vivid'
  const bezel = isVivid ? T.ink : '#8F8A80'
  const screenBg = isVivid ? T.inkSoft : '#EEEAE1'

  const caption = (
    <figcaption className="text-center">
      <div className="text-[13px] font-semibold leading-tight" style={{ color: T.ink }}>
        {label}
      </div>
      <div
        className="mt-1 text-[11px] leading-snug"
        style={{ color: T.fadedInk, maxWidth: '18ch' }}
      >
        {note}
      </div>
    </figcaption>
  )

  // A screenshot is already a phone screen — drawing a bezel around it would
  // frame the device twice. Render it exactly as captured: square corners,
  // since rounding would clip the capture's own corners (visible on the
  // dark-topped message editor).
  if (src) {
    return (
      <figure className="flex shrink-0 flex-col items-center gap-3" style={{ width }}>
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="w-full"
          style={{
            border: `1px solid ${isVivid ? 'rgba(255,255,255,0.10)' : T.paperLine}`,
            boxShadow: isVivid
              ? '0 24px 44px -22px rgba(0,0,0,0.55)'
              : '0 18px 36px -22px rgba(20,17,14,0.35)',
          }}
        />
        {caption}
      </figure>
    )
  }

  return (
    <figure className="flex shrink-0 flex-col items-center gap-3" style={{ width }}>
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
          <div
            className="flex items-center justify-between px-3 py-1.5 text-[8px] font-semibold"
            style={{ color: isVivid ? T.inkMuted : '#8F8A80' }}
          >
            <span>9:41</span>
            <span>•••</span>
          </div>
          <div className="flex flex-1 flex-col gap-2 px-3 pb-4 pt-1">
            {contentBlocks ?? <DefaultBlocks tone={tone} />}
          </div>
        </div>
      </div>
      {caption}
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

/**
 * The popups a single screen opens, drawn as a second tier beneath the flow.
 * A hub-and-modal flow rendered as one straight row would claim the user
 * walks through them in order; they are parallel detours off one screen.
 */
const BRANCH_W = 160
const BRANCH_GAP = 16

function BranchRow({ branches, note }: { branches: Branch[]; note?: string }) {
  return (
    <div className="mt-3">
      {/* Connector. Built from the same column widths and gap as the row
          below, so the stems line up with the phones by construction rather
          than by hard-coded offsets. */}
      <div className="hidden sm:flex" style={{ height: 36 }} aria-hidden="true">
        {branches.map((_, i) => {
          const first = i === 0
          const last = i === branches.length - 1
          const mid = i === Math.floor((branches.length - 1) / 2)
          return (
            <div
              key={i}
              className="relative"
              style={{ width: BRANCH_W, marginLeft: i ? BRANCH_GAP : 0 }}
            >
              {/* rail, drawn as half-segments so it meets across the gap */}
              {!first && (
                <span
                  className="absolute top-[18px] h-px"
                  style={{ background: T.paperLine, left: -BRANCH_GAP, width: BRANCH_W / 2 + BRANCH_GAP }}
                />
              )}
              {!last && (
                <span
                  className="absolute left-1/2 top-[18px] h-px"
                  style={{ background: T.paperLine, width: BRANCH_W / 2 + BRANCH_GAP }}
                />
              )}
              {/* stem down to this phone */}
              <span
                className="absolute left-1/2 top-[18px] w-px"
                style={{ background: T.paperLine, height: 18 }}
              />
              {/* one stem up to the flow above */}
              {mid && (
                <span
                  className="absolute left-1/2 top-0 w-px"
                  style={{ background: T.paperLine, height: 18 }}
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap items-start gap-y-8" style={{ columnGap: BRANCH_GAP }}>
        {branches.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-2" style={{ width: BRANCH_W }}>
            <span
              className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
              style={{ background: T.paperWarm, color: T.fadedInk }}
            >
              {b.trigger}
            </span>
            <PhoneFrame label={b.label} note={b.note} src={b.src} width={BRANCH_W} />
          </div>
        ))}
      </div>

      {note && (
        <p
          className="mt-6 max-w-[520px] text-[14px] leading-[1.6]"
          style={{ color: T.fadedInk }}
        >
          {note}
        </p>
      )}
    </div>
  )
}

/**
 * Screens shrink as a flow gets longer so it always fits one row beside the
 * commentary column. A fixed width wraps a four-screen flow onto a second
 * line and orphans the last screen after a dangling arrow.
 * Budget: the paired row must fit 1240px of canvas at the breakpoint where
 * pairing turns on — flow + 48px gap + a 320px text column.
 */
function widthForFlow(n: number) {
  if (n <= 3) return 220
  if (n === 4) return 165
  return 150
}

function FlowStrip({
  variant,
  screens,
  width,
}: {
  variant: 'before' | 'after'
  screens: Screen[]
  width?: number
}) {
  const isAfter = variant === 'after'
  const screenW = width ?? widthForFlow(screens.length)
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

      <div className="flex min-w-0 items-start gap-x-3 gap-y-8 overflow-x-auto pb-2 min-[1360px]:overflow-visible min-[1360px]:pb-0">
        {screens.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <PhoneFrame
              label={s.label}
              note={s.note}
              src={s.src}
              width={screenW}
              tone={isAfter ? 'vivid' : 'muted'}
            />
            {i < screens.length - 1 && <FlowArrow vivid={isAfter} />}
          </div>
        ))}
      </div>
    </div>
  )
}

// A standalone phone frame that plays a looping, muted, inline video. Used
// to show the new flow in motion directly below the AFTER row — so the
// static shots give the before/after at a glance and the video gives the
// feel.
function VideoFrame({ src, label }: { src: string; label?: string }) {
  return (
    <figure className="flex flex-col items-center gap-5">
      <div
        className="relative w-[240px] overflow-hidden rounded-[32px] p-1.5 sm:w-[260px]"
        style={{
          aspectRatio: '9 / 19.5',
          background: T.ink,
          boxShadow:
            '0 32px 60px -28px rgba(0,0,0,0.55), 0 2px 0 rgba(255,107,0,0.18) inset',
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[26px]"
          style={{ background: T.inkSoft }}
        >
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      {label && (
        <figcaption className="flex items-center gap-3">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: T.orange, boxShadow: `0 0 0 4px ${T.orangeGlow}` }}
            aria-hidden="true"
          />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: T.orange }}
          >
            {label}
          </span>
        </figcaption>
      )}
    </figure>
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
          Fixing the app I{' '}
          <em className="not-italic" style={{ color: T.orange }}>
            ship
          </em>
          .
        </FadeIn>

        <FadeIn
          as="p"
          y={24}
          delay={0.2}
          className="mt-8 max-w-[620px] text-[17px] leading-[1.65]"
          style={{ color: T.inkMuted, fontWeight: 400 }}
        >
          I&apos;m the iOS engineer on the team. The screens below are flows I
          spotted doing too much, redesigned, and pushed to production.
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
            The app is <em className="not-italic" style={{ color: T.orange }}>Vantage Circle</em> — an employee recognition and rewards platform teammates open to say thanks and spend their points.
          </FadeIn>
          <FadeIn
            as="p"
            y={18}
            delay={0.08}
            className="mt-6 text-[17px] leading-[1.7]"
            style={{ color: T.bodyInk, fontWeight: 400 }}
          >
            Our users are employees at companies that use Vantage Circle. Day-to-day they open the app to send a kudos, redeem points for a gift card, or check how many they&apos;ve got left. I&apos;m the iOS engineer on the team &mdash; I design the UX in Figma, build it in SwiftUI, and ship it to the App Store.
          </FadeIn>
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

        {/* Before flow beside the problem it causes.
            `auto` lets the flow take exactly the width its screens need and
            gives the rest to the prose, instead of splitting 50/50 — which
            would cap the screens at the width the widest flow allows. */}
        <div className="mt-16 grid gap-12 min-[1360px]:grid-cols-[auto_minmax(320px,1fr)] min-[1360px]:gap-12">
          <FadeIn y={22} className="min-w-0">
            <FlowStrip variant="before" screens={task.beforeFlow} />
            {task.beforeBranches && (
              <BranchRow branches={task.beforeBranches} note={task.branchNote} />
            )}
          </FadeIn>

          <FadeIn y={18} delay={0.06} className="min-[1360px]:pt-10">
            <Eyebrow>The problem</Eyebrow>
            <ul className="mt-5 grid gap-4">
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

        {/* Usability notes — informal observations from watching real
            teammates use the old flow. Quieter than the Problem bullets so
            the viewer understands these are observations, not analysis. */}
        {task.usabilityNotes && task.usabilityNotes.notes.length > 0 && (
          <FadeIn y={18} className="mt-12 max-w-[760px]">
            <Eyebrow>{task.usabilityNotes.heading ?? 'What I noticed'}</Eyebrow>
            <ul className="mt-5 grid gap-4">
              {task.usabilityNotes.notes.map((n, i) => (
                <li
                  key={i}
                  className="text-[15.5px] leading-[1.65]"
                  style={{
                    color: T.bodyInk,
                    borderLeft: `2px solid ${T.paperLine}`,
                    paddingLeft: 18,
                  }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </FadeIn>
        )}

        {/* After — one of two renderings. If the task supplies a wide
            `afterImage` (e.g. a before/after comparison panel), render it
            full-width with "What I changed" stacked below. Otherwise, keep
            the original side-by-side layout: AFTER phone row on the left,
            "What I changed" column on the right. */}
        {task.afterImage ? (
          <>
            {/* AFTER segment — image on the left, label + description on the
                right at wide screens. Stacks on mobile. */}
            <FadeIn y={22} className="mt-16">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
                {/* Image */}
                <figure style={{ background: T.paperWarm }}>
                  <img
                    src={task.afterImage}
                    alt="Before and after of the redesigned header"
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </figure>

                {/* Label strip + description */}
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{ background: T.orange, color: '#FFFFFF' }}
                    >
                      After
                    </span>
                    <span
                      className="text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: T.fadedInk }}
                    >
                      Before vs after
                    </span>
                  </div>
                  {task.afterImageCaption && (
                    <p
                      className="text-[16px] leading-[1.65]"
                      style={{ color: T.bodyInk, fontWeight: 400 }}
                    >
                      {task.afterImageCaption}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* What I changed — stacked below the AFTER segment, at the
                same max width so the two blocks share a left-edge rhythm. */}
            <FadeIn y={18} delay={0.06} className="mt-14 max-w-[760px]">
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
          </>
        ) : (
          <div className="mt-16 grid gap-12 min-[1360px]:grid-cols-[auto_minmax(320px,1fr)] min-[1360px]:gap-12">
            <FadeIn y={22} className="min-w-0">
              <FlowStrip variant="after" screens={task.afterFlow} />
            </FadeIn>

            <FadeIn y={18} delay={0.06} className="min-[1360px]:pt-10">
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
          </div>
        )}

        {/* The new flow in motion — a looping phone-framed video on the left,
            editorial copy on the right. Rendered only when a task supplies
            `videoSrc`. Sits between the AFTER row and the Why rationale so
            the viewer sees the static before/after, then feels the real
            thing, then reads the reasoning. Stacks on mobile. */}
        {task.videoSrc && (
          <FadeIn
            y={22}
            delay={0.08}
            className="mt-16 grid items-center justify-center gap-12 lg:grid-cols-[auto_minmax(0,520px)] lg:gap-20"
          >
            <div className="flex justify-center lg:justify-start">
              <VideoFrame src={task.videoSrc} />
            </div>

            {task.videoCopy && (
              <div>
                <Eyebrow>{task.videoCopy.eyebrow ?? 'In motion'}</Eyebrow>
                <h3
                  className="mt-5"
                  style={{
                    fontFamily: "'Poppins', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(1.4rem, 2.4vw, 30px)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    color: T.ink,
                  }}
                >
                  {task.videoCopy.heading}
                </h3>
                <p
                  className="mt-4 text-[16px] leading-[1.7]"
                  style={{ color: T.bodyInk, fontWeight: 400 }}
                >
                  {task.videoCopy.body}
                </p>
              </div>
            )}
          </FadeIn>
        )}

        <div className="mx-auto mt-16 max-w-[760px]">
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

        {/* Trade-offs — the ship-reality block. Each card shows what I
            wanted, what shipped, why they're different, and when (if ever)
            the gap gets closed. Sits between Why rationale (reasoning) and
            Benefit chips (results) so the viewer sees: here's the ideal,
            here's where it bent, here's what came out. */}
        {task.tradeOffs && task.tradeOffs.items.length > 0 && (
          <FadeIn y={22} className="mt-16">
            <Eyebrow>{task.tradeOffs.heading ?? 'Trade-offs'}</Eyebrow>
            <h3
              className="mt-5 max-w-[760px]"
              style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.4rem, 2.4vw, 30px)',
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                color: T.ink,
              }}
            >
              Where I had to bend. Everything that shipped is the version that fit.
            </h3>

            <div
              className={`mt-8 grid gap-4 ${
                task.tradeOffs.items.length === 1
                  ? 'max-w-[560px]'
                  : task.tradeOffs.items.length === 2
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {task.tradeOffs.items.map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{
                    background: T.paperWarm,
                    border: `1px solid ${T.paperLine}`,
                  }}
                >
                  <div className="grid gap-4">
                    <div>
                      <div
                        className="text-[10px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: T.orange }}
                      >
                        Wanted
                      </div>
                      <p
                        className="mt-2 text-[14.5px] leading-[1.55]"
                        style={{ color: T.ink, fontWeight: 500 }}
                      >
                        {t.wanted}
                      </p>
                    </div>
                    <div>
                      <div
                        className="text-[10px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: T.fadedInk }}
                      >
                        Shipped
                      </div>
                      <p
                        className="mt-2 text-[14px] leading-[1.55]"
                        style={{ color: T.bodyInk }}
                      >
                        {t.shipped}
                      </p>
                    </div>
                    <div>
                      <div
                        className="text-[10px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: T.fadedInk }}
                      >
                        Why
                      </div>
                      <p
                        className="mt-2 text-[13.5px] leading-[1.55]"
                        style={{ color: T.fadedInk }}
                      >
                        {t.reason}
                      </p>
                    </div>
                    {t.deferred && (
                      <div>
                        <div
                          className="text-[10px] font-bold uppercase tracking-[0.22em]"
                          style={{ color: T.fadedInk }}
                        >
                          Deferred to
                        </div>
                        <p
                          className="mt-2 text-[13.5px] leading-[1.55]"
                          style={{ color: T.fadedInk }}
                        >
                          {t.deferred}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Benefit — grid adapts to array length so Task 01's 5-chip set
            fills a 5-column row instead of wrapping an orphan onto row 2. */}
        <FadeIn y={22} className="mt-16">
          <Eyebrow>Benefit</Eyebrow>
          <div
            className={`mt-5 grid gap-4 sm:grid-cols-2 ${
              task.benefits.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
            }`}
          >
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

        {/* Expected impact — projected metrics explicitly marked as not
            measured. Dashed border + "EXPECTED IMPACT" label distinguish
            these cards from the dark Benefit cards (which carry design
            deltas, not forecasts). Replace placeholder values + remove the
            "expected" framing once post-ship analytics are in. */}
        {task.expectedImpact && task.expectedImpact.metrics.length > 0 && (
          <FadeIn y={22} className="mt-12">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{
                  border: `1px dashed ${T.orange}`,
                  color: T.orange,
                  background: 'transparent',
                }}
              >
                Expected impact
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ color: T.fadedInk }}
              >
                Projected · not measured
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {task.expectedImpact.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl p-6"
                  style={{
                    background: T.paperWarm,
                    border: `1px dashed ${T.paperLine}`,
                  }}
                >
                  <div
                    className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: T.fadedInk }}
                  >
                    {m.label}
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline gap-3">
                    <span
                      className="text-[30px] font-semibold leading-none"
                      style={{ color: T.fadedInk, fontVariantNumeric: 'tabular-nums' }}
                    >
                      {m.before}
                    </span>
                    <span className="text-[18px] font-semibold" style={{ color: T.orange }}>
                      {'→'}
                    </span>
                    <span
                      className="text-[30px] font-semibold leading-none"
                      style={{ color: T.ink, fontVariantNumeric: 'tabular-nums' }}
                    >
                      {m.after}
                    </span>
                  </div>
                  {m.context && (
                    <div
                      className="mt-4 text-[13px] leading-[1.55]"
                      style={{ color: T.fadedInk }}
                    >
                      {m.context}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {task.expectedImpact.note && (
              <p
                className="mt-6 max-w-[640px] text-[12px] leading-[1.55]"
                style={{ color: T.fadedInk }}
              >
                {task.expectedImpact.note}
              </p>
            )}
          </FadeIn>
        )}
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
      {TASKS.map((task) => (
        <TaskBlock key={task.number} task={task} />
      ))}
      <Learnings />
      <Footer />
    </div>
  )
}
